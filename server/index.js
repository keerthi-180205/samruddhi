import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultRestaurantData } from './defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'restaurant.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load or initialize data
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data file, falling back to default:', err);
  }
  saveData(defaultRestaurantData);
  return JSON.parse(JSON.stringify(defaultRestaurantData));
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing data file:', err);
    return false;
  }
}

let currentData = loadData();

// GET all restaurant data
app.get('/api/restaurant', (req, res) => {
  res.json({ success: true, data: currentData });
});

// UPDATE settings
app.put('/api/restaurant/settings', (req, res) => {
  const newSettings = req.body;
  currentData.settings = { ...currentData.settings, ...newSettings };
  saveData(currentData);
  res.json({ success: true, settings: currentData.settings });
});

// ADD category
app.post('/api/categories', (req, res) => {
  const { name, slug, sort_order } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: 'Category name is required' });
  }

  const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newCategory = {
    id: `cat-${Date.now()}`,
    slug: generatedSlug,
    name,
    sort_order: Number(sort_order) || (currentData.categories.length + 1),
    items: []
  };

  currentData.categories.push(newCategory);
  saveData(currentData);
  res.status(201).json({ success: true, category: newCategory });
});

// UPDATE category
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name, slug, sort_order } = req.body;

  const category = currentData.categories.find(c => c.id === id || c.slug === id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  if (name !== undefined) category.name = name;
  if (slug !== undefined) category.slug = slug;
  if (sort_order !== undefined) category.sort_order = Number(sort_order);

  saveData(currentData);
  res.json({ success: true, category });
});

// DELETE category
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const index = currentData.categories.findIndex(c => c.id === id || c.slug === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  const removed = currentData.categories.splice(index, 1)[0];
  saveData(currentData);
  res.json({ success: true, message: `Category "${removed.name}" removed successfully`, category: removed });
});

// ADD item
app.post('/api/items', (req, res) => {
  const { category_id, category_slug, name, price, food_type, pieces, is_available, sort_order, needs_price_check } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }

  // Find category
  const category = currentData.categories.find(c => c.id === category_id || c.slug === category_slug || c.slug === category_id);
  if (!category) {
    return res.status(400).json({ success: false, message: 'Valid category is required' });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newItem = {
    id: `item-${Date.now()}`,
    slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
    name,
    price: Number(price),
    food_type: food_type || 'veg',
    is_available: is_available !== undefined ? Boolean(is_available) : true,
    sort_order: Number(sort_order) || (category.items.length + 1),
    ...(pieces ? { pieces: Number(pieces) } : {}),
    ...(needs_price_check ? { needs_price_check: Boolean(needs_price_check) } : {})
  };

  category.items.push(newItem);
  saveData(currentData);
  res.status(201).json({ success: true, item: newItem, categoryId: category.id });
});

// UPDATE item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, food_type, pieces, is_available, sort_order, category_id, needs_price_check } = req.body;

  let foundItem = null;
  let currentCategory = null;

  for (const cat of currentData.categories) {
    const item = cat.items.find(i => i.id === id || i.slug === id);
    if (item) {
      foundItem = item;
      currentCategory = cat;
      break;
    }
  }

  if (!foundItem) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  // If category changed, move item
  if (category_id && currentCategory.id !== category_id && currentCategory.slug !== category_id) {
    const targetCategory = currentData.categories.find(c => c.id === category_id || c.slug === category_id);
    if (targetCategory) {
      currentCategory.items = currentCategory.items.filter(i => i.id !== foundItem.id);
      targetCategory.items.push(foundItem);
      currentCategory = targetCategory;
    }
  }

  if (name !== undefined) foundItem.name = name;
  if (price !== undefined) foundItem.price = Number(price);
  if (food_type !== undefined) foundItem.food_type = food_type;
  if (is_available !== undefined) foundItem.is_available = Boolean(is_available);
  if (sort_order !== undefined) foundItem.sort_order = Number(sort_order);
  if (pieces !== undefined) {
    if (pieces === '' || pieces === null) {
      delete foundItem.pieces;
    } else {
      foundItem.pieces = Number(pieces);
    }
  }
  if (needs_price_check !== undefined) {
    foundItem.needs_price_check = Boolean(needs_price_check);
  }

  saveData(currentData);
  res.json({ success: true, item: foundItem });
});

// TOGGLE item availability
app.patch('/api/items/:id/availability', (req, res) => {
  const { id } = req.params;
  const { is_available } = req.body;

  let foundItem = null;
  for (const cat of currentData.categories) {
    const item = cat.items.find(i => i.id === id || i.slug === id);
    if (item) {
      foundItem = item;
      break;
    }
  }

  if (!foundItem) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  foundItem.is_available = is_available !== undefined ? Boolean(is_available) : !foundItem.is_available;
  saveData(currentData);
  res.json({ success: true, item: foundItem });
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  let deleted = false;
  let deletedItem = null;

  for (const cat of currentData.categories) {
    const idx = cat.items.findIndex(i => i.id === id || i.slug === id);
    if (idx !== -1) {
      deletedItem = cat.items.splice(idx, 1)[0];
      deleted = true;
      break;
    }
  }

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  saveData(currentData);
  res.json({ success: true, message: `Item "${deletedItem.name}" deleted successfully`, item: deletedItem });
});

// RESET to defaults
app.post('/api/restaurant/reset', (req, res) => {
  currentData = JSON.parse(JSON.stringify(defaultRestaurantData));
  saveData(currentData);
  res.json({ success: true, message: 'Reset to default menu and settings successful', data: currentData });
});

// Serve frontend in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Samruddhi Café API server running on port ${PORT}`);
});

