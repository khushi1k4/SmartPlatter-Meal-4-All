// src/components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { language, setLanguage, t } = useLanguage();

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Bill Scanner", path: "/scanner" },
    { name: "NutriScan", path: "/nutri-scan" },
    { name: "NutriCalculator", path: "/nutri-calculator" },
  ];

  const languages = [
    { name: "English", script: "English" },
    { name: "Hindi", script: "हिन्दी" },
    { name: "Gujarati", script: "ગુજરાતી" },
    { name: "Marathi", script: "मराठी" },
    { name: "Punjabi", script: "ਪੰਜਾਬੀ" },
    { name: "Tamil", script: "தமிழ்" },
    { name: "Telugu", script: "తెలుగు" },
    { name: "Malayalam", script: "മലയാളം" },
    { name: "Bengali", script: "বাংলা" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white flex items-center justify-between px-4 sm:px-5 md:px-6 h-12 sm:h-14 md:h-16">

        {/* Logo */}
        <div className="flex items-center">
          <div className="w-24 h-8 sm:w-28 sm:h-10 md:w-32 md:h-12 bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: "url('/Logo.png')" }}
          ></div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end font-semibold items-center gap-5 pr-4 relative">

          {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-medium text-green-700 transition relative ${
            isActive
              ? "after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-green-700"
              : "hover:text-orange-700"
            }`
            }
          >
            {item.name}
          </NavLink>
          ))}

          {/* Language Dropdown */}
          {/* <div className="relative ml-4">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 border border-green-400 rounded-lg py-1.5 px-3 text-sm font-medium text-slate-700 hover:border-green-600 transition"
            >
              <Globe size={16} />
              {language}
              <ChevronDown size={16} />
            </button>

            {langOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden z-50 w-52 max-h-60 overflow-y-auto">
              {languages.map((lang) => (
              <div
                key={lang.name}
                onClick={() => changeLanguage(lang.name)}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-100 hover:text-orange-500 text-green-700 font-medium flex justify-between"
              >
                <span>{lang.name}</span>
                <span className="text-xs text-gray-500">
                  {lang.script}
                </span>
              </div>
            ))}
            </div>
          )}
          </div> */}

          {/* Tagline */}
          <span className="ml-4 text-xs font-medium text-orange-600 font-bold whitespace-nowrap italic"
            style={{ fontFamily: "cursive" }}>
            {t.navbar.tagline}
          </span>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
  <div className="md:hidden w-full bg-white backdrop-blur-md shadow-md px-4 py-4 flex flex-col gap-4 transition-all duration-300">

    {menuItems.map((item) => (
      <NavLink
        key={item.name}
        to={item.path}
        className="text-sm font-medium text-green-700 hover:text-orange-700 transition"
        onClick={() => setOpen(false)}
      >
        {item.name}
      </NavLink>
    ))}

    {/* Mobile Language Selector */}
    {/* <div className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-orange-700"
      >
        <Globe size={16} />
        {language}
        <ChevronDown size={16} />
      </button>

      {langOpen && (
        <div className="mt-2 w-full rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden max-h-60 overflow-y-auto">
          {languages.map((lang) => (
            <div
              key={lang.name}
              onClick={() => changeLanguage(lang.name)}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-purple-100 hover:text-orange-500 text-green-700 font-medium flex justify-between"
            >
              <span>{lang.name}</span>
              <span className="text-xs text-gray-500">
                {lang.script}
              </span>
            </div>
          ))}
        </div>
      )}
    </div> */}

    {/* Tagline */}
    <div className="pt-3 border-t border-gray-200">
      <span className="text-xs font-bold text-orange-600 italic"
        style={{ fontFamily: "cursive" }}>
        {t.navbar.tagline}
      </span>
    </div>

  </div>
)}
    </>
  );
};

export default Navbar;