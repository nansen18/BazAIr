import React, { useState, useEffect } from 'react';
import { WastageCard } from './WastageCard';
import { UsageChart } from './UsageChart';
import { SavingsCard } from './SavingsCard';
import { useWastageAI } from '../../hooks/useAI';
import { TrendingUp, Sparkles } from 'lucide-react';

export const Insights: React.FC = () => {
  const { insights, loading, analyzeWastage } = useWastageAI();
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    setHasAnalyzed(true);
    await analyzeWastage();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-[#ADEFD1] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-[#543310]" />
        </div>
        <h2 className="text-2xl font-bold text-[#543310] mb-2">AI Insights</h2>
        <p className="text-gray-600">Reduce waste and optimize your ordering with smart analytics</p>
      </div>

      {!hasAnalyzed && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="bg-[#FFA351]/10 p-4 rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-[#FFA351] mx-auto mb-2" />
            <h3 className="font-semibold text-[#543310] mb-2">StockSense AI</h3>
            <p className="text-gray-600 text-sm">
              Analyze your past orders to identify wastage patterns and get personalized recommendations.
            </p>
          </div>
          
          <button
            onClick={handleAnalyze}
            className="w-full bg-[#FFA351] text-white py-3 rounded-xl font-semibold hover:bg-[#FFA351]/90 transition-colors cursor-pointer"
          >
            Analyze My Orders
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ADEFD1] mx-auto mb-4"></div>
            <p className="text-[#543310] font-medium">🤖 Analyzing your usage patterns...</p>
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <>
          <SavingsCard />
          <UsageChart insights={insights} />
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <WastageCard key={index} insight={insight} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};