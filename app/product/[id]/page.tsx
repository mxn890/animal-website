'use client'
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronDown, ChevronUp, Info, Check, Star, ChevronLeft, ChevronRight, CheckCircle2 as CheckCircle, Truck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  // Get the ID from params
  const id = params?.id as string;
  
  // Convert id string to number
  const productId = id ? parseInt(id, 10) : 0;
  
  // Get product details
  const product = getProductById(productId);
  
  // Get related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h1>
        <p className="mb-8 text-gray-600">The product you are looking for does not exist or has been removed.</p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-petgreen-600 hover:bg-petgreen-700 text-white"
        >
          Return to Home
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-white">
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        >
          <ChevronLeft size={18} /> Back to Products
        </Button>
        
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails - Vertical */}
            <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-16 h-16 min-w-[64px] border rounded-md overflow-hidden transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIndex === index 
                      ? 'ring-2 ring-petgreen-500 border-petgreen-500' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 order-1 md:order-2 relative">
              <div className="border rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center h-[400px] md:h-[500px] relative">
                <Image
                  src={product.images[activeImageIndex]} 
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  priority
                />
                
                {product.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all cursor-pointer"
                    >
                      <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all cursor-pointer"
                    >
                      <ChevronRight size={24} className="text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Navigation Dots */}
              {product.images.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        activeImageIndex === index 
                          ? 'bg-petgreen-600 w-4' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      size={18}
                      className={`${
                        star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(42 reviews)</span>
              </div>
              
              <p className="text-2xl font-bold text-petgreen-700 mb-4 text-black">${product.price.toFixed(2)}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="bg-petgreen-100 text-petgreen-800 px-2 py-1 rounded text-sm">
                  {product.category === 'dog' ? 'Dog Food' : 'Cat Food'}
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {product.weight}
                </div>
              </div>
              
              <div className="my-4">
                <h3 className="font-semibold mb-1 text-gray-900">Highlights:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                    <span>Made with high-quality, natural ingredients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                    <span>No artificial preservatives or colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                    <span>Supports healthy digestion and shiny coat</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="text-green-600 font-medium">In Stock ({product.stock} available)</p>
                      <p className="text-sm text-gray-600">Ships within 1-2 business days</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>
              
              <Button 
                onClick={handleAddToCart} 
                className={`w-full h-12 text-white  bg-teal-600 ${
                  isAddedToCart 
                    ? 'bg-teal-600 hover:bg-teal-700' 
                    : 'bg-teal-900 hover:bg-teal-900'
                } transition-colors cursor-pointer`}
                disabled={isAddedToCart || product.stock === 0}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="mr-2" size={18} /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2" size={18} /> Add to Cart
                  </>
                )}
              </Button>
              
              <div className="border rounded-lg p-4 hover:border-gray-400 transition-colors cursor-default">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Truck size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Free Delivery</p>
                    <p className="text-sm text-gray-600">For all orders over $50</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger 
                  value="description" 
                  className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="feeding" 
                  className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  Feeding Guide
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <Card className="p-6 border-gray-200 text-black">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Product Details</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Key Features</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Premium quality ingredients for optimal pet health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Formulated by veterinary nutritionists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Supports immune system and digestive health</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Made in USA with globally sourced ingredients</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>
              
              <TabsContent value="feeding" className="mt-4">
                <Card className="p-6 border-gray-200">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Feeding Guide</h3>
                  <p className="text-gray-700 mb-4">Recommended daily feeding amounts (cups per day):</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="p-3 text-left border-b text-gray-700">Pet Weight</th>
                          <th className="p-3 text-left border-b text-gray-700">Daily Amount</th>
                          <th className="p-3 text-left border-b text-gray-700">Meals Per Day</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50 cursor-default">
                          <td className="p-3 text-gray-700">5-10 lbs</td>
                          <td className="p-3 text-gray-700">1/2 to 3/4 cup</td>
                          <td className="p-3 text-gray-700">2</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 cursor-default">
                          <td className="p-3 text-gray-700">10-15 lbs</td>
                          <td className="p-3 text-gray-700">3/4 to 1 cup</td>
                          <td className="p-3 text-gray-700">2</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50 cursor-default">
                          <td className="p-3 text-gray-700">15-20 lbs</td>
                          <td className="p-3 text-gray-700">1 to 1 1/4 cups</td>
                          <td className="p-3 text-gray-700">2</td>
                        </tr>
                        <tr className="hover:bg-gray-50 cursor-default">
                          <td className="p-3 text-gray-700">20-30 lbs</td>
                          <td className="p-3 text-gray-700">1 1/4 to 1 3/4 cups</td>
                          <td className="p-3 text-gray-700">2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 hover:bg-yellow-100 transition-colors cursor-default">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Adjust feeding amount to maintain ideal body condition. Fresh water should be available at all times. 
                          Consult your veterinarian for specific dietary needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customers also bought</h2>
            <Button 
              variant="ghost" 
              className="text-petgreen-600 hover:text-petgreen-700 hover:bg-petgreen-50 cursor-pointer"
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;