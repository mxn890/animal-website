'use client'
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/about1.png" // Replace with your image path
          alt="Happy pets"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl  mb-4 font-extrabold">
              About PetFoodHub
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Introduction Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
            Welcome to PetFoodHub
          </h2>
          <p className="text-lg mb-6">
            The UK's go-to store for high-quality food and accessories for cats and dogs at wholesale prices with free shipping nationwide.
          </p>
          <p className="mb-8">
            We believe that every pet deserves the best nutritious food, comfortable accessories, and endless love without costing their owners a fortune. That's why we offer premium, healthy pet food and durable accessories at very affordable rates.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/about3.png" // Replace with your image path
                alt="Cat and dog together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/about2.png" // Replace with your image path
                alt="Pet food"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Why Choose PetFoodHub?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Specialized for Cats & Dogs Only</h3>
              </div>
              <p>We know exactly what your furry friends need.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Healthy & Nutritious Food</h3>
              </div>
              <p>Vet-recommended, safe, and made to keep your pets strong and happy.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Affordable Accessories</h3>
              </div>
              <p>Beds, leashes, collars, toys, and more — all at wholesale prices.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Free UK-Wide Delivery</h3>
              </div>
              <p>No hidden costs. Get your order shipped for free, anywhere in the UK.</p>
            </div>
          </div>

          {/* Lowest Price Guarantee */}
          <div className="mt-8 bg-teal-50 border border-teal-100 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Lowest Prices Guaranteed</h3>
            <p className="text-lg">Get the best quality at a fraction of the retail cost.</p>
          </div>
        </section>

        {/* Team/CTA Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Passion for Pets</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            At PetFoodHub, we're pet lovers first and business owners second. Our team is dedicated to providing the best products and service to help you care for your furry family members.
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Shop Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;