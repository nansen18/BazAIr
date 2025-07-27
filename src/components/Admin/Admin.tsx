import React, { useState } from 'react';
import { VendorVerification } from './VendorVerification';
import { SupplierApproval } from './SupplierApproval';
import { PriceMonitoring } from './PriceMonitoring';
import { FeedbackSystem } from './FeedbackSystem';
import { FestivalManager } from './FestivalManager';
import { Settings, Shield, CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('vendors');

  const tabs = [
    { id: 'vendors', label: 'Vendors', icon: CheckCircle },
    { id: 'suppliers', label: 'Suppliers', icon: Shield },
    { id: 'monitoring', label: 'Monitoring', icon: AlertTriangle },
    { id: 'feedback', label: 'Feedback', icon: Settings },
    { id: 'festivals', label: 'Festivals', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-[#543310] p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#543310] mb-2">Admin Panel</h2>
        <p className="text-gray-600">Manage vendors, suppliers, and platform quality</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="flex border-b">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'text-[#543310] border-b-2 border-[#ADEFD1] bg-[#ADEFD1]/5'
                  : 'text-gray-600 hover:text-[#543310]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'vendors' && <VendorVerification />}
          {activeTab === 'suppliers' && <SupplierApproval />}
          {activeTab === 'monitoring' && <PriceMonitoring />}
          {activeTab === 'feedback' && <FeedbackSystem />}
          {activeTab === 'festivals' && <FestivalManager />}
        </div>
      </div>
    </div>
  );
};