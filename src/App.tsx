import React, { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { GroupOrders } from './components/GroupOrders/GroupOrders';
import { Suppliers } from './components/Suppliers/Suppliers';
import { Insights } from './components/Insights/Insights';
import { Admin } from './components/Admin/Admin';
import { useFestivalTheme } from './hooks/useFestivalTheme';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { currentTheme, hasActiveTheme } = useFestivalTheme();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'group':
        return <GroupOrders />;
      case 'suppliers':
        return <Suppliers />;
      case 'insights':
        return <Insights />;
      case 'admin':
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage}
      festivalTheme={hasActiveTheme ? currentTheme : null}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;