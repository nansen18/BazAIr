import { Vendor, CartItem, Supplier, WastageInsight, OrderHistory } from '../types';

export const mockVendor: Vendor = {
  id: 'v1',
  name: 'Raj Kumar',
  location: 'T. Nagar, Chennai',
  phone: '+91 98765 43210',
  verified: true,
  rating: 4.5,
  joinedDate: '2024-01-15'
};

export const mockCartItems: CartItem[] = [
  {
    id: 'i1',
    name: 'Onions',
    emoji: '🧅',
    quantity: 10,
    unit: 'kg',
    pricePerUnit: 32,
    totalPrice: 320
  },
  {
    id: 'i2',
    name: 'Tomatoes',
    emoji: '🍅',
    quantity: 6,
    unit: 'kg',
    pricePerUnit: 42,
    totalPrice: 252
  },
  {
    id: 'i3',
    name: 'Green Chilies',
    emoji: '🌶️',
    quantity: 2,
    unit: 'kg',
    pricePerUnit: 40,
    totalPrice: 80
  },
  {
    id: 'i4',
    name: 'Masala Pack',
    emoji: '🧂',
    quantity: 1,
    unit: 'unit',
    pricePerUnit: 60,
    totalPrice: 60
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'FreshFarm Traders',
    rating: 4.8,
    location: 'Koyambedu Market',
    deliveryTime: 'Next Day',
    priceRange: 'medium',
    verified: true,
    speciality: ['Vegetables', 'Spices'],
    eta: 'Tomorrow, 8AM - 10AM'
  },
  {
    id: 's2',
    name: 'Green Valley Suppliers',
    rating: 4.6,
    location: 'Pallavaram',
    deliveryTime: 'Same Day',
    priceRange: 'low',
    verified: true,
    speciality: ['Organic Vegetables'],
    eta: 'Today, 4PM - 6PM'
  },
  {
    id: 's3',
    name: 'Metro Fresh Wholesale',
    rating: 4.9,
    location: 'Chromepet',
    deliveryTime: 'Next Day',
    priceRange: 'high',
    verified: true,
    speciality: ['Premium Quality', 'Bulk Orders'],
    eta: 'Tomorrow, 10AM - 12PM'
  }
];

export const mockWastageInsights: WastageInsight[] = [
  {
    itemName: 'Onions',
    ordered: 15,
    used: 8,
    wasted: 7,
    loss: 170,
    suggestion: 'Order only 9kg next time based on usage pattern'
  },
  {
    itemName: 'Tomatoes',
    ordered: 8,
    used: 7,
    wasted: 1,
    loss: 42,
    suggestion: 'Good utilization! Continue with similar quantities'
  },
  {
    itemName: 'Green Chilies',
    ordered: 3,
    used: 2,
    wasted: 1,
    loss: 40,
    suggestion: 'Reduce order by 1kg to minimize waste'
  }
];

export const mockOrderHistory: OrderHistory[] = [
  {
    date: '2024-12-20',
    items: mockCartItems,
    totalCost: 712,
    supplier: 'FreshFarm Traders',
    wastage: 85
  },
  {
    date: '2024-12-19',
    items: mockCartItems.slice(0, 2),
    totalCost: 572,
    supplier: 'Green Valley Suppliers',
    wastage: 42
  },
  {
    date: '2024-12-18',
    items: mockCartItems,
    totalCost: 695,
    supplier: 'FreshFarm Traders',
    wastage: 125
  }
];

export const mockNearbyVendors: Vendor[] = [
  {
    id: 'v2',
    name: 'Priya Devi',
    location: 'T. Nagar, Chennai',
    phone: '+91 97654 32109',
    verified: true,
    rating: 4.3,
    joinedDate: '2024-02-10'
  },
  {
    id: 'v3',
    name: 'Kumar Singh',
    location: 'T. Nagar, Chennai',
    phone: '+91 96543 21098',
    verified: true,
    rating: 4.7,
    joinedDate: '2024-01-20'
  },
  {
    id: 'v4',
    name: 'Lakshmi Menon',
    location: 'T. Nagar, Chennai',
    phone: '+91 95432 10987',
    verified: true,
    rating: 4.4,
    joinedDate: '2024-03-05'
  }
];