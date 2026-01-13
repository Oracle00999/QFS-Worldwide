// components/TrumpApproval.jsx
import React, { useRef } from "react";
import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  FlagIcon,
  PlayCircleIcon,
  PauseCircleIcon,
} from "@heroicons/react/24/outline";
import trumpBgImage from "../assets/trump.jpg";
import trumpVideo from "../assets/trump.mp4"; // Import the video file

const TrumpApproval = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative py-20 md:py-28">
      {/* Background Image - Same as FundSecurity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${trumpBgImage})`,
        }}
      >
        {/* Light overlay for better text contrast - Same as FundSecurity */}
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Video Section */}
          <div className="relative">
            {/* Video Container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-black">
              {/* Video Player */}
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={handlePlayPause}
                  controls={isPlaying} // Show native controls only when playing
                >
                  <source src={trumpVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play/Pause Button Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button
                      onClick={handlePlayPause}
                      className="h-16 w-16 rounded-full bg-emerald-600 flex items-center justify-center border-4 border-white/50 hover:bg-emerald-700 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <PlayCircleIcon className="h-8 w-8 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Video Info Footer - Same as FundSecurity */}
              <div className="p-4 bg-gradient-to-r from-emerald-900/90 to-green-900/90 border-t border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">
                      Presidential Endorsement
                    </div>
                    <div className="text-emerald-300 text-sm">
                      Official QFS Ledger
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePlayPause}
                      className="text-xs text-emerald-300 hover:text-white transition-colors"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                    <div className="text-xs text-emerald-400">1:16</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-4 text-center">
              <p className="text-gray-700 text-sm">
                Presidential endorsement of Quantum Financial System technology
              </p>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="text-gray-900">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 mb-6">
              <FlagIcon className="h-4 w-4 text-emerald-600 mr-2" />
              <span className="text-sm font-medium text-emerald-700">
                Official Presidential Endorsement
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Official Trump Approval Statement
            </h2>

            {/* First Paragraph */}
            <div className="space-y-6 text-lg text-gray-800">
              <div className="flex items-start">
                <CheckBadgeIcon className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
                <p>
                  This Web3-powered Quantum Financial System (QFS) is recognized
                  as a secure and transparent foundation for the future of
                  global finance — empowering individuals and protecting
                  national sovereignty in the digital economy.
                </p>
              </div>

              {/* Sub-heading */}
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Presidential Endorsement of QFS
              </h3>

              <div className="flex items-start">
                <ShieldCheckIcon className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-1" />
                <p>
                  The Quantum Financial System signifies a major advancement
                  toward an economy based on transparency, freedom, and
                  innovation. This system ensures that financial control remains
                  in the hands of the people — not centralized institutions.
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-emerald-200">
                <div className="relative">
                  <div className="absolute -top-3 left-0 text-4xl text-emerald-300">
                    "
                  </div>
                  <blockquote className="text-xl font-medium italic text-gray-900 pl-6">
                    "Together, we move forward to a stronger, more secure
                    digital economy for every American and every global
                    citizen."
                  </blockquote>
                  <div className="text-right text-emerald-600 mt-2 font-medium">
                    — Official Presidential Statement
                  </div>
                </div>
              </div>

              {/* Endorsement Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-emerald-700">
                      Officially Recognized
                    </span>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                      <FlagIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-emerald-700">
                      National Sovereignty
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrumpApproval;
