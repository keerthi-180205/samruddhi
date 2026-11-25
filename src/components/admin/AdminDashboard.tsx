import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit3, Trash2, X, ShieldAlert, 
  RotateCcw, Download, ArrowLeft, Layers, Utensils, Sliders, 
  AlertCircle, Eye, CheckCircle2 
} from 'lucide-react';
import { RestaurantData, MenuItem, Category, FoodType, CafeSettings } from '../../types';
import { ItemModal } from './ItemModal';
import { CategoryModal } from './CategoryModal';
import { SettingsTab } from './SettingsTab';

interface AdminDashboardProps {
  data: RestaurantData;
  onUpdateItem: (itemData: Partial<MenuItem> & { category_id: string }) => Promise<void>;
  onDeleteItem: (itemId: string) => Promise<void>;
  onToggleAvailability: (itemId: string, isAvailable: boolean) => Promise<void>;
  onSaveCategory: (categoryData: { id?: string; name: string; slug?: string; sort_order: number }) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
  onSaveSettings: (settings: CafeSettings) => Promise<void>;
  onResetMenu: () => Promise<void>;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onUpdateItem,
  onDeleteItem,
  onToggleAvailability,
  onSaveCategory,
  onDeleteCategory,
  onSaveSettings,
  onResetMenu,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'items' | 'categories' | 'settings' | 'data'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | 'all'>('all');
  
  // Modals state
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<{ item: MenuItem; categoryId: string } | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Confirmation state
  const [confirmDelete, setConfirmDelete] = useState<{ type: 'item' | 'category'; id: string; name: string } | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Flatten all items with their category reference
  const allItemsWithCategory = useMemo(() => {
    const list: Array<{ item: MenuItem; category: Category }> = [];
    data.categories.forEach(cat => {
      cat.items.forEach(item => {
        list.push({ item, category: cat });
      });
    });
    return list;
  }, [data.categories]);

  // Statistics
  const totalItems = allItemsWithCategory.length;
  const availableItems = allItemsWithCategory.filter(i => i.item.is_available).length;
  const soldOutItems = totalItems - availableItems;
  const vegCount = allItemsWithCategory.filter(i => i.item.food_type === 'veg').length;
  const nonVegCount = allItemsWithCategory.filter(i => i.item.food_type === 'non_veg').length;
  const eggCount = allItemsWithCategory.filter(i => i.item.food_type === 'egg').length;

  // Filtered items
  const filteredItems = useMemo(() => {
    return allItemsWithCategory.filter(({ item, category }) => {
      if (selectedCategory !== 'all' && category.id !== selectedCategory && category.slug !== selectedCategory) {
        return false;
      }
      if (selectedFoodType !== 'all' && item.food_type !== selectedFoodType) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = category.name.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory) return false;
      }
      return true;
    });
  }, [allItemsWithCategory, selectedCategory, selectedFoodType, searchQuery]);

  // Handlers
  const handleToggleAvailable = async (item: MenuItem) => {
    try {
      await onToggleAvailability(item.id, !item.is_available);
      showNotification(`"${item.name}" is now marked as ${!item.is_available ? 'Available' : 'Sold Out'}`);
    } catch (err: any) {
      showNotification(err?.message || 'Failed to toggle availability', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    try {
      if (confirmDelete.type === 'item') {
        await onDeleteItem(confirmDelete.id);
        showNotification(`"${confirmDelete.name}" deleted successfully.`);
      } else {
        await onDeleteCategory(confirmDelete.id);
        showNotification(`Category "${confirmDelete.name}" deleted successfully.`);
      }
    } catch (err: any) {
      showNotification(err?.message || 'Delete operation failed', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `samruddhi-cafe-menu-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Menu JSON downloaded successfully');
  };

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to restore the default menu? This will reload all original 24 categories and 115+ items.')) {
      try {
        await onResetMenu();
        showNotification('Default Samruddhi Café menu restored successfully!');
      } catch (err: any) {
        showNotification(err?.message || 'Reset failed', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1F1A16] pb-24">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className={`fixed top-20 right-4 sm:top-24 sm:right-5 z-50 p-3.5 sm:p-4 rounded-2xl shadow-soft-lg flex items-center gap-2.5 sm:gap-3 animate-fadeIn border max-w-[90vw] ${
          notification.type === 'success' 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
            : 'bg-rose-50 border-rose-300 text-rose-900'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-xs font-bold">{notification.message}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border-b border-[#E8E2D5] shadow-soft-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <button
                onClick={onExitAdmin}
                className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#FBF9F5] hover:bg-[#F2ECE1] text-[#4A433D] hover:text-[#1F1A16] border border-[#E8E2D5] transition-colors shrink-0"
                title="Return to Public Website"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-2xl font-display font-bold text-[#1F1A16]">
                    Samruddhi Café <span className="text-[#C88327] italic font-normal">Admin</span>
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Live
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#786F66] mt-0.5 font-medium line-clamp-1">
                  Manage dishes, availability & store operations
                </p>
              </div>
            </div>

            {/* Quick Actions (Full width on mobile) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsItemModalOpen(true);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#C88327] hover:bg-[#B06F1B] text-white font-heading font-bold text-xs shadow-soft transition-all active:scale-95 min-h-[38px]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Item</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-[#F4EFE6] text-[#1F1A16] border border-[#E8E2D5] text-xs font-bold transition-colors shadow-soft-sm min-h-[38px]"
              >
                <Layers className="w-3.5 h-3.5 text-[#C88327]" />
                <span className="hidden xs:inline">Add Category</span>
                <span className="xs:hidden">Category</span>
              </button>

              <button
                type="button"
                onClick={onExitAdmin}
                className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#FBF9F5] hover:bg-[#F2ECE1] text-[#5C544D] hover:text-[#1F1A16] border border-[#E8E2D5] text-xs font-bold transition-colors min-h-[38px]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Site</span>
              </button>
            </div>

          </div>

          {/* KPI Stats Bar (2 columns on mobile, 3 on tablet, 6 on desktop) */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]">
              <div className="text-[10px] sm:text-[11px] text-[#786F66] font-semibold">Total Items</div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-[#1F1A16] mt-0.5">{totalItems}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]">
              <div className="text-[10px] sm:text-[11px] text-[#786F66] font-semibold">Categories</div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-[#C88327] mt-0.5">{data.categories.length}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]">
              <div className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold">In Stock</div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-emerald-600 mt-0.5">{availableItems}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]">
              <div className="text-[10px] sm:text-[11px] text-rose-700 font-semibold">Sold Out</div>
              <div className="text-xl sm:text-2xl font-bold font-heading text-rose-600 mt-0.5">{soldOutItems}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]">
              <div className="text-[10px] sm:text-[11px] text-[#786F66] font-semibold">Veg / Non / Egg</div>
              <div className="text-xs sm:text-sm font-bold text-[#1F1A16] mt-1 sm:mt-1.5 flex items-center gap-1">
                <span className="text-emerald-600">{vegCount}</span> / <span className="text-rose-600">{nonVegCount}</span> / <span className="text-amber-600">{eggCount}</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5]">
              <div className="text-[10px] sm:text-[11px] text-[#786F66] font-semibold">Store Status</div>
              <div className="mt-0.5 sm:mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                  data.settings.is_open ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {data.settings.is_open ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Smooth Horizontal Swipe on Mobile) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-[#E8E2D5]">
          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'items'
                ? 'border-[#C88327] text-[#C88327]'
                : 'border-transparent text-[#786F66] hover:text-[#1F1A16]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Items ({totalItems})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'categories'
                ? 'border-[#C88327] text-[#C88327]'
                : 'border-transparent text-[#786F66] hover:text-[#1F1A16]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Categories ({data.categories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#C88327] text-[#C88327]'
                : 'border-transparent text-[#786F66] hover:text-[#1F1A16]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('data')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 sm:gap-2 transition-colors whitespace-nowrap ${
              activeTab === 'data'
                ? 'border-[#C88327] text-[#C88327]'
                : 'border-transparent text-[#786F66] hover:text-[#1F1A16]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Backup / Reset</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">

        {/* TAB 1: MENU ITEMS */}
        {activeTab === 'items' && (
          <div className="space-y-4 sm:space-y-6">
            
            {/* Filter toolbar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#E8E2D5] shadow-soft-sm flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#8C8278] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter items..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-xs text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8278] hover:text-[#1F1A16]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category & Dietary Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-xs text-[#1F1A16] font-semibold focus:outline-none focus:border-[#C88327]"
                >
                  <option value="all">All Categories ({data.categories.length})</option>
                  {data.categories.map(c => (
                    <option key={c.id || c.slug} value={c.id || c.slug}>
                      {c.name} ({c.items.length})
                    </option>
                  ))}
                </select>

                {/* Dietary Filter */}
                <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#FBF9F5] p-1 rounded-xl border border-[#E8E2D5]">
                  <button
                    type="button"
                    onClick={() => setSelectedFoodType('all')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${selectedFoodType === 'all' ? 'bg-[#1F1A16] text-white' : 'text-[#786F66]'}`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFoodType('veg')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${selectedFoodType === 'veg' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
                  >
                    Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFoodType('non_veg')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${selectedFoodType === 'non_veg' ? 'bg-rose-600 text-white' : 'text-rose-700'}`}
                  >
                    Non-Veg
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFoodType('egg')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${selectedFoodType === 'egg' ? 'bg-amber-600 text-white' : 'text-amber-800'}`}
                  >
                    Egg
                  </button>
                </div>
              </div>

            </div>

            {/* Mobile Cards View (Optimized for Small Screens) */}
            <div className="md:hidden space-y-3">
              {filteredItems.map(({ item, category }) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-soft-sm flex flex-col justify-between transition-colors ${
                    !item.is_available ? 'opacity-70 bg-[#FAF8F5]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {item.food_type === 'veg' && (
                        <span className="w-3.5 h-3.5 rounded-sm border-2 border-emerald-600 bg-emerald-50 flex items-center justify-center p-[2px] shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        </span>
                      )}
                      {item.food_type === 'non_veg' && (
                        <span className="w-3.5 h-3.5 rounded-sm border-2 border-rose-600 bg-rose-50 flex items-center justify-center p-[2px] shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                        </span>
                      )}
                      {item.food_type === 'egg' && (
                        <span className="w-3.5 h-3.5 rounded-sm border-2 border-amber-600 bg-amber-50 flex items-center justify-center p-[2px] shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-[#1F1A16] truncate">{item.name}</h4>
                    </div>

                    <span className="text-base font-bold font-heading text-[#C88327] shrink-0">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#786F66] mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-[#FBF9F5] border border-[#E8E2D5] font-semibold">
                      {category.name}
                    </span>
                    {item.pieces && (
                      <span className="font-medium">• {item.pieces} pcs</span>
                    )}
                    {item.needs_price_check && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        Verify Price
                      </span>
                    )}
                  </div>

                  {/* Mobile Actions: Availability Toggle & Edit/Delete */}
                  <div className="pt-2.5 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailable(item)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[34px] ${
                        item.is_available
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border border-rose-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.is_available ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`}></span>
                      <span>{item.is_available ? 'In Stock' : 'Sold Out'}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingItem({ item, categoryId: category.id });
                          setIsItemModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-[#FBF9F5] hover:bg-[#F2ECE1] text-[#4A433D] hover:text-[#C88327] border border-[#E8E2D5] min-w-[34px] min-h-[34px] flex items-center justify-center"
                        title="Edit Item"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete({ type: 'item', id: item.id, name: item.name })}
                        className="p-2 rounded-xl bg-[#FBF9F5] hover:bg-rose-50 text-[#4A433D] hover:text-rose-600 border border-[#E8E2D5] min-w-[34px] min-h-[34px] flex items-center justify-center"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="py-10 text-center text-xs text-[#786F66] bg-white rounded-2xl border border-[#E8E2D5] p-6">
                  No menu items matched your search filters.
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-3xl border border-[#E8E2D5] shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF9F5] text-[#5C544D] uppercase font-bold border-b border-[#E8E2D5]">
                    <tr>
                      <th className="py-3.5 px-5">Item Details</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Pieces</th>
                      <th className="py-3.5 px-4 text-center">In Stock Status</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {filteredItems.map(({ item, category }) => (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-[#FDFCF9] transition-colors ${!item.is_available ? 'opacity-60 bg-[#FAF8F5]' : ''}`}
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            {item.food_type === 'veg' && (
                              <span className="w-4 h-4 rounded-sm border-2 border-emerald-600 bg-emerald-50 flex items-center justify-center p-[2px] shrink-0" title="Veg">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              </span>
                            )}
                            {item.food_type === 'non_veg' && (
                              <span className="w-4 h-4 rounded-sm border-2 border-rose-600 bg-rose-50 flex items-center justify-center p-[2px] shrink-0" title="Non-Veg">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                              </span>
                            )}
                            {item.food_type === 'egg' && (
                              <span className="w-4 h-4 rounded-sm border-2 border-amber-600 bg-amber-50 flex items-center justify-center p-[2px] shrink-0" title="Egg">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                              </span>
                            )}
                            <div>
                              <span className="font-bold text-[#1F1A16] text-sm">{item.name}</span>
                              {item.needs_price_check && (
                                <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 font-bold border border-amber-200">
                                  Verify Price
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-[#5C544D] font-semibold">
                          <span className="px-2.5 py-1 rounded-lg bg-[#FBF9F5] border border-[#E8E2D5]">
                            {category.name}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-bold text-sm text-[#C88327] font-heading">₹{item.price}</span>
                        </td>

                        <td className="py-3.5 px-4 text-[#786F66] font-medium">
                          {item.pieces ? `${item.pieces} pcs` : '—'}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleAvailable(item)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                              item.is_available
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                            }`}
                            title="Click to toggle availability"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.is_available ? 'bg-emerald-600 animate-pulse' : 'bg-rose-600'}`}></span>
                            <span>{item.is_available ? 'In Stock' : 'Sold Out'}</span>
                          </button>
                        </td>

                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingItem({ item, categoryId: category.id });
                                setIsItemModalOpen(true);
                              }}
                              className="p-1.5 rounded-xl bg-[#FBF9F5] hover:bg-[#F2ECE1] text-[#4A433D] hover:text-[#C88327] border border-[#E8E2D5] transition-colors"
                              title="Edit Item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setConfirmDelete({ type: 'item', id: item.id, name: item.name })}
                              className="p-1.5 rounded-xl bg-[#FBF9F5] hover:bg-rose-50 text-[#4A433D] hover:text-rose-600 border border-[#E8E2D5] transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#786F66]">
                          No menu items matched your search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-[#1F1A16]">Manage Menu Categories</h3>
                <p className="text-xs text-[#786F66] mt-0.5">Organize categories, display order, or add new sections</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#C88327] hover:bg-[#B06F1B] text-white text-xs font-bold shadow-soft min-h-[38px]"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {data.categories.map((cat, idx) => (
                <div
                  key={cat.id || cat.slug}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft flex flex-col justify-between hover:border-[#C88327]/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#5C544D] bg-[#FBF9F5] border border-[#E8E2D5] px-2 py-0.5 rounded">
                        #{cat.sort_order || (idx + 1)}
                      </span>
                      <span className="text-xs font-bold text-[#C88327]">
                        {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#1F1A16] font-display">{cat.name}</h4>
                    <p className="text-xs text-[#8C8278] font-mono mt-1">slug: {cat.slug}</p>
                  </div>

                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-[#F2ECE1] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id || cat.slug);
                        setActiveTab('items');
                      }}
                      className="text-xs text-[#C88327] hover:underline font-bold"
                    >
                      View Items ({cat.items.length}) →
                    </button>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategory(cat);
                          setIsCategoryModalOpen(true);
                        }}
                        className="p-1.5 rounded-xl bg-[#FBF9F5] hover:bg-[#F2ECE1] text-[#4A433D] hover:text-[#C88327] border border-[#E8E2D5]"
                        title="Edit Category"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete({ type: 'category', id: cat.id, name: cat.name })}
                        className="p-1.5 rounded-xl bg-[#FBF9F5] hover:bg-rose-50 text-[#4A433D] hover:text-rose-600 border border-[#E8E2D5]"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === 'settings' && (
          <SettingsTab
            settings={data.settings}
            onSaveSettings={async (newSettings) => {
              await onSaveSettings(newSettings);
              showNotification('Store settings saved successfully!');
            }}
          />
        )}

        {/* TAB 4: BACKUP & DATA RESET */}
        {activeTab === 'data' && (
          <div className="max-w-2xl space-y-4 sm:space-y-6">
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft">
              <h3 className="text-base sm:text-lg font-bold text-[#1F1A16] mb-1.5 sm:mb-2 font-display">Export & Backup Menu Data</h3>
              <p className="text-xs text-[#5C544D] leading-relaxed mb-4 sm:mb-5">
                Download a complete copy of the restaurant menu items, categories, and settings in JSON format.
              </p>
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FBF9F5] hover:bg-[#F2ECE1] text-[#1F1A16] border border-[#E8E2D5] text-xs font-bold transition-colors shadow-soft-sm min-h-[38px]"
              >
                <Download className="w-4 h-4 text-[#C88327]" />
                <span>Export Menu JSON</span>
              </button>
            </div>

            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-rose-50/60 border border-rose-200 shadow-soft">
              <div className="flex items-center gap-2 text-rose-700 mb-1.5 sm:mb-2">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-base sm:text-lg font-bold font-display">Restore Original Seed Menu</h3>
              </div>
              <p className="text-xs text-[#5C544D] leading-relaxed mb-4 sm:mb-5">
                Need to roll back test edits or repopulate the café database? This will restore all 24 authentic categories and all 115+ dishes from the initial menu dataset.
              </p>
              <button
                type="button"
                onClick={handleResetData}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-soft min-h-[38px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restore Default Menu (24 Categories)</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Item Modal */}
      <ItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        onSave={async (itemData) => {
          await onUpdateItem(itemData);
          showNotification(editingItem ? 'Item updated successfully!' : 'Item added to menu!');
        }}
        categories={data.categories}
        editingItem={editingItem}
      />

      {/* Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={async (categoryData) => {
          await onSaveCategory(categoryData);
          showNotification(editingCategory ? 'Category updated!' : 'Category created!');
        }}
        editingCategory={editingCategory}
      />

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-white border border-[#E8E2D5] rounded-3xl p-5 sm:p-6 shadow-soft-lg">
            <h4 className="text-base font-bold text-[#1F1A16] font-display mb-2">
              Confirm Deletion
            </h4>
            <p className="text-xs text-[#5C544D] mb-5 sm:mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-[#1F1A16]">"{confirmDelete.name}"</strong>? This will remove it from the café menu.
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-2xl bg-[#F4EFE6] text-[#4A433D] text-xs font-bold hover:bg-[#EAE4D7] min-h-[38px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-soft min-h-[38px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
