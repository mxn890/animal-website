'use client'
import { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard';
import ProductFilter, { FilterState } from '@/components/ProductFilter';
import Image from 'next/image';

const CustomBanner = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  image,
  imagePosition = 'right',
  className = ''
}: {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imagePosition?: 'left' | 'right';
  className?: string;
}) => {
  return (
    <div className={`relative bg-gray-900 text-white overflow-hidden rounded-xl md:rounded-2xl ${className}`}>
      <div className={`container mx-auto px-4 py-12 md:py-16 flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="md:w-1/2 flex flex-col justify-center p-4 md:p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{title}</h2>
          <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">{subtitle}</p>
          <a 
            href={buttonLink}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-medium w-fit transition-colors text-sm md:text-base"
          >
            {buttonText}
          </a>
        </div>
        <div className="md:w-1/2 h-48 sm:h-64 md:h-auto relative mt-4 md:mt-0">
          <div className="absolute inset-0 bg-black/30"></div>
          <Image 
            src={image}
            alt="Banner image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

const DogFoodPage = () => {
  const { dogFoodProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(dogFoodProducts);
  
  const handleFilterChange = (filters: FilterState) => {
    const filtered = dogFoodProducts.filter(product => {
      const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return priceInRange;
    });
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Image Background */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image 
          src="/images/dog22.png" 
          alt="Happy dog with food"
          fill
          className="object-cover"
          priority
        />
        {/* Black overlay with opacity */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 md:mb-4 tracking-tight">
              Premium Dog Nutrition
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
              Scientifically formulated meals for every stage of your dog's life.
            </p>
            <div className="mt-6 md:mt-8">
              <button className="bg-white text-teal-900 px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-base md:text-lg">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6 sticky top-4">
              <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-gray-800 border-b pb-2 md:pb-3">
                Refine Selection
              </h2>
              <ProductFilter 
                onFilterChange={handleFilterChange} 
                category="dog" 
              />
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">
                Our Dog Food Collection
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 md:py-12 bg-white rounded-lg md:rounded-xl shadow-sm">
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-800">No matching products</h3>
                <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
                  We couldn't find any products matching your filters.
                </p>
                <button 
                  onClick={() => handleFilterChange({
                    priceRange: [0, 1000],
                    types: [],
                    lifestage: []
                  })}
                  className="mt-3 md:mt-4 text-blue-600 text-sm md:text-base font-medium hover:text-blue-800 transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Value Proposition Section */}
        <div className="mt-8 md:mt-12 bg-white rounded-lg md:rounded-2xl shadow-sm overflow-hidden">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="p-4 md:p-6 text-center">
              <div className="mx-auto w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Veterinarian Approved</h3>
              <p className="text-gray-600 text-xs md:text-sm">Formulated with guidance from canine experts</p>
            </div>
            <div className="p-4 md:p-6 text-center">
              <div className="mx-auto w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">High Energy Formula</h3>
              <p className="text-gray-600 text-xs md:text-sm">Premium proteins for active dogs</p>
            </div>
            <div className="p-4 md:p-6 text-center">
              <div className="mx-auto w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-gray-800">Natural Ingredients</h3>
              <p className="text-gray-600 text-xs md:text-sm">No artificial preservatives or fillers</p>
            </div>
          </div>
        </div>
        
        {/* Promotional Banner */}
        <CustomBanner 
          title="Special Offer for New Customers" 
          subtitle="Get 20% off your first order of premium dog food. Use code DOGLOVE at checkout." 
          buttonText="Shop Now" 
          buttonLink="/special-offer"
          image="/images/dog-eating1.png"
          imagePosition="right"
          className="mt-8 md:mt-12"
        />
      </div>
    </div>
  );
};

export default DogFoodPage;