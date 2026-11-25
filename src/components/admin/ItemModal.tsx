import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { MenuItem, Category, FoodType } from '../../types';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Partial<MenuItem> & { category_id: string }) => Promise<void>;
  categories: Category[];
  editingItem: { item: MenuItem; categoryId: string } | null;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categories,
  editingItem,
}) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState<number | ''>(80);
  const [foodType, setFoodType] = useState<FoodType>('veg');
  const [pieces, setPieces] = useState<number | ''>('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [sortOrder, setSortOrder] = useState<number | ''>(1);
  const [needsPriceCheck, setNeedsPriceCheck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.item.name);
      setCategoryId(editingItem.categoryId);
      setPrice(editingItem.item.price);
      setFoodType(editingItem.item.food_type);
      setPieces(editingItem.item.pieces !== undefined ? editingItem.item.pieces : '');
      setIsAvailable(editingItem.item.is_available);
      setSortOrder(editingItem.item.sort_order);
      setNeedsPriceCheck(Boolean(editingItem.item.needs_price_check));
    } else {
      setName('');
      setCategoryId(categories[0]?.id || '');
      setPrice(80);
      setFoodType('veg');
      setPieces('');
      setIsAvailable(true);
      setSortOrder(1);
      setNeedsPriceCheck(false);
    }
    setError('');
  }, [editingItem, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Item name is required');
      return;
    }
    if (price === '' || isNaN(Number(price)) || Number(price) < 0) {
      setError('Please provide a valid price');
      return;
    }
    if (!categoryId) {
      setError('Please select a category');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSave({
        ...(editingItem ? { id: editingItem.item.id } : {}),
        name: name.trim(),
        price: Number(price),
        food_type: foodType,
        pieces: pieces === '' ? undefined : Number(pieces),
        is_available: isAvailable,
        sort_order: sortOrder === '' ? 1 : Number(sortOrder),
        needs_price_check: needsPriceCheck,
        category_id: categoryId,
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-[#E8E2D5] rounded-3xl shadow-soft-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FBF9F5]">
          <h3 className="text-lg font-bold text-[#1F1A16] font-display">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#786F66] hover:text-[#1F1A16] rounded-xl hover:bg-[#EAE4D7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Item Name */}
          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1">Item Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chicken Peri Peri Momos"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1">Category *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            >
              {categories.map((c) => (
                <option key={c.id || c.slug} value={c.id || c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Pieces Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#4A433D] mb-1">Price in ₹ (INR) *</label>
              <input
                type="number"
                min="0"
                step="5"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 80"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4A433D] mb-1">Piece Count (Optional)</label>
              <input
                type="number"
                min="1"
                value={pieces}
                onChange={(e) => setPieces(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g. 4, 6, 8 pcs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327] focus:bg-white"
              />
            </div>
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Dietary Food Type *</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFoodType('veg')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  foodType === 'veg'
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800 shadow-soft-sm'
                    : 'bg-[#FBF9F5] border-[#E8E2D5] text-[#5C544D] hover:bg-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Veg</span>
              </button>

              <button
                type="button"
                onClick={() => setFoodType('non_veg')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  foodType === 'non_veg'
                    ? 'bg-rose-100 border-rose-500 text-rose-800 shadow-soft-sm'
                    : 'bg-[#FBF9F5] border-[#E8E2D5] text-[#5C544D] hover:bg-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                <span>Non-Veg</span>
              </button>

              <button
                type="button"
                onClick={() => setFoodType('egg')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  foodType === 'egg'
                    ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-soft-sm'
                    : 'bg-[#FBF9F5] border-[#E8E2D5] text-[#5C544D] hover:bg-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span>Egg</span>
              </button>
            </div>
          </div>

          {/* Availability and Sort Order */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#4A433D] mb-1">Availability Status</label>
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  isAvailable
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border-rose-300 text-rose-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                <span>{isAvailable ? 'In Stock (Available)' : 'Sold Out'}</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A433D] mb-1">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
              />
            </div>
          </div>

          {/* Needs Price Check */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={needsPriceCheck}
                onChange={(e) => setNeedsPriceCheck(e.target.checked)}
                className="w-4 h-4 rounded border-[#E8E2D5] text-[#C88327] focus:ring-0"
              />
              <span className="text-xs font-semibold text-[#5C544D]">
                Mark for price check (flagged for counter verification)
              </span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E8E2D5] flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#F4EFE6] text-[#4A433D] hover:bg-[#EAE4D7] text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-[#C88327] hover:bg-[#B06F1B] text-white text-xs font-bold shadow-soft transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
