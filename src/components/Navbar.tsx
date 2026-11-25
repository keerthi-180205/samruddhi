import React, { useState } from 'react';
import { Coffee, ShieldCheck, Phone, MessageSquare, ShoppingBag, Menu, X, Clock } from 'lucide-react';
import { CafeSettings } from '../types';

interface NavbarProps {
  settings: CafeSettings;
  activeTab: 'portfolio' | 'admin';
  setActiveTab: (tab: 'portfolio' | 'admin') => void;
  shortlistCount: number;
  onOpenShortlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeTab,
  setActiveTab,
  shortlistCount,
  onOpenShortlist,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveTab('portfolio');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E2D5] shadow-soft-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            onClick={() => setActiveTab('portfolio')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D97706] to-[#B45309] flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform shrink-0">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-bold text-lg sm:text-2xl tracking-tight text-[#1F1A16] group-hover:text-[#D97706] transition-colors truncate">
                  Samruddhi <span className="text-[#C88327] font-normal italic">Café</span>
                </span>
                {settings.is_open ? (
                  <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="hidden xs:inline">Open</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span className="hidden xs:inline">Closed</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-[#786F66] font-medium tracking-wide truncate max-w-[150px] sm:max-w-none">
                Hubballi • Shakes & Bites
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {activeTab === 'portfolio' ? (
              <>
                <button 
                  onClick={() => scrollToSection('hero')} 
                  className="text-sm font-semibold text-[#5C544D] hover:text-[#C88327] transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-sm font-semibold text-[#5C544D] hover:text-[#C88327] transition-colors"
                >
                  Our Story
                </button>
                <button 
                  onClick={() => scrollToSection('menu')} 
                  className="text-sm font-bold text-[#C88327] hover:underline underline-offset-8 transition-all"
                >
                  Digital Menu
                </button>
                <button 
                  onClick={() => scrollToSection('ambience')} 
                  className="text-sm font-semibold text-[#5C544D] hover:text-[#C88327] transition-colors"
                >
                  Specialties
                </button>
                <button 
                  onClick={() => scrollToSection('location')} 
                  className="text-sm font-semibold text-[#5C544D] hover:text-[#C88327] transition-colors"
                >
                  Location & Hours
                </button>
              </>
            ) : (
              <button 
                onClick={() => setActiveTab('portfolio')} 
                className="text-sm font-semibold text-[#C88327] hover:underline"
              >
                ← Back to Live Portfolio
              </button>
            )}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Shortlist Enquiry Button */}
            {activeTab === 'portfolio' && (
              <button
                onClick={onOpenShortlist}
                className="relative inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-[#F4EFE6] text-[#1F1A16] border border-[#E8E2D5] shadow-soft-sm transition-all hover:border-[#C88327] min-h-[38px]"
                title="View Shortlisted Items"
                aria-label="View Enquiry Tray"
              >
                <ShoppingBag className="w-4 h-4 text-[#C88327]" />
                <span className="hidden sm:inline text-xs font-bold">Enquiry Tray</span>
                {shortlistCount > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-[#C88327] text-white font-bold text-[11px] flex items-center justify-center animate-bounce">
                    {shortlistCount}
                  </span>
                ) : (
                  <span className="sm:hidden text-[11px] font-bold text-[#786F66]">Tray</span>
                )}
              </button>
            )}

            {/* Quick WhatsApp Action (Desktop) */}
            <a
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Samruddhi%20Caf%C3%A9,%20I'd%20like%20to%20know%20more%20about%20your%20menu!`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Admin Switcher */}
            <button
              onClick={() => setActiveTab(activeTab === 'admin' ? 'portfolio' : 'admin')}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                activeTab === 'admin'
                  ? 'bg-[#1F1A16] text-white shadow-soft'
                  : 'bg-[#F4EFE6] text-[#4A433D] hover:text-[#1F1A16] border border-[#E8E2D5] hover:border-[#C88327]'
              }`}
              title={activeTab === 'admin' ? 'Exit Admin Dashboard' : 'Open Admin Panel'}
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C88327]" />
              <span className="hidden xs:inline">{activeTab === 'admin' ? 'Exit Admin' : 'Admin'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white text-[#4A433D] hover:text-[#1F1A16] border border-[#E8E2D5] min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C88327]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E2D5] space-y-2.5 bg-[#FBF9F5] animate-fadeIn">
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-white rounded-2xl mb-2 border border-[#E8E2D5] shadow-soft-sm">
              <span className="text-xs text-[#786F66] flex items-center gap-1.5 font-medium truncate">
                <Clock className="w-3.5 h-3.5 text-[#C88327] shrink-0" /> {settings.opening_hours}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${settings.is_open ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                {settings.is_open ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <button 
              onClick={() => scrollToSection('hero')} 
              className="block w-full text-left px-4 py-3 text-sm font-bold text-[#1F1A16] hover:bg-white rounded-xl transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="block w-full text-left px-4 py-3 text-sm font-semibold text-[#5C544D] hover:bg-white rounded-xl transition-colors"
            >
              Our Story & Speciality
            </button>
            <button 
              onClick={() => scrollToSection('menu')} 
              className="block w-full text-left px-4 py-3 text-sm font-bold text-[#C88327] bg-white rounded-xl border border-[#E8E2D5] shadow-soft-sm transition-colors"
            >
              Explore Digital Menu (100+ items) →
            </button>
            <button 
              onClick={() => scrollToSection('ambience')} 
              className="block w-full text-left px-4 py-3 text-sm font-semibold text-[#5C544D] hover:bg-white rounded-xl transition-colors"
            >
              Café Vibe & Gallery
            </button>
            <button 
              onClick={() => scrollToSection('location')} 
              className="block w-full text-left px-4 py-3 text-sm font-semibold text-[#5C544D] hover:bg-white rounded-xl transition-colors"
            >
              Location, Hours & Delivery Zone
            </button>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-white text-[#1F1A16] text-xs font-bold border border-[#E8E2D5] shadow-soft-sm active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4 text-[#C88327]" /> Call Café
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-soft active:scale-95 transition-transform"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
