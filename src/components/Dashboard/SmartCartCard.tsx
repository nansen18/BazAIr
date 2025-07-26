import React, { useState } from 'react';
import { ShoppingCart, Sparkles, RefreshCw, Edit3 } from 'lucide-react';
import { SmartCart } from '../../types';

interface SmartCartCardProps {
  smartCart: SmartCart | null;
  loading: boolean;
  onRegenerate: () => void;
}

export const SmartCartCard: React.FC<SmartCartCardProps> = ({ smartCart, loading, onRegenerate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderNow = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-[#ADEFD1] p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#543310]" />
            </div>
            <h3 className="text-lg font-semibold text-[#543310]">SmartCart AI</h3>
          </div>
        </div>
        
        <div className="animate-pulse">
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 mt-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        <p className="text-center text-[#543310] mt-4 font-medium">
          🤖 AI is analyzing your needs...
        </p>
      </div>
    );
  }

  if (!smartCart) return null;

  if (orderPlaced) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
        <div className="bg-green-100 p-4 rounded-xl mb-4">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="font-semibold text-green-800 mb-2">Order Placed Successfully!</h3>
          <p className="text-green-600 text-sm">
            Your order for ₹{smartCart.totalCost} has been confirmed. You'll receive updates via WhatsApp.
          </p>
        </div>
        <button
          onClick={() => setOrderPlaced(false)}
          className="text-[#543310] font-medium hover:underline cursor-pointer"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-[#ADEFD1] p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-[#543310]" />
            </div>
            <h3 className="text-lg font-semibold text-[#543310]">SmartCart AI</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-[#ADEFD1] text-[#543310] px-2 py-1 rounded-full font-medium">
              {Math.round(smartCart.confidence * 100)}% confident
            </span>
            <button
              onClick={onRegenerate}
              className="p-2 text-gray-500 hover:text-[#543310] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {smartCart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <span className="font-medium text-[#543310]">{item.name}</span>
                  <span className="text-gray-600 ml-2">
                    {item.quantity}{item.unit}
                  </span>
                </div>
              </div>
              <span className="font-semibold text-[#543310]">₹{item.totalPrice}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg font-bold text-[#543310] mb-4">
          <span>Total:</span>
          <span>₹{smartCart.totalCost}</span>
        </div>

        <div className="bg-[#ADEFD1]/10 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-[#543310] mb-2">💡 AI Suggestions:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {smartCart.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-[#FFA351] mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={handleOrderNow}
            className="flex-1 bg-[#FFA351] text-white py-3 rounded-xl font-semibold hover:bg-[#FFA351]/90 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Order Now</span>
          </button>
          <button 
            onClick={() => setShowEditModal(true)}
            className="px-4 py-3 border-2 border-[#ADEFD1] text-[#543310] rounded-xl font-semibold hover:bg-[#ADEFD1]/10 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#543310]">Edit Cart</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {smartCart.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-medium text-[#543310]">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}{item.unit}</span>
                    <button className="w-8 h-8 bg-[#ADEFD1] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ADEFD1]/80">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};