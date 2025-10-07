'use client'
export default function TopHeader() {
  return (
    <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white text-sm py-2 px-4 border-b border-red-800 overflow-hidden">
      {/* Animated Sale Banner */}
      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center">
            {/* Animated text container */}
            <div className="flex overflow-hidden">
              {/* Marquee content */}
              <div className="flex animate-marquee whitespace-nowrap">
                <div className="flex items-center space-x-8 mx-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">🔥</span>
                    <span className="font-bold uppercase tracking-wider">Flash Sale!</span>
                    <span className="bg-yellow-400 text-red-700 px-2 py-1 rounded font-bold text-xs">30% OFF</span>
                    <span className="font-medium">Sitewide Discount</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">🎉</span>
                    <span className="font-bold uppercase tracking-wider">Limited Time!</span>
                    <span className="bg-yellow-400 text-red-700 px-2 py-1 rounded font-bold text-xs">SALE</span>
                    <span className="font-medium">Don't Miss Out</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">⚡</span>
                    <span className="font-bold uppercase tracking-wider">Hot Deal!</span>
                    <span className="bg-yellow-400 text-red-700 px-2 py-1 rounded font-bold text-xs">30% SALE</span>
                    <span className="font-medium">Extra Savings</span>
                  </div>

                  {/* Repeat the same content for seamless loop */}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">🔥</span>
                    <span className="font-bold uppercase tracking-wider">Flash Sale!</span>
                    <span className="bg-yellow-400 text-red-700 px-2 py-1 rounded font-bold text-xs">30% OFF</span>
                    <span className="font-medium">Sitewide Discount</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">🎉</span>
                    <span className="font-bold uppercase tracking-wider">Limited Time!</span>
                    <span className="bg-yellow-400 text-red-700 px-2 py-1 rounded font-bold text-xs">SALE</span>
                    <span className="font-medium">Don't Miss Out</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">⚡</span>
                    <span className="font-bold uppercase tracking-wider">Hot Deal!</span>
                    <span className="bg-yellow-400 text-red-700 px-2 py-1 rounded font-bold text-xs">30% SALE</span>
                    <span className="font-medium">Extra Savings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pulsing effect dot */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full absolute top-0"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}