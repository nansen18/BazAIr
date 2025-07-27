import { useState, useEffect, useCallback } from 'react';
import { UserLoginData, UserReward, SmartOffer } from '../types';

// Mock user data - In production, this would come from Firebase/database
const mockUserData: UserLoginData = {
  userId: 'user_raj_kumar',
  lastLoginDate: '2024-12-20', // Simulate 3+ days ago for comeback offer
  loginCount: 15,
  isFirstTime: false, // Set to true to test welcome offer
  consecutiveDays: 3,
  totalRewards: 2,
  activeRewards: []
};

// Mock smart offers configuration
const mockSmartOffers: SmartOffer[] = [
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
];

export const useSmartOffers = () => {
  const [currentOffer, setCurrentOffer] = useState<SmartOffer | null>(null);
  const [userRewards, setUserRewards] = useState<UserReward[]>([]);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkForOffers = useCallback(async () => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const today = new Date();
      const lastLogin = new Date(mockUserData.lastLoginDate);
      const daysDifference = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
      
      let triggerOffer: SmartOffer | null = null;
      
      // Check for first-time user
      if (mockUserData.isFirstTime) {
        triggerOffer = mockSmartOffers.find(offer => 
          offer.triggerType === 'first_login' && offer.isActive
        ) || null;
      }
      // Check for comeback user (more than 10 days inactive)
      else if (daysDifference >= 10) {
        const comebackOffers = mockSmartOffers.filter(offer => 
          offer.triggerType === 'comeback' && offer.isActive
        );
        // Randomly select a comeback offer
        if (comebackOffers.length > 0) {
          triggerOffer = comebackOffers[Math.floor(Math.random() * comebackOffers.length)];
        }
      }
      // Check for loyalty rewards (every 30 logins)
      else if (mockUserData.loginCount > 0 && mockUserData.loginCount % 30 === 0) {
        triggerOffer = mockSmartOffers.find(offer => 
          offer.triggerType === 'loyalty' && offer.isActive
        ) || null;
      }
      
      if (triggerOffer) {
        setCurrentOffer(triggerOffer);
        setShowOfferModal(true);
      }
      
      // Load user's active rewards
      setUserRewards(mockUserData.activeRewards);
      
    } catch (error) {
      console.error('Error checking for offers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const redeemOffer = useCallback(async (offer: SmartOffer) => {
    try {
      const newReward: UserReward = {
        id: `reward_${Date.now()}`,
        type: offer.triggerType === 'first_login' ? 'welcome' : 
              offer.triggerType === 'comeback' ? 'comeback' : 'loyalty',
        title: offer.title,
        description: offer.message,
        couponCode: offer.reward.couponCode,
        discount: offer.reward.value,
        emoji: offer.triggerType === 'first_login' ? '🎉' :
               offer.triggerType === 'comeback' ? '💝' : '⭐',
        expiryDate: new Date(Date.now() + offer.reward.validDays * 24 * 60 * 60 * 1000).toISOString(),
        isRedeemed: false
      };
      
      setUserRewards(prev => [...prev, newReward]);
      setShowOfferModal(false);
      setCurrentOffer(null);
      
      // Simulate API call to save reward
      console.log('Reward redeemed:', newReward);
      
      return newReward;
    } catch (error) {
      console.error('Error redeeming offer:', error);
      throw error;
    }
  }, []);

  const dismissOffer = useCallback(() => {
    setShowOfferModal(false);
    setCurrentOffer(null);
  }, []);

  const useReward = useCallback(async (rewardId: string) => {
    try {
      setUserRewards(prev => 
        prev.map(reward => 
          reward.id === rewardId 
            ? { ...reward, isRedeemed: true, redeemedAt: new Date().toISOString() }
            : reward
        )
      );
      
      // Simulate API call
      console.log('Reward used:', rewardId);
      
    } catch (error) {
      console.error('Error using reward:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    // Check for offers on component mount (simulating app login)
    checkForOffers();
  }, [checkForOffers]);

  return {
    currentOffer,
    userRewards,
    showOfferModal,
    loading,
    redeemOffer,
    dismissOffer,
    useReward,
    refreshOffers: checkForOffers
  };
};