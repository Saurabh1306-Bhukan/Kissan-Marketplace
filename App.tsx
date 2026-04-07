import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import SmartFarmingPage from './pages/SmartFarmingPage';
import DashboardPage from './pages/DashboardPage';
import { User, Page, Role, Product, CartItem } from './types';
import LoginModal from './components/LoginModal';
import CartModal from './components/CartModal';

// Toast component defined inline to reduce file count
const Toast: React.FC<{ message: string, onDismiss: () => void }> = ({ message, onDismiss }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed top-20 right-4 bg-brand-green text-white py-3 px-5 rounded-lg shadow-lg z-[100] animate-fade-in-out">
      {message}
    </div>
  );
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);

  const showToast = (message: string) => {
    setToast({ message, key: Date.now() });
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    setCartItems([]);
    setIsCartOpen(false);
    showToast("Order placed successfully! The farmer has been notified.");
  };
  
  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (role: Role) => {
    const user: User = {
      name: role === 'farmer' ? 'Ramesh Kumar' : 'Priya Sharma',
      role: role,
    };
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    setCurrentPage('marketplace');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);
  
  const cartItemCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'marketplace':
        return <MarketplacePage currentUser={currentUser} onAddToCart={handleAddToCart} />;
      case 'smart-farming':
        return <SmartFarmingPage />;
      case 'dashboard':
        return currentUser?.role === 'farmer' ? <DashboardPage user={currentUser} /> : <MarketplacePage currentUser={currentUser} onAddToCart={handleAddToCart} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {toast && <Toast key={toast.key} message={toast.message} onDismiss={() => setToast(null)} />}
      <Header
        user={currentUser}
        onNavigate={handleNavigation}
        onLoginClick={openLoginModal}
        onLogout={handleLogout}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;