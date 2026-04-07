import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product, User, ProductCategory } from '../types';

// Expanded mock data with a wide variety of vegetables and products
const mockProducts: Product[] = [
  { id: 1, name: 'Organic Tomatoes', price: 40, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Nashik, Maharashtra', category: 'Vegetable', stock: 100 },
  { id: 2, name: 'Basmati Rice', price: 120, unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Amritsar, Punjab', category: 'Grain', stock: 500 },
  { id: 3, name: 'Fresh Paneer', price: 350, unit: 'kg', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'Sonipat, Haryana', category: 'Dairy', stock: 20 },
  { id: 4, name: 'Alphonso Mangoes', price: 800, unit: 'dozen', image: 'https://images.unsplash.com/photo-1553279768-115437813583?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Fruit', stock: 120 },
  { id: 5, name: 'Spinach (Palak)', price: 25, unit: 'bunch', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Nashik, Maharashtra', category: 'Vegetable', stock: 50 },
  { id: 6, name: 'Mustard Oil', price: 180, unit: 'litre', image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c366?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Amritsar, Punjab', category: 'Other', stock: 200 },
  { id: 7, name: 'A2 Milk', price: 70, unit: 'litre', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'Sonipat, Haryana', category: 'Dairy', stock: 30 },
  { id: 8, name: 'Red Onions', price: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Vegetable', stock: 500 },
  // New Additions - Vegetables
  { id: 9, name: 'Potatoes (Aloo)', price: 25, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Indore, MP', category: 'Vegetable', stock: 1000 },
  { id: 10, name: 'Cauliflower (Gobi)', price: 45, unit: 'pc', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Pune, Maharashtra', category: 'Vegetable', stock: 150 },
  { id: 11, name: 'Cabbage (Patta Gobi)', price: 30, unit: 'pc', image: 'https://images.unsplash.com/photo-1629158582766-3d2b2718712a?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'Nashik, Maharashtra', category: 'Vegetable', stock: 200 },
  { id: 12, name: 'Brinjal (Baingan)', price: 40, unit: 'kg', image: 'https://images.unsplash.com/photo-1605333519391-72993856d35d?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Punjab', category: 'Vegetable', stock: 80 },
  { id: 13, name: 'Okra (Bhindi)', price: 50, unit: 'kg', image: 'https://images.unsplash.com/photo-1577218678077-8c4d29a008c3?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Nagpur, Maharashtra', category: 'Vegetable', stock: 100 },
  { id: 14, name: 'Carrots (Gajar)', price: 60, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'Ooty, TN', category: 'Vegetable', stock: 300 },
  { id: 15, name: 'Green Chilies', price: 80, unit: 'kg', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Guntur, AP', category: 'Vegetable', stock: 50 },
  { id: 16, name: 'Ginger (Adrak)', price: 120, unit: 'kg', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Kerala', category: 'Vegetable', stock: 60 },
  { id: 17, name: 'Garlic (Lahsun)', price: 150, unit: 'kg', image: 'https://images.unsplash.com/photo-1615484477214-3d0d86050b1d?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'MP', category: 'Vegetable', stock: 70 },
  { id: 18, name: 'Cucumber (Kheera)', price: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Pune', category: 'Vegetable', stock: 150 },
  { id: 19, name: 'Capsicum (Shimla Mirch)', price: 70, unit: 'kg', image: 'https://images.unsplash.com/photo-1563565375-f3fdf5d6c469?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Himachal', category: 'Vegetable', stock: 90 },
  { id: 20, name: 'Pumpkin (Kaddu)', price: 20, unit: 'kg', image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'UP', category: 'Vegetable', stock: 200 },
  { id: 21, name: 'Bottle Gourd (Lauki)', price: 25, unit: 'kg', image: 'https://images.unsplash.com/photo-1582315729706-e7ddcc76f62b?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'Bihar', category: 'Vegetable', stock: 120 },
  { id: 22, name: 'Bitter Gourd (Karela)', price: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1623956327339-4d6d6d4e1f74?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Gujarat', category: 'Vegetable', stock: 80 },
  { id: 23, name: 'Lemon (Nimbu)', price: 100, unit: 'kg', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Vijayawada', category: 'Fruit', stock: 100 },
  { id: 24, name: 'Green Peas (Matar)', price: 60, unit: 'kg', image: 'https://images.unsplash.com/photo-1590453303863-14d9e0339d73?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Punjab', category: 'Vegetable', stock: 180 },
  { id: 25, name: 'Coriander (Dhaniya)', price: 20, unit: 'bunch', image: 'https://images.unsplash.com/photo-1589366650462-87063d894b98?auto=format&fit=crop&w=500&q=80', farmer: 'Meena Devi', location: 'Delhi', category: 'Vegetable', stock: 60 },
  { id: 26, name: 'Bananas', price: 40, unit: 'dozen', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80', farmer: 'Suresh Patel', location: 'Jalgaon', category: 'Fruit', stock: 500 },
  { id: 27, name: 'Watermelon', price: 25, unit: 'kg', image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&w=500&q=80', farmer: 'Harpreet Singh', location: 'Punjab', category: 'Fruit', stock: 300 },
  { id: 28, name: 'Papaya', price: 35, unit: 'kg', image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Pune', category: 'Fruit', stock: 150 },
];

const categories: ProductCategory[] = ['All', 'Vegetable', 'Fruit', 'Grain', 'Dairy', 'Other'];

interface MarketplacePageProps {
  currentUser: User | null;
  onAddToCart: (product: Product) => void;
}

const MarketplacePage: React.FC<MarketplacePageProps> = ({ currentUser, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Marketplace</h1>
        </div>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search for products, farmers, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-green"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
         <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        selectedCategory === category
                        ? 'bg-brand-green text-white shadow'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 col-span-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="mt-2 text-xl font-medium text-gray-800">No products found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;