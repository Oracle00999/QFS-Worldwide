// components/Hero.jsx
import React from "react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import backgroundImage from "../assets/ledger.webp";
import companyLogo from "../assets/logo.png";

const Hero = () => {
  return (
    <section className="relative text-white py-12 md:py-24 mt-11 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[#0B1F3A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#112E4A] to-[#163E63]"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#2F8CFF 1px, transparent 1px), linear-gradient(90deg, #2F8CFF 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            {/* Company Logo */}
            <div className="flex items-center">
              <img
                src={companyLogo}
                alt="QFS WorldWide Ledger"
                className="h-16 w-auto drop-shadow-[0_0_10px_rgba(47,140,255,0.3)]"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="flex items-center space-x-3">
                      <div class="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] shadow-lg shadow-[#2F8CFF]/30">
                        <span class="font-bold text-white text-xl">Q</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-2xl font-bold tracking-tight text-white">QFS WorldWide</span>
                        <span class="text-sm font-medium text-[#1EC9E8]">Ledger</span>
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF]">
                  {" "}
                  Ledger
                </span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-xl text-[#D1D9E0] max-w-lg leading-relaxed">
              Quantum Financial System infrastructure providing sovereign-grade
              security for digital assets, with built-in Fund Retrieval Agent
              protection and global monetary system interoperability.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center space-x-2 text-[#7FA6C9]">
                <ShieldCheckIcon className="h-5 w-5 text-[#2F8CFF]" />
                <span className="text-sm">Sovereign-grade Security</span>
              </div>
              <div className="flex items-center space-x-2 text-[#7FA6C9]">
                <LockClosedIcon className="h-5 w-5 text-[#2F8CFF]" />
                <span className="text-sm">Fund Retrieval Protection</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF] text-white font-medium rounded-xl hover:shadow-[0_0_30px_rgba(30,201,232,0.5)] transition-all duration-300 flex items-center justify-center group shadow-lg">
                Get Started
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3.5 border-2 border-[#163E63] text-[#D1D9E0] font-medium rounded-xl hover:border-[#2F8CFF] hover:text-white hover:bg-[#112E4A]/50 transition-all duration-300">
                Sign Up
              </button>
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="relative h-[400px] lg:h-[550px] rounded-2xl overflow-hidden group">
            {/* Glow effect container */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1EC9E8] via-[#2F8CFF] to-[#1EC9E8] rounded-2xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500"></div>

            {/* Main card */}
            <div className="relative h-full rounded-2xl overflow-hidden border border-[#112E4A] bg-[#0B1F3A]">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                }}
              >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent"></div>
              </div>

              {/* Animated grid overlay */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(#2F8CFF 1px, transparent 1px), linear-gradient(90deg, #2F8CFF 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                    animation: "gridMove 20s linear infinite",
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                {/* Top section - Security badge */}
                <div className="flex justify-end">
                  <div className="h-12 w-12 rounded-full bg-[#112E4A]/80 backdrop-blur-sm flex items-center justify-center border border-[#2F8CFF]/40 shadow-[0_0_15px_rgba(47,140,255,0.3)]">
                    <LockClosedIcon className="h-6 w-6 text-[#2F8CFF]" />
                  </div>
                </div>

                {/* Center - Title */}
                <div className="text-center">
                  <div className="inline-block px-6 py-3 bg-[#112E4A]/60 backdrop-blur-sm rounded-xl border border-[#2F8CFF]/30">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      QFS Worldwide
                    </h3>
                    <p className="text-sm text-[#7FA6C9]"> Ledger</p>
                  </div>
                </div>

                {/* Bottom: Data Stream Visualization */}
                <div className="space-y-4">
                  <div className="flex space-x-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#2F8CFF] to-[#1EC9E8] rounded-t"
                        style={{
                          height: `${15 + Math.random() * 50}px`,
                          animation: `pulse 2s infinite`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-[#7FA6C9]">
                    <span>Transaction Flow</span>
                    <span>Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes gridMove {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(30px) translateX(30px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
