import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  shortlistQty: number;
  onUpdateQty: (item: MenuItem, delta: number) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  shortlistQty,
  onUpdateQty,
}) => {
  const isSoldOut = !item.is_available;

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-200 border ${
        isSoldOut
          ? 'bg-[#F9F7F3] border-[#E8E2D5] opacity-60'
          : shortlistQty > 0
          ? 'bg-[#FFFDF9] border-[#C88327] shadow-soft-lg ring-1 ring-[#C88327]/30'
          : 'bg-white border-[#E8E2D5] hover:border-[#C88327]/70 hover:shadow-soft-lg'
      }`}
    >
      <div>
        {/* Top bar: Food Type Indicator & Pieces/PriceCheck Badges */}
        <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-2.5">
          <div className="flex items-center gap-1.5 min-w-0">
            {/* Dietary Symbol (Veg / Non-Veg / Egg) */}
            {item.food_type === 'veg' && (
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border-2 border-emerald-600 bg-emerald-50 flex items-center justify-center p-[2px] shrink-0" title="Vegetarian">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600"></span>
              </span>
            )}
            {item.food_type === 'non_veg' && (
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border-2 border-rose-600 bg-rose-50 flex items-center justify-center p-[2px] shrink-0" title="Non-Vegetarian">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-600"></span>
              </span>
            )}
            {item.food_type === 'egg' && (
              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border-2 border-amber-600 bg-amber-50 flex items-center justify-center p-[2px] shrink-0" title="Contains Egg">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-600"></span>
              </span>
            )}

            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#786F66] truncate">
              {item.food_type === 'non_veg' ? 'Non-Veg' : item.food_type === 'egg' ? 'Egg' : 'Veg'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {item.pieces && (
              <span className="px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#5C544D] text-[10px] sm:text-[11px] font-semibold border border-[#E5DEC9]">
                {item.pieces} Pcs
              </span>
            )}

            {item.needs_price_check && (
              <span className="px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[9px] sm:text-[10px] font-bold border border-amber-200" title="Price may vary, confirm at counter">
                Verify
              </span>
            )}
          </div>
        </div>

        {/* Item Title */}
        <h4 className="text-sm sm:text-base font-bold text-[#1F1A16] group-hover:text-[#C88327] transition-colors leading-snug">
          {item.name}
        </h4>
      </div>

      {/* Price & Action Button */}
      <div className="mt-3.5 pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
        <div>
          <span className="text-lg sm:text-xl font-bold font-heading text-[#C88327]">
            ₹{item.price}
          </span>
          {isSoldOut && (
            <span className="block text-[10px] sm:text-[11px] text-rose-600 font-bold mt-0.5">
              Sold Out
            </span>
          )}
        </div>

        {/* Action button with min 38px touch target for mobile */}
        {!isSoldOut ? (
          <div>
            {shortlistQty === 0 ? (
              <button
                type="button"
                onClick={() => onUpdateQty(item, 1)}
                className="inline-flex items-center justify-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#F4EFE6] hover:bg-[#C88327] text-[#1F1A16] hover:text-white text-xs font-bold transition-all border border-[#E5DEC9] hover:border-[#C88327] shadow-soft-sm active:scale-95 min-h-[34px] min-w-[62px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 rounded-xl bg-[#C88327] text-white font-bold text-xs shadow-soft min-h-[34px]">
                <button
                  type="button"
                  onClick={() => onUpdateQty(item, -1)}
                  className="p-1 hover:bg-black/15 rounded active:scale-90"
                  title="Decrease"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="min-w-4 text-center font-heading font-extrabold text-xs sm:text-sm">{shortlistQty}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQty(item, 1)}
                  className="p-1 hover:bg-black/15 rounded active:scale-90"
                  title="Increase"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="text-[11px] sm:text-xs text-[#8C8278] italic font-medium">Unavailable</span>
        )}
      </div>
    </div>
  );
};
