import React, { useState, useEffect } from 'react';
import { GroupOrderCard } from './GroupOrderCard';
import { VendorList } from './VendorList';
import { useGroupOrderAI } from '../../hooks/useAI';
import { mockCartItems } from '../../utils/mockData';
import { Users, Sparkles } from 'lucide-react';

export const GroupOrders: React.FC = () => {
  const { groupOrder, loading, findGroupOrder } = useGroupOrderAI();
  const [hasSearched, setHasSearched] = useState(false);

  const handleFindGroup = async () => {
    setHasSearched(true);
    await findGroupOrder('T. Nagar, Chennai', mockCartItems);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-[#ADEFD1] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Users className="w-8 h-8 text-[#543310]" />
        </div>
        <h2 className="text-2xl font-bold text-[#543310] mb-2">Group Orders</h2>
        <p className="text-gray-600">Team up with nearby vendors to save on bulk purchases</p>
      </div>

      {!hasSearched && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
          <div className="bg-[#FFA351]/10 p-4 rounded-xl mb-4">
            <Sparkles className="w-8 h-8 text-[#FFA351] mx-auto mb-2" />
            <h3 className="font-semibold text-[#543310] mb-2">GroupBuddy AI</h3>
            <p className="text-gray-600 text-sm">
              Let AI find vendors near you who need similar items. Save up to 20% on bulk orders!
            </p>
          </div>
          
          <button
            onClick={handleFindGroup}
            className="w-full bg-[#FFA351] text-white py-3 rounded-xl font-semibold hover:bg-[#FFA351]/90 transition-colors cursor-pointer"
          >
            Find Group Partners
          </button>
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ADEFD1] mx-auto mb-4"></div>
            <p className="text-[#543310] font-medium">🤖 Finding nearby vendors with similar needs...</p>
          </div>
        </div>
      )}

      {groupOrder && (
        <>
          <GroupOrderCard groupOrder={groupOrder} />
          <VendorList vendors={groupOrder.vendors} />
        </>
      )}
    </div>
  );
};