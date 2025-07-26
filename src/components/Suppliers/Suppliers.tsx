import React, { useState, useEffect } from 'react';
import { SupplierCard } from './SupplierCard';
import { FilterBar } from './FilterBar';
import { useSupplierMatchAI } from '../../hooks/useAI';
import { mockCartItems } from '../../utils/mockData';
import { Package, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const Suppliers: React.FC = () => {
  const { matchedSuppliers, loading, findSuppliers } = useSupplierMatchAI();
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    deliveryTime: 'all',
    rating: 'all'
  });

  const handleFindSuppliers = async () => {
    setButtonLoading(true);
    setHasSearched(true);
    setError(null);
    
    try {
      await findSuppliers(mockCartItems, 'T. Nagar, Chennai', 'next-day');
    } catch (err) {
      console.error('Failed to find suppliers:', err);
      setError('Failed to load suppliers. Please try again.');
    } finally {
      setButtonLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleFindSuppliers();
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
            disabled={buttonLoading}
            className="w-full bg-[#FFA351] text-white py-3 rounded-xl font-semibold hover:bg-[#FFA351]/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {buttonLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <span>Find Best Suppliers</span>
            )}
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFA351] mx-auto mb-4"></div>
            <p className="text-[#543310] font-medium">🤖 Matching with best suppliers...</p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200 text-center">
          <div className="bg-red-50 p-4 rounded-xl mb-4">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors cursor-pointer flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      )}

      {/* Results Section */}
      {hasSearched && !loading && !error && (
        <>
          {matchedSuppliers.length > 0 ? (
            <>
              <FilterBar filters={filters} onFiltersChange={setFilters} />
              
              {filteredSuppliers.length > 0 ? (
                <div className="space-y-4">
                  {filteredSuppliers.map((supplier) => (
                    <SupplierCard key={supplier.id} supplier={supplier} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <Package className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-yellow-800 mb-2">No suppliers match your filters</h3>
                    <p className="text-yellow-600 text-sm mb-4">
                      Try adjusting your price range, delivery time, or rating filters to see more options.
                    </p>
                    <button
                      onClick={() => setFilters({ priceRange: 'all', deliveryTime: 'all', rating: 'all' })}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
              <div className="bg-blue-50 p-4 rounded-xl">
                <Package className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-800 mb-2">No suitable suppliers found</h3>
                <p className="text-blue-600 text-sm mb-4">
                  We couldn't find any suppliers matching your current requirements. Try adjusting your location or item preferences.
                </p>
                <button
                  onClick={handleFindSuppliers}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors cursor-pointer flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Search Again</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};