'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/placeholder.svg",
    title: "Premium Pet Food",
    subtitle: "Quality Nutrition For Your Beloved Pets",
    buttonText: "Shop Now"
  },
  {
    image: "/placeholder.svg",
    title: "New Cat Food Collection",
    subtitle: "Nutritious & Delicious Options For Your Feline Friend",
    buttonText: "Explore"
  },
  {
    image: "/placeholder.svg",
    title: "Healthy Dog Food",
    subtitle: "Give Your Dog The Best With Our Premium Selection",
    buttonText: "View Products"
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative hero-slider overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            currentSlide === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl">{slide.subtitle}</p>
            <Button 
              className="bg-petgreen-600 hover:bg-petgreen-700 text-white px-8 py-2 text-lg" 
              size="lg"
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}
      
      {/* Slider Indicators */}
      <div className="absolute bottom-5 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
