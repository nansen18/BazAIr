import React, { useState } from 'react';
import { SmartOffer } from '../../types';
import { Gift, Plus, Edit3, Trash2, Eye, EyeOff, Settings } from 'lucide-react';

export const OfferManager: React.FC = () => {
  const [offers, setOffers] = useState<SmartOffer[]>([
    {
      id: 'welcome_offer',
      triggerType: 'first_login',
      title: 'Welcome to BazAIr! 🎉',
      message: 'Get started with your first order and save big!',
      reward: {
        type: 'discount',
        value: 50,
        couponCode: 'WELCOME50',
        validDays: 30
      },
      animation: 'confetti',
      isActive: true
    },
    {
      id: 'comeback_offer',
      triggerType: 'comeback',
      title: 'We Missed You! 💝',
      message: 'Welcome back! Here\'s a special reward just for you.',
      reward: {
        type: 'discount',
        value: 25,
        couponCode: 'COMEBACK25',
        validDays: 7
      },
      animation: 'sparkles',
      isActive: true
    },
    {
      id: 'loyalty_boost',
      triggerType: 'loyalty',
      title: 'Loyalty Bonus! ⭐',
      message: 'You\'re our star vendor! Enjoy this AI insight boost.',
      reward: {
        type: 'ai_boost',
        value: 100,
        couponCode: 'AIBOOST100',
        validDays: 14
      },
      animation: 'glow',
      isActive: true
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SmartOffer | null>(null);

  const toggleOfferStatus = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId 
        ? { ...offer, isActive: !offer.isActive }
        : offer
    ));
  };

  const deleteOffer = (offerId: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== offerId));
    }
  };

  const getTriggerTypeLabel = (type: string) => {
    switch (type) {
      case 'first_login': return 'First Login';
      case 'comeback': return 'Comeback User';
      case 'loyalty': return 'Loyalty Reward';
      case 'special_day': return 'Special Day';
      default: return type;
    }
  };

  const getRewardTypeLabel = (type: string) => {
    switch (type) {
      case 'discount': return 'Discount';
      case 'ai_boost': return 'AI Boost';
      case 'free_delivery': return 'Free Delivery';
      case 'group_bonus': return 'Group Bonus';
      default: return type;
    }
  };

  const getTriggerColor = (type: string) => {
    switch (type) {
      case 'first_login': return 'bg-purple-100 text-purple-800';
      case 'comeback': return 'bg-blue-100 text-blue-800';
      case 'loyalty': return 'bg-yellow-100 text-yellow-800';
      case 'special_day': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Gift className="w-6 h-6 text-[#543310]" />
          <h3 className="text-lg font-semibold text-[#543310]">Smart Offer Manager</h3>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#ADEFD1] text-[#543310] px-4 py-2 rounded-lg font-medium hover:bg-[#ADEFD1]/80 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Offer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Offer Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-[#543310] mb-1">{offer.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{offer.message}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTriggerColor(offer.triggerType)}`}>
                    {getTriggerTypeLabel(offer.triggerType)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`w-3 h-3 rounded-full ${offer.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className="text-xs text-gray-500">
                    {offer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Reward Details */}
            <div className="p-4">
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Reward</span>
                  <span className="text-sm text-gray-500">{getRewardTypeLabel(offer.reward.type)}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-[#543310]">
                    {offer.reward.value}
                    {offer.reward.type === 'discount' || offer.reward.type === 'ai_boost' || offer.reward.type === 'group_bonus' ? '%' : ''}
                    {offer.reward.type === 'discount' && ' OFF'}
                    {offer.reward.type === 'ai_boost' && ' Boost'}
                    {offer.reward.type === 'group_bonus' && ' Bonus'}
                  </span>
                  <span className="text-sm text-gray-500">{offer.reward.validDays} days</span>
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  Code: {offer.reward.couponCode}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleOfferStatus(offer.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      offer.isActive 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={offer.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {offer.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setEditingOffer(offer)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => deleteOffer(offer.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Smart Offers</h3>
          <p className="text-gray-500 mb-4">Create your first smart offer to get started</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#ADEFD1] text-[#543310] px-6 py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors"
          >
            Add Smart Offer
          </button>
        </div>
      )}

      {/* Add/Edit Modal would go here - simplified for this example */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#543310] mb-4">Add New Smart Offer</h3>
            <p className="text-gray-600 mb-4">Smart offer creation form would go here...</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};