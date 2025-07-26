import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      label: 'This Week',
      value: '₹3,240',
      change: '+12%',
      icon: DollarSign,
      positive: true
    },
    {
      label: 'Wastage',
      value: '₹280',
      change: '-18%',
      icon: TrendingDown,
      positive: true
    },
    {
      label: 'Orders',
      value: '24',
      change: '+8%',
      icon: Package,
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-[#ADEFD1]/20 p-2 rounded-lg mb-2">
              <stat.icon className="w-4 h-4 text-[#543310]" />
            </div>
            <span className="text-sm font-semibold text-[#543310]">{stat.value}</span>
            <span className="text-xs text-gray-600 mb-1">{stat.label}</span>
            <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};