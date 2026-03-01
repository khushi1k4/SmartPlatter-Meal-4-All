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
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md shadow-md flex items-center justify-between px-4 sm:px-6 md:px-6 lg:px-6 h-16 sm:h-20 md:h-24">

        {/* Logo */}
        <div className="flex items-center">
          <div
            className="w-32 h-10 sm:w-40 sm:h-12 md:w-48 md:h-16 bg-no-repeat bg-contain bg-center"
            style={{ backgroundImage: "url('/Logo.png')" }}
          ></div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-8 pr-8 relative">

          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="font-bold text-green-700 hover:text-orange-700"
            >
              {item.name}
            </NavLink>
          ))}

          {/* Language Dropdown */}
          <div className="relative ml-6">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-3 border border-green-400 rounded-xl py-2 px-4 font-bold text-slate-700 text-base"
            >
              <Globe size={18} />
              {language}
              <ChevronDown size={18} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-50 w-64 max-h-72 overflow-y-auto">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    onClick={() => changeLanguage(lang.name)}
                    className="px-6 py-3 cursor-pointer hover:bg-purple-100 hover:text-orange-400 text-green-700 font-semibold flex justify-between"
                  >
                    <span>{lang.name}</span>
                    <span className="text-sm text-gray-500">
                      {lang.script}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tagline */}
          <span className="ml-6 text-base font-semibold text-gray-700 whitespace-nowrap">
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
      <div className="md:hidden w-full bg-white backdrop-blur-md shadow-md px-4 py-6 flex flex-col gap-5 transition-all duration-300">

        {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className="font-bold text-green-700 hover:text-orange-700"
          onClick={() => setOpen(false)}
        >
          {item.name}
        </NavLink>
        ))}

        {/* Mobile Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-3 font-bold text-green-700 hover:text-orange-700"
          >
            <Globe size={18} />
            {language}
            <ChevronDown size={18} />
          </button>

          {langOpen && (
            <div className="mt-2 w-full rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden max-h-72 overflow-y-auto">
              {languages.map((lang) => (
              <div
                key={lang.name}
                onClick={() => changeLanguage(lang.name)}
                className="px-6 py-3 border-b last:border-b-0 cursor-pointer hover:bg-purple-100 hover:text-orange-400 text-green-700 font-semibold flex justify-between"
              >
                <span>{lang.name}</span>
                <span className="text-sm text-gray-500">
                  {lang.script}
                </span>
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Tagline at Bottom */}
        <div className="pt-4 border-t border-gray-200">
          <span className="text-sm font-semibold text-gray-700">
            {t.navbar.tagline}
          </span>
        </div>

      </div>
      )}
    </>
  );
};

export default Navbar;