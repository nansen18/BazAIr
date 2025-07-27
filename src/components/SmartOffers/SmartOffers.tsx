import React from 'react';
import { OfferModal } from './OfferModal';
import { RewardsPanel } from './RewardsPanel';
import { useSmartOffers } from '../../hooks/useSmartOffers';
import { Gift, TrendingUp } from 'lucide-react';

export const SmartOffers: React.FC = () => {
  const {
    currentOffer,
    userRewards,
    showOfferModal,
    loading,
    redeemOffer,
    dismissOffer,
    useReward
  } = useSmartOffers();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="bg-[#FFA351] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#543310] mb-2">Smart Rewards</h2>
          <p className="text-gray-600">Loading your personalized offers...</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-[#FFA351] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#543310] mb-2">Smart Rewards</h2>
        <p className="text-gray-600">Your personalized offers and rewards</p>
      </div>

      {/* Rewards Summary */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Rewards Status</h3>
              <p className="text-sm opacity-90">Keep earning more!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {userRewards.filter(r => !r.isRedeemed).length}
            </div>
            <p className="text-sm opacity-90">Active</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <p className="text-sm">
            💡 Login regularly and stay active to unlock more exclusive rewards!
          </p>
        </div>
      </div>

      {/* Rewards Panel */}
      <RewardsPanel rewards={userRewards} onUseReward={useReward} />

      {/* Offer Modal */}
      {currentOffer && (
        <OfferModal
          offer={currentOffer}
          onRedeem={redeemOffer}
          onDismiss={dismissOffer}
          show={showOfferModal}
        />
      )}
    </div>
  );
};