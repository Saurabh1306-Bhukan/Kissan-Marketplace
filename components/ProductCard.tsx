import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.farmer} - {product.location}</p>
        <div className="flex-grow"></div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-black text-brand-green">
            ₹{product.price}<span className="text-sm font-normal text-gray-600">/{product.unit}</span>
          </p>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-brand-green text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-green-dark transition-colors duration-300 text-sm flex items-center gap-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;