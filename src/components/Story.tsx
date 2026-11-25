import React from 'react';
import { Sparkles, UtensilsCrossed, Heart, Coffee, Zap } from 'lucide-react';

export const Story: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-20 lg:py-24 bg-[#F7F4EE] border-y border-[#E8E2D5] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[11px] sm:text-xs font-bold text-[#C88327] mb-3 sm:mb-4 shadow-soft-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Samruddhi Story</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-bold text-[#1F1A16] tracking-tight">
            Crafted with Passion, <br className="hidden sm:inline" />
            <span className="italic text-[#C88327]">Served with Warmth.</span>
          </h2>
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-[#5C544D] leading-relaxed max-w-xl mx-auto">
            Samruddhi Café was founded with a clear commitment: to provide food lovers in Hubballi with an inviting, cozy space where every bite and sip brings pure culinary delight at student-friendly prices.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft hover:shadow-soft-lg hover:border-[#C88327]/60 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C88327] mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1F1A16] font-heading group-hover:text-[#C88327] transition-colors">
              Crispy Bites & Momos
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5C544D] leading-relaxed">
              From crispy Chicken Spring Rolls to savory Peri Peri Momos and crunchy Potato Twisters, made hot to order.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft hover:shadow-soft-lg hover:border-[#C88327]/60 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#C88327] mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1F1A16] font-heading group-hover:text-[#C88327] transition-colors">
              Legendary Thick Shakes
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5C544D] leading-relaxed">
              Signature KitKat Mud, Mississippi Mud, Ferrero Rocher, and fresh fruit blends that are thick, creamy, and indulgent.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft hover:shadow-soft-lg hover:border-[#C88327]/60 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1F1A16] font-heading group-hover:text-[#C88327] transition-colors">
              Pure Cold-Pressed Health
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5C544D] leading-relaxed">
              Wholesome ABC & CAP juices with zero water, zero sugar, and zero ice, alongside natural whey protein shakes.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft hover:shadow-soft-lg hover:border-[#C88327]/60 transition-all hover:-translate-y-1 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-orange-700 mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#1F1A16] font-heading group-hover:text-[#C88327] transition-colors">
              Sizzlers & Faloodas
            </h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#5C544D] leading-relaxed">
              Hear the sizzle with our decadent Club Brownie Sizzlers and cool off with lavish Royal Faloodas and Triveni specials.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
