"use client";
import React, { useEffect, useState } from "react";
import client from "@/lib/sanity";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  deliveryNotes: string;
  products: Product[];
}

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123" // In production, use environment variables and proper hashing
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        const query = `*[_type == "order"] | order(_createdAt desc) {
          _id,
          name,
          email,
          phone,
          company,
          address,
          address2,
          city,
          state,
          country,
          zipCode,
          deliveryNotes,
          products
        }`;
        const data = await client.fetch(query);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">🔒</span>
              Admin Login
            </h1>
            <p className="text-gray-500 mt-2">Please sign in to access orders</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">📦</span>
              Orders
            </h1>
            <p className="text-gray-500 mt-1">Manage and view all customer orders</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <span className="text-gray-600">Total Orders:</span>
              <span className="ml-2 font-semibold text-blue-600">{orders.length}</span>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-gray-700 text-sm transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
            <div className="text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700">No orders yet</h3>
            <p className="text-gray-500 mt-2">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">{order.name}</h2>
                      <p className="text-sm text-gray-500">Order #{order._id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="hidden md:inline">Placed on</span> {new Date().toLocaleDateString()}
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">CONTACT</h3>
                      <p className="text-gray-800">{order.email}</p>
                      <p className="text-gray-800">{order.phone}</p>
                      {order.company && <p className="text-gray-800">{order.company}</p>}
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">SHIPPING ADDRESS</h3>
                      <p className="text-gray-800">
                        {order.address} {order.address2 && `, ${order.address2}`}
                      </p>
                      <p className="text-gray-800">
                        {order.city}, {order.state}, {order.country} - {order.zipCode}
                      </p>
                    </div>

                    {/* Delivery Notes */}
                    {order.deliveryNotes && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">DELIVERY NOTES</h3>
                        <p className="text-gray-800 italic">"{order.deliveryNotes}"</p>
                      </div>
                    )}
                  </div>

                  {/* Products Table */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4">Order Items</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {order.products?.map((product) => (
                            <tr key={product.id}>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{product.quantity}</td>
                              <td className="px-4 py-3 text-sm font-medium text-blue-600">${(product.price * product.quantity).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-end mt-4">
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="flex items-center space-x-8">
                          <span className="text-sm font-medium text-gray-600">Order Total:</span>
                          <span className="text-lg font-bold text-blue-600">
                            ${order.products?.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}