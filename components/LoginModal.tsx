
import React, { useState } from 'react';
import type { Role } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (role: Role) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<Role>('consumer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const TabButton: React.FC<{ tab: 'login' | 'signup', children: React.ReactNode}> = ({ tab, children }) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`w-1/2 py-3 text-center font-semibold transition-colors duration-200 ${
            activeTab === tab 
            ? 'border-b-2 border-brand-green text-brand-green' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
    >
        {children}
    </button>
  );

  const RoleSelector: React.FC<{ role: Role, children: React.ReactNode}> = ({ role, children }) => (
    <label className={`flex-1 p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${
        selectedRole === role 
        ? 'bg-brand-green/10 border-brand-green text-brand-green-dark' 
        : 'bg-white border-gray-300 hover:border-gray-400'
    }`}>
        <input 
            type="radio" 
            name="role" 
            value={role} 
            checked={selectedRole === role}
            onChange={() => setSelectedRole(role)}
            className="sr-only"
        />
        {children}
    </label>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">{activeTab === 'login' ? 'Welcome Back!' : 'Join KisanBazaar'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b">
            <TabButton tab="login">Login</TabButton>
            <TabButton tab="signup">Sign Up</TabButton>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
            <div className="flex space-x-4">
                <RoleSelector role="consumer">Consumer</RoleSelector>
                <RoleSelector role="farmer">Farmer</RoleSelector>
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address (mock)</label>
            <input type="email" id="email" defaultValue={`test.${selectedRole}@example.com`} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Password (mock)</label>
            <input type="password" id="password" defaultValue="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-green focus:border-brand-green" />
          </div>

          <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-md hover:bg-brand-green-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green">
            {activeTab === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
       <style>{`
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
       `}</style>
    </div>
  );
};

export default LoginModal;
