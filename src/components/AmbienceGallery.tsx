import React from 'react';
import { Camera, Star, Heart } from 'lucide-react';

export const AmbienceGallery: React.FC = () => {
  const visualGallery = [
    {
      title: "Sizzling Hot Brownies",
      subtitle: "Served piping hot with vanilla scoop & fudge",
      tag: "Best Seller 🔥",
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      cols: "col-span-12 md:col-span-7"
    },
    {
      title: "Mississippi & KitKat Mud",
      subtitle: "Ultra-thick, rich chocolate indulgence",
      tag: "Signature Shake 🥤",
      img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
      cols: "col-span-12 md:col-span-5"
    },
    {
      title: "Crispy Peri Peri Momos",
      subtitle: "Tossed in spicy seasoning with creamy dip",
      tag: "Crowd Favorite 🥟",
      img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
      cols: "col-span-12 md:col-span-4"
    },
    {
      title: "The Hangout Ambience",
      subtitle: "Warm, cozy lighting perfect for friends & families",
      tag: "Cozy Vibe ☕",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      cols: "col-span-12 md:col-span-4"
    },
    {
      title: "Loaded Gourmet Burgers",
      subtitle: "Handcrafted patties with melted cheese & crunch",
      tag: "Chef's Pick 🍔",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      cols: "col-span-12 md:col-span-4"
    }
  ];

  const testimonials = [
    {
      name: "Sneha Patil",
      role: "BVB College Student",
      review: "Samruddhi is our daily post-class hangout! The Mississippi Mud shake and Peri Peri Momos are unmatched in Hubballi. Pocket-friendly and always freshly made.",
      rating: 5,
      date: "Verified Customer"
    },
    {
      name: "Rajesh Kulkarni",
      role: "Vidyanagar Resident",
      review: "Ordered the Club Brownie Sizzler and Chicken Burgers for family evening snacks. Packaging was clean, delivery was under 20 mins, and the sizzler was heavenly!",
      rating: 5,
      date: "Frequent Foodie"
    },
    {
      name: "Anand Deshmukh",
      role: "Fitness Enthusiast",
      review: "Finding authentic 100% pure cold-pressed ABC and CAP juice with zero added sugar or water was a game changer. Top hygiene and authentic taste.",
      rating: 5,
      date: "Local Guide"
    }
  ];

  return (
    <section id="ambience" className="py-12 sm:py-20 lg:py-24 bg-[#F7F4EE] border-t border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white border border-[#E8E2D5] text-[11px] sm:text-xs font-bold text-[#C88327] mb-2.5 sm:mb-3 shadow-soft-sm">
              <Camera className="w-3.5 h-3.5" />
              <span>Café Vibe & Visual Gallery</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-display font-bold text-[#1F1A16] tracking-tight">
              Culinary Moments at <span className="italic text-[#C88327]">Samruddhi</span>
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[#5C544D] max-w-xl">
              A feast for the eyes and the soul. Discover our most loved creations captured in our kitchen.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#1F1A16] font-bold bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-[#E8E2D5] shadow-soft-sm self-start md:self-auto">
            <Star className="w-4 h-4 fill-[#C88327] text-[#C88327] shrink-0" />
            <span>4.8 / 5 Rating • 850+ Reviews</span>
          </div>
        </div>

        {/* Visual Bento Photo Grid */}
        <div className="grid grid-cols-12 gap-3.5 sm:gap-5 mb-14 sm:mb-20">
          {visualGallery.map((item, idx) => (
            <div
              key={idx}
              className={`${item.cols} rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E8E2D5] shadow-soft relative group min-h-[220px] xs:min-h-[260px] sm:min-h-[300px] flex flex-col justify-end`}
            >
              {/* Photo */}
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

              {/* Tag */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] sm:text-xs font-bold">
                  {item.tag}
                </span>
              </div>

              {/* Caption */}
              <div className="relative z-10 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold font-display">{item.title}</h3>
                <p className="text-xs text-gray-200 mt-0.5 sm:mt-1 line-clamp-2">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ==================== CUSTOMER TESTIMONIALS ==================== */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E2D5] text-[10px] sm:text-[11px] font-bold text-[#C88327] mb-2 shadow-soft-sm">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Voices of Our Community</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-display font-bold text-[#1F1A16]">
              Loved by Foodies in Hubballi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#E8E2D5] shadow-soft flex flex-col justify-between hover:border-[#C88327]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C88327] mb-3 sm:mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C88327]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A433D] leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="mt-5 pt-3.5 sm:mt-6 sm:pt-4 border-t border-[#F2ECE1] flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#1F1A16] font-heading">{t.name}</div>
                    <div className="text-[11px] text-[#786F66]">{t.role}</div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#C88327] bg-[#FBF9F5] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#E8E2D5]">
                    {t.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
