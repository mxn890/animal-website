'use client'
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, PawPrint } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Cat Food", href: "/cat-food" },
        { name: "Dog Food", href: "/dog-food" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Categories",
      links: [
        { name: "Kitten Food", href: "/cat-food" },
        { name: "Adult Cat Food", href: "/cat-food" },
        { name: "Puppy Food", href: "/dog-food" },
        { name: "Adult Dog Food", href: "/dog-food" },
        { name: "Senior Cat Food", href: "/cat-food" },
        { name: "Senior Dog Food", href: "/dog-food" }
      ]
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-teal-900 to-teal-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-teal-400 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-teal-500 filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center group">
              <PawPrint className="h-8 w-8 text-teal-300 mr-2 group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-100 group-hover:from-teal-200 group-hover:to-white transition-colors">
                ZeenMart
              </span>
            </Link>
            <p className="text-teal-100 leading-relaxed">
              Premium nutrition for your furry companions. We deliver happiness in every bowl with vet-approved recipes.
            </p>
            
            <div className="flex space-x-4">
              <motion.a 
                href="https://www.facebook.com/share/192dhPBfU7/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-300 hover:text-white transition-colors p-2 rounded-full bg-teal-800 hover:bg-teal-700"
                whileHover={{ y: -3 }}
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </motion.a>
              
              <motion.a 
                href="https://www.instagram.com/zeenmart__?igsh=MXJpNmJlcjB1a3I5bA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-300 hover:text-white transition-colors p-2 rounded-full bg-teal-800 hover:bg-teal-700"
                whileHover={{ y: -3 }}
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h3 className="text-lg font-semibold text-white flex items-center">
                <span className="w-3 h-3 bg-teal-400 rounded-full mr-2"></span>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-teal-200 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="w-3 h-3 bg-teal-400 rounded-full mr-2"></span>
              Contact Us
            </h3>
            
            <address className="not-italic space-y-4">
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 h-5 w-5 text-teal-300 mt-0.5 mr-3" />
                <span className="text-teal-100">123 Pet Street, Animal City, UK</span>
              </div>
              <div className="flex items-center">
                <Phone className="flex-shrink-0 h-5 w-5 text-teal-300 mr-3" />
                <a href="tel:+447888267902" className="text-teal-100 hover:text-white transition-colors">+44 7888 267902</a>
              </div>
              <div className="flex items-center">
                <Mail className="flex-shrink-0 h-5 w-5 text-teal-300 mr-3" />
                <a href="mailto:info@zeenmart.com" className="text-teal-100 hover:text-white transition-colors">info@zeenmart.com</a>
              </div>
            </address>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="font-medium mb-3 text-white">Join Our Newsletter</h4>
              {!subscribed ? (
                <motion.form 
                  className="flex"
                  whileHover={{ scale: 1.02 }}
                  onSubmit={handleSubscribe}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-3 bg-teal-800/50 backdrop-blur-sm text-white placeholder-teal-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-full border border-teal-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <motion.button 
                    className="bg-teal-600 hover:bg-teal-500 px-5 py-3 rounded-r-lg transition-colors font-medium text-white flex items-center"
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                  >
                    Subscribe
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                  className="py-3 px-4 bg-teal-800/50 rounded-lg text-center"
                >
                  <p className="text-teal-300 font-medium">Subscribed! Thank you!</p>
                </motion.div>
              )}
              <p className="text-xs text-teal-300 mt-2">We'll never share your email. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 mt-8 border-t border-teal-800 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-teal-300 text-sm">
              © {currentYear} ZeenMart. All rights reserved.
            </p>
            <div className="hidden sm:block w-1 h-1 bg-teal-600 rounded-full"></div>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-teal-300 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-teal-300 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="text-teal-300 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
          <p className="mt-3 text-teal-400 text-sm flex items-center justify-center">
            <span>Made with</span>
            <svg className="mx-1 h-4 w-4 fill-current text-rose-500" viewBox="0 0 20 20">
              <path d="M10 20S3 10.87 3 7a7 7 0 0110-2.83A7 7 0 0117 7c0 3.87-7 13-7 13z"></path>
            </svg>
            <span>for your pets</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;