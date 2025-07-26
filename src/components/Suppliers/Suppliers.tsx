import React, { useState, useEffect } from 'react';
import { SupplierCard } from './SupplierCard';
import { FilterBar } from './FilterBar';
import { useSupplierMatchAI } from '../../hooks/useAI';
import { mockCartItems } from '../../utils/mockData';
import { Package, Sparkles } from 'lucide-react';

export const Suppliers: React.FC = () => {
  const { matchedSuppliers, loading, findSuppliers } = useSupplierMatchAI();
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    deliveryTime: 'all',
    rating: 'all'
  });

  const handleFindSuppliers = async () => {
    setHasSearched(true);
    await findSuppliers(mockCartItems, 'T. Nagar, Chennai', 'next-day');
  };

  const filteredSuppliers = matchedSuppliers.filter(supplier => {
    if (filters.priceRange !== 'all' && supplier.priceRange !== filters.priceRange) return false;
    if (filters.deliveryTime !== 'all' && supplier.deliveryTime !== filters.deliveryTime) return false;
    if (filters.rating !== 'all' && supplier.rating < parseFloat(filters.rating)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-[#FFA351] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#543310] mb-2">Suppliers</h2>
        <p className="text-gray-600">Find trusted suppliers with the best prices and delivery times</p>
      </div>

      {!hasSearched && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="bg-[#ADEFD1]/10 p-4 rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-[#ADEFD1] mx-auto mb-2" />
            <h3 className="font-semibold text-[#543310] mb-2">TrustySupplier AI</h3>
            <p className="text-gray-600 text-sm">
              AI will match you with verified suppliers based on your cart, location, and delivery preferences.
            </p>
          </div>
          
          <button
            onClick={handleFindSuppliers}
            className="w-full bg-[#FFA351] text-white py-3 rounded-xl font-semibold hover:bg-[#FFA351]/90 transition-colors cursor-pointer"
          >
            Find Best Suppliers
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFA351] mx-auto mb-4"></div>
            <p className="text-[#543310] font-medium">🤖 Matching with best suppliers...</p>
          </div>
        </div>
      )}

      {matchedSuppliers.length > 0 && (
        <>
          <FilterBar filters={filters} onFiltersChange={setFilters} />
          
          <div className="space-y-4">
            {filteredSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};