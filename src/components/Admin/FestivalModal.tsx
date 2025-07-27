import React, { useState, useEffect } from 'react';
import { FestivalTheme } from '../../types';
import { Calendar, Type, FileText, Tag, Palette, X, Save, Loader } from 'lucide-react';

interface FestivalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (festival: Omit<FestivalTheme, 'id'>) => Promise<void>;
  editingFestival?: FestivalTheme | null;
}

const emojiOptions = ['🎉', '🎊', '🇮🇳', '🌾', '🪔', '👫', '🎆', '✨', '🌟', '💫', '🎈', '🎁'];

const colorPresets = [
  { name: 'Independence Day', primary: '#FF6B35', secondary: '#FFFFFF', accent: '#138808', gradientFrom: '#FF6B35', gradientTo: '#138808' },
  { name: 'Pongal', primary: '#FFD700', secondary: '#8B4513', accent: '#32CD32', gradientFrom: '#FFD700', gradientTo: '#FFA500' },
  { name: 'Diwali', primary: '#FFD700', secondary: '#FF4500', accent: '#8B0000', gradientFrom: '#FFD700', gradientTo: '#FF4500' },
  { name: 'Friendship', primary: '#FF69B4', secondary: '#FFB6C1', accent: '#FF1493', gradientFrom: '#FF69B4', gradientTo: '#FFB6C1' },
  { name: 'Custom', primary: '#6366F1', secondary: '#8B5CF6', accent: '#EC4899', gradientFrom: '#6366F1', gradientTo: '#8B5CF6' }
];

export const FestivalModal: React.FC<FestivalModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingFestival 
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    endDate: '',
    isActive: true,
    theme: {
      primaryColor: '#6366F1',
      secondaryColor: '#8B5CF6',
      accentColor: '#EC4899',
      gradientFrom: '#6366F1',
      gradientTo: '#8B5CF6'
    },
    banner: {
      text: '',
      emoji: '🎉',
      subtext: ''
    },
    offers: [
      {
        title: '',
        description: '',
        discount: 10,
        emoji: '🎁'
      }
    ],
    customMessages: {
      welcome: '',
      dashboard: '',
      suppliers: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedColorPreset, setSelectedColorPreset] = useState('Custom');

  // Initialize form data when editing
  useEffect(() => {
    if (editingFestival) {
      setFormData({
        name: editingFestival.name,
        date: editingFestival.date,
        endDate: editingFestival.endDate || '',
        isActive: editingFestival.isActive,
        theme: editingFestival.theme,
        banner: editingFestival.banner,
        offers: editingFestival.offers,
        customMessages: editingFestival.customMessages
      });
    } else {
      // Reset form for new festival
      setFormData({
        name: '',
        date: new Date().toISOString().split('T')[0],
        endDate: '',
        isActive: true,
        theme: {
          primaryColor: '#6366F1',
          secondaryColor: '#8B5CF6',
          accentColor: '#EC4899',
          gradientFrom: '#6366F1',
          gradientTo: '#8B5CF6'
        },
        banner: {
          text: '',
          emoji: '🎉',
          subtext: ''
        },
        offers: [
          {
            title: '',
            description: '',
            discount: 10,
            emoji: '🎁'
          }
        ],
        customMessages: {
          welcome: '',
          dashboard: '',
          suppliers: ''
        }
      });
    }
    setErrors({});
    setSelectedColorPreset('Custom');
  }, [editingFestival, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Festival name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Festival date is required';
    }

    if (!formData.banner.text.trim()) {
      newErrors.bannerText = 'Banner text is required';
    }

    if (formData.offers[0] && formData.offers[0].title && !formData.offers[0].description.trim()) {
      newErrors.offerDescription = 'Offer description is required when title is provided';
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
      // Filter out empty offers
      const filteredOffers = formData.offers.filter(offer => offer.title.trim() && offer.description.trim());
      
      const festivalData = {
        ...formData,
        offers: filteredOffers,
        banner: {
          ...formData.banner,
          text: formData.banner.text || `Happy ${formData.name}!`
        },
        customMessages: {
          welcome: formData.customMessages.welcome || `Celebrate ${formData.name} with BazAIr!`,
          dashboard: formData.customMessages.dashboard || `Special ${formData.name} deals available!`,
          suppliers: formData.customMessages.suppliers || `Find ${formData.name} suppliers today!`
        }
      };

      await onSave(festivalData);
      onClose();
    } catch (error) {
      console.error('Failed to save festival:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleColorPresetChange = (presetName: string) => {
    setSelectedColorPreset(presetName);
    const preset = colorPresets.find(p => p.name === presetName);
    if (preset) {
      setFormData(prev => ({
        ...prev,
        theme: {
          primaryColor: preset.primary,
          secondaryColor: preset.secondary,
          accentColor: preset.accent,
          gradientFrom: preset.gradientFrom,
          gradientTo: preset.gradientTo
        }
      }));
    }
  };

  const addOffer = () => {
    setFormData(prev => ({
      ...prev,
      offers: [...prev.offers, { title: '', description: '', discount: 10, emoji: '🎁' }]
    }));
  };

  const removeOffer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index)
    }));
  };

  const updateOffer = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      offers: prev.offers.map((offer, i) => 
        i === index ? { ...offer, [field]: value } : offer
      )
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div 
              className="p-3 rounded-xl"
              style={{ 
                background: `linear-gradient(135deg, ${formData.theme.gradientFrom}, ${formData.theme.gradientTo})` 
              }}
            >
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {editingFestival ? 'Edit Festival' : 'Add New Festival'}
              </h2>
              <p className="text-gray-600">Create a themed experience for your users</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Type className="w-5 h-5" />
                <span>Basic Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Festival Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Independence Day"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Festival Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty for single-day festivals</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'active' }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Theme Colors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Theme Colors</span>
              </h3>

              {/* Color Presets */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleColorPresetChange(preset.name)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedColorPreset === preset.name
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Preview */}
              <div 
                className="h-20 rounded-lg mb-4 flex items-center justify-center text-white font-semibold"
                style={{ 
                  background: `linear-gradient(135deg, ${formData.theme.gradientFrom}, ${formData.theme.gradientTo})` 
                }}
              >
                <span className="text-2xl mr-2">{formData.banner.emoji}</span>
                <span>Preview: {formData.name || 'Festival Name'}</span>
              </div>

              {/* Custom Colors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary</label>
                  <input
                    type="color"
                    value={formData.theme.primaryColor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      theme: { ...prev.theme, primaryColor: e.target.value }
                    }))}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary</label>
                  <input
                    type="color"
                    value={formData.theme.secondaryColor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      theme: { ...prev.theme, secondaryColor: e.target.value }
                    }))}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent</label>
                  <input
                    type="color"
                    value={formData.theme.accentColor}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      theme: { ...prev.theme, accentColor: e.target.value }
                    }))}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gradient End</label>
                  <input
                    type="color"
                    value={formData.theme.gradientTo}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      theme: { ...prev.theme, gradientTo: e.target.value }
                    }))}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Banner Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Banner Settings</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Text *
                  </label>
                  <input
                    type="text"
                    value={formData.banner.text}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      banner: { ...prev.banner, text: e.target.value }
                    }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.bannerText ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Happy Independence Day!"
                  />
                  {errors.bannerText && <p className="text-red-500 text-sm mt-1">{errors.bannerText}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emoji
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          banner: { ...prev.banner, emoji }
                        }))}
                        className={`p-2 text-2xl rounded-lg transition-colors ${
                          formData.banner.emoji === emoji
                            ? 'bg-blue-100 ring-2 ring-blue-500'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtext (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.banner.subtext}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      banner: { ...prev.banner, subtext: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Celebrating 77 years of freedom"
                  />
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Tag className="w-5 h-5" />
                <span>Special Offers</span>
              </h3>

              {formData.offers.map((offer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">Offer {index + 1}</h4>
                    {formData.offers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOffer(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Title
                      </label>
                      <input
                        type="text"
                        value={offer.title}
                        onChange={(e) => updateOffer(index, 'title', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Freedom Special"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount %
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={offer.discount}
                        onChange={(e) => updateOffer(index, 'discount', parseInt(e.target.value) || 0)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={offer.description}
                        onChange={(e) => updateOffer(index, 'description', e.target.value)}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.offerDescription ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Get 15% off on all orders above ₹500"
                      />
                      {errors.offerDescription && <p className="text-red-500 text-sm mt-1">{errors.offerDescription}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Emoji
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['🎁', '🎆', '✨', '🌟', '💫', '🎈'].map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => updateOffer(index, 'emoji', emoji)}
                            className={`p-2 text-xl rounded-lg transition-colors ${
                              offer.emoji === emoji
                                ? 'bg-blue-100 ring-2 ring-blue-500'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addOffer}
                className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                + Add Another Offer
              </button>
            </div>
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
            className="px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{editingFestival ? 'Update Festival' : 'Create Festival'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};