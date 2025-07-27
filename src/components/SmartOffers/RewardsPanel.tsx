import React, { useState } from 'react';
import { UserReward } from '../../types';
import { Gift, Clock, CheckCircle, Copy, Check } from 'lucide-react';

interface RewardsPanelProps {
  rewards: UserReward[];
  onUseReward: (rewardId: string) => Promise<void>;
}

export const RewardsPanel: React.FC<RewardsPanelProps> = ({ rewards, onUseReward }) => {
  const [usingReward, setUsingReward] = useState<string | null>(null);
  const [copiedCodes, setCopiedCodes] = useState<Set<string>>(new Set());

  const handleUseReward = async (rewardId: string) => {
    setUsingReward(rewardId);
    try {
      await onUseReward(rewardId);
    } catch (error) {
      console.error('Failed to use reward:', error);
    } finally {
      setUsingReward(null);
    }
  };

  const copyToClipboard = async (code: string, rewardId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodes(prev => new Set([...prev, rewardId]));
      setTimeout(() => {
        setCopiedCodes(prev => {
          const newSet = new Set(prev);
          newSet.delete(rewardId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const formatExpiryDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isExpired = (dateStr: string) => {
    return new Date(dateStr) < new Date();
  };

  const activeRewards = rewards.filter(reward => !reward.isRedeemed && !isExpired(reward.expiryDate));
  const usedRewards = rewards.filter(reward => reward.isRedeemed);
  const expiredRewards = rewards.filter(reward => !reward.isRedeemed && isExpired(reward.expiryDate));

  if (rewards.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center">
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <Gift className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-600 mb-2">No Rewards Yet</h3>
          <p className="text-gray-500 text-sm">
            Keep using the app to earn exciting rewards and offers!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Active Rewards */}
      {activeRewards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Gift className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Active Rewards</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              {activeRewards.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {activeRewards.map((reward) => (
              <div key={reward.id} className="border border-green-200 rounded-xl p-4 bg-green-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{reward.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{reward.title}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {reward.discount}% OFF
                    </div>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="bg-white border border-dashed border-green-300 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Coupon Code</p>
                      <span className="font-mono text-sm font-bold text-gray-800">
                        {reward.couponCode}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(reward.couponCode, reward.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedCodes.has(reward.id) ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Expires: {formatExpiryDate(reward.expiryDate)}</span>
                  </div>
                  <button
                    onClick={() => handleUseReward(reward.id)}
                    disabled={usingReward === reward.id}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {usingReward === reward.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Using...</span>
                      </>
                    ) : (
                      <span>Use Now</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Used Rewards */}
      {usedRewards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">Used Rewards</h3>
          </div>
          
          <div className="space-y-3">
            {usedRewards.map((reward) => (
              <div key={reward.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl opacity-50">{reward.emoji}</span>
                    <div>
                      <h4 className="font-medium text-gray-600">{reward.title}</h4>
                      <p className="text-sm text-gray-500">
                        Used on {reward.redeemedAt ? formatExpiryDate(reward.redeemedAt) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expired Rewards */}
      {expiredRewards.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Expired Rewards</h3>
          </div>
          
          <div className="space-y-3">
            {expiredRewards.map((reward) => (
              <div key={reward.id} className="border border-red-200 rounded-xl p-4 bg-red-50 opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl opacity-50">{reward.emoji}</span>
                    <div>
                      <h4 className="font-medium text-red-600">{reward.title}</h4>
                      <p className="text-sm text-red-500">
                        Expired on {formatExpiryDate(reward.expiryDate)}
                      </p>
                    </div>
                  </div>
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};