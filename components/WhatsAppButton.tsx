'use client'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = () => {
  const message = encodeURIComponent("Hello! I need help choosing the right pet food. Can you assist me?")
  const phoneNumber = "447888267902"

  const handleClick = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17349796191', // ✅ Replace with your actual conversion label
      });
      console.log("✅ WhatsApp conversion event fired!");
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp for pet food advice"
        onClick={handleClick}
        className="group relative"
      >
        <div className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 flex items-center gap-2">
          <FaWhatsapp className="text-3xl md:text-4xl" />
          <span className="hidden sm:inline-block font-medium text-sm md:text-base pr-1">
            Chat Now
          </span>
        </div>

        {/* Tooltips */}
        <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 sm:hidden bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded shadow whitespace-nowrap">
          Pet Food Help
          <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
        </div>

        <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 hidden sm:group-hover:block bg-white text-gray-800 text-sm font-medium px-3 py-1 rounded shadow whitespace-nowrap">
          Get pet food advice
          <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
        </div>
      </a>
    </div>
  )
}

export default WhatsAppButton
