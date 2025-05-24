'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Home, 
  Search,
  Menu,
  X
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
};

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { searchProducts } = useProducts();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchItemClick = (id: number) => {
    router.push(`/product/${id}`);
    setShowSearchResults(false);
    setSearchQuery('');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      height: "auto",
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: "afterChildren"
      }
    }
  };

  const menuItemVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const searchResultsVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.05
      }
    },
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3
      }
    }
  };

  const searchItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav 
      className="sticky top-0 z-30 w-full bg-white shadow-sm border-b dark:bg-gray-900"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span 
              className="text-2xl font-bold text-teal-600 dark:text-teal-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PetFood
            </motion.span>
            <motion.span 
              className="text-2xl font-bold dark:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hub
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-1.5 text-gray-800 hover:text-teal-600 transition-colors dark:text-gray-200 dark:hover:text-teal-400">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Home size={18} className="font-semibold" />
              </motion.div>
              <motion.span 
                className="font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Home
              </motion.span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-800 hover:text-teal-600 transition-colors font-semibold px-2 py-1 rounded-md hover:bg-teal-50 dark:text-gray-200 dark:hover:text-teal-400 dark:hover:bg-gray-800"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
               About Us
              </motion.span>
            </Link>
            
            <Link 
              href="/cat-food" 
              className="text-gray-800 hover:text-teal-600 transition-colors font-semibold px-2 py-1 rounded-md hover:bg-teal-50 dark:text-gray-200 dark:hover:text-teal-400 dark:hover:bg-gray-800"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cat Food
              </motion.span>
            </Link>
            <Link 
              href="/dog-food" 
              className="text-gray-800 hover:text-teal-600 transition-colors font-semibold px-2 py-1 rounded-md hover:bg-teal-50 dark:text-gray-200 dark:hover:text-teal-400 dark:hover:bg-gray-800"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Dog Food
              </motion.span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-1/3 mx-4">
            <form onSubmit={handleSearch} className="w-full flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-r-none border-r-0 focus-visible:ring-teal-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <Button 
                type="submit" 
                className="rounded-l-none bg-teal-600 hover:bg-teal-700 focus-visible:ring-teal-500 dark:bg-teal-700 dark:hover:bg-teal-800"
                asChild
              >
                <motion.div>
                  <Search size={18} className="text-white" />
                </motion.div>
              </Button>
            </form>
            <AnimatePresence>
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  variants={searchResultsVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto dark:bg-gray-800 dark:border-gray-700"
                >
                  {searchResults.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={searchItemVariants}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 dark:hover:bg-gray-700 dark:border-gray-700"
                      onClick={() => handleSearchItemClick(product.id)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center">
                        {product.images.length > 0 && (
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover mr-3 rounded" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                            }}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{product.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => router.push('/cart')}
              className="relative p-2 border border-teal-500 text-teal-600 hover:bg-teal-50 transition duration-200 rounded-full hover:scale-105 active:scale-95 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-gray-800"
              aria-label="Go to cart"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={20} className="stroke-[2] text-teal-600 dark:text-teal-400" />
              {getTotalItems() > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Badge className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full dark:bg-teal-500">
                    {getTotalItems()}
                  </Badge>
                </motion.div>
              )}
            </motion.button>

            <motion.button 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={20} className="dark:text-white" /> : <Menu size={20} className="dark:text-white" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-3 pb-3 border-t pt-3 overflow-hidden dark:border-gray-700"
            >
              <motion.div className="flex flex-col space-y-3">
                <motion.div variants={menuItemVariants}>
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-50 font-medium dark:hover:bg-gray-800" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home size={18} className="text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-800 dark:text-gray-200">Home</span>
                  </Link>
                </motion.div>

                <motion.div variants={menuItemVariants}>
                  <Link 
                    href="/about" 
                    className="px-3 py-2 rounded-md hover:bg-gray-50 text-gray-800 font-medium dark:hover:bg-gray-800 dark:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link 
                    href="/cat-food" 
                    className="px-3 py-2 rounded-md hover:bg-gray-50 text-gray-800 font-medium dark:hover:bg-gray-800 dark:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cat Food
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link 
                    href="/dog-food" 
                    className="px-3 py-2 rounded-md hover:bg-gray-50 text-gray-800 font-medium dark:hover:bg-gray-800 dark:text-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dog Food
                  </Link>
                </motion.div>
                
                {/* Mobile Search */}
                <motion.div variants={menuItemVariants} className="flex mt-2">
                  <form onSubmit={handleSearch} className="flex w-full">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full rounded-r-none border-r-0 bg-white focus-visible:ring-teal-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                    />
                    <Button 
                      type="submit" 
                      className="rounded-l-none bg-teal-600 hover:bg-teal-700 focus-visible:ring-teal-500 dark:bg-teal-700 dark:hover:bg-teal-800"
                    >
                      <Search size={18} className="text-white" />
                    </Button>
                  </form>
                </motion.div>

                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      variants={searchResultsVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="bg-white border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto dark:bg-gray-800 dark:border-gray-700"
                    >
                      {searchResults.map((product) => (
                        <motion.div
                          key={product.id}
                          variants={searchItemVariants}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 dark:hover:bg-gray-700 dark:border-gray-700"
                          onClick={() => handleSearchItemClick(product.id)}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center">
                            {product.images.length > 0 && (
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="w-10 h-10 object-cover mr-3 rounded" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                                }}
                              />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{product.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;