import React from 'react';
import { Clock, Package, CheckCircle, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'delivered' | 'pending' | 'cancelled';
  supplier: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    date: '2024-01-15',
    items: ['Onions 10kg', 'Tomatoes 6kg', 'Chilies 2kg'],
    total: 650,
    status: 'delivered',
    supplier: 'FreshFarm Traders'
  },
  {
    id: '2',
    date: '2024-01-14',
    items: ['Potatoes 8kg', 'Carrots 3kg', 'Masala Pack 1 unit'],
    total: 420,
    status: 'pending',
    supplier: 'VeggieMart'
  },
  {
    id: '3',
    date: '2024-01-13',
    items: ['Rice 5kg', 'Oil 2L', 'Salt 1kg'],
    total: 380,
    status: 'delivered',
    supplier: 'Grocery Hub'
  }
];

export const RecentOrders: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#543310]">Recent Orders</h3>
        <button className="text-[#FFA351] text-sm font-medium hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-[#543310]">Order #{order.id}</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{order.supplier}</p>
                <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[#543310]">₹{order.total}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {order.items.join(', ')}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total this week:</span>
          <span className="font-semibold text-[#543310]">₹1,450</span>
        </div>
      </div>
    </div>
  );
};