export const defaultRestaurantData = {
  name: "Samruddhi Café",
  slug: "samruddhi-cafe",
  currency: "INR",
  tagline: "Savor the Flavors, Feel the Vibe",
  theme: {
    primary: "#FFC727",
    background: "#121212",
    surface: "#1E1E1E"
  },
  settings: {
    is_open: true,
    delivery_enabled: true,
    pickup_enabled: true,
    delivery_radius_km: 5,
    delivery_fee: 30,
    free_delivery_above: 499,
    min_order_value: 150,
    packing_charge: 10,
    tax_percent: 5,
    cod_enabled: true,
    avg_prep_minutes: 20,
    phone: "+91 94812 34567",
    whatsapp: "919481234567",
    address: "Near BVB College Road, Vidyanagar, Hubballi, Karnataka 580021",
    opening_hours: "10:30 AM - 10:30 PM (Mon - Sun)",
    instagram: "@samruddhi_cafe_hubli",
    google_maps_link: "https://maps.google.com/?q=Samruddhi+Cafe",
    note: "Prices in rupees (seed converts to paise). Settings are demo placeholders until the owner confirms."
  },
  categories: [
    {
      id: "cat-samruddhi-special",
      slug: "samruddhi-special",
      name: "Samruddhi Special",
      sort_order: 1,
      items: [
        { id: "item-chicken-spring-roll", slug: "chicken-spring-roll", name: "Chicken Spring Roll", price: 80, food_type: "non_veg", is_available: true, sort_order: 1, pieces: 4 },
        { id: "item-chicken-finger", slug: "chicken-finger", name: "Chicken Finger", price: 100, food_type: "non_veg", is_available: true, sort_order: 2, pieces: 8 },
        { id: "item-paneer-spring-roll", slug: "paneer-spring-roll", name: "Paneer Spring Roll", price: 90, food_type: "veg", is_available: true, sort_order: 3, pieces: 4 },
        { id: "item-potato-cheese-balls", slug: "potato-cheese-balls", name: "Potato Cheese Balls", price: 80, food_type: "veg", is_available: true, sort_order: 4, pieces: 10 },
        { id: "item-corn-spring-rolls", slug: "corn-spring-rolls", name: "Corn Spring Rolls", price: 80, food_type: "veg", is_available: true, sort_order: 5, pieces: 4 },
        { id: "item-chicken-momos", slug: "chicken-momos", name: "Chicken Momos", price: 80, food_type: "non_veg", is_available: true, sort_order: 6, pieces: 6 },
        { id: "item-corn-cheese-momos", slug: "corn-cheese-momos", name: "Corn Cheese Momos", price: 80, food_type: "veg", is_available: true, sort_order: 7, pieces: 6 },
        { id: "item-veg-momos", slug: "veg-momos", name: "Veg Momos", price: 70, food_type: "veg", is_available: true, sort_order: 8, pieces: 6 },
        { id: "item-paneer-momos", slug: "paneer-momos", name: "Paneer Momos", price: 80, food_type: "veg", is_available: true, sort_order: 9, pieces: 6 },
        { id: "item-chicken-peri-peri-momos", slug: "chicken-peri-peri-momos", name: "Chicken Peri Peri Momos", price: 80, food_type: "non_veg", is_available: true, sort_order: 10, pieces: 6 },
        { id: "item-potato-twister", slug: "potato-twister", name: "Potato Twister", price: 60, food_type: "veg", is_available: true, sort_order: 11 },
        { id: "item-peri-peri-potato-twister", slug: "peri-peri-potato-twister", name: "Peri Peri Potato Twister", price: 70, food_type: "veg", is_available: true, sort_order: 12 }
      ]
    },
    {
      id: "cat-burger",
      slug: "burger",
      name: "Burger",
      sort_order: 2,
      items: [
        { id: "item-veg-burger", slug: "veg-burger", name: "Veg Burger", price: 70, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-veg-cheese-burger", slug: "veg-cheese-burger", name: "Veg Cheese Burger", price: 80, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-veg-finger-burger", slug: "veg-finger-burger", name: "Veg Finger Burger", price: 80, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-veg-mega-burger", slug: "veg-mega-burger", name: "Veg Mega Burger", price: 100, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-egg-burger", slug: "egg-burger", name: "Egg Burger", price: 80, food_type: "egg", is_available: true, sort_order: 5 },
        { id: "item-egg-cheese-burger", slug: "egg-cheese-burger", name: "Egg Cheese Burger", price: 100, food_type: "egg", is_available: true, sort_order: 6 },
        { id: "item-chicken-burger", slug: "chicken-burger", name: "Chicken Burger", price: 90, food_type: "non_veg", is_available: true, sort_order: 7 },
        { id: "item-chicken-cheese-burger", slug: "chicken-cheese-burger", name: "Chicken Cheese Burger", price: 100, food_type: "non_veg", is_available: true, sort_order: 8 },
        { id: "item-chicken-mega-burger", slug: "chicken-mega-burger", name: "Chicken Mega Burger", price: 130, food_type: "non_veg", is_available: true, sort_order: 9 },
        { id: "item-chicken-nuggets-burger", slug: "chicken-nuggets-burger", name: "Chicken Nuggets Burger", price: 80, food_type: "non_veg", is_available: true, sort_order: 10 }
      ]
    },
    {
      id: "cat-sandwich",
      slug: "sandwich",
      name: "Sandwich",
      sort_order: 3,
      items: [
        { id: "item-veg-sandwich", slug: "veg-sandwich", name: "Veg Sandwich", price: 70, food_type: "veg", is_available: true, sort_order: 1, needs_price_check: true },
        { id: "item-veg-cheese-sandwich", slug: "veg-cheese-sandwich", name: "Veg Cheese Sandwich", price: 80, food_type: "veg", is_available: true, sort_order: 2, needs_price_check: true },
        { id: "item-corn-sandwich", slug: "corn-sandwich", name: "Corn Sandwich", price: 80, food_type: "veg", is_available: true, sort_order: 3, needs_price_check: true },
        { id: "item-paneer-sandwich", slug: "paneer-sandwich", name: "Paneer Sandwich", price: 80, food_type: "veg", is_available: true, sort_order: 4, needs_price_check: true },
        { id: "item-fruit-jam-sandwich", slug: "fruit-jam-sandwich", name: "Fruit Jam Sandwich", price: 70, food_type: "veg", is_available: true, sort_order: 5, needs_price_check: true },
        { id: "item-plain-cheese-sandwich", slug: "plain-cheese-sandwich", name: "Plain Cheese Sandwich", price: 80, food_type: "veg", is_available: true, sort_order: 6, needs_price_check: true },
        { id: "item-veg-club-sandwich", slug: "veg-club-sandwich", name: "Veg Club Sandwich", price: 130, food_type: "veg", is_available: true, sort_order: 7, needs_price_check: true },
        { id: "item-egg-sandwich", slug: "egg-sandwich", name: "Egg Sandwich", price: 80, food_type: "egg", is_available: true, sort_order: 8, needs_price_check: true },
        { id: "item-egg-cheese-sandwich", slug: "egg-cheese-sandwich", name: "Egg Cheese Sandwich", price: 90, food_type: "egg", is_available: true, sort_order: 9, needs_price_check: true },
        { id: "item-egg-club-sandwich", slug: "egg-club-sandwich", name: "Egg Club Sandwich", price: 140, food_type: "egg", is_available: true, sort_order: 10, needs_price_check: true },
        { id: "item-egg-chicken-cheese-sandwich", slug: "egg-chicken-cheese-sandwich", name: "Egg Chicken Cheese Sandwich", price: 120, food_type: "non_veg", is_available: true, sort_order: 11, needs_price_check: true },
        { id: "item-chicken-sandwich", slug: "chicken-sandwich", name: "Chicken Sandwich", price: 90, food_type: "non_veg", is_available: true, sort_order: 12, needs_price_check: true },
        { id: "item-chicken-cheese-sandwich", slug: "chicken-cheese-sandwich", name: "Chicken Cheese Sandwich", price: 100, food_type: "non_veg", is_available: true, sort_order: 13, needs_price_check: true },
        { id: "item-chicken-club-sandwich", slug: "chicken-club-sandwich", name: "Chicken Club Sandwich", price: 150, food_type: "non_veg", is_available: true, sort_order: 14, needs_price_check: true }
      ]
    },
    {
      id: "cat-rolls",
      slug: "rolls",
      name: "Rolls",
      sort_order: 4,
      items: [
        { id: "item-veg-roll", slug: "veg-roll", name: "Veg Roll", price: 70, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-veg-cheese-roll", slug: "veg-cheese-roll", name: "Veg Cheese Roll", price: 80, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-veg-special-roll", slug: "veg-special-roll", name: "Veg Special Roll", price: 80, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-veg-paneer-roll", slug: "veg-paneer-roll", name: "Veg Paneer Roll", price: 80, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-egg-roll", slug: "egg-roll", name: "Egg Roll", price: 80, food_type: "egg", is_available: true, sort_order: 5 },
        { id: "item-egg-cheese-roll", slug: "egg-cheese-roll", name: "Egg Cheese Roll", price: 90, food_type: "egg", is_available: true, sort_order: 6 },
        { id: "item-chicken-roll", slug: "chicken-roll", name: "Chicken Roll", price: 100, food_type: "non_veg", is_available: true, sort_order: 7 },
        { id: "item-chicken-cheese-roll", slug: "chicken-cheese-roll", name: "Chicken Cheese Roll", price: 110, food_type: "non_veg", is_available: true, sort_order: 8 },
        { id: "item-chicken-egg-roll", slug: "chicken-egg-roll", name: "Chicken Egg Roll", price: 120, food_type: "non_veg", is_available: true, sort_order: 9 }
      ]
    },
    {
      id: "cat-french-fries-starters",
      slug: "french-fries-starters",
      name: "French Fries / Starters",
      sort_order: 5,
      items: [
        { id: "item-french-fries", slug: "french-fries", name: "French Fries", price: 90, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-lassi-world-smile", slug: "lassi-world-smile", name: "Lassi World Smile", price: 90, food_type: "veg", is_available: true, sort_order: 2, pieces: 8 },
        { id: "item-veg-popcorn", slug: "veg-popcorn", name: "Veg Popcorn", price: 90, food_type: "veg", is_available: true, sort_order: 3, pieces: 15 },
        { id: "item-veg-finger", slug: "veg-finger", name: "Veg Finger", price: 90, food_type: "veg", is_available: true, sort_order: 4, pieces: 8 },
        { id: "item-chicken-nuggets", slug: "chicken-nuggets", name: "Chicken Nuggets", price: 100, food_type: "non_veg", is_available: true, sort_order: 5, pieces: 8 },
        { id: "item-masala-french-fries", slug: "masala-french-fries", name: "Masala French Fries", price: 100, food_type: "veg", is_available: true, sort_order: 6 },
        { id: "item-chilli-cheese-french-fries", slug: "chilli-cheese-french-fries", name: "Chilli Cheese French Fries", price: 110, food_type: "veg", is_available: true, sort_order: 7 }
      ]
    },
    {
      id: "cat-maggie-bread-omelette",
      slug: "maggie-bread-omelette",
      name: "Maggie & Bread Omelette",
      sort_order: 6,
      items: [
        { id: "item-plain-maggie", slug: "plain-maggie", name: "Plain Maggie", price: 40, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-plain-cheese-maggie", slug: "plain-cheese-maggie", name: "Plain Cheese Maggie", price: 50, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-veg-maggie", slug: "veg-maggie", name: "Veg Maggie", price: 50, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-veg-cheese-maggie", slug: "veg-cheese-maggie", name: "Veg Cheese Maggie", price: 60, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-egg-maggie", slug: "egg-maggie", name: "Egg Maggie", price: 70, food_type: "egg", is_available: true, sort_order: 5 },
        { id: "item-egg-cheese-maggie", slug: "egg-cheese-maggie", name: "Egg Cheese Maggie", price: 80, food_type: "egg", is_available: true, sort_order: 6 },
        { id: "item-bread-omelette", slug: "bread-omelette", name: "Bread Omelette", price: 70, food_type: "egg", is_available: true, sort_order: 7 },
        { id: "item-bread-cheese-omelette", slug: "bread-cheese-omelette", name: "Bread Cheese Omelette", price: 80, food_type: "egg", is_available: true, sort_order: 8 }
      ]
    },
    {
      id: "cat-bun-butter-jam",
      slug: "bun-butter-jam",
      name: "Bun Butter Jam",
      sort_order: 7,
      items: [
        { id: "item-bun-butter-jam", slug: "bun-butter-jam", name: "Bun Butter Jam", price: 30, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-bun-butter-gulkand", slug: "bun-butter-gulkand", name: "Bun Butter Gulkand", price: 30, food_type: "veg", is_available: true, sort_order: 2 }
      ]
    },
    {
      id: "cat-milk-shake",
      slug: "milk-shake",
      name: "Milk Shake",
      sort_order: 8,
      items: [
        { id: "item-apple-milk-shake", slug: "apple-milk-shake", name: "Apple Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 1, needs_price_check: true },
        { id: "item-banana-milk-shake", slug: "banana-milk-shake", name: "Banana Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 2, needs_price_check: true },
        { id: "item-mango-milk-shake", slug: "mango-milk-shake", name: "Mango Milk Shake", price: 80, food_type: "veg", is_available: true, sort_order: 3, needs_price_check: true },
        { id: "item-pomegranate-milk-shake", slug: "pomegranate-milk-shake", name: "Pomegranate Milk Shake", price: 90, food_type: "veg", is_available: true, sort_order: 4, needs_price_check: true },
        { id: "item-chikoo-milk-shake", slug: "chikoo-milk-shake", name: "Chikoo Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 5, needs_price_check: true },
        { id: "item-custard-apple-milk-shake", slug: "custard-apple-milk-shake", name: "Custard Apple Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 6, needs_price_check: true },
        { id: "item-strawberry-milk-shake", slug: "strawberry-milk-shake", name: "Strawberry Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 7, needs_price_check: true },
        { id: "item-papaya-milk-shake", slug: "papaya-milk-shake", name: "Papaya Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 8, needs_price_check: true },
        { id: "item-muskmelon-milk-shake", slug: "muskmelon-milk-shake", name: "Muskmelon Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 9, needs_price_check: true },
        { id: "item-butter-fruit-milk-shake", slug: "butter-fruit-milk-shake", name: "Butter Fruit Milk Shake", price: 90, food_type: "veg", is_available: true, sort_order: 10, needs_price_check: true },
        { id: "item-mix-fruit-milk-shake", slug: "mix-fruit-milk-shake", name: "Mix Fruit Milk Shake", price: 90, food_type: "veg", is_available: true, sort_order: 11, needs_price_check: true },
        { id: "item-tender-coconut-milk-shake", slug: "tender-coconut-milk-shake", name: "Tender Coconut Milk Shake", price: 90, food_type: "veg", is_available: true, sort_order: 12, needs_price_check: true },
        { id: "item-jack-fruit-milk-shake", slug: "jack-fruit-milk-shake", name: "Jack Fruit Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 13, needs_price_check: true },
        { id: "item-rose-milk-shake", slug: "rose-milk-shake", name: "Rose Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 14, needs_price_check: true },
        { id: "item-oreo-milk-shake", slug: "oreo-milk-shake", name: "Oreo Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 15, needs_price_check: true },
        { id: "item-green-pista-milk-shake", slug: "green-pista-milk-shake", name: "Green Pista Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 16, needs_price_check: true },
        { id: "item-butterscotch-milk-shake", slug: "butterscotch-milk-shake", name: "Butterscotch Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 17, needs_price_check: true },
        { id: "item-peanut-milk-shake", slug: "peanut-milk-shake", name: "Peanut Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 18, needs_price_check: true },
        { id: "item-kesar-pista-milk-shake", slug: "kesar-pista-milk-shake", name: "Kesar Pista Milk Shake", price: 70, food_type: "veg", is_available: true, sort_order: 19, needs_price_check: true }
      ]
    },
    {
      id: "cat-ice-cream-shake",
      slug: "ice-cream-shake",
      name: "Ice Cream Shake",
      sort_order: 9,
      items: [
        { id: "item-vanilla-ice-cream-shake", slug: "vanilla-ice-cream-shake", name: "Vanilla Ice Cream Shake", price: 80, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-strawberry-ice-cream-shake", slug: "strawberry-ice-cream-shake", name: "Strawberry Ice Cream Shake", price: 90, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-pista-ice-cream-shake", slug: "pista-ice-cream-shake", name: "Pista Ice Cream Shake", price: 90, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-butterscotch-ice-cream-shake", slug: "butterscotch-ice-cream-shake", name: "Butterscotch Ice Cream Shake", price: 90, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-chocolate-ice-cream-shake", slug: "chocolate-ice-cream-shake", name: "Chocolate Ice Cream Shake", price: 90, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-blackcurrant-ice-cream-shake", slug: "blackcurrant-ice-cream-shake", name: "Blackcurrant Ice Cream Shake", price: 90, food_type: "veg", is_available: true, sort_order: 6 }
      ]
    },
    {
      id: "cat-chocolate-shake",
      slug: "chocolate-shake",
      name: "Chocolate Shake",
      sort_order: 10,
      items: [
        { id: "item-chocolate-shake", slug: "chocolate-shake", name: "Chocolate Shake", price: 70, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-dark-chocolate-shake", slug: "dark-chocolate-shake", name: "Dark Chocolate Shake", price: 70, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-ferrero-rocher-shake", slug: "ferrero-rocher-shake", name: "Ferrero Rocher Shake", price: 70, food_type: "veg", is_order: 3, sort_order: 3 },
        { id: "item-belgium-chocolate-shake", slug: "belgium-chocolate-shake", name: "Belgium Chocolate Shake", price: 70, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-nutella-shake", slug: "nutella-shake", name: "Nutella Shake", price: 130, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-cold-boost", slug: "cold-boost", name: "Cold Boost", price: 70, food_type: "veg", is_available: true, sort_order: 6 }
      ]
    },
    {
      id: "cat-special-shake",
      slug: "special-shake",
      name: "Special Shake",
      sort_order: 11,
      items: [
        { id: "item-titanic-special", slug: "titanic-special", name: "Titanic Special", price: 90, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-kitkat-mud", slug: "kitkat-mud", name: "KitKat Mud", price: 110, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-belgium-chips", slug: "belgium-chips", name: "Belgium Chips", price: 80, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-mississippi-mud", slug: "mississippi-mud", name: "Mississippi Mud", price: 90, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-oreo-mud", slug: "oreo-mud", name: "Oreo Mud", price: 110, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-snickers-mud", slug: "snickers-mud", name: "Snickers Mud", price: 90, food_type: "veg", is_available: true, sort_order: 6 }
      ]
    },
    {
      id: "cat-dry-fruit-shake",
      slug: "dry-fruit-shake",
      name: "Dry Fruit Shake",
      sort_order: 12,
      items: [
        { id: "item-badam-shake", slug: "badam-shake", name: "Badam Shake", price: 80, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-peanut-dry-fruit-shake", slug: "peanut-dry-fruit-shake", name: "Peanut Dry Fruit Shake", price: 80, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-anjeer-shake", slug: "anjeer-shake", name: "Anjeer Shake", price: 80, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-dates-shake", slug: "dates-shake", name: "Dates Shake", price: 80, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-mix-dry-fruits-shake", slug: "mix-dry-fruits-shake", name: "Mix Dry Fruits Shake", price: 100, food_type: "veg", is_available: true, sort_order: 5 }
      ]
    },
    {
      id: "cat-smoothies",
      slug: "smoothies",
      name: "Smoothies",
      sort_order: 13,
      items: [
        { id: "item-banana-smoothie", slug: "banana-smoothie", name: "Banana Smoothie", price: 60, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-strawberry-smoothie", slug: "strawberry-smoothie", name: "Strawberry Smoothie", price: 70, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-mango-smoothie", slug: "mango-smoothie", name: "Mango Smoothie", price: 70, food_type: "veg", is_available: true, sort_order: 3 }
      ]
    },
    {
      id: "cat-protein",
      slug: "protein",
      name: "Protein",
      sort_order: 14,
      items: [
        { id: "item-natural-whey-protein", slug: "natural-whey-protein", name: "Natural Whey Protein", price: 90, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-whey-protein", slug: "whey-protein", name: "Whey Protein", price: 110, food_type: "veg", is_available: true, sort_order: 2 }
      ]
    },
    {
      id: "cat-coffee",
      slug: "coffee",
      name: "Coffee",
      sort_order: 15,
      items: [
        { id: "item-cold-coffee", slug: "cold-coffee", name: "Cold Coffee", price: 70, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-chocolate-coffee", slug: "chocolate-coffee", name: "Chocolate Coffee", price: 80, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-ferro-coffee", slug: "ferro-coffee", name: "Ferro Coffee", price: 80, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-mud-coffee", slug: "mud-coffee", name: "Mud Coffee", price: 90, food_type: "veg", is_available: true, sort_order: 4 }
      ]
    },
    {
      id: "cat-lassi",
      slug: "lassi",
      name: "Lassi",
      sort_order: 16,
      items: [
        { id: "item-sweet-lassi", slug: "sweet-lassi", name: "Sweet Lassi", price: 60, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-mango-lassi", slug: "mango-lassi", name: "Mango Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-banana-lassi", slug: "banana-lassi", name: "Banana Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-strawberry-lassi", slug: "strawberry-lassi", name: "Strawberry Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-pista-lassi", slug: "pista-lassi", name: "Pista Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-rose-lassi", slug: "rose-lassi", name: "Rose Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 6 },
        { id: "item-chocolate-lassi", slug: "chocolate-lassi", name: "Chocolate Lassi", price: 80, food_type: "veg", is_available: true, sort_order: 7 },
        { id: "item-kiwi-lassi", slug: "kiwi-lassi", name: "Kiwi Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 8 },
        { id: "item-mint-lassi", slug: "mint-lassi", name: "Mint Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 9 },
        { id: "item-kesar-lassi", slug: "kesar-lassi", name: "Kesar Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 10 },
        { id: "item-fruit-lassi", slug: "fruit-lassi", name: "Fruit Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 11 },
        { id: "item-lychee-lassi", slug: "lychee-lassi", name: "Lychee Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 12 },
        { id: "item-badam-lassi", slug: "badam-lassi", name: "Badam Lassi", price: 70, food_type: "veg", is_available: true, sort_order: 13 },
        { id: "item-dry-fruit-lassi", slug: "dry-fruit-lassi", name: "Dry Fruit Lassi", price: 80, food_type: "veg", is_available: true, sort_order: 14 }
      ]
    },
    {
      id: "cat-fresh-juice",
      slug: "fresh-juice",
      name: "Fresh Juice",
      sort_order: 17,
      items: [
        { id: "item-musambi-juice", slug: "musambi-juice", name: "Musambi Juice", price: 50, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-watermelon-juice", slug: "watermelon-juice", name: "Watermelon Juice", price: 50, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-orange-juice", slug: "orange-juice", name: "Orange Juice", price: 50, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-pineapple-juice", slug: "pineapple-juice", name: "Pineapple Juice", price: 50, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-muskmelon-juice", slug: "muskmelon-juice", name: "Muskmelon Juice", price: 50, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-arabian-pulpy-grape", slug: "arabian-pulpy-grape", name: "Arabian Pulpy Grape", price: 60, food_type: "veg", is_available: true, sort_order: 6 },
        { id: "item-papaya-juice", slug: "papaya-juice", name: "Papaya Juice", price: 50, food_type: "veg", is_available: true, sort_order: 7 },
        { id: "item-grape-juice", slug: "grape-juice", name: "Grape Juice", price: 50, food_type: "veg", is_available: true, sort_order: 8 },
        { id: "item-pomegranate-juice", slug: "pomegranate-juice", name: "Pomegranate Juice", price: 80, food_type: "veg", is_available: true, sort_order: 9 },
        { id: "item-mixed-fruit-juice", slug: "mixed-fruit-juice", name: "Mixed Fruit Juice", price: 70, food_type: "veg", is_available: true, sort_order: 10 }
      ]
    },
    {
      id: "cat-no-ice-no-sugar-no-water",
      slug: "no-ice-no-sugar-no-water",
      name: "No Ice No Sugar No Water",
      sort_order: 18,
      items: [
        { id: "item-cap-carrot-apple-pineapple", slug: "cap-carrot-apple-pineapple", name: "CAP (Carrot Apple Pineapple)", price: 80, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-abc-apple-beetroot-carrot", slug: "abc-apple-beetroot-carrot", name: "ABC (Apple Beetroot Carrot)", price: 80, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-cucumber-juice", slug: "cucumber-juice", name: "Cucumber Juice", price: 60, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-carrot-juice", slug: "carrot-juice", name: "Carrot Juice", price: 70, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-beetroot-juice", slug: "beetroot-juice", name: "Beetroot Juice", price: 70, food_type: "veg", is_available: true, sort_order: 5 }
      ]
    },
    {
      id: "cat-lemon",
      slug: "lemon",
      name: "Lemon",
      sort_order: 19,
      items: [
        { id: "item-lemon-juice", slug: "lemon-juice", name: "Lemon Juice", price: 30, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-lemon-soda", slug: "lemon-soda", name: "Lemon Soda", price: 40, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-jaljeera-soda", slug: "jaljeera-soda", name: "Jaljeera Soda", price: 50, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-mint-lemon", slug: "mint-lemon", name: "Mint Lemon", price: 40, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-blue-lemon", slug: "blue-lemon", name: "Blue Lemon", price: 50, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-strawberry-lemon", slug: "strawberry-lemon", name: "Strawberry Lemon", price: 50, food_type: "veg", is_available: true, sort_order: 6 },
        { id: "item-healthy-mint", slug: "healthy-mint", name: "Healthy Mint", price: 50, food_type: "veg", is_available: true, sort_order: 7 },
        { id: "item-grape-lime", slug: "grape-lime", name: "Grape Lime", price: 40, food_type: "veg", is_available: true, sort_order: 8 },
        { id: "item-mint-lemon-cooler", slug: "mint-lemon-cooler", name: "Mint Lemon Cooler", price: 50, food_type: "veg", is_available: true, sort_order: 9 }
      ]
    },
    {
      id: "cat-mojitos",
      slug: "mojitos",
      name: "Mojitos",
      sort_order: 20,
      items: [
        { id: "item-passion-fruit-mojito", slug: "passion-fruit-mojito", name: "Passion Fruit Mojito", price: 70, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-green-apple-mojito", slug: "green-apple-mojito", name: "Green Apple Mojito", price: 70, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-blue-lemon-mojito", slug: "blue-lemon-mojito", name: "Blue Lemon Mojito", price: 70, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-mint-mojito", slug: "mint-mojito", name: "Mint Mojito", price: 70, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-blueberry-mojito", slug: "blueberry-mojito", name: "Blueberry Mojito", price: 70, food_type: "veg", is_available: true, sort_order: 5 }
      ]
    },
    {
      id: "cat-ice-creams",
      slug: "ice-creams",
      name: "Ice Creams",
      sort_order: 21,
      items: [
        { id: "item-fruit-salad-with-ice-cream", slug: "fruit-salad-with-ice-cream", name: "Fruit Salad with Ice Cream", price: 80, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-mix-fruit-cream", slug: "mix-fruit-cream", name: "Mix Fruit Cream", price: 70, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-brownie-with-ice-cream", slug: "brownie-with-ice-cream", name: "Brownie with Ice Cream", price: 80, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-chocolate-fudge", slug: "chocolate-fudge", name: "Chocolate Fudge", price: 90, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-butterscotch-fudge", slug: "butterscotch-fudge", name: "Butterscotch Fudge", price: 100, food_type: "veg", is_available: true, sort_order: 5 },
        { id: "item-death-by-chocolate", slug: "death-by-chocolate", name: "Death by Chocolate", price: 110, food_type: "veg", is_available: true, sort_order: 6 },
        { id: "item-dry-fruit-sundae", slug: "dry-fruit-sundae", name: "Dry Fruit Sundae", price: 110, food_type: "veg", is_available: true, sort_order: 7 },
        { id: "item-gadbad", slug: "gadbad", name: "Gadbad", price: 110, food_type: "veg", is_available: true, sort_order: 8 },
        { id: "item-nutella-brownie", slug: "nutella-brownie", name: "Nutella Brownie", price: 110, food_type: "veg", is_available: true, sort_order: 9 },
        { id: "item-nutella-chocolate", slug: "nutella-chocolate", name: "Nutella Chocolate", price: 110, food_type: "veg", is_available: true, sort_order: 10 }
      ]
    },
    {
      id: "cat-sizzling-brownie",
      slug: "sizzling-brownie",
      name: "Sizzling Brownie",
      sort_order: 22,
      items: [
        { id: "item-vanilla-sizzler", slug: "vanilla-sizzler", name: "Vanilla Sizzler", price: 90, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-chocolate-sizzler", slug: "chocolate-sizzler", name: "Chocolate Sizzler", price: 100, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-butterscotch-sizzler", slug: "butterscotch-sizzler", name: "Butterscotch Sizzler", price: 100, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-club-brownie-sizzler", slug: "club-brownie-sizzler", name: "Club Brownie Sizzler", price: 120, food_type: "veg", is_available: true, sort_order: 4 }
      ]
    },
    {
      id: "cat-triveni-special",
      slug: "triveni-special",
      name: "Triveni Special",
      sort_order: 23,
      items: [
        { id: "item-special-triveni", slug: "special-triveni", name: "Special Triveni", price: 100, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-triveni-ice-cream-with-jamoon", slug: "triveni-ice-cream-with-jamoon", name: "Triveni Ice Cream with Jamoon", price: 80, food_type: "veg", is_available: true, sort_order: 2 }
      ]
    },
    {
      id: "cat-falooda",
      slug: "falooda",
      name: "Falooda",
      sort_order: 24,
      items: [
        { id: "item-royal-falooda", slug: "royal-falooda", name: "Royal Falooda", price: 110, food_type: "veg", is_available: true, sort_order: 1 },
        { id: "item-pro-falooda", slug: "pro-falooda", name: "Pro Falooda", price: 130, food_type: "veg", is_available: true, sort_order: 2 },
        { id: "item-kesar-falooda", slug: "kesar-falooda", name: "Kesar Falooda", price: 100, food_type: "veg", is_available: true, sort_order: 3 },
        { id: "item-kulfi-falooda", slug: "kulfi-falooda", name: "Kulfi Falooda", price: 110, food_type: "veg", is_available: true, sort_order: 4 },
        { id: "item-club-falooda", slug: "club-falooda", name: "Club Falooda", price: 160, food_type: "veg", is_available: true, sort_order: 5 }
      ]
    }
  ]
};

