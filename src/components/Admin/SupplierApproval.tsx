import React from 'react';
import { useState } from 'react';
import { Shield, Star, MapPin, FileText } from 'lucide-react';

export const SupplierApproval: React.FC = () => {
  const [pendingSuppliers, setPendingSuppliers] = useState([
    {
      id: 's4',
      name: 'Fresh Garden Wholesale',
      location: 'Guindy Market',
      rating: 0,
      speciality: ['Organic Vegetables', 'Fruits'],
      documents: ['FSSAI License', 'GST Certificate', 'Quality Certificate'],
      status: 'pending',
      appliedDate: '2024-12-21'
    },
    {
      id: 's5',
      name: 'Spice Masters Ltd',
      location: 'Sowcarpet',
      rating: 0,
      speciality: ['Spices', 'Masala', 'Dry Goods'],
      documents: ['FSSAI License', 'GST Certificate'],
      status: 'reviewing',
      appliedDate: '2024-12-20'
    }
  ]);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState('');

  const handleApprove = (supplierId: string) => {
    console.log('Approving supplier:', supplierId);
    setPendingSuppliers(suppliers => 
      suppliers.map(supplier => 
        supplier.id === supplierId 
          ? { ...supplier, status: 'approved' }
          : supplier
      )
    );
    // Simulate API call
    setTimeout(() => {
      alert('Supplier approved successfully!');
    }, 500);
  };

  const handleRequestInfo = (supplier: any) => {
    console.log('Requesting more info from supplier:', supplier.id);
    setSelectedSupplier(supplier);
    setShowRequestModal(true);
  };

  const handleReject = (supplierId: string) => {
    console.log('Rejecting supplier:', supplierId);
    setPendingSuppliers(suppliers => 
      suppliers.map(supplier => 
        supplier.id === supplierId 
          ? { ...supplier, status: 'rejected' }
          : supplier
      )
    );
    // Simulate API call
    setTimeout(() => {
      alert('Supplier rejected successfully!');
    }, 500);
  };

  const sendRequestInfo = () => {
    console.log('Sending request for more info:', requestMessage);
    // Simulate API call
    setTimeout(() => {
      alert('Request sent to supplier successfully!');
      setShowRequestModal(false);
      setRequestMessage('');
      setSelectedSupplier(null);
    }, 500);
  };

  return (
    <>
      <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#543310]">Supplier Approval</h3>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
          {pendingSuppliers.length} Pending
        </span>
      </div>

      <div className="space-y-4">
        {pendingSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-[#543310] mb-1">{supplier.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span className="capitalize">{supplier.status}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {supplier.speciality.map((spec, index) => (
                    <span key={index} className="bg-[#FFA351]/20 text-[#543310] px-2 py-1 rounded text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Quality Certificates:</p>
              <div className="space-y-1">
                {supplier.documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <FileText className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{doc}</span>
                    <span className="text-green-600">✓ Submitted</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => handleApprove(supplier.id)}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer"
              >
                Approve
              </button>
              <button 
                onClick={() => handleRequestInfo(supplier)}
                className="flex-1 border border-gray-300 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Request More Info
              </button>
              <button 
                onClick={() => handleReject(supplier.id)}
                className="flex-1 bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Request More Info Modal */}
      {showRequestModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#543310]">Request More Information</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Send a message to <strong>{selectedSupplier.name}</strong> requesting additional information.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] resize-none"
                rows={4}
                placeholder="Please provide additional documentation for..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={sendRequestInfo}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer"
              >
                Send Request
              </button>
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};