import React from "react";
import { Heart, Leaf } from "lucide-react";
import heroImage from "../assets/hero-salad.jpg";

const HeroImage = () => {
  return (
    <div className="hover:scale-105 relative w-full max-w-md mx-auto px-4 sm:px-0">

      {/* Decorative rotated background */}
      <div className="absolute -inset-4 bg-secondary/40 rounded-[2rem] rotate-3 shadow-lg" />

      {/* Main image container */}
      <div className="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl">
        <img
          src={heroImage}
          alt="Fresh healthy salad bowl"
          className="w-full h-[350px] sm:h-[400px] md:h-[450px] object-cover rounded-2xl"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 text-green-700 flex items-center gap-2 text-xs sm:text-sm rounded-xl p-2 animate-float">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
          </div>
          <div className="text-left">
            <div className="text-[10px] md:text-xs uppercase tracking-wide">Nutrition</div>
            <div className="font-semibold text-xs md:text-sm">Balanced</div>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/90 text-green-700 flex items-center gap-2 text-xs sm:text-sm rounded-xl p-2 animate-float animate-delay-200">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
            <Leaf className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-xs md:text-sm">Budget Friendly</div>
            <div className="text-[10px] md:text-xs text-gray-500">Maximize nutrition</div>
          </div>
        </div>
      </div>

      {/* Floating Food Icons */}
      <div className="hidden sm:flex absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full items-center justify-center animate-float animate-delay-100">
        <span className="text-lg md:text-xl">🥑</span>
      </div>
      <div className="hidden sm:flex absolute top-1/4 -left-3 md:-left-4 w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full items-center justify-center animate-float animate-delay-300">
        <span className="text-sm md:text-base">🍅</span>
      </div>
      <div className="hidden sm:flex absolute bottom-1/4 -right-2 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-green-200 rounded-full items-center justify-center animate-float animate-delay-500">
        <span className="text-sm md:text-base">🥬</span>
      </div>
    </div>
  );
};

export default HeroImage;