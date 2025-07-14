'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { XCircle, AlertTriangle, CreditCard, Shield, RotateCw, ArrowRight } from 'lucide-react';

const PaymentError = () => {
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 to-white">
      <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-rose-100/80">
            {/* Animated status bar */}
            <div className="relative h-1.5 bg-gradient-to-r from-rose-400 to-pink-500">
              <div className="absolute inset-0 bg-rose-100 animate-pulse opacity-70"></div>
            </div>
            
            <div className="p-8 sm:p-10 text-center">
              {/* Animated error icon */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                  <XCircle className="w-12 h-12 text-rose-600" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <div className="w-6 h-6 bg-rose-500 rounded-full animate-ping"></div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Payment Not Completed
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't process your transaction. Please try another payment method.
              </p>
              
              {/* Error details card */}
              <div className="bg-rose-50/60 border border-rose-200 rounded-xl p-5 mb-7 text-left">
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-2.5 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Transaction Error</h3>
                    <p className="text-gray-600">Unable to process payment at this time</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-white px-2 py-1 rounded border border-rose-200 text-rose-700">Code: ERR_402</span>
                      {countdown > 0 && (
                        <span className="text-xs text-rose-700">Retry available in {countdown}s</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment details */}
              <div className="bg-gray-50/70 rounded-xl p-5 mb-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Selected Payment</h3>
                      <p className="text-xs text-gray-500">VISA •••• 4242</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">Not Processed</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Security Verified</h3>
                    <p className="text-xs text-gray-500">No charges were made</p>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/checkout" className="w-full sm:w-auto">
                  <Button className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2">
                    <RotateCw className="w-4 h-4" />
                    Use Different Payment Method
                  </Button>
                </Link>
                
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2">
                    Need Help?
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 mt-6">
                If the issue persists, please wait
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;