import React from 'react';
import { FestivalTheme } from '../../types';
import { Sparkles, Gift } from 'lucide-react';

interface FestivalBannerProps {
  theme: FestivalTheme;
}

export const FestivalBanner: React.FC<FestivalBannerProps> = ({ theme }) => {
  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-4 mb-6 text-white shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${theme.theme.gradientFrom}, ${theme.theme.gradientTo})`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-4 animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute top-4 right-8 animate-pulse">
          <Gift className="w-8 h-8" />
        </div>
        <div className="absolute bottom-2 left-1/3 animate-bounce delay-300">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-4 right-1/4 animate-pulse delay-500">
          <Gift className="w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-3xl animate-bounce">{theme.banner.emoji}</span>
          <h2 className="text-xl sm:text-2xl font-bold">{theme.banner.text}</h2>
          <span className="text-3xl animate-bounce delay-200">{theme.banner.emoji}</span>
        </div>
        
        {theme.banner.subtext && (
          <p className="text-sm sm:text-base opacity-90 mb-3">{theme.banner.subtext}</p>
        )}

        {/* Special offers preview */}
        {theme.offers.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {theme.offers.slice(0, 2).map((offer, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1"
              >
                <span>{offer.emoji}</span>
                <span>{offer.title}: {offer.discount}% OFF</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative border */}
      <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none"></div>
    </div>
  );
};