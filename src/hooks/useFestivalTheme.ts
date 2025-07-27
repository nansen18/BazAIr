import { useState, useEffect } from 'react';
import { FestivalTheme } from '../types';

// Mock festival data - In production, this would come from Firebase/database
const mockFestivals: FestivalTheme[] = [
  {
    id: 'independence-day-2024',
    name: 'Independence Day',
    date: '2024-08-15',
    isActive: true,
    theme: {
      primaryColor: '#FF6B35',
      secondaryColor: '#FFFFFF',
      accentColor: '#138808',
      gradientFrom: '#FF6B35',
      gradientTo: '#138808'
    },
    banner: {
      text: 'Happy Independence Day!',
      emoji: '🇮🇳',
      subtext: 'Celebrating 77 years of freedom'
    },
    offers: [
      {
        title: 'Freedom Special',
        description: 'Get 15% off on all orders above ₹500',
        discount: 15,
        emoji: '🎆'
      },
      {
        title: 'Tricolor Combo',
        description: 'Special combo deals for street food vendors',
        discount: 20,
        emoji: '🥘'
      }
    ],
    customMessages: {
      welcome: 'Celebrate Independence with BazAIr! 🇮🇳',
      dashboard: 'Freedom to choose, freedom to grow!',
      suppliers: 'Connect with patriotic suppliers today!'
    }
  },
  {
    id: 'pongal-2024',
    name: 'Pongal',
    date: '2024-01-15',
    endDate: '2024-01-18',
    isActive: false,
    theme: {
      primaryColor: '#FFD700',
      secondaryColor: '#8B4513',
      accentColor: '#32CD32',
      gradientFrom: '#FFD700',
      gradientTo: '#FFA500'
    },
    banner: {
      text: 'Happy Pongal!',
      emoji: '🌾',
      subtext: 'Harvest festival celebrations'
    },
    offers: [
      {
        title: 'Pongal Harvest Deal',
        description: 'Special prices on rice and traditional ingredients',
        discount: 25,
        emoji: '🍚'
      }
    ],
    customMessages: {
      welcome: 'Pongal Vazhthukkal! 🌾',
      dashboard: 'Harvest the best deals this Pongal!',
      suppliers: 'Fresh harvest supplies available!'
    }
  },
  {
    id: 'friendship-day-2024',
    name: 'Friendship Day',
    date: '2024-08-04',
    isActive: false,
    theme: {
      primaryColor: '#FF69B4',
      secondaryColor: '#FFB6C1',
      accentColor: '#FF1493',
      gradientFrom: '#FF69B4',
      gradientTo: '#FFB6C1'
    },
    banner: {
      text: 'Happy Friendship Day!',
      emoji: '👫',
      subtext: 'Celebrate with your vendor friends'
    },
    offers: [
      {
        title: 'Friendship Combo',
        description: 'Group orders with friends get extra 10% off',
        discount: 10,
        emoji: '🤝'
      }
    ],
    customMessages: {
      welcome: 'Friends make everything better! 👫',
      dashboard: 'Share deals with your vendor friends!',
      suppliers: 'Build lasting friendships with suppliers!'
    }
  },
  {
    id: 'diwali-2024',
    name: 'Diwali',
    date: '2024-11-01',
    endDate: '2024-11-05',
    isActive: false,
    theme: {
      primaryColor: '#FFD700',
      secondaryColor: '#FF4500',
      accentColor: '#8B0000',
      gradientFrom: '#FFD700',
      gradientTo: '#FF4500'
    },
    banner: {
      text: 'Happy Diwali!',
      emoji: '🪔',
      subtext: 'Festival of lights and prosperity'
    },
    offers: [
      {
        title: 'Diwali Dhamaka',
        description: 'Illuminate your business with 30% off bulk orders',
        discount: 30,
        emoji: '✨'
      }
    ],
    customMessages: {
      welcome: 'May this Diwali bring prosperity! 🪔',
      dashboard: 'Light up your business this Diwali!',
      suppliers: 'Festive supplies at special prices!'
    }
  }
];

export const useFestivalTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<FestivalTheme | null>(null);
  const [loading, setLoading] = useState(true);

  const checkForActiveTheme = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Find active theme for today
    const activeTheme = mockFestivals.find(festival => {
      const festivalDate = festival.date;
      const endDate = festival.endDate || festival.date;
      
      return todayStr >= festivalDate && todayStr <= endDate;
    });

    setCurrentTheme(activeTheme || null);
    setLoading(false);
  };

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      checkForActiveTheme();
    }, 500);

    // Check every hour for theme changes
    const interval = setInterval(checkForActiveTheme, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshTheme = () => {
    setLoading(true);
    setTimeout(() => {
      checkForActiveTheme();
    }, 500);
  };

  return {
    currentTheme,
    loading,
    refreshTheme,
    hasActiveTheme: !!currentTheme
  };
};