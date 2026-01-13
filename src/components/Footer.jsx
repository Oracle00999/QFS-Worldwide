// components/Footer.jsx
import React from "react";
import {
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import logoImage from "../assets/logo.png"; // Adjust the path to your logo image

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info with Logo */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center">
                <img
                  src={logoImage}
                  alt="QFS WorldWide Ledger Logo"
                  className="h-12 w-auto"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="h-10 w-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg">
                        <span class="font-bold text-lg text-white">Q</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quantum Financial System Ledger provides quantum-resistant
              financial infrastructure for the future of global finance.
            </p>
          </div>

          {/* Empty columns to maintain grid */}
          <div></div>
          <div></div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-300">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">support@qfsledger.com</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">+1 (888) QFS-LEDGE</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-300">Global Headquarters</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} QFS Ledger. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                Risk Disclosure
              </a>
            </div>

            {/* Compliance Badge */}
            <div className="mt-4 md:mt-0 flex items-center">
              <GlobeAltIcon className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-400 text-sm">ISO 20022 Compliant</span>
            </div>
          </div>

          {/* Updated Disclaimer - Cleaner */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs text-center leading-relaxed max-w-3xl mx-auto">
              QFS Ledger delivers quantum-resistant financial infrastructure
              with FRA protection for fund security during monetary transitions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
