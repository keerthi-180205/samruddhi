import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Category } from '../../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: { id?: string; name: string; slug?: string; sort_order: number }) => Promise<void>;
  editingCategory: Category | null;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingCategory,
}) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sortOrder, setSortOrder] = useState<number | ''>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setSlug(editingCategory.slug);
      setSortOrder(editingCategory.sort_order);
    } else {
      setName('');
      setSlug('');
      setSortOrder(1);
    }
    setError('');
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSave({
        ...(editingCategory ? { id: editingCategory.id } : {}),
        name: name.trim(),
        slug: slug.trim() || undefined,
        sort_order: sortOrder === '' ? 1 : Number(sortOrder),
      });
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-[#E8E2D5] rounded-3xl shadow-soft-lg overflow-hidden">
        
        <div className="p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FBF9F5]">
          <h3 className="text-lg font-bold text-[#1F1A16] font-display">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#786F66] hover:text-[#1F1A16] rounded-xl hover:bg-[#EAE4D7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1">Category Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Sizzling Starters"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1">Slug (URL friendly)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. sizzling-starters"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#5C544D] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
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
              {isSubmitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
