import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/context/ProductContext';

interface ProductCardProps {
  product: Product;
  showBuyNow?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showBuyNow = false }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
    setIsAdded(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // Calculate a random rating between 3.5 and 5 for demo purposes
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 1;

  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="h-full flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        {/* Image with proper aspect ratio and containment */}
        <div className="relative h-60 overflow-hidden bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
          
          {/* Wishlist button */}
          <button 
            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist functionality here
            }}
          >
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </button>
          
          {/* Badge for category or sale */}
          {product.category && (
            <span className="absolute bottom-3 left-3 bg-petgreen-600 text-white text-xs px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>

        <CardContent className="pt-4 pb-2 flex-1">
          {/* Rating */}
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(Number(rating)) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              {rating} ({reviewCount})
            </span>
          </div>
          
          {/* Product name and price */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-petgreen-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="font-bold text-petgreen-700 whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Weight/specs */}
          <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="flex gap-2 pt-0 pb-4">
          {showBuyNow ? (
            <Link
              href={`/product/${product.id}`}
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button 
                variant="default" 
                className="w-full bg-teal-600 hover:bg-teal-700 transition-colors duration-200"
              >
                View Details
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="flex-1 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 transition-colors duration-200"
              disabled={isAdded}
            >
              {isAdded ? (
                <>
                  <Check size={16} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add to Cart
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;