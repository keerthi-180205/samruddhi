import React, { useState, useMemo } from 'react';
import { Search, Sparkles, X, ChevronRight, ShoppingBag } from 'lucide-react';
import { Category, MenuItem, FoodType } from '../types';
import { MenuItemCard } from './MenuItemCard';

interface MenuShowcaseProps {
  categories: Category[];
  shortlist: Record<string, { item: MenuItem; qty: number }>;
  onUpdateQty: (item: MenuItem, delta: number) => void;
  onOpenShortlist: () => void;
  initialSearchQuery?: string;
}

// Category visual photo mapping
const categoryImages: Record<string, { img: string; desc: string }> = {
  'samruddhi-special': {
    img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    desc: 'Signature chicken & paneer spring rolls, peri-peri momos, and crispy potato twisters.'
  },
  'burger': {
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    desc: 'Juicy handcrafted patties with melted cheese, fresh lettuce, and toasted sesame buns.'
  },
  'sandwich': {
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    desc: 'Golden toasted club sandwiches, paneer specials, and cheese-loaded bites.'
  },
  'rolls': {
    img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    desc: 'Flaky warm flatbreads stuffed with seasoned veggies, egg, or spiced chicken.'
  },
  'french-fries-starters': {
    img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    desc: 'Hot golden French fries, chilli cheese fries, and crispy popcorn bites.'
  },
  'maggie-bread-omelette': {
    img: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80',
    desc: 'Comforting bowls of cheesy maggie noodles and fluffy spiced bread omelettes.'
  },
  'bun-butter-jam': {
    img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    desc: 'Classic soft buns lathered with rich cream butter, jam, or sweet gulkand.'
  },
  'milk-shake': {
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    desc: 'Fresh fruit and exotic milkshakes blended thick and served chilled.'
  },
  'ice-cream-shake': {
    img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    desc: 'Creamy double-scoop shakes with rich ice cream infusions.'
  },
  'chocolate-shake': {
    img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
    desc: 'Intense dark chocolate, Ferrero Rocher, and Nutella shakes.'
  },
  'special-shake': {
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    desc: 'Famous Mississippi Mud, KitKat Mud, and Oreo mud indulgences.'
  },
  'dry-fruit-shake': {
    img: 'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=800&q=80',
    desc: 'Power-packed badam, anjeer, dates, and mixed dry fruit shakes.'
  },
  'smoothies': {
    img: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
    desc: 'Velvety smooth mango, strawberry, and banana fruit blends.'
  },
  'protein': {
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    desc: 'Natural whey protein shakes engineered for active fitness routines.'
  },
  'coffee': {
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    desc: 'Iced cold coffee, chocolate mud coffee, and rich ferro brews.'
  },
  'lassi': {
    img: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=800&q=80',
    desc: 'Traditional sweet lassi, mango, rose, and dry fruit thick lassis.'
  },
  'fresh-juice': {
    img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80',
    desc: 'Crisp, refreshing seasonal juices squeezed fresh to order.'
  },
  'no-ice-no-sugar-no-water': {
    img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    desc: '100% pure cold-pressed ABC & CAP juices with zero water or sugar.'
  },
  'lemon': {
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    desc: 'Zesty lemon coolers, jaljeera soda, and mint lemon refresher drinks.'
  },
  'mojitos': {
    img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    desc: 'Crushed mint, sparkling fizz, passion fruit, and blue curacao mocktails.'
  },
  'ice-creams': {
    img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    desc: 'Fruit salads with ice cream, chocolate fudge, and legendary Gadbad sundaes.'
  },
  'sizzling-brownie': {
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    desc: 'Smoking hot brownies served with vanilla ice cream and chocolate drizzle.'
  },
  'triveni-special': {
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    desc: 'Exclusive Triveni ice cream served with warm gulab jamoon.'
  },
  'falooda': {
    img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80',
    desc: 'Royal, Kesar, and Kulfi Faloodas loaded with basil seeds, vermicelli & ice cream.'
  }
};

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({
  categories,
  shortlist,
  onUpdateQty,
  onOpenShortlist,
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedFoodType, setSelectedFoodType] = useState<FoodType | 'all'>('all');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');

  // Compute total shortlisted items & value
  const { totalShortlistCount, totalShortlistAmount } = useMemo(() => {
    let count = 0;
    let amount = 0;
    Object.values(shortlist).forEach(({ item, qty }) => {
      count += qty;
      amount += item.price * qty;
    });
    return { totalShortlistCount: count, totalShortlistAmount: amount };
  }, [shortlist]);

  // Filter categories and items
  const filteredCategories = useMemo(() => {
    return categories
      .map(category => {
        if (selectedCategorySlug !== 'all' && category.slug !== selectedCategorySlug) {
          return null;
        }

        const filteredItems = category.items.filter(item => {
          if (selectedFoodType !== 'all' && item.food_type !== selectedFoodType) {
            return false;
          }

          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            const matchesName = item.name.toLowerCase().includes(q);
            const matchesCat = category.name.toLowerCase().includes(q);
            if (!matchesName && !matchesCat) return false;
          }

          return true;
        });

        if (filteredItems.length === 0) return null;

        return {
          ...category,
          items: filteredItems,
        };
      })
      .filter((cat): cat is Category => cat !== null);
  }, [categories, selectedCategorySlug, selectedFoodType, searchQuery]);

  const totalMatchingItems = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <section 
      id="menu" 
      className={`py-12 sm:py-20 lg:py-24 bg-[#FBF9F5] relative scroll-mt-20 ${
        totalShortlistCount > 0 ? 'pb-28 sm:pb-36' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[11px] sm:text-xs font-bold text-[#C88327] mb-2.5 sm:mb-3 shadow-soft-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C88327]" />
            <span>Interactive Digital Menu</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-bold text-[#1F1A16] tracking-tight">
            Discover Our <span className="italic text-[#C88327]">Full Menu</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-[#5C544D] max-w-xl mx-auto leading-relaxed">
            Browse 100+ delicacies across 24 specialized categories. Filter by dietary choice, shortlist favorites, and enquire via WhatsApp in 1-click!
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E8E2D5] shadow-soft mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#8C8278] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search momos, burgers, thickshakes, juice..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#FBF9F5] border border-[#E8E2D5] text-xs sm:text-sm text-[#1F1A16] placeholder-[#8C8278] focus:outline-none focus:border-[#C88327] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8278] hover:text-[#1F1A16] p-1"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons (Smooth Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 -mx-1 px-1">
              <button
                type="button"
                onClick={() => setSelectedFoodType('all')}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                  selectedFoodType === 'all'
                    ? 'bg-[#1F1A16] text-white shadow-soft-sm'
                    : 'bg-[#FBF9F5] text-[#5C544D] hover:text-[#1F1A16] border border-[#E8E2D5]'
                }`}
              >
                All Items
              </button>
              <button
                type="button"
                onClick={() => setSelectedFoodType('veg')}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                  selectedFoodType === 'veg'
                    ? 'bg-emerald-600 text-white shadow-soft-sm'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Veg</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFoodType('non_veg')}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                  selectedFoodType === 'non_veg'
                    ? 'bg-rose-600 text-white shadow-soft-sm'
                    : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Non-Veg</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedFoodType('egg')}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[36px] ${
                  selectedFoodType === 'egg'
                    ? 'bg-amber-600 text-white shadow-soft-sm'
                    : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Egg</span>
              </button>
            </div>

          </div>

          {/* Category Horizontal Pills */}
          <div className="mt-3.5 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[#F2ECE1] flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            <button
              type="button"
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors min-h-[32px] ${
                selectedCategorySlug === 'all'
                  ? 'bg-[#C88327] text-white shadow-soft-sm'
                  : 'bg-[#FBF9F5] text-[#5C544D] hover:text-[#1F1A16] border border-[#E8E2D5]'
              }`}
            >
              All ({categories.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id || cat.slug}
                type="button"
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 min-h-[32px] ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-[#C88327] text-white font-bold shadow-soft-sm'
                    : 'bg-[#FBF9F5] text-[#5C544D] hover:text-[#1F1A16] border border-[#E8E2D5] hover:border-[#C88327]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategorySlug === cat.slug ? 'bg-white/25 text-white font-bold' : 'bg-[#EAE4D7] text-[#5C544D]'
                }`}>
                  {cat.items.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs text-[#786F66] mb-6 sm:mb-8 font-medium px-1">
          <div>
            Showing <strong className="text-[#1F1A16]">{totalMatchingItems}</strong> items across{' '}
            <strong className="text-[#1F1A16]">{filteredCategories.length}</strong> categories
          </div>
          {(searchQuery || selectedFoodType !== 'all' || selectedCategorySlug !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFoodType('all');
                setSelectedCategorySlug('all');
              }}
              className="text-[#C88327] hover:underline flex items-center gap-1 font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Menu Items Render with Category Visual Banner */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-10 sm:space-y-16">
            {filteredCategories.map(category => {
              const meta = categoryImages[category.slug] || {
                img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
                desc: 'Freshly prepared specialty at Samruddhi Café'
              };

              return (
                <div key={category.id || category.slug} className="scroll-mt-24 sm:scroll-mt-28" id={`category-${category.slug}`}>
                  
                  {/* Visual Category Header Card */}
                  <div className="rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] overflow-hidden shadow-soft mb-4 sm:mb-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between">
                    <div className="p-4 sm:p-8 flex-1">
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#C88327] mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#C88327]"></span>
                        <span>Samruddhi Café Section</span>
                      </div>
                      <h3 className="text-xl sm:text-3xl font-display font-bold text-[#1F1A16] tracking-tight">
                        {category.name}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#5C544D] max-w-xl line-clamp-2 sm:line-clamp-none">
                        {meta.desc}
                      </p>
                      <div className="mt-3 sm:mt-4 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FBF9F5] border border-[#E8E2D5] text-[11px] sm:text-xs font-bold text-[#1F1A16]">
                          {category.items.length} {category.items.length === 1 ? 'Dish' : 'Dishes'}
                        </span>
                      </div>
                    </div>

                    <div className="w-full sm:w-56 h-32 sm:h-44 relative shrink-0 overflow-hidden">
                      <img
                        src={meta.img}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/20 sm:from-white/40 to-transparent"></div>
                    </div>
                  </div>

                  {/* Items Grid (1 col on narrow mobile, 2 col on tablet, 3-4 col on desktop) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                    {category.items.map(item => (
                      <MenuItemCard
                        key={item.id || item.slug}
                        item={item}
                        shortlistQty={shortlist[item.id]?.qty || 0}
                        onUpdateQty={onUpdateQty}
                      />
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-soft">
            <p className="text-[#1F1A16] text-base sm:text-lg font-bold">No dishes found matching your criteria</p>
            <p className="text-[#786F66] text-xs sm:text-sm mt-1">Try tweaking your search term or dietary filter</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFoodType('all');
                setSelectedCategorySlug('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#C88327] hover:bg-[#B06F1B] text-white font-bold text-xs shadow-soft"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>

      {/* Floating Bottom Bar for Shortlisted items (Mobile-optimized) */}
      {totalShortlistCount > 0 && (
        <aside 
          aria-label="Order enquiry shortlist bar"
          className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-[95%] sm:w-[92%] max-w-lg bg-white/95 border-2 border-[#C88327] rounded-2xl sm:rounded-3xl shadow-soft-lg p-2.5 sm:p-4 flex items-center justify-between backdrop-blur-md animate-warm-glow"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 mr-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#C88327] text-white font-extrabold flex items-center justify-center shadow-soft-sm shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-[#1F1A16] font-heading truncate">
                {totalShortlistCount} {totalShortlistCount === 1 ? 'Item' : 'Items'} Selected
              </div>
              <div className="text-[11px] sm:text-xs text-[#C88327] font-bold">
                Est. Total: ₹{totalShortlistAmount}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenShortlist}
            className="inline-flex items-center gap-1 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#C88327] hover:bg-[#B06F1B] text-white font-heading font-bold text-xs sm:text-sm shadow-soft transition-all active:scale-95 shrink-0"
          >
            <span className="hidden xs:inline">Review & WhatsApp Order</span>
            <span className="xs:hidden">WhatsApp Order</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </button>
        </aside>
      )}
    </section>
  );
};
