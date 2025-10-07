'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, 
  ArrowRight,
  PawPrint,
  Heart,
  ShieldCheck,
  Truck,
  Star,
  CreditCard,
  Check,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcAmex,
  FaPoundSign
} from 'react-icons/fa';
import { SiBitcoin } from 'react-icons/si';

// Mock product data
const topProducts = [
  {
    id: 1,
    name: 'Applaws Natural Wet Cat Food',
    price: 15.60,
    image: '/cat/applaws.png',
    rating: 4.8,
    category: 'cat-food',
    description: 'High-quality natural cat food with chicken and fish selection',
    targetLink: '/cat-food'
  },
  {
    id: 2,
    name: 'Go-Cat Adult Chicken & Duck Dry Cat Food 10kg',
    price: 39.36,
    image: '/cat/gocat.png',
    rating: 4.9,
    category: 'cat-food',
    description: 'All-natural training treats with no artificial additives',
    targetLink: '/cat-food'
  },
  {
    id: 3,
    name: 'Burns Pet Nutrition Hypoallergenic Complete Dry Dog Food',
    price: 68.26,
    image: '/dog/burns.png',
    rating: 4.7,
    category: 'dog-food',
    description: 'Burns Pet Nutrition Hypoallergenic Complete Dry Dog Food Adult and Senior Dog Original Chicken and Brown Rice 12 kg',
    targetLink: '/dog-food'
  },
  {
    id: 4,
    name: 'FELIX Original Mixed Selection in Jelly',
    price: 14.99,
    image: '/cat/flex.png',
    rating: 4.5,
    category: '/cat-food',
    description: 'FELIX Original Mixed Selection in Jelly Wet Cat Food 40x85g',
    targetLink: '/cat-food'
  },
  {
    id: 5,
    name: 'Pedigree Schmackos Mega Pack 110 Strips',
    price: 15.99,
    image: '/dog/ped.png',
    rating: 4.8,
    category: 'dog-food',
    description: 'Pedigree Schmackos Mega Pack 110 Strips Snacks, Dog Treat Multipack with Beef, Lamb and Poultry Flavours, 790 g',
    targetLink: '/dog-food'
  },
  {
    id: 6,
    name: 'Harringtons Complete Wet Tray Grain Free Hypoallergenic Adult Dog Food',
    price: 30.31,
    image: '/dog/har.png',
    rating: 4.8,
    category: 'dog-food',
    description: 'Harringtons Complete Wet Tray Grain Free Hypoallergenic Adult Dog Food Meaty Bumper Pack 16x400g',
    targetLink: '/dog-food'
  },
  {
    id: 7,
    name: 'GOURMET Perle Ocean',
    price: 26.99,
    image: '/cat/perle0.png',
    rating: 4.9,
    category: 'cat-food',
    description: 'GOURMET Perle Ocean Collection Wet Cat Food 40x85g',
    targetLink: '/cat-food'
  },
  {
    id: 8,
    name: 'Purina ONE Adult Dry Cat Food',
    price: 16.99,
    image: '/cat/purina.png',
    rating: 4.9,
    category: 'cat-food',
    description: 'Purina ONE Adult Dry Cat Food Rich in Chicken 6kg',
    targetLink: '/cat-food'
  },
];

// Random names for purchase notifications
const customerNames = [
  'Sarah', 'Mike', 'Jessica', 'David', 'Emily', 'Chris', 'Amanda', 'James',
  'Lisa', 'Robert', 'Michelle', 'John', 'Jennifer', 'Michael', 'Linda', 'William',
  'Elizabeth', 'Daniel', 'Maria', 'Thomas', 'Susan', 'Charles', 'Margaret', 'Joseph'
];

// Random cities
const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
  'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus',
  'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Washington'
];

const HomePage = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    customerName: string;
    productName: string;
    timeAgo: string;
    city: string;
  }>>([]);

  const heroImages = [
    '/images/hero1.png',
    '/images/hero2.png',
    '/images/hero3.png'
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate random purchase notifications
  useEffect(() => {
    const generateNotification = () => {
      const randomProduct = topProducts[Math.floor(Math.random() * topProducts.length)];
      const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const minutesAgo = Math.floor(Math.random() * 10) + 1;
      
      const newNotification = {
        id: Date.now(),
        customerName: randomName,
        productName: randomProduct.name,
        timeAgo: `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`,
        city: randomCity
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Keep only last 5 notifications
    };

    // Generate first notification immediately
    generateNotification();

    // Set interval for new notifications (every 8-15 seconds)
    const interval = setInterval(generateNotification, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Real-time Purchase Notifications */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div 
            className="fixed bottom-4 left-4 z-50 max-w-xs sm:max-w-sm space-y-3"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4 relative"
              >
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                >
                  <X className="h-3 w-3 text-gray-600" />
                </button>
                
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      {notification.customerName} from {notification.city}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      purchased {notification.productName.split(' ').slice(0, 4).join(' ')}...
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.timeAgo}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full overflow-hidden">
        {heroImages.map((image, index) => (
          <motion.div 
            key={index}
            className={`absolute inset-0 ${index === currentHeroImage ? 'z-10' : 'z-0'}`}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentHeroImage ? 1 : 0,
              transition: { duration: 1 }
            }}
          >
            <Image
              src={image}
              alt={`Pet food ${index + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <motion.div 
                className="container mx-auto px-4 sm:px-6 text-white"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 max-w-2xl lg:max-w-3xl leading-tight">
                  Premium Nutrition for Your Beloved Pets
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-xl lg:max-w-2xl text-gray-100 leading-relaxed">
                  High-quality, vet-approved food for cats and dogs
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                      asChild
                    >
                      <Link href="/cat-food">
                        Shop Cat Food <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-transparent hover:bg-white/10 border-white text-white hover:text-white shadow-lg w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                      asChild
                    >
                      <Link href="/dog-food">
                        Shop Dog Food <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Features Banner */}
      <motion.section 
        className="bg-teal-100 py-8 sm:py-12 lg:py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: PawPrint, title: 'Premium Quality', desc: 'Vet-approved ingredients' },
              { icon: Heart, title: 'Healthy Pets', desc: 'Nutrition for vitality' },
              { icon: ShieldCheck, title: 'Safe Products', desc: 'Rigorously tested' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide shipping' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="flex flex-col items-center text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="p-3 sm:p-4 bg-teal-100 rounded-full mb-3 sm:mb-4">
                  <feature.icon className="h-6 sm:h-8 w-6 sm:w-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Payment Methods Section */}
      <motion.section 
        className="py-8 sm:py-10 bg-gray-50 border-t border-b border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <motion.h3 
              className="text-sm font-medium text-gray-500 mb-4 sm:mb-6 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <CreditCard className="h-4 w-4 text-teal-600" />
              SECURE PAYMENT METHODS
            </motion.h3>
            
            <div className="w-full max-w-3xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {/* Credit Cards */}
                <motion.div 
                  className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -5 }}
                >
                  <FaCcVisa className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-gray-600">Visa</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -5 }}
                >
                  <FaCcMastercard className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mb-1" />
                  <span className="text-xs font-medium text-gray-600">Mastercard</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -5 }}
                >
                  <FaCcAmex className="h-6 w-6 sm:h-8 sm:w-8 text-blue-800 mb-1" />
                  <span className="text-xs font-medium text-gray-600">Amex</span>
                </motion.div>
                
                {/* Cryptocurrencies */}
                <motion.div 
                  className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -5 }}
                >
                  <SiBitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mb-1" />
                  <span className="text-xs font-medium text-gray-600">Bitcoin</span>
                </motion.div>
              </div>
              
              {/* Bank Transfer */}
              <motion.div 
                className="mt-4 sm:mt-6 flex justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                  <FaPoundSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Bank Transfer</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Top Products */}
      <section className="py-10 sm:py-12 lg:py-16 container mx-auto px-4 sm:px-6 bg-white">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
              Our Top Products
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto">
            Loved by pets and trusted by owners nationwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {topProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-8 sm:mt-12 lg:mt-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg"
            variant="outline" 
            className="border-teal-600 text-teal-600 bg-white hover:bg-teal-50 hover:text-teal-700 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
            asChild
          >
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="lg:w-1/2 w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg aspect-video">
                  <Image
                    src="/images/hero4.png"
                    alt="About ZeenMart"
                    fill
                    className="object-cover h-full transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                  About ZeenMart
                </span>
              </h2>
              <p className="text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                Welcome to ZeenMart, the US go-to store for high-quality food and accessories for cats and dogs at wholesale prices with free shipping nationwide.
              </p>
              <p className="text-gray-800 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                We believe that every pet deserves the best nutritious food, comfortable accessories, and endless love without costing their owners a fortune. That's why we offer premium, healthy pet food and durable accessories at very affordable rates.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-10">
                <div className="flex items-start">
                  <PawPrint className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-sm sm:text-base"><strong>Specialized for Cats & Dogs Only</strong> – We know exactly what your furry friends need.</p>
                </div>
                <div className="flex items-start">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-sm sm:text-base"><strong>Healthy & Nutritious Food</strong> – Vet-recommended, safe, and made to keep your pets strong and happy.</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-sm sm:text-base"><strong>Affordable Accessories</strong> – Beds, leashes, collars, toys, and more — all at wholesale prices.</p>
                </div>
                <div className="flex items-start">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-sm sm:text-base"><strong>Free US-Wide Delivery</strong> – No hidden costs. Get your order shipped for free, anywhere in the US.</p>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 shadow-md text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
                  asChild
                >
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <motion.div 
          className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 text-white overflow-hidden rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 lg:mx-8 xl:mx-16 shadow-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-teal-700/20 blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 sm:-bottom-16 sm:-left-16 w-28 h-28 sm:w-56 sm:h-56 rounded-full bg-teal-800/20 blur-xl"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 tracking-tight"
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            >
              Exclusive <span className="text-amber-300">Offer!</span>
            </motion.h2>
            
            {!subscribed ? (
              <>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.p 
                    className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Get <span className="font-bold text-amber-300">20% OFF</span> your first order plus 
                    <span className="font-semibold"> free shipping</span>!
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md lg:max-w-xl mx-auto"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="text-gray-900 rounded-full px-4 sm:px-6 py-4 sm:py-5 border-0 focus-visible:ring-2 focus-visible:ring-amber-400 shadow-lg text-sm sm:text-base bg-white/95 hover:bg-white transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <motion.div 
                      whileHover={{ scale: 1.03 }} 
                      whileTap={{ scale: 0.97 }}
                      className="w-full sm:w-auto"
                    >
                      <Button 
                        size="lg"
                        className="relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full overflow-hidden group"
                        onClick={() => setSubscribed(true)}
                      >
                        <span className="relative z-10">Claim Your Discount</span>
                        <span className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></span>
                      </Button>
                    </motion.div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-xs sm:text-sm mt-3 sm:mt-4 opacity-80"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    No spam ever. Unsubscribe anytime.
                  </motion.p>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="py-8 sm:py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-teal-700/30 mb-4 sm:mb-6">
                  <Check className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-amber-300" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-amber-300 mb-3 sm:mb-4">
                  You're In!
                </h3>
                <p className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 max-w-xl mx-auto">
                  Check your email for your 20% discount code
                </p>
                <p className="text-teal-100 text-sm sm:text-base">
                  Welcome to the ZeenMart family!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Enhanced Product Card Component with clickable link
const ProductCard = ({ product, index }: { product: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-200 overflow-hidden group cursor-pointer">
        <CardHeader className="p-0 relative">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300 p-3 sm:p-4"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1 shadow-sm">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400 mr-1" />
                <span className="text-xs sm:text-sm font-medium text-gray-900">{product.rating}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6 flex-grow">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 line-clamp-2 flex-1 mr-2">{product.name}</h3>
            <span className="font-bold text-teal-800 text-base sm:text-lg whitespace-nowrap flex-shrink-0">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-3 sm:mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({product.rating})</span>
          </div>
        </CardContent>
        <CardFooter className="p-3 sm:p-4 lg:p-6 pt-0">
          <Link href={product.targetLink} passHref className="w-full">
            <Button 
              size="lg"
              className="w-full bg-teal-700 hover:bg-teal-900 text-white font-medium py-3 sm:py-4 lg:py-5 text-sm sm:text-base shadow-md"
            >
              BUY NOW <ShoppingCart className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default HomePage;