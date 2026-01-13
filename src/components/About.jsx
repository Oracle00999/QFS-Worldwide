// components/FundSecurity.jsx
import React from "react";
import Trump from "../assets/trump.jpg";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

const FundSecurity = () => {
  const youtubeUrl = "https://youtu.be/qXq6A9Pdl0U?si=ZkKBDWjE1tWrqG8W";
  const videoId = "qXq6A9Pdl0U";

  return (
    <section className="relative py-20 md:py-28">
      {/* Trump Background Image Only */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Trump})`,
        }}
      >
        {/* Light overlay for better text contrast */}
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-gray-900">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Industry-Leading Fund Security
            </h2>

            <div className="space-y-6 text-lg text-gray-800">
              <p>
                QFS Worldwide Ledger is supported by a Funds Retrieving Agent
                (FRA), ensuring that individuals can withdraw their money
                following a bank reset. Our FRA system is activated during
                monetary transitions to protect citizen assets.
              </p>

              <p>
                To safeguard funds and retirement savings, users can invest in
                ISO assets like XLM, XRP, and other protected digital assets.
                These assets are specifically designed to maintain value and
                liquidity during financial system updates.
              </p>

              <div className="pt-4">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <PlayCircleIcon className="h-6 w-6 mr-2" />
                  <span className="font-medium">Watch full explanation</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: YouTube Video */}
          <div className="relative">
            {/* Video Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-black">
              {/* YouTube Embed */}
              <div className="relative pt-[56.25%]">
                {" "}
                {/* 16:9 Aspect Ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
                  title="QFS Ledger Fund Security"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Overlay Info */}
              <div className="p-4 bg-gradient-to-r from-emerald-900/90 to-green-900/90 border-t border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">
                      Fund Security Explained
                    </div>
                    <div className="text-emerald-300 text-sm">
                      Official QFS Ledger
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400">3:42</div>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-4 text-center">
              <p className="text-gray-700 text-sm">
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
