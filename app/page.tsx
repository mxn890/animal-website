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
  Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";

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
    name: 'Go-Cat Adult Chicken & Duck Dry Cat Food 10kg (Packaging may vary)',
    price: 39.36,
    image: '/cat/gocat.png',
    rating: 4.9,
    category: 'cat-food',
    description: 'All-natural training treats with no artificial additives',
    targetLink: '/cat-food'
  },
  {
    id: 3,
    name: 'Burns Pet Nutrition Hypoallergenic Complete Dry Dog Food Adult and Senior ',
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
    description: 'FELIX Original Mixed Selection in Jelly   Wet Cat Food 40x85g',
    targetLink: '/cat-food'
  },
  {
    id: 5,
    name: 'Pedigree Schmackos Mega Pack 110 Strips' ,
    price: 15.99,
    image: '/dog/ped.png',
    rating: 4.8,
    category: 'dog-food',
    description: 'Pedigree Schmackos Mega Pack 110 Strips Snacks, Dog Treat Multipack with Beef, Lamb and Poultry Flavours, 790 g (Pack of 1)',
    targetLink: '/dog-food'
  },
  {
    id: 6,
    name: 'Harringtons Complete Wet Tray Grain Free Hypoallergenic Adult Dog Food',
    price: 30.31,
    image: '/dog/har.png',
    rating: 4.8,
    category: 'dog-food',
    description: 'Harringtons Complete Wet Tray Grain Free Hypoallergenic Adult Dog Food Meaty Bumper Pack 16x400g - Chicken, Lamb, Beef & Turkey - Made with All Natural Ingredients',
    targetLink: '/dog-food'
  },
  {
    id: 7,
    name: 'GOURMET Perle Ocean ',
    price: 26.99,
    image: '/cat/perle0.png',
    rating: 4.9,
    category: 'cat-food',
    description: 'GOURMET Perle Ocean Collection Wet Cat Food 40x85g',
    targetLink: '/cat-food'
  },
  {
    id: 8,
    name: 'Purina ONE Adult Dry Cat Food ',
    price: 16.99,
    image: '/cat/purina.png',
    rating: 4.9,
    category: 'cat-food',
    description: 'Purina ONE Adult Dry Cat Food Rich in Chicken 6kg, Packaging may vary',
    targetLink: '/cat-food'
  },
];

const HomePage = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [email, setEmail] = useState('');
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

  return (
    <div className="min-h-screen bg-white">
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extra-bold font-extrabold mb-3 sm:mb-4 max-w-2xl lg:max-w-3xl leading-tight">
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

      {/* Top Products */}
      <section className="py-12 sm:py-16 lg:py-20 container mx-auto px-4 sm:px-6 bg-white">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            <span className="bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent">
              Our Top Products
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto">
            Loved by pets and trusted by owners nationwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {topProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-10 sm:mt-14 lg:mt-16"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg"
            variant="outline" 
            className="border-teal-600 text-teal-600 bg-white hover:bg-teal-50 hover:text-teal-700 px-8 py-6 text-lg"
            asChild
          >
            <Link href="/cat-food">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16"
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
                    alt="About PetFoodHub"
                    fill
                    className="object-cover h-full transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text font-extrabold text-transparent">
                  About PetFoodHub
                </span>
              </h2>
              <p className="text-gray-800 mb-4 sm:mb-6 text-lg sm:text-xl leading-relaxed">
                Welcome to PetFoodHub, the UK's go-to store for high-quality food and accessories for cats and dogs at wholesale prices with free shipping nationwide.
              </p>
              <p className="text-gray-800 mb-4 sm:mb-6 text-lg sm:text-xl leading-relaxed">
                We believe that every pet deserves the best nutritious food, comfortable accessories, and endless love without costing their owners a fortune. That's why we offer premium, healthy pet food and durable accessories at very affordable rates.
              </p>
              
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8 lg:mb-10">
                <div className="flex items-start">
                  <PawPrint className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-base sm:text-lg"><strong>Specialized for Cats & Dogs Only</strong> – We know exactly what your furry friends need.</p>
                </div>
                <div className="flex items-start">
                  <Heart className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-base sm:text-lg"><strong>Healthy & Nutritious Food</strong> – Vet-recommended, safe, and made to keep your pets strong and happy.</p>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-base sm:text-lg"><strong>Affordable Accessories</strong> – Beds, leashes, collars, toys, and more — all at wholesale prices.</p>
                </div>
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-teal-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-800 text-base sm:text-lg"><strong>Free UK-Wide Delivery</strong> – No hidden costs. Get your order shipped for free, anywhere in the UK.</p>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 shadow-md text-white px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
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
          className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white overflow-hidden rounded-2xl mx-4 sm:mx-8 lg:mx-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
              initial={{ y: -20 }}
              whileInView={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              Special Offer!
            </motion.h2>
            
            <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Get <span className="font-bold text-amber-300">20% off</span> your first order!
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-md lg:max-w-lg mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-gray-900 rounded-full px-6 py-4 border-0 focus-visible:ring-2 focus-visible:ring-amber-700 shadow-lg text-base sm:text-lg bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-white/90 rounded-full px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all w-full"
                >
                  Subscribe Now
                </Button>
              </motion.div>
            </motion.div>
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
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
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
              className="object-contain group-hover:scale-105 transition-transform duration-300 p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
            <div className="absolute top-3 right-3">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                <span className="text-sm font-medium text-gray-900">{product.rating}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 line-clamp-2">{product.name}</h3>
            <span className="font-bold text-teal-800 text-lg sm:text-xl whitespace-nowrap ml-4">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 pt-0">
          <Link href={product.targetLink} passHref className="w-full">
            <Button 
              size="lg"
              className="w-full bg-teal-700 hover:bg-teal-900 text-white font-medium py-5 sm:py-6 text-base sm:text-lg shadow-md"
            >
              BUY NOW <ShoppingCart className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default HomePage;