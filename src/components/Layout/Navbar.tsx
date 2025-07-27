import React, { useState } from 'react';
import { Bell, ShoppingCart, User, Settings, LogOut, UserCircle, X, Save, Camera, Phone, MapPin, Mail } from 'lucide-react';
import { FestivalTheme } from '../../types';

interface NavbarProps {
  onShowToast?: (message: string, type: 'success' | 'error' | 'info') => void;
  festivalTheme?: FestivalTheme | null;
}

const Navbar: React.FC<NavbarProps> = ({ onShowToast, festivalTheme }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settingsData, setSettingsData] = useState({
    name: 'Raj Kumar',
    phone: '+91 98765 43210',
    location: 'T. Nagar, Chennai',
    email: 'raj.kumar@email.com',
    businessName: 'Raj\'s Street Food Corner',
    notifications: {
      orderUpdates: true,
      priceAlerts: true,
      groupOrders: true,
      promotions: false
    },
    preferences: {
      language: 'english',
      currency: 'inr',
      theme: 'light'
    }
  });

  const notifications = [
    { id: 1, message: "Your group order has been confirmed", time: "2 min ago", type: "success" },
    { id: 2, message: "New supplier available in your area", time: "1 hour ago", type: "info" },
    { id: 3, message: "Price alert: Onions dropped by 15%", time: "3 hours ago", type: "warning" },
  ];

  const handleSettingsClick = () => {
    console.log('Settings button clicked');
    setShowProfile(false);
    setShowSettings(true);
    onShowToast?.('Opening settings...', 'info');
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settingsData);
    // Simulate API call to save settings
    setTimeout(() => {
      onShowToast?.('Settings saved successfully!', 'success');
      setShowSettings(false);
    }, 500);
  };

  const handleSettingsChange = (field: string, value: any) => {
    setSettingsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettingsData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettingsData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };

  // Apply festival theme colors if available
  const logoGradient = festivalTheme 
    ? `linear-gradient(to right, ${festivalTheme.theme.primaryColor}, ${festivalTheme.theme.accentColor})`
    : 'linear-gradient(to right, #34D399, #F97316)';

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: logoGradient }}
          >
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">BazAIr</h1>
            <p className="text-xs text-gray-500">
              {festivalTheme ? `${festivalTheme.name} Special!` : 'Smarter Streets. Fresher Eats.'}
            </p>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#ADEFD1] rounded-full flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-[#543310]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Raj Kumar</h3>
                      <p className="text-sm text-gray-600">T. Nagar, Chennai</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button 
                    onClick={handleSettingsClick}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:bg-gray-100"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        console.log('Profile settings clicked via keyboard');
                        onShowToast?.('Profile settings opened', 'info');
                        setShowProfile(false);
                      }
                    }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Logout clicked');
                      // Simulate logout process
                      onShowToast?.('Logging out...', 'info');
                      setShowProfile(false);
                      
                      // Simulate logout delay
                      setTimeout(() => {
                        onShowToast?.('Logged out successfully! Redirecting...', 'success');
                        // Here you would typically:
                        // 1. Clear user session/tokens
                        // 2. Reset app state
                        // 3. Redirect to login page
                        console.log('User logged out successfully');
                      }, 1000);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer transition-colors duration-200 focus:outline-none focus:bg-gray-100"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        console.log('Logout clicked via keyboard');
                        onShowToast?.('Logging out...', 'info');
                        setShowProfile(false);
                        
                        setTimeout(() => {
                          onShowToast?.('Logged out successfully! Redirecting...', 'success');
                          console.log('User logged out successfully');
                        }, 1000);
                      }
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </nav>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-[#ADEFD1] p-2 rounded-lg">
                  <Settings className="w-6 h-6 text-[#543310]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#543310]">Settings</h2>
                  <p className="text-sm text-gray-600">Manage your profile and preferences</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-8">
                {/* Profile Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[#543310] mb-4">Profile Information</h3>
                  <div className="space-y-4">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-[#ADEFD1] rounded-full flex items-center justify-center">
                          <UserCircle className="w-12 h-12 text-[#543310]" />
                        </div>
                        <button className="absolute -bottom-1 -right-1 bg-[#FFA351] p-2 rounded-full text-white hover:bg-[#FFA351]/90 transition-colors cursor-pointer">
                          <Camera className="w-3 h-3" />
                        </button>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#543310]">Profile Picture</h4>
                        <p className="text-sm text-gray-600">Click the camera icon to update</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={settingsData.name}
                          onChange={(e) => handleSettingsChange('name', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={settingsData.businessName}
                          onChange={(e) => handleSettingsChange('businessName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            value={settingsData.phone}
                            onChange={(e) => handleSettingsChange('phone', e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            value={settingsData.email}
                            onChange={(e) => handleSettingsChange('email', e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={settingsData.location}
                            onChange={(e) => handleSettingsChange('location', e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-[#543310] mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    {Object.entries(settingsData.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-[#543310] capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'orderUpdates' && 'Get notified about order status changes'}
                            {key === 'priceAlerts' && 'Receive alerts when prices change significantly'}
                            {key === 'groupOrders' && 'Notifications about group buying opportunities'}
                            {key === 'promotions' && 'Marketing messages and promotional offers'}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleNotificationChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ADEFD1]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ADEFD1]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-[#543310] mb-4">App Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={settingsData.preferences.language}
                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="tamil">Tamil</option>
                        <option value="telugu">Telugu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={settingsData.preferences.currency}
                        onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                      >
                        <option value="inr">INR (₹)</option>
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select
                        value={settingsData.preferences.theme}
                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] transition-colors"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back to Profile
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 bg-[#ADEFD1] text-[#543310] rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;