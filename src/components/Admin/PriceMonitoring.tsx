import React from 'react';
import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export const PriceMonitoring: React.FC = () => {
  const [priceAlerts, setPriceAlerts] = useState([
    {
      id: 'alert1',
      item: 'Onions',
      supplier: 'FreshFarm Traders',
      currentPrice: 45,
      marketPrice: 32,
      difference: 13,
      type: 'overpriced',
      severity: 'high'
    },
    {
      item: 'Tomatoes',
      supplier: 'Green Valley Suppliers',
      currentPrice: 38,
      marketPrice: 42,
      difference: -4,
      type: 'underpriced',
      severity: 'low',
      actionTaken: false
    },
    {
      id: 'alert3',
      item: 'Green Chilies',
      supplier: 'Metro Fresh Wholesale',
      currentPrice: 65,
      marketPrice: 40,
      difference: 25,
      type: 'overpriced',
      severity: 'critical',
      actionTaken: false
    }
  ]);

  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [actionType, setActionType] = useState('');
  const [actionNotes, setActionNotes] = useState('');

  const handleTakeAction = (alert: any) => {
    console.log('Taking action on alert:', alert.id);
    setSelectedAlert(alert);
    setShowActionModal(true);
  };

  const executeAction = () => {
    console.log('Executing action:', actionType, 'for alert:', selectedAlert?.id);
    console.log('Action notes:', actionNotes);
    
    // Update alert status
    setPriceAlerts(alerts => 
      alerts.map(alert => 
        alert.id === selectedAlert?.id 
          ? { ...alert, actionTaken: true }
          : alert
      )
    );

    // Simulate API call
    setTimeout(() => {
      alert(`Action "${actionType}" executed successfully!`);
      setShowActionModal(false);
      setActionType('');
      setActionNotes('');
      setSelectedAlert(null);
    }, 500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#543310]">Price Monitoring</h3>
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          {priceAlerts.filter(alert => alert.severity === 'critical').length} Critical
        </span>
      </div>

      <div className="space-y-3">
        {priceAlerts.map((alert, index) => (
          <div key={index} className={`rounded-lg p-4 border ${getSeverityColor(alert.severity)}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <div>
                  <h4 className="font-semibold">{alert.item}</h4>
                  <p className="text-sm opacity-80">{alert.supplier}</p>
                </div>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50 capitalize">
                {alert.severity}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="opacity-80">Current Price</p>
                <p className="font-semibold">₹{alert.currentPrice}/kg</p>
              </div>
              <div>
                <p className="opacity-80">Market Price</p>
                <p className="font-semibold">₹{alert.marketPrice}/kg</p>
              </div>
              <div>
                <p className="opacity-80">Difference</p>
                <div className="flex items-center space-x-1">
                  {alert.type === 'overpriced' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="font-semibold">
                    {alert.difference > 0 ? '+' : ''}₹{alert.difference}
                  </span>
                </div>
              </div>
            </div>

            {alert.severity === 'critical' && (
              <div className="mt-3 pt-3 border-t border-current/20">
                <button 
                  onClick={() => handleTakeAction(alert)}
                  className="bg-white text-current px-3 py-1 rounded text-xs font-medium hover:bg-current/10 transition-colors cursor-pointer"
                >
                  {alert.actionTaken ? 'Action Taken' : 'Take Action'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Take Action Modal */}
      {showActionModal && selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#543310]">Take Action</h3>
              <button
                onClick={() => setShowActionModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                <strong>{selectedAlert.item}</strong> from <strong>{selectedAlert.supplier}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Current: ₹{selectedAlert.currentPrice}/kg | Market: ₹{selectedAlert.marketPrice}/kg
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Type
              </label>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1]"
              >
                <option value="">Select action...</option>
                <option value="contact_supplier">Contact Supplier</option>
                <option value="price_negotiation">Price Negotiation</option>
                <option value="find_alternative">Find Alternative Supplier</option>
                <option value="suspend_supplier">Suspend Supplier</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] resize-none"
                rows={3}
                placeholder="Add notes about the action taken..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={executeAction}
                disabled={!actionType}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Execute Action
              </button>
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};