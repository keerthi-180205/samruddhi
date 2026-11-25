import React, { useState } from 'react';
import { Sparkles, ArrowRight, Clock, MapPin, Bike, Search, MessageSquare, Star, Utensils } from 'lucide-react';
import { CafeSettings } from '../types';

interface HeroProps {
  settings: CafeSettings;
  totalItems: number;
  totalCategories: number;
  onSearchSubmit?: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, totalItems, totalCategories, onSearchSubmit }) => {
  const [heroSearch, setHeroSearch] = useState('');

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLocation = () => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      scrollToMenu();
      if (onSearchSubmit && heroSearch) {
        onSearchSubmit(heroSearch);
      }
    }
  };

  const executeSearch = () => {
    scrollToMenu();
    if (onSearchSubmit && heroSearch) {
      onSearchSubmit(heroSearch);
    }
  };

  return (
    <section id="hero" className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 lg:pt-10 lg:pb-24 bg-[#FBF9F5] overflow-hidden">
      
      {/* Subtle warm ambient lighting */}
      <div className="absolute top-10 left-1/3 -translate-x-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[350px] bg-amber-100/40 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute top-40 right-5 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 bg-orange-100/30 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==================== BENTO HERO GRID ==================== */}
        <div className="grid grid-cols-12 gap-3.5 sm:gap-5 lg:gap-6">
          
          {/* BENTO CARD 1: MAIN EDITORIAL HOOK (7 COLS ON DESKTOP) */}
          <div className="col-span-12 lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] p-5 sm:p-8 lg:p-10 shadow-soft flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-50 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#F4EFE6] border border-[#E5DEC9] text-[11px] sm:text-xs font-bold text-[#C88327] mb-3.5 sm:mb-5">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C88327] shrink-0" />
                <span>Hubballi's Celebrated Artisan Café</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#1F1A16] tracking-tight leading-[1.18] sm:leading-[1.12]">
                The Art of Sizzling Bites & <br className="hidden xs:inline" />
                <span className="italic text-[#C88327] font-normal">Crafted Thickshakes.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-3 sm:mt-5 text-xs sm:text-base text-[#5C544D] leading-relaxed max-w-xl font-normal">
                Indulge in freshly prepared smoking hot sizzling brownies, Mississippi Mud thickshakes, crispy peri-peri momos, and mega loaded burgers in a warm, welcoming space.
              </p>

              {/* Quick Hero Search Input */}
              <div className="mt-5 sm:mt-8 max-w-md relative">
                <Search className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  onKeyDown={handleSearchKeyPress}
                  placeholder="Craving momos, sizzling brownie, shake?..."
                  className="w-full pl-10 pr-24 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#FBF9F5] border border-[#E8E2D5] text-xs sm:text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327] focus:bg-white transition-all shadow-soft-sm"
                />
                <button
                  type="button"
                  onClick={executeSearch}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#C88327] hover:bg-[#B06F1B] text-white text-[11px] sm:text-xs font-bold transition-colors shadow-soft-sm active:scale-95"
                >
                  Find Dish
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#F2ECE1] flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-3 relative z-10">
              <button
                onClick={scrollToMenu}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#C88327] hover:bg-[#B06F1B] text-white font-heading font-bold text-xs sm:text-sm shadow-soft transition-all active:scale-[0.98]"
              >
                <span>Explore Full Menu ({totalItems}+ Dishes)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Samruddhi%20Caf%C3%A9,%20I'd%20like%20to%20place%20an%20order!`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#F4EFE6] hover:bg-[#EAE4D7] text-[#1F1A16] font-heading font-bold text-xs sm:text-sm border border-[#E8E2D5] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* BENTO CARD 2: APPETITE BUILDER (5 COLS - HIGH RES PHOTOGRAPHY HERO CARD) */}
          <div className="col-span-12 lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft overflow-hidden relative group min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] lg:min-h-full flex flex-col justify-between">
            {/* Background High-Res Image with Dark Vignette */}
            <img
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
              alt="Sizzling Brownie with Ice Cream at Samruddhi Cafe"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30"></div>

            {/* Top Floating Badge on Image */}
            <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold">
                <Sparkles className="w-3 h-3 text-[#FFC727]" />
                Chef's Signature
              </span>

              <div className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#1F1A16] text-[10px] sm:text-xs font-bold shadow-soft-sm">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#C88327] text-[#C88327]" />
                <span>4.9 / 5</span>
              </div>
            </div>

            {/* Bottom Caption on Image */}
            <div className="relative z-10 p-4 sm:p-7 text-white">
              <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-amber-300 mb-0.5 sm:mb-1">
                Fresh From The Kitchen
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display leading-snug">
                Club Brownie Sizzler
              </h3>
              <p className="text-xs text-gray-200 mt-1 line-clamp-2 font-normal">
                Smoking hot chocolate brownie topped with rich vanilla ice cream & warm chocolate fudge.
              </p>
              
              <div className="mt-3 sm:mt-4 flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold font-heading text-[#FFC727]">
                  ₹120
                </span>
                <button
                  onClick={scrollToMenu}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-white/90 hover:bg-white text-black text-xs font-bold backdrop-blur-md transition-colors"
                >
                  View in Menu
                </button>
              </div>
            </div>
          </div>

          {/* BENTO CARD 3: SPEED & PREP (4 COLS) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] p-5 sm:p-6 shadow-soft hover:border-[#C88327]/60 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C88327] mb-3 sm:mb-4">
              <Clock className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm sm:text-base font-bold text-[#1F1A16] font-heading">
                Freshly Handcrafted
              </h4>
              <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Kitchen
              </span>
            </div>
            <p className="text-xs text-[#5C544D] leading-relaxed">
              Every burger, spring roll, momo and thickshake is prepared fresh to order in approximately <strong>~{settings.avg_prep_minutes} minutes</strong>.
            </p>
          </div>

          {/* BENTO CARD 4: DELIVERY & RADIUS (4 COLS) */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] p-5 sm:p-6 shadow-soft hover:border-[#C88327]/60 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 mb-3 sm:mb-4">
              <Bike className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm sm:text-base font-bold text-[#1F1A16] font-heading">
                Doorstep Delivery
              </h4>
              <span className="text-[10px] sm:text-xs font-bold text-[#C88327] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                ₹{settings.delivery_fee} Fee
              </span>
            </div>
            <p className="text-xs text-[#5C544D] leading-relaxed">
              Serving a <strong>{settings.delivery_radius_km} km radius</strong> across Hubballi. Free delivery on orders above ₹{settings.free_delivery_above}. COD available!
            </p>
          </div>

          {/* BENTO CARD 5: RICH DIVERSITY & STUDENT LOVED (4 COLS) */}
          <div className="col-span-12 lg:col-span-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] p-5 sm:p-6 shadow-soft hover:border-[#C88327]/60 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-700 mb-3 sm:mb-4">
              <Utensils className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm sm:text-base font-bold text-[#1F1A16] font-heading">
                {totalCategories} Rich Categories
              </h4>
              <span className="text-[10px] sm:text-xs font-bold text-[#1F1A16] bg-[#F4EFE6] px-2 py-0.5 rounded-full border border-[#E5DEC9]">
                {totalItems}+ Dishes
              </span>
            </div>
            <p className="text-xs text-[#5C544D] leading-relaxed">
              From thick Mud Shakes, Smoothies, and Protein to Burgers, French Fries, Maggies, Faloodas, and No-Ice pure cold juices.
            </p>
          </div>

        </div>

      </div>

      {/* ==================== AWWWARDS INFINITE MARQUEE TICKER ==================== */}
      <div className="mt-8 sm:mt-14 py-3 sm:py-4 bg-[#1F1A16] text-[#FBF9F5] overflow-hidden whitespace-nowrap shadow-soft-sm">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 text-[11px] sm:text-xs md:text-sm font-heading font-bold uppercase tracking-widest">
          <span>🍫 Smoking Hot Sizzling Brownies</span>
          <span className="text-[#C88327]">•</span>
          <span>🥟 Peri Peri Momos</span>
          <span className="text-[#C88327]">•</span>
          <span>🥤 Mississippi & KitKat Mud Shakes</span>
          <span className="text-[#C88327]">•</span>
          <span>🍔 Gourmet Mega Burgers</span>
          <span className="text-[#C88327]">•</span>
          <span>🍗 Crispy Chicken Spring Rolls</span>
          <span className="text-[#C88327]">•</span>
          <span>🥕 100% Cold-Pressed Juices (No Ice No Sugar)</span>
          <span className="text-[#C88327]">•</span>
          <span>🍧 Royal & Kulfi Falooda</span>
          <span className="text-[#C88327]">•</span>
          <span>☕ Ferro & Mud Cold Coffee</span>
          <span className="text-[#C88327]">•</span>
          <span>🍟 Chilli Cheese French Fries</span>
          <span className="text-[#C88327]">•</span>
          {/* Repeat for seamless loop */}
          <span>🍫 Smoking Hot Sizzling Brownies</span>
          <span className="text-[#C88327]">•</span>
          <span>🥟 Peri Peri Momos</span>
          <span className="text-[#C88327]">•</span>
          <span>🥤 Mississippi & KitKat Mud Shakes</span>
          <span className="text-[#C88327]">•</span>
          <span>🍔 Gourmet Mega Burgers</span>
          <span className="text-[#C88327]">•</span>
          <span>🍗 Crispy Chicken Spring Rolls</span>
          <span className="text-[#C88327]">•</span>
          <span>🥕 100% Cold-Pressed Juices (No Ice No Sugar)</span>
          <span className="text-[#C88327]">•</span>
          <span>🍧 Royal & Kulfi Falooda</span>
          <span className="text-[#C88327]">•</span>
        </div>
      </div>

    </section>
  );
};
