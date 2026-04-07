import React, { useState } from 'react';
import type { User, Product, Order, OrderStatus } from '../types';

interface DashboardPageProps {
  user: User;
}

// Mock data for the logged-in farmer - Expanded inventory
const initialFarmerProducts: Product[] = [
    { id: 4, name: 'Alphonso Mangoes', price: 800, unit: 'dozen', image: 'https://images.unsplash.com/photo-1553279768-115437813583?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Fruit', stock: 120 },
    { id: 8, name: 'Red Onions', price: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Vegetable', stock: 500 },
    { id: 9, name: 'Potatoes (Aloo)', price: 25, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Vegetable', stock: 1000 },
    { id: 15, name: 'Green Chilies', price: 80, unit: 'kg', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80', farmer: 'Ramesh Kumar', location: 'Ratnagiri, Maharashtra', category: 'Vegetable', stock: 50 },
];

const initialOrders: Order[] = [
    {
        id: 'ORD-7829',
        customerName: 'Priya Sharma',
        date: '2024-05-20',
        status: 'Pending',
        totalAmount: 1660,
        items: [
            { productId: 4, productName: 'Alphonso Mangoes', quantity: 2, price: 800, unit: 'dozen' },
            { productId: 8, productName: 'Red Onions', quantity: 2, price: 30, unit: 'kg' }
        ]
    },
    {
        id: 'ORD-7830',
        customerName: 'Amit Verma',
        date: '2024-05-19',
        status: 'Delivered',
        totalAmount: 800,
        items: [
            { productId: 4, productName: 'Alphonso Mangoes', quantity: 1, price: 800, unit: 'dozen' }
        ]
    },
    {
        id: 'ORD-7831',
        customerName: 'Sneha Gupta',
        date: '2024-05-21',
        status: 'Processing',
        totalAmount: 150,
        items: [
            { productId: 8, productName: 'Red Onions', quantity: 5, price: 30, unit: 'kg' }
        ]
    }
];

interface ProductRowProps {
    product: Product;
    onUpdateStock: (id: number, newStock: number) => void;
    onDelete: (id: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onUpdateStock, onDelete }) => (
    <div className="grid grid-cols-6 gap-4 items-center p-3 border-b hover:bg-gray-50 transition-colors duration-150">
        <div className="col-span-2 flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
            <span className="font-medium text-gray-800">{product.name}</span>
        </div>
        <div className="text-gray-600">₹{product.price} / {product.unit}</div>
        <div>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-32 bg-white">
                <button 
                    onClick={() => onUpdateStock(product.id, Math.max(0, product.stock - 1))}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 text-gray-600 transition-colors"
                >
                    -
                </button>
                <input 
                    type="number" 
                    className="w-full text-center focus:outline-none py-1 text-sm font-medium text-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    value={product.stock}
                    onChange={(e) => onUpdateStock(product.id, Math.max(0, parseInt(e.target.value) || 0))}
                />
                <button 
                    onClick={() => onUpdateStock(product.id, product.stock + 1)}
                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 text-gray-600 transition-colors"
                >
                    +
                </button>
            </div>
            <span className="text-xs text-gray-400 mt-1 block">Units available</span>
        </div>
        <div>
             <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {product.stock > 0 ? 'Active' : 'Out of Stock'}
             </span>
        </div>
        <div>
            <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium transition-colors">Edit</button>
            <button 
                onClick={() => onDelete(product.id)}
                className="text-red-600 hover:text-red-900 ml-4 text-sm font-medium transition-colors"
            >
                Delete
            </button>
        </div>
    </div>
);

const OrderRow: React.FC<{ order: Order; onStatusChange: (id: string, status: OrderStatus) => void }> = ({ order, onStatusChange }) => {
    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Processing': 'bg-blue-100 text-blue-800',
        'Shipped': 'bg-purple-100 text-purple-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };

    return (
        <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.date} • {order.customerName}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                    <span className="font-bold text-gray-800 text-lg">₹{order.totalAmount}</span>
                    <select 
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`text-xs font-bold uppercase px-3 py-1 rounded-full border-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-green cursor-pointer ${statusColors[order.status]}`}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="bg-gray-50 rounded p-3">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Items Ordered</p>
                <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm text-gray-700">
                            <span>{item.quantity} x {item.productName}</span>
                            <span>₹{item.price * item.quantity}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>(initialFarmerProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleUpdateStock = (id: number, newStock: number) => {
    setProducts(prevProducts => 
        prevProducts.map(p => p.id === id ? { ...p, stock: newStock } : p)
    );
  };

  const handleDelete = (id: number) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
          setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      }
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
      setOrders(prevOrders => prevOrders.map(o => 
          o.id === orderId ? { ...o, status: newStatus } : o
      ));
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
          </div>
          {activeTab === 'products' && (
            <button className="bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-brand-green-dark transition-colors duration-300 flex items-center gap-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                Add New Product
            </button>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="flex mt-8 border-b border-gray-200">
            <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-6 font-semibold transition-colors duration-200 border-b-2 ${activeTab === 'products' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                My Products
            </button>
            <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-6 font-semibold transition-colors duration-200 border-b-2 ${activeTab === 'orders' ? 'border-brand-green text-brand-green' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Incoming Orders
            </button>
        </div>
      </div>
      
      {activeTab === 'products' ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Product Listings</h2>
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    {/* Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-t-lg font-semibold text-gray-600 text-sm border-b border-gray-200 uppercase tracking-wider">
                        <div className="col-span-2">Product</div>
                        <div>Price</div>
                        <div>Stock</div>
                        <div>Status</div>
                        <div>Actions</div>
                    </div>
                    {/* Body */}
                    <div className="divide-y divide-gray-100">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductRow 
                                    key={product.id} 
                                    product={product} 
                                    onUpdateStock={handleUpdateStock}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                No products listed. Start by adding a new product above.
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>
      ) : (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
              {orders.length > 0 ? (
                  <div className="space-y-4">
                      {orders.map(order => (
                          <OrderRow key={order.id} order={order} onStatusChange={handleStatusChange} />
                      ))}
                  </div>
              ) : (
                  <div className="p-12 text-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      <p>No orders received yet.</p>
                  </div>
              )}
          </div>
      )}
    </div>
  );
};

export default DashboardPage;