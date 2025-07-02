// components/WhatsAppButton.tsx
'use client'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

const WhatsAppButton = () => {
  const message = encodeURIComponent("Hello! I need help choosing the right pet food. Can you assist me?")
  const phoneNumber = "447888267902"

  return (
    <Link
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-xl transition-all duration-300 ease-in-out hover:scale-110 group">
        <div className="flex items-center gap-2">
          <FaWhatsapp className="text-3xl md:text-4xl" />
          <span className="hidden sm:inline-block font-medium text-sm md:text-base pr-1">
            Chat Now
          </span>
        </div>
        
        {/* Tooltip for mobile */}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 sm:hidden bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-md shadow-md whitespace-nowrap">
          Pet Food Help
        </div>
        
        {/* Tooltip for desktop */}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 hidden sm:group-hover:block bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded-md shadow-md whitespace-nowrap">
          Get pet food advice
        </div>
      </div>
    </Link>
  )
}

export default WhatsAppButton