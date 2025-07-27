import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import { BottomNav } from './BottomNav';
import { FestivalTheme } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  festivalTheme?: FestivalTheme | null;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange, festivalTheme }) => {
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getToastColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      <Navbar onShowToast={showToast} festivalTheme={festivalTheme} />
      <main className="flex-1 pb-20 px-4 py-6 max-w-md mx-auto w-full">
        {children}
      </main>
      <BottomNav 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
        festivalTheme={festivalTheme}
      />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-4 ${getToastColor(toastMessage.type)} text-white px-4 py-2 rounded-lg shadow-lg z-[9999] transition-all duration-300 transform animate-in slide-in-from-right-2`}>
          {toastMessage.message}
        </div>
      )}
    </div>
  );
};