import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-teal-300 hover:text-teal-100 transition-colors">ZeenMart</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Premium pet food for your furry friends. Quality nutrition that helps pets live their best life.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/192dhPBfU7/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-300 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/zeenmart__?igsh=MXJpNmJlcjB1a3I5bA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-teal-300 transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-teal-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-teal-300 transition-colors">Home</Link></li>
              <li><Link href="/cat-food" className="text-gray-300 hover:text-teal-300 transition-colors">Cat Food</Link></li>
              <li><Link href="/dog-food" className="text-gray-300 hover:text-teal-300 transition-colors">Dog Food</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-teal-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-teal-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-teal-700 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/cat-food" className="text-gray-300 hover:text-teal-300 transition-colors">Kitten Food</Link></li>
              <li><Link href="/cat-food" className="text-gray-300 hover:text-teal-300 transition-colors">Adult Cat Food</Link></li>
              <li><Link href="/dog-food" className="text-gray-300 hover:text-teal-300 transition-colors">Puppy Food</Link></li>
              <li><Link href="/dog-food" className="text-gray-300 hover:text-teal-300 transition-colors">Adult Dog Food</Link></li>
              <li><Link href="/cat-food" className="text-gray-300 hover:text-teal-300 transition-colors">Senior Cat Food</Link></li>
              <li><Link href="/dog-food" className="text-gray-300 hover:text-teal-300 transition-colors">Senior Dog Food</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-teal-700 pb-2">Contact Us</h3>
            <address className="not-italic text-gray-300 mb-4">
              <p className="mb-2">123 Pet Street, Animal City</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p>Email: info@zeenmart.com</p>
            </address>
            <h4 className="font-medium mb-2 text-white">Subscribe to Our Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-teal-900 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-teal-300 w-full"
              />
              <button className="bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-teal-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ZeenMart. All rights reserved.</p>
          <p className="mt-2">
            Designed with ❤️ for your pets
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;