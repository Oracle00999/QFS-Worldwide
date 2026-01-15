// components/Footer.jsx
import React from "react";
import {
  GlobeAltIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import logoImage from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-8 border-t border-[#112E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="QFS WorldWide Ledger Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center shadow-lg">
                      <span class="font-bold text-lg text-white">Q</span>
                    </div>
                  `;
                }}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  QFS WorldWide
                </span>
                <span className="text-sm font-medium text-[#1EC9E8]">
                  Ledger
                </span>
              </div>
            </div>
            <p className="text-[#7FA6C9] text-sm leading-relaxed">
              Quantum Financial System Ledger provides quantum-resistant
              financial infrastructure for the future of global finance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  About QFS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  Fund Security
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  Crypto Markets
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  FRA Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
                >
                  ISO 20022
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <EnvelopeIcon className="h-5 w-5 text-[#7FA6C9] mr-3 mt-0.5" />
                <span className="text-[#D1D9E0]">support@qfsledger.com</span>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-[#7FA6C9] mr-3 mt-0.5" />
                <span className="text-[#D1D9E0]">+1 (888) QFS-LEDGE</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-[#7FA6C9] mr-3 mt-0.5" />
                <span className="text-[#D1D9E0]">Global Headquarters</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#112E4A] pt-8">
          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-[#7FA6C9] text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} QFS Ledger. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-[#7FA6C9] hover:text-white text-sm transition-colors"
              >
                Risk Disclosure
              </a>
            </div>

            {/* Compliance Badge */}
            <div className="mt-4 md:mt-0 flex items-center px-3 py-1.5 bg-[#112E4A] rounded-full border border-[#163E63]">
              <ShieldCheckIcon className="h-3 w-3 text-[#2F8CFF] mr-2" />
              <span className="text-[#7FA6C9] text-sm">
                ISO 20022 Compliant
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-[#112E4A]">
            <p className="text-[#7FA6C9] text-xs text-center leading-relaxed max-w-3xl mx-auto">
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
