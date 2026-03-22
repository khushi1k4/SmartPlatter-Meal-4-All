import React from "react";
import { Heart, Leaf } from "lucide-react";
import heroImage from "../assets/hero-salad.jpg";

const HeroImage = () => {
  return (
    <div className="hover:scale-105 relative w-full max-w-sm md:max-w-md mx-auto px-4 sm:px-0">

      {/* Decorative rotated background */}
      <div className="absolute -inset-3 md:-inset-2 bg-secondary/30 rounded-[2rem] rotate-2 shadow-md" />

      {/* Main image container */}
      <div className="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-xl">
        <img
          src={heroImage}
          alt="Fresh healthy salad bowl"
          className="w-full h-[300px] sm:h-[340px] md:h-[320px] object-cover rounded-2xl"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 bg-white/90 text-green-700 flex items-center gap-2 text-xs rounded-lg p-1.5">
          <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
            <Heart className="w-3 h-3 text-red-500" />
          </div>
          <div className="text-left">
            <div className="text-[9px] uppercase tracking-wide">Nutrition</div>
            <div className="font-semibold text-xs">Balanced</div>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 bg-white/90 text-green-700 flex items-center gap-2 text-xs rounded-lg p-1.5">
          <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
            <Leaf className="w-3 h-3 text-green-500" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-xs">Budget Friendly</div>
            <div className="text-[9px] text-gray-500">Maximize nutrition</div>
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