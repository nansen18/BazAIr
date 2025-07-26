import React from 'react';
import { Star, MapPin, Phone } from 'lucide-react';
import { Vendor } from '../../types';

interface VendorListProps {
  vendors: Vendor[];
}

export const VendorList: React.FC<VendorListProps> = ({ vendors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-[#543310] mb-4">Group Members</h3>
      
      <div className="space-y-4">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#ADEFD1] rounded-full flex items-center justify-center">
                <span className="text-[#543310] font-bold text-lg">
                  {vendor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-[#543310]">{vendor.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {vendor.verified && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                ✓ Verified
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};