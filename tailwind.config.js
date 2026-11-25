/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          bg: '#FBF9F5',        // Warm Linen Cream
          surface: '#FFFFFF',   // Crisp White
          muted: '#F4EFE6',     // Soft Oat Greige
          border: '#E8E2D5',    // Gentle Natural Border
          primary: '#C88327',   // Warm Artisan Amber
          'primary-hover': '#B06F1B',
          'primary-light': '#FEF3C7',
          espresso: '#1F1A16',  // Deep Espresso Charcoal
          slate: '#4A433D',     // Warm Slate Body
          subtle: '#786F66',    // Soft Muted Text
        },
        food: {
          veg: '#16A34A',
          'non-veg': '#DC2626',
          egg: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px 0 rgba(40, 30, 20, 0.04), 0 1px 2px -1px rgba(40, 30, 20, 0.03)',
        'soft': '0 4px 20px -2px rgba(40, 30, 20, 0.06), 0 2px 6px -1px rgba(40, 30, 20, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(40, 30, 20, 0.09), 0 4px 12px -2px rgba(40, 30, 20, 0.04)',
        'amber-glow': '0 4px 20px -2px rgba(200, 131, 39, 0.25)',
      }
    },
  },
  plugins: [],
}
