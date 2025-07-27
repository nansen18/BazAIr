import React, { useState, useEffect } from 'react';
import { SmartOffer } from '../../types';
import { Gift, X, Save, Loader, AlertCircle } from 'lucide-react';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (offer: Omit<SmartOffer, 'id'>) => Promise<void>;
  editingOffer?: SmartOffer | null;
}

const triggerTypes = [
  { value: 'first_login', label: 'First Login', description: 'New user welcome offer' },
  { value: 'comeback', label: 'Comeback User', description: 'User returns after inactivity' },
  { value: 'loyalty', label: 'Loyalty Reward', description: 'Regular user bonus' },
  { value: 'special_day', label: 'Special Day', description: 'Holiday or event offer' }
];

const rewardTypes = [
  { value: 'discount', label: 'Discount %', description: 'Percentage off orders' },
  { value: 'ai_boost', label: 'AI Boost', description: 'Enhanced AI features' },
  { value: 'free_delivery', label: 'Free Delivery', description: 'No delivery charges' },
  { value: 'group_bonus', label: 'Group Bonus', description: 'Extra group order discount' }
];

const animationTypes = [
  { value: 'confetti', label: 'Confetti', emoji: '🎉' },
  { value: 'sparkles', label: 'Sparkles', emoji: '✨' },
  { value: 'bounce', label: 'Bounce', emoji: '🎈' },
  { value: 'glow', label: 'Glow', emoji: '🌟' }
];

export const OfferModal: React.FC<OfferModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingOffer 
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    triggerType: 'first_login' as SmartOffer['triggerType'],
    title: '',
    message: '',
    reward: {
      type: 'discount' as SmartOffer['reward']['type'],
      value: 10,
      couponCode: '',
      validDays: 30
    },
    animation: 'confetti' as SmartOffer['animation'],
    isActive: true
  });

  // Initialize form data when editing
  useEffect(() => {
    if (editingOffer) {
      setFormData({
        triggerType: editingOffer.triggerType,
        title: editingOffer.title,
        message: editingOffer.message,
        reward: editingOffer.reward,
        animation: editingOffer.animation,
        isActive: editingOffer.isActive
      });
    } else {
      // Reset form for new offer
      setFormData({
        triggerType: 'first_login',
        title: '',
        message: '',
        reward: {
          type: 'discount',
          value: 10,
          couponCode: '',
          validDays: 30
        },
        animation: 'confetti',
        isActive: true
      });
    }
    setErrors({});
  }, [editingOffer, isOpen]);

  // Generate coupon code automatically
  useEffect(() => {
    if (!editingOffer && formData.triggerType && formData.reward.value) {
      const prefix = formData.triggerType.toUpperCase().replace('_', '');
      const value = formData.reward.value;
      const code = `${prefix}${value}`;
      setFormData(prev => ({
        ...prev,
        reward: { ...prev.reward, couponCode: code }
      }));
    }
  }, [formData.triggerType, formData.reward.value, editingOffer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.reward.couponCode.trim()) {
      newErrors.couponCode = 'Coupon code is required';
    }

    if (formData.reward.value < 1 || formData.reward.value > 100) {
      newErrors.value = 'Value must be between 1 and 100';
    }

    if (formData.reward.validDays < 1 || formData.reward.validDays > 365) {
      newErrors.validDays = 'Valid days must be between 1 and 365';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save offer:', error);
      setErrors({ submit: 'Failed to save offer. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRewardChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      reward: { ...prev.reward, [field]: value }
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {editingOffer ? 'Edit Smart Offer' : 'Create Smart Offer'}
              </h2>
              <p className="text-white/90 text-sm">Design personalized rewards for users</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trigger Type *
                  </label>
                  <select
                    value={formData.triggerType}
                    onChange={(e) => handleInputChange('triggerType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {triggerTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {triggerTypes.find(t => t.value === formData.triggerType)?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animation Style
                  </label>
                  <select
                    value={formData.animation}
                    onChange={(e) => handleInputChange('animation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {animationTypes.map((anim) => (
                      <option key={anim.value} value={anim.value}>
                        {anim.emoji} {anim.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Welcome to BazAIr! 🎉"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.title}</span>
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={3}
                    placeholder="e.g., Get started with your first order and save big!"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Reward Configuration */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reward Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reward Type
                  </label>
                  <select
                    value={formData.reward.type}
                    onChange={(e) => handleRewardChange('type', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {rewardTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {rewardTypes.find(t => t.value === formData.reward.type)?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.reward.value}
                    onChange={(e) => handleRewardChange('value', parseInt(e.target.value) || 0)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.value ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="10"
                  />
                  {errors.value && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.value}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    value={formData.reward.couponCode}
                    onChange={(e) => handleRewardChange('couponCode', e.target.value.toUpperCase())}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono ${
                      errors.couponCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="WELCOME50"
                  />
                  {errors.couponCode && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.couponCode}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Days *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={formData.reward.validDays}
                    onChange={(e) => handleRewardChange('validDays', parseInt(e.target.value) || 0)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      errors.validDays ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="30"
                  />
                  {errors.validDays && (
                    <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.validDays}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Status</h3>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="font-medium text-gray-800">Active Offer</span>
                  <p className="text-sm text-gray-600">Users can receive this offer when conditions are met</p>
                </div>
              </label>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Gift className="w-6 h-6" />
                  <h4 className="font-bold">{formData.title || 'Offer Title'}</h4>
                </div>
                <p className="text-white/90 mb-3">{formData.message || 'Offer message will appear here'}</p>
                <div className="bg-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      {formData.reward.value}
                      {formData.reward.type === 'discount' && '% OFF'}
                      {formData.reward.type === 'ai_boost' && '% AI Boost'}
                      {formData.reward.type === 'free_delivery' && ' Free Delivery'}
                      {formData.reward.type === 'group_bonus' && '% Group Bonus'}
                    </span>
                    <span className="text-sm">Code: {formData.reward.couponCode || 'COUPON'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errors.submit}</span>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{editingOffer ? 'Update Offer' : 'Create Offer'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};