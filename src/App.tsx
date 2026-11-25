import React, { useState, useEffect, useMemo } from 'react';
import { RestaurantData, MenuItem, Category, CafeSettings } from './types';
import { initialRestaurantData } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { MenuShowcase } from './components/MenuShowcase';
import { AmbienceGallery } from './components/AmbienceGallery';
import { LocationAndHours } from './components/LocationAndHours';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const [data, setData] = useState<RestaurantData>(initialRestaurantData);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'admin'>('portfolio');
  const [shortlist, setShortlist] = useState<Record<string, { item: MenuItem; qty: number }>>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live restaurant data from Express backend
  const fetchRestaurantData = async () => {
    try {
      const res = await fetch('/api/restaurant');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      }
    } catch (err) {
      console.warn('Backend API unavailable, using local memory state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  // Compute total items and categories
  const { totalItems, totalCategories } = useMemo(() => {
    let itemsCount = 0;
    data.categories.forEach(c => {
      itemsCount += c.items.length;
    });
    return {
      totalItems: itemsCount,
      totalCategories: data.categories.length,
    };
  }, [data]);

  // Shortlist operations
  const handleUpdateShortlistQty = (item: MenuItem, delta: number) => {
    setShortlist(prev => {
      const existing = prev[item.id];
      const newQty = (existing ? existing.qty : 0) + delta;
      const copy = { ...prev };
      if (newQty <= 0) {
        delete copy[item.id];
      } else {
        copy[item.id] = { item, qty: newQty };
      }
      return copy;
    });
  };

  const handleClearShortlist = () => {
    setShortlist({});
  };

  const shortlistCount = useMemo(() => {
    return Object.values(shortlist).reduce((acc, curr) => acc + curr.qty, 0);
  }, [shortlist]);

  // Admin API Handlers
  const handleUpdateItem = async (itemData: Partial<MenuItem> & { category_id: string }) => {
    try {
      const isEdit = Boolean(itemData.id);
      const url = isEdit ? `/api/items/${itemData.id}` : '/api/items';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Item update failed');
      }

      await fetchRestaurantData();
    } catch (error: any) {
      // Fallback local update if API not reached
      setData(prev => {
        const newCats = prev.categories.map(cat => ({
          ...cat,
          items: cat.items.map(i => i.id === itemData.id ? { ...i, ...itemData } : i)
        }));
        return { ...prev, categories: newCats };
      });
      throw error;
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Item deletion failed');
      }
      await fetchRestaurantData();
    } catch (error: any) {
      setData(prev => ({
        ...prev,
        categories: prev.categories.map(cat => ({
          ...cat,
          items: cat.items.filter(i => i.id !== itemId)
        }))
      }));
      throw error;
    }
  };

  const handleToggleAvailability = async (itemId: string, isAvailable: boolean) => {
    try {
      const res = await fetch(`/api/items/${itemId}/availability`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: isAvailable }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Availability toggle failed');
      }
      await fetchRestaurantData();
    } catch (error: any) {
      setData(prev => ({
        ...prev,
        categories: prev.categories.map(cat => ({
          ...cat,
          items: cat.items.map(i => i.id === itemId ? { ...i, is_available: isAvailable } : i)
        }))
      }));
      throw error;
    }
  };

  const handleSaveCategory = async (categoryData: { id?: string; name: string; slug?: string; sort_order: number }) => {
    const isEdit = Boolean(categoryData.id);
    const url = isEdit ? `/api/categories/${categoryData.id}` : '/api/categories';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Category update failed');
    }

    await fetchRestaurantData();
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const res = await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Category deletion failed');
    }
    await fetchRestaurantData();
  };

  const handleSaveSettings = async (newSettings: CafeSettings) => {
    const res = await fetch('/api/restaurant/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Settings update failed');
    }

    await fetchRestaurantData();
  };

  const handleResetMenu = async () => {
    const res = await fetch('/api/restaurant/reset', { method: 'POST' });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Reset failed');
    }
    await fetchRestaurantData();
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1F1A16] flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        settings={data.settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shortlistCount={shortlistCount}
        onOpenShortlist={() => setIsOrderModalOpen(true)}
      />

      {/* Main Body */}
      {activeTab === 'portfolio' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            settings={data.settings}
            totalItems={totalItems}
            totalCategories={totalCategories}
            onSearchSubmit={(q) => setMenuSearchQuery(q)}
          />

          {/* About & Speciality Story */}
          <Story />

          {/* Digital Menu Showcase */}
          <MenuShowcase
            key={menuSearchQuery}
            categories={data.categories}
            shortlist={shortlist}
            onUpdateQty={handleUpdateShortlistQty}
            onOpenShortlist={() => setIsOrderModalOpen(true)}
            initialSearchQuery={menuSearchQuery}
          />

          {/* Ambience & Culinary Highlights */}
          <AmbienceGallery />

          {/* Location, Timings & Delivery */}
          <LocationAndHours settings={data.settings} />

          {/* Footer */}
          <Footer
            settings={data.settings}
            onOpenAdmin={() => {
              setActiveTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Order Shortlist Enquiry Modal */}
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            shortlist={shortlist}
            onUpdateQty={handleUpdateShortlistQty}
            onClearShortlist={handleClearShortlist}
            settings={data.settings}
          />
        </main>
      ) : (
        <main className="flex-1">
          <AdminDashboard
            data={data}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onToggleAvailability={handleToggleAvailability}
            onSaveCategory={handleSaveCategory}
            onDeleteCategory={handleDeleteCategory}
            onSaveSettings={handleSaveSettings}
            onResetMenu={handleResetMenu}
            onExitAdmin={() => {
              setActiveTab('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

    </div>
  );
};

