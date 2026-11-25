import React from 'react';
import { Coffee, ShieldCheck, Heart } from 'lucide-react';
import { CafeSettings } from '../types';

interface FooterProps {
  settings: CafeSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#1F1A16] text-[#D6CEC4] py-10 sm:py-14 border-t border-[#362E27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-[#362E27]">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D97706] to-[#B45309] flex items-center justify-center text-white font-extrabold shadow-soft shrink-0">
                <Coffee className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-display font-bold text-xl sm:text-2xl text-white">
                Samruddhi <span className="text-[#D97706] italic font-normal">Café</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#A89F95] max-w-md leading-relaxed">
              Hubballi's premier destination for sizzling hot brownies, signature thickshakes, crispy starters, juicy burgers, and cold-pressed pure juices.
            </p>

            <div className="text-[11px] sm:text-xs text-[#8C8278]">
              Prices listed in Indian Rupees (₹) • Vidyanagar, Hubballi
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="text-[#A89F95] hover:text-[#D97706] transition-colors">Home & Welcome</a>
              </li>
              <li>
                <a href="#about" className="text-[#A89F95] hover:text-[#D97706] transition-colors">Our Speciality Story</a>
              </li>
              <li>
                <a href="#menu" className="text-[#A89F95] hover:text-[#D97706] transition-colors">Digital Menu (100+ items)</a>
              </li>
              <li>
                <a href="#ambience" className="text-[#A89F95] hover:text-[#D97706] transition-colors">Café Delights</a>
              </li>
              <li>
                <a href="#location" className="text-[#A89F95] hover:text-[#D97706] transition-colors">Location & Timings</a>
              </li>
            </ul>
          </div>

          {/* Owner & Admin access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-3">Café Management</h4>
            <p className="text-xs text-[#A89F95] mb-3">
              Are you the café owner? Update prices, mark sold-out items, or add new dishes here.
            </p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#2E2721] hover:bg-[#3D342C] text-white text-xs font-bold border border-[#473D34] hover:border-[#D97706] transition-all min-h-[40px]"
            >
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span>Open Admin Dashboard</span>
            </button>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8278] gap-3">
          <div>
            © {new Date().getFullYear()} Samruddhi Café. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Hubballi Food Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
