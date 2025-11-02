"use client"; 
import { supportedLanguages } from "@/lib/supportedLanguages";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelect() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  // Get current language from i18n or default to English
  const currentLanguage = supportedLanguages.find(
    (lang) => lang.code === i18n.language
  ) || supportedLanguages[1]; // fallback to English

  // Change language handler
  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          src={`https://flagcdn.com/w40/${currentLanguage.country.toLowerCase()}.png`}
          alt={currentLanguage.name}
          className="w-6 h-4 object-cover rounded-sm shadow-sm"
        />
        <span className="sm:inline">{currentLanguage.name}</span>
        <svg
          className="w-4 h-4 ml-1 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.5 8.5l4.5 4.5 4.5-4.5" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {supportedLanguages.map(({ code, name, country }) => (
            <li
              key={code}
              onClick={() => handleChange(code)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleChange(code);
                }
              }}
            >
              <img
                src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
                alt={name}
                className="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              <span className="sm:inline">{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
