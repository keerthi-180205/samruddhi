# ☕ Samruddhi Café — Branding Portfolio & Admin Dashboard

Welcome to the official web application for **Samruddhi Café**, built with a modern dark ambient vibe, custom branding palette, interactive digital menu showcase, and a real-time Admin Management Dashboard.

---

## 🎨 Brand Identity & Theme
- **Restaurant Name:** Samruddhi Café
- **Slug:** `samruddhi-cafe`
- **Currency:** Indian Rupee (₹ INR)
- **Primary Accent:** `#FFC727` (Vibrant Golden Amber)
- **Dark Background:** `#121212` (Sleek Obsidian)
- **Surface Elevation:** `#1E1E1E` (Dark Card Surface)
- **Typography:** `Outfit` (Headings) & `Plus Jakarta Sans` (Body)

---

## 🚀 Key Features

### 1. Branding Portfolio Website
- **Hero & Story:** High-energy visual introduction highlighting Samruddhi's crowd favorites: Sizzling Hot Brownies, Mississippi Mud Thickshakes, Peri Peri Momos, and Mega Burgers.
- **Live Status Indicator:** Real-time "Open Now" / "Closed" pill based on the café's operating hours and owner settings.
- **Interactive Digital Menu (100+ items across 24 categories):**
  - Instant live search by dish name or category.
  - Dietary filters: All, Veg Only (🌱 Green), Non-Veg (🍗 Red), Egg (🥚 Amber).
  - Category selector with horizontal scroll and live item counters.
  - Piece count indicators (`4 pcs`, `8 pcs`, `10 pcs`, `15 pcs`).
  - "Verify Price" tags for items requiring counter confirmation.
  - Sold Out / In Stock status badges.
- **Order Shortlist & WhatsApp Enquiry Drawer:**
  - Guests can tap "+ Add" on items to build a shortlist tray.
  - Computes subtotal, packing charges (₹10), 5% tax, and delivery fee (₹30 or FREE above ₹499).
  - 1-click **"Send Order on WhatsApp"** button which formats the customer's items into an organized WhatsApp message sent straight to the café's phone.
  - Direct **"Call Café"** phone integration.
- **Location, Timings & Delivery Info:**
  - Operational hours (10:30 AM - 10:30 PM).
  - Delivery guidelines (5km radius, ₹30 fee, free above ₹499, ~20 mins prep time).
  - Google Maps integration and direct directions link.

### 2. Full Admin Dashboard (`/admin`)
- Accessible via the **"Admin Panel"** button in the navbar or footer.
- **Menu Items Management:**
  - Add new dishes with name, category, price in ₹, food type, pieces, and sort order.
  - Edit any existing item.
  - Instant 1-click **Availability Toggle** (In Stock / Sold Out) with real-time persistence.
  - Delete items with confirmation dialog.
- **Categories Management:**
  - View, add, rename, and organize all 24 categories.
- **Store & Delivery Settings:**
  - Toggle Store Open / Closed.
  - Enable / disable Delivery and Takeaway channels.
  - Adjust delivery fee, radius (km), free delivery threshold, packing charge, tax %, and prep time.
  - Update address, phone number, and WhatsApp number.
- **Backup & Seed Data Reset:**
  - 1-click **"Restore Default Menu"** button that re-seeds all original 24 categories and 115+ items.
  - Export menu database as a JSON file.

---

## 📂 Project Structure

```
samruddi/
├── index.html                 # Main HTML template with Outfit & Plus Jakarta fonts
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration with proxy to backend
├── tailwind.config.js         # Tailwind theme matching #FFC727, #121212, #1E1E1E
├── dist/                      # Production compiled assets
├── server/
│   ├── index.js               # Express API backend with persistent JSON store
│   ├── defaultData.js         # Full seed menu (24 categories, 115+ dishes)
│   └── data/
│       └── restaurant.json    # Live persistent database
└── src/
    ├── App.tsx                # Main app state controller & tab router
    ├── types.ts               # TypeScript data models
    ├── index.css              # Custom scrollbars, glow effects & badges
    ├── data/
    │   └── defaultData.ts     # Frontend default seed data
    └── components/
        ├── Navbar.tsx         # Brand logo, open status, nav & shortlist counter
        ├── Hero.tsx           # High-impact hero section & stats
        ├── Story.tsx          # Brand story & culinary pillars
        ├── MenuShowcase.tsx   # Digital menu explorer with filters & search
        ├── MenuItemCard.tsx   # Item card with dietary badges & piece counts
        ├── OrderModal.tsx     # Shortlist enquiry modal with WhatsApp generation
        ├── AmbienceGallery.tsx# Cafe highlights & signature delights
        ├── LocationAndHours.tsx# Timings, 5km delivery guidelines & map
        ├── Footer.tsx         # Brand footer & admin entrance
        └── admin/
            ├── AdminDashboard.tsx # Comprehensive admin panel
            ├── ItemModal.tsx      # Add/edit dish modal
            ├── CategoryModal.tsx  # Add/edit category modal
            └── SettingsTab.tsx    # Operational settings form
```

---

## 🛠️ How to Run

### Development Mode (Concurrent Vite + Backend)
```bash
npm run dev
```
- Frontend will run on: `http://localhost:3000`
- Express API server will run on: `http://localhost:5000`

### Production Mode
```bash
npm run build
npm start
```
The Express server on port 5000 will serve the compiled static frontend alongside the API.

