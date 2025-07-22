import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart, Check, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/context/ProductContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  showBuyNow?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showBuyNow = false }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('a') ||
      target.tagName === 'BUTTON' || 
      target.tagName === 'A'
    ) {
      return;
    }
    router.push(`/product/${product.id}`);
  };

  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 1;

  return (
    <motion.div 
      className="group relative"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card 
        className="h-full flex flex-col bg-white border border-gray-200/60 shadow-sm hover:shadow-lg hover:shadow-teal-100/30 transition-all duration-300 ease-out overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <button 
              onClick={handleWishlistToggle}
              className={`p-1.5 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110 ${
                isWishlisted 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500 shadow-md'
              }`}
            >
              <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <Link 
              href={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 bg-white/90 rounded-full backdrop-blur-sm border border-white/20 text-gray-600 hover:bg-teal-600 hover:text-white transition-all duration-200 hover:scale-110 shadow-md"
            >
              <Eye size={14} />
            </Link>
          </div>
          {product.category && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md">
                {product.category}
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1">
          <div className="flex items-center mb-3">
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={i < Math.floor(Number(rating)) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                {rating} ({reviewCount})
              </span>
            </div>
          </div>

          <h3 className="text-base font-semibold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 line-clamp-2 mb-2">
            {product.name}
          </h3>

          <div className="mb-3">
            <span className="text-xl font-bold text-teal-700">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {product.weight && (
            <p className="text-xs text-gray-500 mb-2 bg-gray-50 px-2 py-1 rounded inline-block">
              {product.weight}
            </p>
          )}

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {showBuyNow ? (
            <div className="w-full" onClick={(e) => e.stopPropagation()}>
              <Link
                href={`/product/${product.id}`}
                className="block w-full"
              >
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-2 rounded-lg shadow-md shadow-teal-200/30 hover:shadow-lg hover:shadow-teal-300/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Eye className="mr-2" size={16} />
                  View Details
                </Button>
              </Link>
            </div>
          ) : (
            <div className="w-full" onClick={(e) => e.stopPropagation()}>
              <Button
                onClick={handleAddToCart}
                size="sm"
                disabled={isAdded}
                className={`w-full font-medium py-2 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-0.5 ${
                  isAdded
                    ? 'bg-green-600 hover:bg-green-700 shadow-green-200/30 hover:shadow-green-300/40'
                    : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-teal-200/30 hover:shadow-lg hover:shadow-teal-300/40'
                } text-white`}
              >
                {isAdded ? (
                  <>
                    <Check className="mr-2" size={16} />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2" size={16} />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
