// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../lib/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "English"
  );

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  // Always fallback to English if language not found
  const currentLang = translations[language] || translations.English;

  // Merge English with selected language (deep safety layer)
  const t = {
    ...translations.English,
    ...currentLang,
    mealPlanner: {
      ...translations.English.mealPlanner,
      ...currentLang.mealPlanner,
    },
    hero: {
      ...translations.English.hero,
      ...currentLang.hero,
    },
    scanner: {
      ...translations.English.scanner,
      ...currentLang.scanner,
    },
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);