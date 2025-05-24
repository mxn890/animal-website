'use client'
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={48} className="mx-auto mb-4 sm:mb-6 text-gray-400" />
          <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Your Cart is Empty</h1>
          <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link href="/">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2 sm:py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 sm:pb-4 text-sm sm:text-base">Product</th>
                    <th className="text-center pb-3 sm:pb-4 text-sm sm:text-base">Quantity</th>
                    <th className="text-right pb-3 sm:pb-4 text-sm sm:text-base">Price</th>
                    <th className="text-right pb-3 sm:pb-4 text-sm sm:text-base">Total</th>
                    <th className="pb-3 sm:pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-3 sm:mr-4"
                          />
                          <div>
                            <Link 
                              href={`/product/${item.id}`} 
                              className="font-medium text-sm sm:text-base hover:text-teal-600 line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs sm:text-sm text-gray-500 capitalize">{item.category} Food</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-teal-50 text-teal-600"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <span className="mx-2 sm:mx-3 text-sm sm:text-base">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-teal-50 text-teal-600"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 text-right text-sm sm:text-base">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-3 sm:py-4 text-right font-medium text-sm sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-3 sm:py-4 text-right">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 sm:p-2 text-gray-500 hover:text-teal-600"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 sm:mt-6 text-right">
              <Link href="/">
                <Button 
                  variant="outline" 
                  className="text-teal-600 border-teal-600 hover:bg-teal-50 text-sm sm:text-base"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Order Summary</h2>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3">
                <div className="flex justify-between font-bold text-sm sm:text-base">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm sm:text-base py-2 sm:py-3 mb-3 sm:mb-4">
              Proceed to Checkout
            </Button>
            
            <div className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              <p>Free shipping on all orders over $50</p>
              <p className="mt-1 sm:mt-2">Need Help? Call us at 1-800-123-4567</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;