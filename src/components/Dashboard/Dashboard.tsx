import React, { useState, useEffect } from 'react';
import { SmartCartCard } from './SmartCartCard';
import { QuickStats } from './QuickStats';
import { WeatherCard } from './WeatherCard';
import { RecentOrders } from './RecentOrders';
import { useSmartCartAI } from '../../hooks/useAI';
import { mockVendor } from '../../utils/mockData';

export const Dashboard: React.FC = () => {
  const { smartCart, loading, generateSmartCart } = useSmartCartAI();
  const [weatherGenerated, setWeatherGenerated] = useState(false);

  useEffect(() => {
    if (!weatherGenerated) {
      generateSmartCart(
        mockVendor.name,
        mockVendor.location,
        'Sunny, 28°C',
        new Date().toISOString().split('T')[0]
      );
      setWeatherGenerated(true);
    }
  }, [generateSmartCart, weatherGenerated]);

  const handleRegenerateCart = () => {
    generateSmartCart(
      mockVendor.name,
      mockVendor.location,
      'Sunny, 28°C',
      new Date().toISOString().split('T')[0]
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#543310] mb-2">
          Welcome back, {mockVendor.name}! 👋
        </h2>
        <p className="text-gray-600">Let's make today profitable with AI-powered insights</p>
      </div>

      <WeatherCard />
      <QuickStats />
      <SmartCartCard 
        smartCart={smartCart} 
        loading={loading}
        onRegenerate={handleRegenerateCart}
      />
      <RecentOrders />
    </div>
  );
};