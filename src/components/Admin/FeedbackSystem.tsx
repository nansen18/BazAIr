import React from 'react';
import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

export const FeedbackSystem: React.FC = () => {
  const [feedback, setFeedback] = useState([
    {
      id: 'f1',
      vendor: 'Raj Kumar',
      supplier: 'FreshFarm Traders',
      rating: 5,
      comment: 'Excellent quality vegetables, delivered on time. Very satisfied!',
      date: '2024-12-22',
      type: 'positive',
      resolved: false
    },
    {
      id: 'f2',
      vendor: 'Priya Devi',
      supplier: 'Green Valley Suppliers',
      rating: 2,
      comment: 'Late delivery and some vegetables were not fresh. Need improvement.',
      date: '2024-12-21',
      type: 'negative',
      resolved: false
    },
    {
      id: 'f3',
      vendor: 'Kumar Singh',
      supplier: 'Metro Fresh Wholesale',
      rating: 4,
      comment: 'Good service overall, but pricing could be more competitive.',
      date: '2024-12-20',
      type: 'positive',
      resolved: false
    }
  ]);

  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null);

  const handleMarkResolved = (feedbackId: string) => {
    console.log('Marking feedback as resolved:', feedbackId);
    setFeedback(feedbackList => 
      feedbackList.map(item => 
        item.id === feedbackId 
          ? { ...item, resolved: true }
          : item
      )
    );
    // Simulate API call
    setTimeout(() => {
      alert('Feedback marked as resolved successfully!');
    }, 500);
  };

  const handleContactVendor = (feedbackItem: any) => {
    console.log('Contacting vendor for feedback:', feedbackItem.id);
    setSelectedFeedback(feedbackItem);
    setShowContactModal(true);
  };

  const sendContactMessage = () => {
    console.log('Sending message to vendor:', selectedFeedback?.vendor);
    console.log('Message:', contactMessage);
    
    // Simulate API call
    setTimeout(() => {
      alert('Message sent to vendor successfully!');
      setShowContactModal(false);
      setContactMessage('');
      setSelectedFeedback(null);
    }, 500);
  };

  const toggleExpandFeedback = (feedbackId: string) => {
    setExpandedFeedback(expandedFeedback === feedbackId ? null : feedbackId);
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#543310]">Vendor Feedback</h3>
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            78% Positive
          </span>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            22% Issues
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {feedback.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-3 sm:p-4 border overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className={`p-2 rounded-lg ${item.type === 'positive' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {item.type === 'positive' ? (
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <ThumbsDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-[#543310]">{item.vendor}</h4>
                  <p className="text-sm text-gray-600 break-words">about {item.supplier}</p>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(item.rating)}
                </div>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>

            <div className="bg-white rounded p-3 border-l-4 border-l-[#ADEFD1] mb-3">
              <div className="flex items-start space-x-2">
                <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700 break-words overflow-wrap-anywhere leading-relaxed">
                    {expandedFeedback === item.id ? item.comment : truncateText(item.comment)}
                  </p>
                  {item.comment.length > 100 && (
                    <button
                      onClick={() => toggleExpandFeedback(item.id)}
                      className="text-xs text-[#543310] hover:text-[#543310]/80 mt-1 font-medium cursor-pointer"
                    >
                      {expandedFeedback === item.id ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <button 
                onClick={() => handleMarkResolved(item.id)}
                disabled={item.resolved}
                className={`text-xs px-3 py-2 sm:py-1 rounded transition-colors cursor-pointer min-h-[44px] sm:min-h-auto flex items-center justify-center ${
                  item.resolved 
                    ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                    : 'bg-[#ADEFD1]/20 text-[#543310] hover:bg-[#ADEFD1]/30'
                }`}
              >
                {item.resolved ? 'Resolved' : 'Mark as Resolved'}
              </button>
              <button 
                onClick={() => handleContactVendor(item)}
                className="text-xs border border-gray-300 text-gray-600 px-3 py-2 sm:py-1 rounded hover:bg-gray-50 transition-colors cursor-pointer min-h-[44px] sm:min-h-auto flex items-center justify-center"
              >
                Contact Vendor
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Contact Vendor Modal */}
      {showContactModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#543310]">Contact Vendor</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-2 break-words">
                Send a message to <strong>{selectedFeedback.vendor}</strong>
              </p>
              <div className="bg-gray-50 p-3 rounded-lg mb-3 overflow-hidden">
                <p className="text-sm text-gray-700">Original feedback:</p>
                <p className="text-sm italic break-words overflow-wrap-anywhere">"{selectedFeedback.comment}"</p>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ADEFD1] resize-none text-sm"
                rows={4}
                placeholder="Thank you for your feedback. We would like to discuss..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={sendContactMessage}
                disabled={!contactMessage.trim()}
                className="flex-1 bg-[#ADEFD1] text-[#543310] py-3 rounded-xl font-semibold hover:bg-[#ADEFD1]/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
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