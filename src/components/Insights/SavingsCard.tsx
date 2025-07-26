import React from 'react';
import { PiggyBank, TrendingUp } from 'lucide-react';

export const SavingsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">This Week's Impact</h3>
            <p className="text-sm opacity-90">Your smart decisions</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-2xl font-bold">₹80</span>
          </div>
          <p className="text-sm opacity-90">Saved with groups</p>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/10 rounded-lg">
        <p className="text-sm">🟢 You saved ₹80 this week by using group buy!</p>
      </div>
    </div>
  );
};