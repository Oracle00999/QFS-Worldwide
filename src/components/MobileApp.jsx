// components/MobileApp.jsx
import React from "react";
import { DevicePhoneMobileIcon, ClockIcon } from "@heroicons/react/24/outline";
import mobileBg from "../assets/mobile.webp"; // Your image import

const MobileApp = () => {
  return (
    <section className="relative py-20 md:py-28">
      {/* Background Image - Fitting properly */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${mobileBg})`,
          backgroundSize: "cover", // Ensures image covers entire section
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents tiling
          backgroundAttachment: "fixed", // Optional: creates parallax effect
        }}
      >
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-12 text-gray-900">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Mobile App Coming Soon
          </h2>
          <p className="text-gray-700 text-lg">
            Access your QFS Ledger on mobile devices
          </p>
        </div>

        {/* Simple Content */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-full mb-8 border border-gray-300">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Launching Soon</span>
          </div>

          {/* App Store Buttons - Simple */}
          <div className="flex justify-center gap-6 mb-12">
            {/* App Store */}
            <div className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center border border-gray-800 hover:bg-black transition-colors cursor-pointer">
              <div className="mr-3">
                <DevicePhoneMobileIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-medium">App Store</div>
              </div>
            </div>

            {/* Google Play */}
            <div className="px-6 py-3 bg-gray-900 text-white rounded-lg flex items-center border border-gray-800 hover:bg-black transition-colors cursor-pointer">
              <div className="mr-3">
                <DevicePhoneMobileIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-medium">Google Play</div>
              </div>
            </div>
          </div>

          {/* Simple Message */}
          <p className="text-gray-700 max-w-md mx-auto">
            Our mobile app is currently in development. You'll be able to manage
            your quantum-secure assets on iOS and Android soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
