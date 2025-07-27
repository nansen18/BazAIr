import React from 'react';
import { FestivalTheme } from '../../types';
import { Tag, Clock } from 'lucide-react';

interface FestivalOffersProps {
  theme: FestivalTheme;
}

export const FestivalOffers: React.FC<FestivalOffersProps> = ({ theme }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${theme.theme.primaryColor}20` }}
        >
          <Tag className="w-5 h-5" style={{ color: theme.theme.primaryColor }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Festival Special Offers</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Limited time</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {theme.offers.map((offer, index) => (
          <div 
            key={index}
            className="border rounded-xl p-4 hover:shadow-md transition-shadow"
            style={{ borderColor: `${theme.theme.primaryColor}30` }}
          >
            <div className="flex items-start space-x-3">
              <div 
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${theme.theme.primaryColor}15` }}
              >
                <span className="text-2xl">{offer.emoji}</span>
              </div>
              <div className="flex-1">
                <h4 
                  className="font-semibold mb-1"
                  style={{ color: theme.theme.primaryColor }}
                >
                  {offer.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-lg font-bold"
                    style={{ color: theme.theme.accentColor }}
                  >
                    {offer.discount}% OFF
                  </span>
                  <button 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: theme.theme.primaryColor }}
                  >
                    Claim Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: `${theme.theme.primaryColor}10` }}>
        <p className="text-sm text-center" style={{ color: theme.theme.primaryColor }}>
          🎉 These offers are valid only during the festival period. Don't miss out!
        </p>
      </div>
    </div>
  );
};