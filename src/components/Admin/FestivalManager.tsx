import React, { useState } from 'react';
import { Calendar, Plus, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';
import { FestivalTheme } from '../../types';
import { FestivalModal } from './FestivalModal';

export const FestivalManager: React.FC = () => {
  const [festivals, setFestivals] = useState<FestivalTheme[]>([
    {
      id: 'independence-day-2024',
      name: 'Independence Day',
      date: '2024-08-15',
      isActive: true,
      theme: {
        primaryColor: '#FF6B35',
        secondaryColor: '#FFFFFF',
        accentColor: '#138808',
        gradientFrom: '#FF6B35',
        gradientTo: '#138808'
      },
      banner: {
        text: 'Happy Independence Day!',
        emoji: '🇮🇳',
        subtext: 'Celebrating 77 years of freedom'
      },
      offers: [
        {
          title: 'Freedom Special',
          description: 'Get 15% off on all orders above ₹500',
          discount: 15,
          emoji: '🎆'
        }
      ],
      customMessages: {
        welcome: 'Celebrate Independence with BazAIr! 🇮🇳',
        dashboard: 'Freedom to choose, freedom to grow!',
        suppliers: 'Connect with patriotic suppliers today!'
      }
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFestival, setEditingFestival] = useState<FestivalTheme | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const toggleFestivalStatus = (festivalId: string) => {
    setFestivals(festivals.map(festival => 
      festival.id === festivalId 
        ? { ...festival, isActive: !festival.isActive }
        : festival
    ));
  };

  const deleteFestival = (festivalId: string) => {
    if (confirm('Are you sure you want to delete this festival theme?')) {
      setFestivals(festivals.filter(festival => festival.id !== festivalId));
    }
  };

  const handleSaveFestival = async (festivalData: Omit<FestivalTheme, 'id'>) => {
    try {
      // Check for duplicates
      const isDuplicate = festivals.some(festival => 
        festival.name.toLowerCase() === festivalData.name.toLowerCase() && 
        festival.date === festivalData.date &&
        (!editingFestival || festival.id !== editingFestival.id)
      );

      if (isDuplicate) {
        throw new Error('A festival with this name and date already exists');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingFestival) {
        // Update existing festival
        setFestivals(festivals.map(festival => 
          festival.id === editingFestival.id 
            ? { ...festivalData, id: editingFestival.id }
            : festival
        ));
        setShowToast({ message: 'Festival updated successfully! 🎊', type: 'success' });
      } else {
        // Add new festival
        const newFestival: FestivalTheme = {
          ...festivalData,
          id: `festival_${Date.now()}`
        };
        setFestivals([...festivals, newFestival]);
        setShowToast({ message: 'Festival added successfully! 🎊', type: 'success' });
      }

      setShowAddModal(false);
      setEditingFestival(null);
    } catch (error) {
      console.error('Error saving festival:', error);
      setShowToast({ 
        message: error instanceof Error ? error.message : 'Failed to save festival. Please try again.', 
        type: 'error' 
      });
    }
  };

  const handleEditFestival = (festival: FestivalTheme) => {
    setEditingFestival(festival);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingFestival(null);
  };

  // Auto-hide toast after 3 seconds
  React.useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-[#543310]" />
          <h3 className="text-lg font-semibold text-[#543310]">Festival Theme Manager</h3>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#ADEFD1] text-[#543310] px-4 py-2 rounded-lg font-medium hover:bg-[#ADEFD1]/80 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Festival</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {festivals.map((festival) => (
          <div key={festival.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {/* Festival Preview */}
            <div 
              className="h-24 p-4 text-white relative"
              style={{
                background: `linear-gradient(135deg, ${festival.theme.gradientFrom}, ${festival.theme.gradientTo})`
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{festival.name}</h4>
                  <p className="text-sm opacity-90">{formatDate(festival.date)}</p>
                </div>
                <span className="text-3xl">{festival.banner.emoji}</span>
              </div>
            </div>

            {/* Festival Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${festival.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <span className="text-sm font-medium">
                    {festival.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {festival.offers.length} offer{festival.offers.length !== 1 ? 's' : ''}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{festival.banner.text}</p>

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFestivalStatus(festival.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      festival.isActive 
                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={festival.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {festival.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setEditingFestival(festival)}
                    onClick={() => handleEditFestival(festival)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => deleteFestival(festival.id)}
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

      {festivals.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Festival Themes</h3>
          <p className="text-gray-500 mb-4">Create your first festival theme to get started</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#ADEFD1] text-[#543310] px-6 py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors"
          >
            Add Festival Theme
          </button>
        </div>
      )}

      {/* Festival Modal */}
      <FestivalModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        onSave={handleSaveFestival}
        editingFestival={editingFestival}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-[10000] px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
          showToast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {showToast.message}
        </div>
      )}
    </div>
  );
};