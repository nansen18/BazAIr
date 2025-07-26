import React from 'react';
import { AlertTriangle, TrendingDown, Lightbulb } from 'lucide-react';
import { WastageInsight } from '../../types';

interface WastageCardProps {
  insight: WastageInsight;
}

export const WastageCard: React.FC<WastageCardProps> = ({ insight }) => {
  const wastagePercentage = Math.round((insight.wasted / insight.ordered) * 100);
  const isHighWastage = wastagePercentage > 20;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border ${isHighWastage ? 'border-red-200' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isHighWastage ? 'bg-red-100' : 'bg-gray-100'}`}>
            {isHighWastage ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-green-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-[#543310]">{insight.itemName}</h3>
            <p className="text-sm text-gray-600">Last week analysis</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isHighWastage ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {wastagePercentage}% wasted
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#543310]">{insight.ordered}kg</p>
          <p className="text-xs text-gray-600">Ordered</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{insight.used}kg</p>
          <p className="text-xs text-gray-600">Used</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{insight.wasted}kg</p>
          <p className="text-xs text-gray-600">Wasted</p>
        </div>
      </div>

      {isHighWastage && (
        <div className="bg-red-50 rounded-lg p-3 mb-4">
          <p className="text-red-800 font-medium text-sm">
            ⚠️ Last week you ordered {insight.ordered}kg {insight.itemName.toLowerCase()}, but used only {insight.used}kg.
          </p>
          <p className="text-red-600 text-sm mt-1">
            Estimated loss: ₹{insight.loss}
          </p>
        </div>
      )}

      <div className="bg-[#ADEFD1]/10 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Lightbulb className="w-4 h-4 text-[#FFA351] mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#543310] mb-1">💡 AI Recommendation:</p>
            <p className="text-sm text-gray-700">{insight.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};