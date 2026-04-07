import React, { useState } from 'react';
import type { User, Page } from '../types';

interface HeaderProps {
  user: User | null;
  onNavigate: (page: Page) => void;
  onLoginClick: () => void;
  onLogout: () => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onLoginClick, onLogout, cartItemCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink: React.FC<{ page: Page; children: React.ReactNode }> = ({ page, children }) => (
    <button
      onClick={() => onNavigate(page)}
      className="text-gray-600 hover:text-brand-green-dark font-medium transition-colors duration-200"
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 4a1 1 0 00-.606.92l.5 9A1 1 0 004 17h2a1 1 0 001-1v-2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 00.994-1.08l.5-9a1 1 0 00-.606-.92l-7-4z" />
          </svg>
          <span className="text-2xl font-bold text-gray-800">Kisan<span className="text-brand-green">Marketplace</span></span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink page="home">Home</NavLink>
          <NavLink page="marketplace">Marketplace</NavLink>
          <NavLink page="smart-farming">Smart Farming</NavLink>
          {user?.role === 'farmer' && <NavLink page="dashboard">Dashboard</NavLink>}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={onCartClick} className="relative text-gray-600 hover:text-brand-green-dark p-2 rounded-full transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                <span className="font-medium">{user.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-brand-green-dark transition-colors duration-300"
            >
              Login / Sign Up
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center gap-2">
            <button onClick={onCartClick} className="relative text-gray-600 hover:text-brand-green-dark p-2 rounded-full transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{cartItemCount}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
        </div>
      </div>
       {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
            <a onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home</a>
            <a onClick={() => { onNavigate('marketplace'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Marketplace</a>
            <a onClick={() => { onNavigate('smart-farming'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Smart Farming</a>
            {user?.role === 'farmer' && <a onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</a>}
             <div className="border-t my-2"></div>
             {user ? (
                <a onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
             ) : (
                <a onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login / Sign Up</a>
             )}
        </div>
      )}
    </header>
  );
};

export default Header;