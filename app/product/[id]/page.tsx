'use client';
import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2 as CheckCircle,
  Truck,
  Star,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const id = params?.id as string;
  const product = getProductById(id);

  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h1>
        <p className="mb-8 text-gray-600">
          The product you are looking for does not exist or has been removed.
        </p>
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
          className="mb-6 flex items-center gap-1 text-gray-700 bg-white hover:text-gray-900 hover:bg-gray-100"
        >
          <ChevronLeft size={18} /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
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
                    sizes="64px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 order-1 md:order-2 relative">
              <div
                ref={imageRef}
                className="border rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center h-[400px] md:h-[500px] relative cursor-zoom-in"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
              >
                <Image
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority={activeImageIndex === 0}
                />
                {isHovering && (
                  <div
                    className="absolute inset-0 bg-no-repeat bg-[length:200%] pointer-events-none hidden md:block"
                    style={{
                      backgroundImage: `url(${product.images[activeImageIndex]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      opacity: 0.8,
                    }}
                  />
                )}
                {product.images.length > 2 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
                    >
                      <ChevronLeft size={24} className="text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
                    >
                      <ChevronRight size={24} className="text-gray-700" />
                    </button>
                  </>
                )}
              </div>

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
                        star <= 4
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-2xl font-bold text-petgreen-700 mb-4 text-black">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="bg-petgreen-100 text-petgreen-800 px-2 py-1 rounded text-sm">
                  {product.category === 'dog' ? 'Dog Food' : 'Cat Food'}
                </div>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {product.weight}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="text-green-600 font-medium">
                        In Stock ({product.stock} available)
                      </p>
                      <p className="text-sm text-gray-600">Ships within 1-2 business days</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                className={`w-full h-12 text-white ${
                  isAddedToCart
                    ? 'bg-teal-600 hover:bg-teal-700'
                    : 'bg-teal-900 hover:bg-teal-900'
                } transition-colors`}
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

              <div className="border rounded-lg p-4 hover:border-gray-400 transition-colors">
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
                  className="py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm text-gray-700 hover:text-gray-900"
                >
                  Description
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card className="p-6 border-gray-200 text-black">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    Product Details
                  </h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>

                  <h3 className="font-semibold text-lg mb-3 text-gray-900">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Crafted with high‑quality materials and components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Designed with pets' comfort and well‑being in mind</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Tested and recommended by pet care specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="text-petgreen-600 mt-0.5 flex-shrink-0" />
                      <span>Built to support long‑lasting use and reliability</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customers also bought</h2>
            <Button
              variant="ghost"
              className="text-petgreen-600 hover:text-petgreen-700 hover:bg-petgreen-50"
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
