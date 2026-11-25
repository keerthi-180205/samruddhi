import React, { useState } from 'react';
import { Save, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { CafeSettings } from '../../types';

interface SettingsTabProps {
  settings: CafeSettings;
  onSaveSettings: (newSettings: CafeSettings) => Promise<void>;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<CafeSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof CafeSettings, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaveSuccess(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError('');
      await onSaveSettings(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || 'Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-center gap-2">
          <Check className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>Café settings updated and saved to persistent database successfully!</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Operational Status Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E2D5] shadow-soft">
        <h3 className="text-lg font-bold text-[#1F1A16] mb-4 font-display">Store Availability & Channels</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-[#1F1A16]">Café Open</div>
              <div className="text-xs text-[#786F66] mt-0.5">Toggle accepting orders</div>
            </div>
            <button
              type="button"
              onClick={() => handleChange('is_open', !formData.is_open)}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${formData.is_open ? 'bg-emerald-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${formData.is_open ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-[#1F1A16]">Home Delivery</div>
              <div className="text-xs text-[#786F66] mt-0.5">Doorstep delivery</div>
            </div>
            <button
              type="button"
              onClick={() => handleChange('delivery_enabled', !formData.delivery_enabled)}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${formData.delivery_enabled ? 'bg-emerald-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${formData.delivery_enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5] flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-[#1F1A16]">Takeaway / Pickup</div>
              <div className="text-xs text-[#786F66] mt-0.5">Counter pickups</div>
            </div>
            <button
              type="button"
              onClick={() => handleChange('pickup_enabled', !formData.pickup_enabled)}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${formData.pickup_enabled ? 'bg-emerald-600' : 'bg-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${formData.pickup_enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Delivery & Pricing Rules */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E2D5] shadow-soft">
        <h3 className="text-lg font-bold text-[#1F1A16] mb-4 font-display">Charges, Thresholds & Prep Time</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Delivery Fee (₹)</label>
            <input
              type="number"
              min="0"
              value={formData.delivery_fee}
              onChange={(e) => handleChange('delivery_fee', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Free Delivery Above (₹)</label>
            <input
              type="number"
              min="0"
              value={formData.free_delivery_above}
              onChange={(e) => handleChange('free_delivery_above', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Delivery Radius (km)</label>
            <input
              type="number"
              min="1"
              value={formData.delivery_radius_km}
              onChange={(e) => handleChange('delivery_radius_km', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Minimum Order Value (₹)</label>
            <input
              type="number"
              min="0"
              value={formData.min_order_value}
              onChange={(e) => handleChange('min_order_value', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Packing Charge (₹)</label>
            <input
              type="number"
              min="0"
              value={formData.packing_charge}
              onChange={(e) => handleChange('packing_charge', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Tax Percent (%)</label>
            <input
              type="number"
              min="0"
              max="28"
              value={formData.tax_percent}
              onChange={(e) => handleChange('tax_percent', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Avg Prep Time (Minutes)</label>
            <input
              type="number"
              min="5"
              value={formData.avg_prep_minutes}
              onChange={(e) => handleChange('avg_prep_minutes', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.cod_enabled}
                onChange={(e) => handleChange('cod_enabled', e.target.checked)}
                className="w-4 h-4 rounded border-[#E8E2D5] text-[#C88327] focus:ring-0"
              />
              <span className="text-xs font-bold text-[#1F1A16]">
                Cash On Delivery (COD) Enabled
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Contact & Location Details */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E2D5] shadow-soft space-y-4">
        <h3 className="text-lg font-bold text-[#1F1A16] mb-2 font-display">Café Contact & Address</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Customer Care Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A433D] mb-1.5">WhatsApp Order Number</label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Daily Opening Hours Text</label>
          <input
            type="text"
            value={formData.opening_hours}
            onChange={(e) => handleChange('opening_hours', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Full Physical Address</label>
          <textarea
            rows={2}
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-sm text-[#1F1A16] focus:outline-none focus:border-[#C88327] focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A433D] mb-1.5">Internal Note</label>
          <input
            type="text"
            value={formData.note}
            onChange={(e) => handleChange('note', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-xs text-[#786F66] focus:outline-none focus:border-[#C88327] focus:bg-white"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#C88327] hover:bg-[#B06F1B] text-white font-heading font-bold text-sm shadow-soft transition-all disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  );
};
