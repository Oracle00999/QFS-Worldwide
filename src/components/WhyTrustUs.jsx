// components/WhyTrustUs.jsx
import React from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const WhyTrustUs = () => {
  const trustPoints = [
    {
      icon: ShieldCheckIcon,
      title: "Quantum-Resistant Security",
      description:
        "Built with post-quantum cryptography that remains secure against future quantum computing threats.",
    },
    {
      icon: LockClosedIcon,
      title: "Military-Grade Encryption",
      description:
        "256-bit encryption and zero-knowledge proofs ensure your data stays private and secure.",
    },
    {
      icon: BanknotesIcon,
      title: "FRA Protected",
      description:
        "Funds Retrieving Agent ensures asset recovery during financial system transitions.",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Compliance",
      description:
        "Designed to meet international financial regulations and ISO 20022 standards.",
    },
    {
      icon: ClockIcon,
      title: "24/7 Monitoring",
      description:
        "Round-the-clock system monitoring and instant threat detection response.",
    },
    {
      icon: UserGroupIcon,
      title: "Expert Team",
      description:
        "Backed by financial cryptographers and quantum computing specialists.",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Trust QFS Ledger
          </h2>
          <p className="text-xl text-gray-600">
            Built on transparency, security, and proven technology
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="p-6 border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6 group-hover:from-emerald-600 group-hover:to-green-700 transition-all">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
