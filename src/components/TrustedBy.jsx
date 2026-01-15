// components/TrustedBy.jsx
import React from "react";
import {
  BuildingLibraryIcon,
  CpuChipIcon,
  BanknotesIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

const TrustedBy = () => {
  const logos = [
    { name: "Global Bank", icon: BuildingLibraryIcon },
    { name: "Quantum Fintech", icon: CpuChipIcon },
    { name: "Secure Capital", icon: BanknotesIcon },
    { name: "International Finance", icon: GlobeAltIcon },
    { name: "Tech Bank", icon: DevicePhoneMobileIcon },
    { name: "Blockchain Corp", icon: CircleStackIcon },
    { name: "Capital One", icon: BuildingOfficeIcon },
    { name: "Digital Assets", icon: BuildingStorefrontIcon },
  ];

  // Duplicate logos for seamless looping
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="bg-[#0B1F3A] py-16 md:py-20 border-t border-[#112E4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-[#112E4A] rounded-full mb-6 border border-[#163E63]">
            <span className="text-sm font-medium text-[#7FA6C9]">PARTNERS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-[#D1D9E0] text-lg max-w-2xl mx-auto">
            Powering secure financial operations for the world's most innovative
            institutions
          </p>
        </div>

        {/* Single Sliding Row */}
        <div className="relative overflow-hidden py-6">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B1F3A] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B1F3A] to-transparent z-10"></div>

          {/* Sliding Logos */}
          <div className="flex animate-slideSingle">
            {duplicatedLogos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 mx-6 px-8 py-6 bg-[#112E4A] rounded-xl border border-[#163E63] flex flex-col items-center justify-center min-w-[180px] hover:border-[#2F8CFF] hover:shadow-[0_0_25px_rgba(47,140,255,0.15)] transition-all duration-300 group"
                >
                  <div className="h-14 w-14 rounded-lg bg-[#163E63] flex items-center justify-center mb-4 group-hover:bg-[#163E63]/80 transition-colors group-hover:scale-110">
                    <Icon className="h-7 w-7 text-[#2F8CFF]" />
                  </div>
                  <span className="text-base font-medium text-white">
                    {logo.name}
                  </span>
                  <span className="text-xs text-[#7FA6C9] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Trusted Partner
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mt-16 pt-12 border-t border-[#112E4A]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="px-6 py-4 bg-[#112E4A] rounded-xl border border-[#163E63] hover:border-[#1EC9E8] transition-colors duration-300">
              <div className="text-3xl font-bold text-white mb-2">
                <span className="text-[#1EC9E8]">47</span>
              </div>
              <p className="text-[#D1D9E0] text-sm">Countries Served</p>
            </div>
            <div className="px-6 py-4 bg-[#112E4A] rounded-xl border border-[#163E63] hover:border-[#2F8CFF] transition-colors duration-300">
              <div className="text-3xl font-bold text-white mb-2">
                <span className="text-[#2F8CFF]">$500m+</span>
              </div>
              <p className="text-[#D1D9E0] text-sm">Assets Secured</p>
            </div>
            <div className="px-6 py-4 bg-[#112E4A] rounded-xl border border-[#163E63] hover:border-[#F5B400] transition-colors duration-300">
              <div className="text-3xl font-bold text-white mb-2">
                <span className="text-[#F5B400]">24/7</span>
              </div>
              <p className="text-[#D1D9E0] text-sm">Quantum Uptime</p>
            </div>
          </div>

          {/* Highlight badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#2F8CFF]/30 mt-8 shadow-lg">
            <div className="h-2 w-2 rounded-full bg-[#1EC9E8] mr-3 animate-pulse"></div>
            <span className="text-[#D1D9E0] mr-3">Live global network</span>
          </div>
        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes slideSingle {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slideSingle {
          animation: slideSingle 50s linear infinite;
          width: max-content;
        }

        /* Pause animation on hover */
        .animate-slideSingle:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustedBy;
