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
    <section className="bg-white py-16 md:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powering secure financial operations for the world's most innovative
            institutions
          </p>
        </div>

        {/* Single Sliding Row */}
        <div className="relative overflow-hidden py-6">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Sliding Logos */}
          <div className="flex animate-slideSingle">
            {duplicatedLogos.map((logo, index) => {
              const Icon = logo.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 px-10 py-8 bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center min-w-[200px] hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="h-14 w-14 rounded-lg bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="text-base font-medium text-gray-800">
                    {logo.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simple Stats */}
        <div className="text-center mt-16 pt-12 border-t border-gray-100">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-50 rounded-full border border-emerald-100">
            <span className="text-emerald-700 mr-3">
              Securing transactions across
            </span>
            <span className="text-2xl font-bold text-emerald-600">
              47 countries
            </span>
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
