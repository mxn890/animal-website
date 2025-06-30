'use client'
import { CreditCard } from 'lucide-react';

const CreditCardPayment = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Card Number</label>
          <input 
            type="text" 
            placeholder="1234 5678 9012 3456" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
          <input 
            type="text" 
            placeholder="MM/YY" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">CVV</label>
          <input 
            type="text" 
            placeholder="123" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name on Card</label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
        <CreditCard className="h-4 w-4 text-teal-600" />
        <span>Payments are secure and encrypted</span>
      </div>
    </div>
  );
};

export default CreditCardPayment;