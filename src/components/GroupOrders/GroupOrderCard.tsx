import React from 'react';
import { Users, DollarSign, CheckCircle, X } from 'lucide-react';
import { GroupOrder } from '../../types';

interface GroupOrderCardProps {
  groupOrder: GroupOrder;
}

export const GroupOrderCard: React.FC<GroupOrderCardProps> = ({ groupOrder }) => {
  const discountPercentage = Math.round(groupOrder.discount * 100);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-[#ADEFD1] p-2 rounded-lg">
            <Users className="w-5 h-5 text-[#543310]" />
          </div>
          <h3 className="text-lg font-semibold text-[#543310]">Group Found!</h3>
        </div>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          {groupOrder.status}
        </span>
      </div>

      <div className="bg-[#ADEFD1]/10 rounded-lg p-4 mb-4">
        <p className="text-[#543310] font-medium mb-2">
          🎉 You're being grouped with {groupOrder.vendors.length} other vendors near T. Nagar!
        </p>
        <p className="text-green-600 font-semibold">
          Bulk order discount: {discountPercentage}% saved!
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Original Total:</span>
          <span className="font-medium">₹{groupOrder.totalCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Group Discount ({discountPercentage}%):</span>
          <span className="text-green-600 font-medium">-₹{Math.round(groupOrder.estimatedSavings)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-[#543310] pt-2 border-t">
          <span>Final Cost:</span>
          <span>₹{Math.round(groupOrder.finalCost)}</span>
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors flex items-center justify-center space-x-2 cursor-pointer">
          <CheckCircle className="w-5 h-5" />
          <span>Confirm Group</span>
        </button>
        <button className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 cursor-pointer">
          <X className="w-4 h-4" />
          <span>Pass</span>
        </button>
      </div>
    </div>
  );
};