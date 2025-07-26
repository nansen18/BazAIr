import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, Upload } from 'lucide-react';

export const VendorVerification: React.FC = () => {
  const [vendors, setVendors] = useState([
    {
      id: 'v5',
      name: 'Arjun Patel',
      location: 'Adyar, Chennai',
      phone: '+91 94321 67890',
      documents: ['ID Card', 'Address Proof'],
      status: 'pending',
      appliedDate: '2024-12-22'
    },
    {
      id: 'v6',
      name: 'Meera Krishnan',
      location: 'Velachery, Chennai',
      phone: '+91 93210 98765',
      documents: ['ID Card', 'Address Proof', 'Business License'],
      status: 'reviewing',
      appliedDate: '2024-12-21'
    }
  ]);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: 'approved' }
        : vendor
    ));
  };

  const handleReview = (vendor: any) => {
    setSelectedVendor(vendor);
    setShowReviewModal(true);
  };

  const handleReject = (vendorId: string) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: 'rejected' }
        : vendor
    ));
    setShowRejectModal(false);
    setRejectionReason('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'reviewing':
        return <Upload className="w-4 h-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'border-green-200 bg-green-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const pendingCount = vendors.filter(v => v.status === 'pending' || v.status === 'reviewing').length;

  return (
    <>
      <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#543310]">Vendor Verification</h3>
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            {pendingCount} Pending
        </span>
      </div>

      <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className={`rounded-lg p-4 border ${getStatusColor(vendor.status)}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-[#543310]">{vendor.name}</h4>
                <p className="text-sm text-gray-600">{vendor.location}</p>
                <p className="text-sm text-gray-600">{vendor.phone}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(vendor.status)}
                <span className="text-sm text-gray-600 capitalize">{vendor.status}</span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Documents Submitted:</p>
              <div className="flex flex-wrap gap-1">
                {vendor.documents.map((doc, index) => (
                  <span key={index} className="bg-[#ADEFD1]/20 text-[#543310] px-2 py-1 rounded text-xs">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

              {vendor.status === 'approved' ? (
                <div className="text-center py-2">
                  <span className="text-green-600 font-medium">✅ Vendor Approved</span>
                </div>
              ) : vendor.status === 'rejected' ? (
                <div className="text-center py-2">
                  <span className="text-red-600 font-medium">❌ Vendor Rejected</span>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleApprove(vendor.id)}
                    className="flex-1 bg-[#ADEFD1] text-[#543310] py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReview(vendor)}
                    className="flex-1 border border-gray-300 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Review
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedVendor(vendor);
                      setShowRejectModal(true);
                    }}
                    className="flex-1 bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#543310]">Vendor Details</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-[#543310] font-semibold">{selectedVendor.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-600">{selectedVendor.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-600">{selectedVendor.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Applied Date</label>
                <p className="text-gray-600">{selectedVendor.appliedDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Documents</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedVendor.documents.map((doc: string, index: number) => (
                    <span key={index} className="bg-[#ADEFD1]/20 text-[#543310] px-2 py-1 rounded text-xs">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  handleApprove(selectedVendor.id);
                  setShowReviewModal(false);
                }}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#543310]">Reject Vendor</h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">
              Are you sure you want to reject <strong>{selectedVendor.name}</strong>?
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason (Optional)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] resize-none"
                rows={3}
                placeholder="Enter reason for rejection..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleReject(selectedVendor.id)}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors cursor-pointer"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
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