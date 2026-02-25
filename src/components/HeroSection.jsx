// src/components/HeroSection.jsx
import React from "react";
import { ArrowRight } from "lucide-react";
import HeroImage from "./HeroImage";
import { useLanguage } from "../context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-green-100 min-h-[90vh] flex items-center">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12 py-16 gap-12">
        
        {/* Left Text Section */}
        <div className="flex-1 flex flex-col gap-8 text-center md:text-left">

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-green-900">
            {t.hero.title1}{" "}
            <span className="text-orange-600">
              {t.hero.title2}
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-slate-700 text-lg sm:text-xl md:text-xl max-w-xl">
            {t.hero.description}
          </p>

          {/* Button */}
          <a
            href="#mealPlannerForm"
            className="flex w-max mx-auto md:mx-0 hover:bg-green-600 bg-green-800 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          >
            {t.hero.button}
            <span className="ml-2 mt-1">
              <ArrowRight />
            </span>
          </a>

          {/* Feature Highlights */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4 text-sm sm:text-base font-medium text-green-900">

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-600"></span>
              <span>{t.hero.features.free}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>{t.hero.features.ai}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>{t.hero.features.noSignup}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span>{t.hero.features.nutritious}</span>
            </div>

          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 flex justify-center">
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;