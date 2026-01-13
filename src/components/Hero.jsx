// components/Hero.jsx
import React from "react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import backgroundImage from "../assets/ledger.webp";
import companyLogo from "../assets/logo.png"; // Add your company logo import

const Hero = () => {
  return (
    <section className="text-white py-12 md:py-24 bg-gradient-to-br from-gray-900 to-black mt-11">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Company Logo */}
            <div className="flex items-center">
              <img
                src={companyLogo}
                alt="QFS WorldWide Ledger"
                className="h-16 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="flex items-center space-x-3">
                      <div class="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-600">
                        <span class="font-bold text-white text-xl">Q</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-2xl font-bold tracking-tight text-white">QFS WorldWide</span>
                        <span class="text-sm font-medium text-emerald-400">Ledger</span>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Next-Gen
              <span className="block mt-2">
                Financial
                <span className="text-emerald-400"> Ledger</span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-gray-300 max-w-lg">
              Quantum Financial System infrastructure providing sovereign-grade
              security for digital assets, with built-in Fund Retrieval Agent
              protection and global monetary system interoperability.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center group shadow-lg">
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3.5 border-2 border-emerald-500/50 text-white font-medium rounded-xl hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
                Sign Up
              </button>
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="relative h-[400px] lg:h-[550px] rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImage})`,
              }}
            >
              {/* Overlay gradient for better text contrast */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-emerald-900/20 to-transparent"></div> */}

              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top: Mock UI Elements */}
                {/* <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-2 w-32 bg-emerald-400/40 rounded-full"></div>
                    <div className="h-2 w-24 bg-emerald-400/30 rounded-full"></div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center border border-emerald-400/30">
                    <LockClosedIcon className="h-5 w-5 text-emerald-300" />
                  </div>
                </div> */}

                {/* Bottom: Data Stream Visualization */}
                <div className="space-y-3">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-emerald-400/70 to-green-400/70 rounded-t"
                        style={{
                          height: `${20 + Math.random() * 40}px`,
                          animation: `pulse 2s infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom animation for bars */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
