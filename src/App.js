import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import MarketplacePage from './pages/MarketplacePage';
import CartPage from './pages/CartPage';
import BillingPage from './pages/BillingPage';
import StyleAssistantPage from './pages/StyleAssistantPage';
import ExpertReviewPage from './pages/ExpertReviewPage';
import SustainabilityPage from './pages/SustainabilityPage';
import { useApp } from './context/AppContext';
import './styles/index.css';

const AppContent = () => {
  const { state } = useApp();

  const renderCurrentPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'cart':
        return <CartPage />;
      case 'billing':
        return <BillingPage />;
      case 'style-assistant':
        return <StyleAssistantPage />;
      case 'expert-review':
        return <ExpertReviewPage />;
      case 'sustainability':
        return <SustainabilityPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
      <NotificationSystem />
    </AppProvider>
  );
}

export default App;