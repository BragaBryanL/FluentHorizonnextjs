"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

export default function Header() {
  const { palette } = useTheme();
  const isDarkTheme = palette !== "default" && palette !== "custom";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-700 ${
      isDarkTheme 
        ? 'bg-slate-900/80 border-slate-700/50' 
        : 'bg-white/80 border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image 
                src="/language-hero.svg" 
                alt="Fluent Horizons Logo" 
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Fluent Horizons
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 text-base font-medium">
              <li>
                <Link 
                  href="/" 
                  className="relative text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <a 
                  href="#courses" 
                  className="relative text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group"
                >
                  Courses
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="relative text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="relative text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            </ul>
            
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <ul className="flex flex-col gap-4 text-base font-medium">
              <li>
                <Link href="/" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <a href="#courses" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  Courses
                </a>
              </li>
              <li>
                <a href="#about" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">
                  Contact
                </a>
              </li>
            </ul>
            <button
              className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold shadow-lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-auth-modal'));
              }}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
