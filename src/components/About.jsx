// components/FundSecurity.jsx
import React from "react";
import Trump from "../assets/trump.jpg";
import {
  PlayCircleIcon,
  ShieldCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const FundSecurity = () => {
  const youtubeUrl = "https://youtu.be/qXq6A9Pdl0U?si=ZkKBDWjE1tWrqG8W";
  const videoId = "qXq6A9Pdl0U";

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0B1F3A] to-[#112E4A] border-t border-[#163E63]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 95%, #2F8CFF 100%),
                          linear-gradient(0deg, transparent 95%, #2F8CFF 100%)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Accent Overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F5B400]/10 via-transparent to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1EC9E8]/10 via-transparent to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#112E4A] to-[#163E63] rounded-full border border-[#F5B400]/30 mb-6">
              <ShieldCheckIcon className="h-4 w-4 text-[#F5B400] mr-2" />
              <span className="text-sm font-medium text-[#F5B400]">
                FRA PROTECTED
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Industry-Leading{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B400] to-[#FFA500]">
                Fund Security
              </span>
            </h2>

            <div className="space-y-6 text-lg text-[#D1D9E0]">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <LockClosedIcon className="h-3 w-3 text-white" />
                </div>
                <p>
                  QFS Worldwide Ledger is supported by a Funds Retrieving Agent
                  (FRA), ensuring that individuals can withdraw their money
                  following a bank reset. Our FRA system is activated during
                  monetary transitions to protect citizen assets.
                </p>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#F5B400] to-[#FFA500] flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <ShieldCheckIcon className="h-3 w-3 text-white" />
                </div>
                <p>
                  To safeguard funds and retirement savings, users can invest in
                  ISO assets like XLM, XRP, and other protected digital assets.
                  These assets are specifically designed to maintain value and
                  liquidity during financial system updates.
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[#112E4A] rounded-lg p-4 border border-[#163E63] hover:border-[#1EC9E8] transition-colors duration-300">
                  <div className="text-sm font-medium text-white mb-1">
                    FRA Protection
                  </div>
                  <div className="text-xs text-[#7FA6C9]">
                    Bank reset safety
                  </div>
                </div>
                <div className="bg-[#112E4A] rounded-lg p-4 border border-[#163E63] hover:border-[#F5B400] transition-colors duration-300">
                  <div className="text-sm font-medium text-white mb-1">
                    ISO Assets
                  </div>
                  <div className="text-xs text-[#7FA6C9]">XLM, XRP, QFS</div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center group"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1EC9E8] to-[#2F8CFF] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <PlayCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-[#1EC9E8] transition-colors">
                      Watch full explanation
                    </div>
                    <div className="text-sm text-[#7FA6C9]">
                      YouTube tutorial
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: YouTube Video */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F5B400] via-[#1EC9E8] to-[#2F8CFF] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden border border-[#112E4A] bg-[#0B1F3A] shadow-2xl">
              {/* YouTube Embed */}
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&color=white&theme=dark`}
                  title="QFS Ledger Fund Security"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Overlay Info */}
              <div className="p-4 bg-gradient-to-r from-[#112E4A] to-[#163E63] border-t border-[#2F8CFF]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#F5B400] to-[#FFA500] flex items-center justify-center">
                      <ShieldCheckIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        Fund Security Explained
                      </div>
                      <div className="text-[#7FA6C9] text-sm">
                        Official QFS Ledger
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-[#1EC9E8] animate-pulse"></div>
                    <div className="text-xs text-[#1EC9E8] px-2 py-1 bg-[#112E4A] rounded">
                      3:42
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-4 text-center">
              <p className="text-[#D1D9E0] text-sm">
                Learn how the FRA system protects your assets during financial
                transitions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundSecurity;
