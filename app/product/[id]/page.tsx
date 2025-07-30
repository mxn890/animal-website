'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head'; // ✅ import Head to control <head>
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { GiftCardData, giftCardsData } from '@/data/giftCards';
import { useCart } from '@/contexts/CartContext';

interface Props {
  params: { id: string };
}

const ProductDetailPage = ({ params }: Props) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<GiftCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const foundProduct = giftCardsData.find(card => card.id === params.id);
    setTimeout(() => {
      setProduct(foundProduct || null);
      setLoading(false);
    }, 300);
  }, [params.id]);

  useEffect(() => {
    if (product?.amounts.length && selectedAmount === 0) {
      setSelectedAmount(product.amounts[0]);
    }
  }, [product?.amounts, selectedAmount]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-gray-200 rounded mb-4 mx-auto"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <Button 
              onClick={() => router.push('/shop')} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Back to Shop
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (selectedAmount === 0) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        selectedAmount,
        price: selectedAmount
      });
    }

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
  };

  const totalPrice = selectedAmount * quantity;

  return (
    <Layout>
      {/* ✅ Dynamic Meta Tags */}
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.fullDescription} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.fullDescription} />
        <meta property="og:image" content={product.image} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-6 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full max-h-96 object-contain p-6"
                />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Why Choose {product.title}?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {['Instant digital delivery', 'No expiration date', 'Easy to redeem', 'Perfect for gifting'].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating}.0)</span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
              </div>

              {/* Purchase Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Select Amount</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                  {product.amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-3 rounded-lg border-2 text-center transition-colors ${
                        selectedAmount === amount
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 hover:border-purple-500 text-gray-800'
                      }`}
                    >
                      <div className="font-bold">${amount}</div>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">${selectedAmount}.00 USD</span>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-lg w-8 text-center text-gray-900">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-purple-600">${totalPrice}.00</span>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  className={`w-full py-4 text-lg font-semibold transition-colors ${
                    isAddedToCart 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  disabled={selectedAmount === 0}
                >
                  {isAddedToCart ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add {quantity} to Cart
                    </>
                  )}
                </Button>

                {isAddedToCart && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                    {quantity} {product.title} gift card{quantity > 1 ? 's' : ''} (${selectedAmount}) added to your cart.
                  </div>
                )}

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <span className="text-purple-600">🔒</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Checkout</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Your transaction is secured with 256-bit encryption. Instant delivery guaranteed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;

