import { useState, useCallback } from 'react';
import { CartItem, SmartCart, GroupOrder, Supplier, WastageInsight } from '../types';
import { mockCartItems, mockNearbyVendors, mockSuppliers, mockWastageInsights } from '../utils/mockData';

export const useSmartCartAI = () => {
  const [loading, setLoading] = useState(false);
  const [smartCart, setSmartCart] = useState<SmartCart | null>(null);

  const generateSmartCart = useCallback(async (vendorName: string, location: string, weather: string, date: string) => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const totalCost = mockCartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const cart: SmartCart = {
      items: mockCartItems,
      totalCost,
      suggestions: [
        'Weather is sunny - increase tomato quantities by 20%',
        'Weekend approaching - stock extra onions',
        'Festival season - consider premium masala pack'
      ],
      confidence: 0.89
    };
    
    setSmartCart(cart);
    setLoading(false);
    return cart;
  }, []);

  return { smartCart, loading, generateSmartCart };
};

export const useGroupOrderAI = () => {
  const [loading, setLoading] = useState(false);
  const [groupOrder, setGroupOrder] = useState<GroupOrder | null>(null);

  const findGroupOrder = useCallback(async (location: string, cartItems: CartItem[]) => {
    setLoading(true);
    
    // Simulate AI matching
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const totalCost = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = 0.15;
    const finalCost = totalCost * (1 - discount);
    
    const group: GroupOrder = {
      id: 'g1',
      vendors: mockNearbyVendors.slice(0, 3),
      items: cartItems,
      totalCost,
      discount,
      finalCost,
      status: 'forming',
      estimatedSavings: totalCost - finalCost
    };
    
    setGroupOrder(group);
    setLoading(false);
    return group;
  }, []);

  return { groupOrder, loading, findGroupOrder };
};

export const useSupplierMatchAI = () => {
  const [loading, setLoading] = useState(false);
  const [matchedSuppliers, setMatchedSuppliers] = useState<Supplier[]>([]);

  const findSuppliers = useCallback(async (cartItems: CartItem[], location: string, urgency: string) => {
    setLoading(true);
    
    // Simulate AI matching
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sort suppliers based on rating and other factors
    const sorted = [...mockSuppliers].sort((a, b) => b.rating - a.rating);
    
    setMatchedSuppliers(sorted);
    setLoading(false);
    return sorted;
  }, []);

  return { matchedSuppliers, loading, findSuppliers };
};

export const useWastageAI = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<WastageInsight[]>([]);

  const analyzeWastage = useCallback(async () => {
    setLoading(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setInsights(mockWastageInsights);
    setLoading(false);
    return mockWastageInsights;
  }, []);

  return { insights, loading, analyzeWastage };
};