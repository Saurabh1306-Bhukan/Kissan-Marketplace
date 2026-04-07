import React from 'react';
import type { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-end z-[60]" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out" 
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">My Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {items.length === 0 ? (
            <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <h3 className="text-xl font-semibold text-gray-700 mt-4">Your cart is empty</h3>
                <p className="text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
                <button onClick={onClose} className="mt-6 bg-brand-green text-white font-bold py-2 px-6 rounded-md hover:bg-brand-green-dark transition-colors">
                    Start Shopping
                </button>
            </div>
        ) : (
            <>
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-grow">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">₹{item.price} / {item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-gray-200 rounded-full font-bold text-gray-600 hover:bg-gray-300">-</button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-gray-200 rounded-full font-bold text-gray-600 hover:bg-gray-300">+</button>
                    </div>
                    </div>
                ))}
                </div>
                <div className="p-4 border-t space-y-4">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Subtotal</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={onCheckout}
                        className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-md hover:bg-brand-green-dark transition-colors duration-300"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};

export default CartModal;