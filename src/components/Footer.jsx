import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-10 md:py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left">
    
      {/* Left Div - Logo + Tagline */}
      <div className="flex flex-col items-center md:items-start gap-3 md:gap-2 w-full md:w-auto">
      
        <div
          className="w-36 sm:w-40 md:w-28 h-14 md:h-10 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: "url('/Logo.png')" }}
        ></div>

        <p className="text-slate-500 text-sm md:text-xs max-w-xs sm:max-w-sm">
          A Nutritious meal accessible and affordable for all.
        </p>

      </div>

      {/* Right Div - Copyright */}
      <div className="text-gray-600 text-sm md:text-xs w-full md:w-auto">
        © {currentYear} Meal-4-All. All rights are reserved.
      </div>

    </div>
  </footer>
  );
};

export default Footer;