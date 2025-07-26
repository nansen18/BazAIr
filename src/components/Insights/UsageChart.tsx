import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { WastageInsight } from '../../types';

interface UsageChartProps {
  insights: WastageInsight[];
}

export const UsageChart: React.FC<UsageChartProps> = ({ insights }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const maxValue = Math.max(...insights.map(i => i.ordered));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-[#543310]" />
        <h3 className="text-lg font-semibold text-[#543310]">Usage vs Orders</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-[#543310]">{insight.itemName}</span>
              <span className="text-gray-600">{insight.ordered}kg ordered</span>
            </div>
            
            <div 
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredItem(insight.itemName)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="h-8 bg-gray-200 rounded-lg overflow-hidden relative">
                {/* Ordered bar (background) */}
                <div 
                  className="absolute top-0 left-0 h-full bg-[#4285F4] rounded-lg transition-all duration-300"
                  style={{ width: `${(insight.ordered / maxValue) * 100}%` }}
                ></div>
                {/* Used bar (foreground) */}
                <div 
                  className="absolute top-0 left-0 h-full bg-[#34A853] rounded-lg transition-all duration-300"
                  style={{ width: `${(insight.used / maxValue) * 100}%` }}
                ></div>
              </div>
              
              {/* Tooltip */}
              {hoveredItem === insight.itemName && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap z-10">
                  Ordered: {insight.ordered}kg | Used: {insight.used}kg | Wasted: {insight.wasted}kg
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
              
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Used: {insight.used}kg</span>
                <span className="text-red-500">Wasted: {insight.wasted}kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-8 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#4285F4] rounded"></div>
          <span className="text-sm text-gray-600 font-medium">Ordered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[#34A853] rounded"></div>
          <span className="text-sm text-gray-600 font-medium">Used</span>
        </div>
      </div>
    </div>
  );
};