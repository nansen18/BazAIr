export interface Vendor {
  id: string;
  name: string;
  location: string;
  phone: string;
  verified: boolean;
  rating: number;
  joinedDate: string;
}

export interface CartItem {
  id: string;
  name: string;
  emoji: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
}

export interface SmartCart {
  items: CartItem[];
  totalCost: number;
  suggestions: string[];
  confidence: number;
}

export interface GroupOrder {
  id: string;
  vendors: Vendor[];
  items: CartItem[];
  totalCost: number;
  discount: number;
  finalCost: number;
  status: 'forming' | 'confirmed' | 'delivered';
  estimatedSavings: number;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  location: string;
  deliveryTime: string;
  priceRange: 'low' | 'medium' | 'high';
  verified: boolean;
  speciality: string[];
  eta: string;
}

export interface WastageInsight {
  itemName: string;
  ordered: number;
  used: number;
  wasted: number;
  loss: number;
  suggestion: string;
}

export interface OrderHistory {
  date: string;
  items: CartItem[];
  totalCost: number;
  supplier: string;
  wastage: number;
}