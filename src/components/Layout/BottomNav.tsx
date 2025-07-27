import React from 'react';
import { Home, Users, TrendingUp, Settings, Package, Gift } from 'lucide-react';
import { FestivalTheme } from '../../types';

interface BottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  festivalTheme?: FestivalTheme | null;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onPageChange, festivalTheme }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'group', icon: Users, label: 'Groups' },
    { id: 'suppliers', icon: Package, label: 'Suppliers' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
    { id: 'insights', icon: TrendingUp, label: 'Insights' },
    { id: 'admin', icon: Settings, label: 'Admin' }
  ];

  // Apply festival theme colors if available
  const activeColor = festivalTheme ? festivalTheme.theme.primaryColor : '#ADEFD1';
  const activeBgColor = festivalTheme ? `${festivalTheme.theme.primaryColor}10` : '#ADEFD1/10';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around py-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors`}
              style={
                currentPage === id
                  ? { color: activeColor, backgroundColor: activeBgColor }
                  : { color: '#6B7280' }
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};