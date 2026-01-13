// components/CustomerTestimonials.jsx
import React from "react";
import {
  StarIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import testimonialBg from "../assets/trump.jpg"; // You'll import your background image

const CustomerTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "QFS = Quantum Financial System is the future. Withdraw funds from banks and secure them in QFS-backed assets like XLM and XRP before it's too late!",
      author: "Michael R.",
      role: "Early Investor",
      rating: 5,
    },
    {
      id: 2,
      text: "XRP is a HOLD crypto. Red days are buying opportunities! Soon, higher prices will be the norm. HOLD until new tax codes pass—this is the future of finance!",
      author: "Sarah L.",
      role: "Crypto Trader",
      rating: 5,
    },
    {
      id: 3,
      text: "Switching to the Quantum Financial System (QFS) by securing funds in XLM and XRP is the best decision. The banking system has never been honest with us!",
      author: "David K.",
      role: "Financial Advisor",
      rating: 5,
    },
    {
      id: 4,
      text: "Have you claimed your $200K NESARA GESARA payout? The transition to QFS is happening—don't be left behind!",
      author: "Jennifer M.",
      role: "QFS Advocate",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${testimonialBg})`,
        }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 to-emerald-900/85"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-500/30 mb-6">
            <ChatBubbleLeftRightIcon className="h-4 w-4 text-emerald-400 mr-2" />
            <span className="text-sm font-medium text-emerald-100">
              Community Voices
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-emerald-400">Customers</span> Say
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands who have already transitioned to quantum-secure
            finance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-emerald-800/30 p-6 hover:border-emerald-700/50 hover:bg-gray-900/70 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-900/40 flex items-center justify-center border border-emerald-700/30 group-hover:border-emerald-600/50 transition-colors">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-emerald-400" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center pt-4 border-t border-emerald-800/30">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-emerald-300">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <di className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-emerald-800/30">
            <CurrencyDollarIcon className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">$200K+</div>
            <div className="text-sm text-emerald-300">Average Payout</div>
          </div>

          <div className="text-center p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-emerald-800/30">
            <ArrowTrendingUpIcon className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">99%</div>
            <div className="text-sm text-emerald-300">Success Rate</div>
          </div>

          <div className="text-center p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-emerald-800/30">
            <ShieldCheckIcon className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-sm text-emerald-300">Secure</div>
          </div>

          <div className="text-center p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-emerald-800/30">
            <StarIcon className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white">4.9/5</div>
            <div className="text-sm text-emerald-300">Customer Rating</div>
          </div>
        </di> */}

        {/* CTA Section */}
        {/* <di className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-emerald-900/40 to-green-900/40 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/30 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Secure Your Financial Future?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands who have already transitioned to quantum-secure
              finance with QFS Ledger
            </p>
            <button className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Free
            </button>
          </div>
        </di> */}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
