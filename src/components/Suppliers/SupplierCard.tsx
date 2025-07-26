import React, { useState } from 'react';
import { Star, MapPin, Clock, Truck, CheckCircle } from 'lucide-react';
import { Supplier } from '../../types';

interface SupplierCardProps {
  supplier: Supplier;
  onSelect: (supplier: Supplier) => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(true);
    onSelect(supplier);
    setTimeout(() => setIsSelected(false), 2000);
  };

  if (isSelected) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-xl mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800 mb-1">Supplier Selected!</h3>
            <p className="text-green-600 text-sm">
              {supplier.name} has been notified of your order
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            You'll receive delivery updates via WhatsApp
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#543310] mb-1">{supplier.name}</h3>
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < supplier.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">({supplier.rating})</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{supplier.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#543310]">₹{supplier.price}</div>
          <div className="text-sm text-gray-500">per order</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{supplier.deliveryTime}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Truck className="w-4 h-4 mr-1" />
          <span>{supplier.deliveryType}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Specialties:</div>
        <div className="flex flex-wrap gap-2">
          {supplier.specialties.map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[#ADEFD1]/20 text-[#543310] text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleSelect}
        className="w-full bg-[#FFA351] text-white py-3 rounded-xl font-semibold hover:bg-[#FFA351]/90 transition-colors cursor-pointer"
      >
        Select Supplier
      </button>
    </div>
  );
};