import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Bike, Navigation, Instagram } from 'lucide-react';
import { CafeSettings } from '../types';

interface LocationAndHoursProps {
  settings: CafeSettings;
}

export const LocationAndHours: React.FC<LocationAndHoursProps> = ({ settings }) => {
  return (
    <section id="location" className="py-12 sm:py-20 lg:py-24 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[11px] sm:text-xs font-bold text-[#C88327] mb-2.5 sm:mb-3 shadow-soft-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us or Order Delivery</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-bold text-[#1F1A16] tracking-tight">
            Location, Hours & <span className="italic text-[#C88327]">Delivery</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#5C544D]">
            Conveniently situated in Vidyanagar, Hubballi. Drop in for a quick bite or get doorstep delivery!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
          
          {/* Card 1: Timings & Status */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft flex flex-col justify-between hover:border-[#C88327]/60 transition-colors">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C88327] mb-4 sm:mb-6">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1F1A16] mb-1.5 sm:mb-2 font-display">Opening Hours</h3>
              <p className="text-xs sm:text-sm text-[#5C544D] leading-relaxed">
                Open 7 days a week for tea-time snacks, quick lunches, and late evening cravings.
              </p>

              <div className="mt-4 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5] space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#786F66] font-semibold">Daily Schedule:</span>
                  <span className="text-xs font-bold text-[#1F1A16]">{settings.opening_hours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#786F66] font-semibold">Live Status:</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    settings.is_open ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {settings.is_open ? 'Open Now' : 'Closed'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#786F66] font-semibold">Average Prep:</span>
                  <span className="text-xs font-bold text-[#C88327]">~{settings.avg_prep_minutes} mins</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#F2ECE1]">
              <div className="text-xs text-[#786F66] font-medium">
                Need to reserve a table or ask about group orders?
              </div>
              <a
                href={`tel:${settings.phone}`}
                className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-bold text-[#C88327] hover:underline inline-flex items-center gap-1.5 font-heading"
              >
                <Phone className="w-4 h-4" /> {settings.phone}
              </a>
            </div>
          </div>

          {/* Card 2: Delivery & Pickup Guidelines */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft flex flex-col justify-between hover:border-[#C88327]/60 transition-colors">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 mb-4 sm:mb-6">
                <Bike className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1F1A16] mb-1.5 sm:mb-2 font-display">Delivery Guidelines</h3>
              <p className="text-xs sm:text-sm text-[#5C544D] leading-relaxed">
                Fast doorstep delivery across Hubballi within our designated zone.
              </p>

              <div className="mt-4 sm:mt-6 space-y-2 text-xs text-[#4A433D]">
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5]">
                  <span className="text-[#786F66] font-semibold">Delivery Radius:</span>
                  <span className="font-bold text-[#1F1A16]">{settings.delivery_radius_km} km radius</span>
                </div>
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5]">
                  <span className="text-[#786F66] font-semibold">Standard Fee:</span>
                  <span className="font-bold text-[#C88327]">₹{settings.delivery_fee}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5]">
                  <span className="text-[#786F66] font-semibold">Free Delivery:</span>
                  <span className="font-bold text-emerald-700">Above ₹{settings.free_delivery_above}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5]">
                  <span className="text-[#786F66] font-semibold">Minimum Order:</span>
                  <span className="font-bold text-[#1F1A16]">₹{settings.min_order_value}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5]">
                  <span className="text-[#786F66] font-semibold">Cash on Delivery:</span>
                  <span className="font-bold text-emerald-700">{settings.cod_enabled ? 'Available' : 'Disabled'}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#F2ECE1]">
              <span className="text-[11px] text-[#8C8278] italic block">
                {settings.note}
              </span>
            </div>
          </div>

          {/* Card 3: Address & Directions */}
          <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft flex flex-col justify-between hover:border-[#C88327]/60 transition-colors">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C88327] mb-4 sm:mb-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1F1A16] mb-1.5 sm:mb-2 font-display">Café Address</h3>
              <p className="text-xs sm:text-sm text-[#1F1A16] font-semibold leading-relaxed mt-1 sm:mt-2">
                {settings.address}
              </p>

              <div className="mt-4 sm:mt-6 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5] space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100/70 flex items-center justify-center text-[#C88327] shrink-0">
                    <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#1F1A16]">Prime Landmark</div>
                    <div className="text-[#786F66]">Walking distance from BVB Campus Gate</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-pink-100/70 flex items-center justify-center text-pink-700 shrink-0">
                    <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-[#1F1A16]">Instagram Updates</div>
                    <div className="text-[#786F66]">{settings.instagram}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#F2ECE1] flex flex-col gap-2">
              <a
                href={settings.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl sm:rounded-2xl bg-[#C88327] text-white font-bold text-xs shadow-soft hover:bg-[#B06F1B] transition-colors min-h-[42px]"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl sm:rounded-2xl bg-white hover:bg-[#F4EFE6] text-emerald-800 font-bold text-xs border border-emerald-300 transition-colors min-h-[40px]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Chat with Café on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
