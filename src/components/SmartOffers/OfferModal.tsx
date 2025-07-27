import React, { useEffect, useState } from 'react';
import { SmartOffer } from '../../types';
import { Gift, Sparkles, Star, X, Copy, Check } from 'lucide-react';

interface OfferModalProps {
  offer: SmartOffer;
  onRedeem: (offer: SmartOffer) => Promise<any>;
  onDismiss: () => void;
  show: boolean;
}

export const OfferModal: React.FC<OfferModalProps> = ({ offer, onRedeem, onDismiss, show }) => {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (show && offer.animation === 'confetti') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [show, offer.animation]);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    try {
      await onRedeem(offer);
    } catch (error) {
      console.error('Failed to redeem offer:', error);
    } finally {
      setIsRedeeming(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(offer.reward.couponCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const getOfferIcon = () => {
    switch (offer.triggerType) {
      case 'first_login':
        return <Gift className="w-12 h-12 text-white" />;
      case 'comeback':
        return <Sparkles className="w-12 h-12 text-white" />;
      case 'loyalty':
        return <Star className="w-12 h-12 text-white" />;
      default:
        return <Gift className="w-12 h-12 text-white" />;
    }
  };

  const getGradientColors = () => {
    switch (offer.triggerType) {
      case 'first_login':
        return 'from-purple-500 to-pink-500';
      case 'comeback':
        return 'from-blue-500 to-cyan-500';
      case 'loyalty':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  if (!show) return null;

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[10000]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all duration-300 scale-100">
          {/* Header with Gradient */}
          <div className={`bg-gradient-to-r ${getGradientColors()} p-6 text-white text-center relative`}>
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-4">
              <div className="bg-white/20 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                {getOfferIcon()}
              </div>
              <h2 className="text-2xl font-bold mb-2">{offer.title}</h2>
              <p className="text-white/90">{offer.message}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Reward Details */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {offer.reward.type === 'discount' && `${offer.reward.value}% OFF`}
                  {offer.reward.type === 'ai_boost' && `${offer.reward.value}% AI Boost`}
                  {offer.reward.type === 'free_delivery' && 'Free Delivery'}
                  {offer.reward.type === 'group_bonus' && `${offer.reward.value}% Group Bonus`}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Valid for {offer.reward.validDays} days from redemption
                </p>
                
                {/* Coupon Code */}
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Coupon Code</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-gray-800">
                      {offer.reward.couponCode}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleRedeem}
                disabled={isRedeeming}
                className={`flex-1 bg-gradient-to-r ${getGradientColors()} text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
              >
                {isRedeeming ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Claiming...</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    <span>Claim Reward</span>
                  </>
                )}
              </button>
              <button
                onClick={onDismiss}
                className="px-6 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Later
              </button>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500 text-center mt-4">
              * Terms and conditions apply. Offer cannot be combined with other promotions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};