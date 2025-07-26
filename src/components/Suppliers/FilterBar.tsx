import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  filters: {
    priceRange: string;
    deliveryTime: string;
    rating: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
      <div className="flex items-center space-x-2 mb-3">
        <Filter className="w-4 h-4 text-[#543310]" />
        <span className="font-medium text-[#543310]">Filters</span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => updateFilter('priceRange', e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#ADEFD1]"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Delivery</label>
          <select
            value={filters.deliveryTime}
            onChange={(e) => updateFilter('deliveryTime', e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#ADEFD1]"
          >
            <option value="all">All</option>
            <option value="Same Day">Same Day</option>
            <option value="Next Day">Next Day</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-gray-600 mb-1">Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => updateFilter('rating', e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-[#ADEFD1]"
          >
            <option value="all">All</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>
        </div>
      </div>
    </div>
  );
};