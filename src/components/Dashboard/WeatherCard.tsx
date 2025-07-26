import React from 'react';
import { Sun, Thermometer } from 'lucide-react';

export const WeatherCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#ADEFD1] to-[#FFA351] rounded-2xl p-4 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Chennai Weather</h3>
            <p className="text-sm opacity-90">Perfect day for street food!</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            <Thermometer className="w-4 h-4" />
            <span className="text-2xl font-bold">28°C</span>
          </div>
          <p className="text-sm opacity-90">Sunny</p>
        </div>
      </div>
    </div>
  );
};