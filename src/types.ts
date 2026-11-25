export type FoodType = 'veg' | 'non_veg' | 'egg';

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  price: number; // in rupees (INR)
  food_type: FoodType;
  is_available: boolean;
  sort_order: number;
  pieces?: number;
  needs_price_check?: boolean;
  description?: string;
  category_slug?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  items: MenuItem[];
}

export interface CafeSettings {
  is_open: boolean;
  delivery_enabled: boolean;
  pickup_enabled: boolean;
  delivery_radius_km: number;
  delivery_fee: number;
  free_delivery_above: number;
  min_order_value: number;
  packing_charge: number;
  tax_percent: number;
  cod_enabled: boolean;
  avg_prep_minutes: number;
  phone: string;
  whatsapp: string;
  address: string;
  opening_hours: string;
  instagram?: string;
  google_maps_link?: string;
  note: string;
}

export interface RestaurantData {
  name: string;
  slug: string;
  currency: string;
  tagline: string;
  theme: {
    primary: string;
    background: string;
    surface: string;
  };
  settings: CafeSettings;
  categories: Category[];
}

export interface OrderItemEntry {
  item: MenuItem;
  quantity: number;
}

