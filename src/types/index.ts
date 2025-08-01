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

export interface FestivalTheme {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  isActive: boolean;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
  banner: {
    text: string;
    emoji: string;
    subtext?: string;
  };
  offers: {
    title: string;
    description: string;
    discount: number;
    emoji: string;
  }[];
  customMessages: {
    welcome: string;
    dashboard: string;
    suppliers: string;
  };
}

export interface UserReward {
  id: string;
  type: 'welcome' | 'comeback' | 'loyalty' | 'special';
  title: string;
  description: string;
  couponCode: string;
  discount: number;
  emoji: string;
  expiryDate: string;
  isRedeemed: boolean;
  redeemedAt?: string;
}

export interface UserLoginData {
  userId: string;
  lastLoginDate: string;
  loginCount: number;
  isFirstTime: boolean;
  consecutiveDays: number;
  totalRewards: number;
  activeRewards: UserReward[];
}

export interface SmartOffer {
  id: string;
  triggerType: 'first_login' | 'comeback' | 'loyalty' | 'special_day';
  title: string;
  message: string;
  reward: {
    type: 'discount' | 'ai_boost' | 'free_delivery' | 'group_bonus';
    value: number;
    couponCode: string;
    validDays: number;
  };
  animation: 'confetti' | 'sparkles' | 'bounce' | 'glow';
  isActive: boolean;
}