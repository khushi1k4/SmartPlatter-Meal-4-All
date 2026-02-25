import React, { useContext } from "react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Left Div - Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div
            className="w-40 h-14 bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: "url('/Logo.png')" }}
          ></div>
          <p className="text-slate-500 text-sm md:text-base">
            A Nutritious meal accessible and affordable for all.
          </p>
        </div>

        {/* Right Div - Copyright */}
        <div className="text-gray-600 text-sm md:text-base">
          © {currentYear} Meal-4-All. All rights are reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;