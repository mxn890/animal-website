'use client'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About ZeenMart - Premium Pet Food & Supplies Online</title>
        <meta name="description" content="Discover ZeenMart's story - your trusted online destination for high-quality pet food, accessories, and supplies. Fast shipping, expert support, and curated products for pet lovers." />
        <meta name="keywords" content="pet food, dog food, cat food, pet supplies, online pet store, premium pet food, ZeenMart" />
        <meta property="og:title" content="About ZeenMart - Premium Pet Food & Supplies Online" />
        <meta property="og:description" content="Discover ZeenMart's story - your trusted online destination for high-quality pet food, accessories, and supplies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.zeenmart.com/about" />
        <meta property="og:image" content="https://www.zeenmart.com/images/about-social-share.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About ZeenMart - Premium Pet Food & Supplies Online" />
        <meta name="twitter:description" content="Discover ZeenMart's story - your trusted online destination for high-quality pet food, accessories, and supplies." />
        <meta name="twitter:image" content="https://www.zeenmart.com/images/about-social-share.jpg" />
        <link rel="canonical" href="https://www.zeenmart.com/about" />
      </Head>

      <div className="bg-white text-gray-800 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <Image
            src="/images/a.png"
            alt="Happy dog and cat with ZeenMart pet food"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 font-extrabold">
                About ZeenMart
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Making pet parenting easier with premium food, expert advice, and fast delivery
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          {/* Introduction Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                We're Here to Make Pet Shopping Easier, Smarter, and More Personal
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
                At ZeenMart, we believe that 'online pet shopping' should mean more than just 'Add to Cart.' 
                It should feel easy, reliable, and a bit exciting as well.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Our Mission
                </h3>
                <p className="mb-6 text-gray-600">
                  We are an online marketplace designed for pet parents who seek quality, convenience, 
                  and care all in one place. Whether you're buying premium pet food, treats, or essential 
                  supplies, you can make informed shopping decisions with ZeenMart.
                </p>
                <p className="text-gray-600">
                  We're proud to serve millions of satisfied customers with fast shipping, fair pricing, 
                  and a commitment to customer-first service that makes pet parenting easier.
                </p>
              </div>
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/a1.png"
                  alt="Happy pets with ZeenMart products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/a2.png"
                  alt="ZeenMart pet food products"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="bg-gray-50 p-6 md:p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  What Makes ZeenMart Different?
                </h3>
                <p className="mb-6 text-gray-600">
                  In a world of infinite choices, it's easy to feel like just another order number. 
                  At ZeenMart, we're doing things differently to put pets and their parents first.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">Hand-picked products for quality and value</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">Fast, reliable nationwide delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">Real customer support from pet-loving experts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-600">Convenient shopping with secure checkout and easy returns</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="mb-16 bg-teal-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  How It All Started
                </h3>
                <p className="mb-4 text-gray-600">
                  ZeenMart was born out of a simple frustration that many pet owners can relate to: 
                  the constant hassle of finding reliable, healthy, and affordable pet food online.
                </p>
                <p className="mb-4 text-gray-600">
                  Our founders—pet lovers and ecommerce experts—ventured to create a smarter way to shop. 
                  A platform where the best of premium quality, trusted brands, and doorstep delivery 
                  come together to make life easier for pet parents.
                </p>
                <p className="text-gray-600">
                  What began as a solution for pet food has grown into a comprehensive destination 
                  for all your pet's needs, always with the same commitment to quality and service.
                </p>
              </div>
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/a3.png"
                  alt="ZeenMart founders with their pets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                What We Offer
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Whether it's a tiny kitten or a big dog, we carry the right food for every palate, 
                size, and dietary need.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-teal-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Dog Food</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Dry and wet formulas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Grain-free and sensitive formulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>High-protein, organic, and raw options</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-teal-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Cat Food</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Dry and wet varieties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Limited ingredient diets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Veterinary recommended formulas</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-teal-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">More for Your Pets</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Healthy treats and supplements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Essential accessories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2 mt-1">•</span>
                    <span>Grooming and care products</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src="/images/a4.png"
                    alt="Quality check of ZeenMart pet food"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-10 bg-gray-50">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Quality Promise</h3>
                  <p className="mb-6 text-gray-600">
                    For freshness, authenticity, and nutritional quality, we work closely with leading 
                    manufacturers of pet foods. Every product sold on ZeenMart passes through rigorous 
                    checks for ingredient transparency, brand reputation, and customer feedback.
                  </p>
                  <Link href="/" className="bg-teal-500 text-white px-6 py-3 rounded-lg inline-block font-medium hover:bg-teal-600 transition-colors">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Why Pet Parents Choose Us
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-teal-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Curated Products</h3>
                <p className="text-gray-600">
                  We only sell what matters—best-rated foods and vet-approved treats that keep tails wagging.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-teal-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Fast Delivery</h3>
                <p className="text-gray-600">
                  We ship throughout the U.S., so your pet never has to miss a meal. Most orders ship within 24 hours.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-teal-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Expert Support</h3>
                <p className="text-gray-600">
                  Need help picking a diet? Our pet-loving team is available to help you make the right choices.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-teal-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Fair Prices</h3>
                <p className="text-gray-600">
                  No fake discounts. Just regular deals, bundles, and honest pricing that pet parents love.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 md:p-10 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Promise to You</h3>
              <p className="mb-6 text-lg max-w-3xl mx-auto">
                ZeenMart upholds integrity in sourcing and labeling pet products, ensuring always pet-first service. 
                We provide affordable, simple, and healthy solutions for every pet owner and every feeding routine.
              </p>
              <Link href="/" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors inline-block">
                Shop Now
              </Link>
            </div>
          </section>

          {/* Community Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Real Pets. Real Stories.</h2>
                <div className="w-24 h-1 bg-teal-500 mb-6"></div>
                <p className="mb-6 text-gray-600">
                  ZeenMart serves as a trusted partner for a thriving community of pet parents who 
                  cherish their pets. We take pride in the fact that every order we pack is for a 
                  furry friend and cherish that responsibility.
                </p>
                <p className="text-gray-600">
                  Whether you're a new pet owner or a seasoned dog mom or cat dad, we proudly welcome you 
                  to our family of happy pets and their loving owners.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/c1.png"
                    alt="Happy dog with ZeenMart food"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/c2.png"
                    alt="Happy cat with ZeenMart food"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/c3.png"
                    alt="Pet owner with ZeenMart package"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/c4.png"
                    alt="Multiple pets enjoying ZeenMart products"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Looking Ahead Section */}
          <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Looking Ahead
              </h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <p className="mb-6 text-gray-600">
                Our journey has just begun. As we grow, we're adding more specialized diets, 
                incorporating treats and dietary supplements, and improving our website to make 
                your shopping experience more seamless than ever.
              </p>
              <p className="mb-8 text-gray-600">
                Through all of this change, we remain committed to what really matters for your pets: 
                nutrition, tail-wagging moments, and nurturing relationships with pet parents.
              </p>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Together, Let's Keep Pets Healthy and Happy
              </h3>
              <Link href="/" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block">
                Shop Now
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Have Questions? We're Here to Help!
            </h2>
            <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated customer service team is always ready to assist you with any questions, 
              concerns, or suggestions about our products or your pet's needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://wa.me/447888267902" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.479 5.092 1.479 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link href="/" className="bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 rounded-full font-semibold transition-colors inline-block">
                Shop Now
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;