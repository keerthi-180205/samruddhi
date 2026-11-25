import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, MessageSquare, Phone, Bike, Store, AlertCircle } from 'lucide-react';
import { MenuItem, CafeSettings } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortlist: Record<string, { item: MenuItem; qty: number }>;
  onUpdateQty: (item: MenuItem, delta: number) => void;
  onClearShortlist: () => void;
  settings: CafeSettings;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  shortlist,
  onUpdateQty,
  onClearShortlist,
  settings,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [addressOrTable, setAddressOrTable] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const entries = Object.values(shortlist);
  const subtotal = entries.reduce((acc, { item, qty }) => acc + item.price * qty, 0);

  // Fee computations
  const isFreeDelivery = subtotal >= settings.free_delivery_above;
  const deliveryFee = orderType === 'delivery' ? (isFreeDelivery ? 0 : settings.delivery_fee) : 0;
  const packingCharge = settings.packing_charge;
  const tax = Math.round((subtotal * settings.tax_percent) / 100);
  const estimatedTotal = subtotal + (orderType === 'delivery' ? deliveryFee : 0) + packingCharge + tax;

  const handleSendWhatsApp = () => {
    if (entries.length === 0) return;

    let text = `*New Order Enquiry - Samruddhi Café* ☕\n`;
    text += `--------------------------------\n`;
    entries.forEach(({ item, qty }) => {
      text += `• ${qty}x ${item.name} (₹${item.price * qty})\n`;
    });
    text += `--------------------------------\n`;
    text += `*Order Type:* ${orderType === 'delivery' ? '🛵 Home Delivery' : '🥡 Takeaway / Dine-in'}\n`;
    text += `*Subtotal:* ₹${subtotal}\n`;
    text += `*Packing Charge:* ₹${packingCharge}\n`;
    if (orderType === 'delivery') {
      text += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n`;
    }
    text += `*Tax (5%):* ₹${tax}\n`;
    text += `*Estimated Total:* *₹${estimatedTotal}*\n`;
    
    if (customerName.trim()) {
      text += `*Customer:* ${customerName.trim()}\n`;
    }
    if (addressOrTable.trim()) {
      text += `*${orderType === 'delivery' ? 'Address' : 'Table / Location'}:* ${addressOrTable.trim()}\n`;
    }
    if (note.trim()) {
      text += `*Special Note:* ${note.trim()}\n`;
    }

    text += `\nPlease confirm availability and payment mode (COD / UPI). Thank you!`;

    const encoded = encodeURIComponent(text);
    const cleanPhone = settings.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FBF9F5] border border-[#E8E2D5] rounded-t-3xl sm:rounded-3xl shadow-soft-lg overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D5] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#D97706] to-[#B45309] text-white font-extrabold flex items-center justify-center shadow-soft-sm shrink-0">
              ☕
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1F1A16] font-display">Order / WhatsApp Enquiry</h3>
              <p className="text-[11px] sm:text-xs text-[#786F66]">Directly connect with Samruddhi Café counter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-[#786F66] hover:text-[#1F1A16] rounded-xl hover:bg-[#F4EFE6] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          {entries.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-[#E8E2D5] p-6">
              <p className="text-[#5C544D] font-medium text-sm">Your shortlist is currently empty.</p>
              <p className="text-xs text-[#8C8278] mt-1">Browse the digital menu and tap "+ Add" on your favorite dishes.</p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#C88327] hover:bg-[#B06F1B] text-white font-bold text-xs shadow-soft"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Selector */}
              <div className="grid grid-cols-2 gap-2 bg-[#EFECE6] p-1 rounded-2xl border border-[#E0D9CB]">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                    orderType === 'delivery'
                      ? 'bg-white text-[#1F1A16] shadow-soft-sm'
                      : 'text-[#5C544D] hover:text-[#1F1A16]'
                  }`}
                >
                  <Bike className="w-4 h-4 text-[#C88327]" />
                  <span>Delivery ({settings.delivery_radius_km}km)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                    orderType === 'takeaway'
                      ? 'bg-white text-[#1F1A16] shadow-soft-sm'
                      : 'text-[#5C544D] hover:text-[#1F1A16]'
                  }`}
                >
                  <Store className="w-4 h-4 text-[#C88327]" />
                  <span>Takeaway / Dine-in</span>
                </button>
              </div>

              {/* Shortlisted Items List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#786F66] font-semibold px-0.5">
                  <span>Selected Items ({entries.length})</span>
                  <button
                    onClick={onClearShortlist}
                    className="text-rose-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>

                <div className="space-y-2 max-h-44 sm:max-h-48 overflow-y-auto pr-0.5">
                  {entries.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E8E2D5] shadow-soft-sm"
                    >
                      <div className="min-w-0 flex-1 mr-2 sm:mr-3">
                        <div className="text-xs sm:text-sm font-bold text-[#1F1A16] truncate">{item.name}</div>
                        <div className="text-[11px] sm:text-xs text-[#C88327] font-semibold">₹{item.price} each</div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 bg-[#F4EFE6] px-2 py-1 rounded-xl border border-[#E5DEC9]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item, -1)}
                            className="text-[#4A433D] hover:text-black p-0.5 active:scale-90"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <span className="text-xs font-bold text-[#1F1A16] min-w-3 text-center">{qty}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item, 1)}
                            className="text-[#4A433D] hover:text-black p-0.5 active:scale-90"
                            aria-label="Increase"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-[#1F1A16] font-heading min-w-12 text-right">
                          ₹{item.price * qty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-[#E8E2D5]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-[#4A433D] mb-1">Your Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E8E2D5] text-xs sm:text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-[#4A433D] mb-1">
                      {orderType === 'delivery' ? 'Delivery Address / Landmark' : 'Table No. / Note'}
                    </label>
                    <input
                      type="text"
                      value={addressOrTable}
                      onChange={(e) => setAddressOrTable(e.target.value)}
                      placeholder={orderType === 'delivery' ? 'e.g. Vidyanagar, Hubballi' : 'e.g. Table 4 or Takeaway'}
                      className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E8E2D5] text-xs sm:text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-bold text-[#4A433D] mb-1">Cooking Note / Preferences (Optional)</label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. Extra spicy momos, less sugar in shake"
                    className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-[#E8E2D5] text-xs sm:text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327]"
                  />
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-soft-sm space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C544D]">
                  <span>Items Subtotal</span>
                  <span className="text-[#1F1A16] font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#5C544D]">
                  <span>Packing Charge</span>
                  <span className="text-[#1F1A16] font-bold">₹{packingCharge}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#5C544D]">
                    <span>
                      Delivery Fee {isFreeDelivery && <span className="text-emerald-600 font-bold">(Free &gt; ₹{settings.free_delivery_above})</span>}
                    </span>
                    <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : 'text-[#1F1A16] font-bold'}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[#5C544D]">
                  <span>Taxes (5%)</span>
                  <span className="text-[#1F1A16] font-bold">₹{tax}</span>
                </div>
                <div className="pt-2 border-t border-[#F2ECE1] flex justify-between text-sm font-bold text-[#1F1A16]">
                  <span>Estimated Total</span>
                  <span className="text-[#C88327] text-base font-heading font-extrabold">₹{estimatedTotal}</span>
                </div>
              </div>

              {/* Note / disclaimer */}
              <div className="flex items-start gap-2 text-[10px] sm:text-[11px] text-[#786F66] bg-amber-50/80 p-2.5 sm:p-3 rounded-2xl border border-amber-200">
                <AlertCircle className="w-4 h-4 text-[#C88327] shrink-0 mt-0.5" />
                <span>
                  This order inquiry is transmitted directly via WhatsApp to the café counter. Payment can be settled via Cash on Delivery or UPI upon confirmation.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions (Sticky on Mobile) */}
        {entries.length > 0 && (
          <div className="p-3.5 sm:p-4 border-t border-[#E8E2D5] bg-white flex flex-col sm:flex-row gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={handleSendWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm shadow-soft transition-all active:scale-[0.98] min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Order on WhatsApp</span>
            </button>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-2xl bg-[#F4EFE6] hover:bg-[#EAE4D7] text-[#1F1A16] font-bold text-xs sm:text-sm border border-[#E8E2D5] transition-colors min-h-[40px]"
            >
              <Phone className="w-4 h-4 text-[#C88327]" />
              <span>Call Café</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
