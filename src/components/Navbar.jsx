// components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png"; // Adjust the path to your logo image

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Image - LEFT */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <img
                  src={logoImage}
                  alt="QFS WorldWide Ledger Logo"
                  className={`h-10 w-auto transition-all duration-300 ${
                    isScrolled ? "max-h-10" : "max-h-10"
                  }`}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 shadow-md">
                        <span class="font-bold text-white text-lg">Q</span>
                      </div>
                    `;
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  QFS WorldWide
                </span>
                <span className="text-sm font-medium text-emerald-600">
                  Ledger
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - RIGHT */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 border ${
                isScrolled
                  ? "text-gray-700 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                  : "text-gray-700 border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden border-t ${
              isScrolled
                ? "border-gray-100 bg-white/95 backdrop-blur-md"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="px-2 pt-3 pb-4 space-y-2">
              <Link
                to="/login"
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block w-full text-left px-4 py-3 text-base font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
