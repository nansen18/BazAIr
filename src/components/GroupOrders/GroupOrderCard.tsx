import React from 'react';
import { useState } from 'react';
import { Users, DollarSign, CheckCircle, X } from 'lucide-react';
import { GroupOrder } from '../../types';

interface GroupOrderCardProps {
  groupOrder: GroupOrder;
  onConfirm?: (groupOrder: GroupOrder) => void;
  onPass?: (groupOrder: GroupOrder) => void;
}

export const GroupOrderCard: React.FC<GroupOrderCardProps> = ({ 
  groupOrder, 
  onConfirm = () => {}, 
  onPass = () => {} 
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPassing, setIsPassing] = useState(false);
  const [actionCompleted, setActionCompleted] = useState<'confirmed' | 'passed' | null>(null);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onConfirm(groupOrder);
      setActionCompleted('confirmed');
      
      // Reset after showing success state
      setTimeout(() => {
        setActionCompleted(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to confirm group order:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  const handlePass = async () => {
    setIsPassing(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onPass(groupOrder);
      setActionCompleted('passed');
      
      // Reset after showing success state
      setTimeout(() => {
        setActionCompleted(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to pass group order:', error);
    } finally {
      setIsPassing(false);
    }
  };

  const discountPercentage = Math.round(groupOrder.discount * 100);

  // Show success state after action completion
  if (actionCompleted === 'confirmed') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-xl mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800 mb-1">Group Order Confirmed! 🎉</h3>
            <p className="text-green-600 text-sm mb-2">
              Your order has been added to the group buying pool
            </p>
            <p className="text-green-700 font-medium">
              Final savings: ₹{Math.round(groupOrder.estimatedSavings)}
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            You'll receive delivery updates via WhatsApp
          </p>
        </div>
      </div>
    );
  }

  if (actionCompleted === 'passed') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
        <div className="text-center">
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            <X className="w-12 h-12 text-gray-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800 mb-1">Group Order Passed</h3>
            <p className="text-gray-600 text-sm">
              You can find another group or place an individual order
            </p>
          </div>
          <button 
            onClick={() => setActionCompleted(null)}
            className="text-[#543310] font-medium hover:underline cursor-pointer"
          >
            Find Another Group
          </button>
        </div>
      </div>
    );
  }
  
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
        <button 
          onClick={handleConfirm}
          disabled={isConfirming || isPassing}
          className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation"
        >
          {isConfirming ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#543310]"></div>
              <span>Confirming...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Confirm Group</span>
            </>
          )}
        </button>
        <button 
          onClick={handlePass}
          disabled={isConfirming || isPassing}
          className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation"
        >
          {isPassing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span>Passing...</span>
            </>
          ) : (
            <>
              <X className="w-4 h-4" />
              <span>Pass</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};