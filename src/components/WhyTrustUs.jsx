// components/WhyTrustUs.jsx
import React from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ClockIcon,
  UserGroupIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const WhyTrustUs = () => {
  const trustPoints = [
    {
      icon: ShieldCheckIcon,
      title: "Quantum-Resistant Security",
      description:
        "Built with post-quantum cryptography that remains secure against future quantum computing threats.",
      accent: "from-[#1EC9E8] to-[#2F8CFF]",
      hover: "shadow-[0_0_30px_rgba(30,201,232,0.2)]",
    },
    {
      icon: LockClosedIcon,
      title: "Military-Grade Encryption",
      description:
        "256-bit encryption and zero-knowledge proofs ensure your data stays private and secure.",
      accent: "from-[#2F8CFF] to-[#1EC9E8]",
      hover: "shadow-[0_0_30px_rgba(47,140,255,0.2)]",
    },
    {
      icon: BanknotesIcon,
      title: "FRA Protected",
      description:
        "Funds Retrieving Agent ensures asset recovery during financial system transitions.",
      accent: "from-[#F5B400] to-[#FFA500]",
      hover: "shadow-[0_0_30px_rgba(245,180,0,0.2)]",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Compliance",
      description:
        "Designed to meet international financial regulations and ISO 20022 standards.",
      accent: "from-[#1EC9E8] to-[#163E63]",
      hover: "shadow-[0_0_30px_rgba(30,201,232,0.2)]",
    },
    {
      icon: ClockIcon,
      title: "24/7 Monitoring",
      description:
        "Round-the-clock system monitoring and instant threat detection response.",
      accent: "from-[#2F8CFF] to-[#112E4A]",
      hover: "shadow-[0_0_30px_rgba(47,140,255,0.2)]",
    },
    {
      icon: UserGroupIcon,
      title: "Expert Team",
      description:
        "Backed by financial cryptographers and quantum computing specialists.",
      accent: "from-[#F5B400] to-[#1EC9E8]",
      hover: "shadow-[0_0_30px_rgba(245,180,0,0.15)]",
    },
  ];

  return (
    <section className="bg-[#0B1F3A] py-20 md:py-28 border-t border-[#112E4A]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, #2F8CFF 1px, transparent 1px),
                          linear-gradient(-45deg, #2F8CFF 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#2F8CFF]/30 mb-6">
            <span className="text-sm font-medium text-[#7FA6C9]">
              TRUST & SECURITY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Trust{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EC9E8] to-[#2F8CFF]">
              QFS Ledger
            </span>
          </h2>
          <p className="text-xl text-[#D1D9E0]">
            Built on transparency, security, and proven quantum technology
          </p>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="group relative p-0.5 rounded-xl">
                {/* Gradient Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${point.accent} rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                ></div>

                {/* Main Card */}
                <div className="relative bg-[#112E4A] rounded-xl border border-[#163E63] p-6 h-full group-hover:border-transparent group-hover:${point.hover} transition-all duration-300">
                  {/* Icon with gradient */}
                  <div
                    className={`relative h-14 w-14 rounded-xl bg-gradient-to-br ${point.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                    {/* Subtle glow */}
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${point.accent} opacity-50 blur-lg -z-10`}
                    ></div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[#D1D9E0]">{point.description}</p>

                  {/* Hover indicator line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${point.accent} rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
