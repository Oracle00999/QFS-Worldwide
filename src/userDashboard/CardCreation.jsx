// components/CardCreation.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  CreditCardIcon,
  UserIcon,
  MapPinIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import cardImage from "../assets/card-image.png";

const CardCreation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "",
  });

  // Simple authorization check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Small delay to show loading animation
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      // Show success notification
      setShowSuccess(true);

      // Clear form
      setFormData({ name: "", address: "", country: "" });
      setSubmitting(false);

      // Hide success notification after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Use your loading animation
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="relative h-16 w-16">
            <div className="absolute h-full w-full rounded-full border-4 border-blue-200"></div>
            <div className="absolute h-full w-full rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            <div
              className="absolute h-full w-full rounded-full border-4 border-transparent border-b-purple-600 animate-spin"
              style={{ animationDuration: "1.5s" }}
            ></div>
            <div className="absolute h-8 w-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-gray-600 mt-4 animate-pulse">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Success Notification - Top Right */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-4 shadow-lg flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="font-medium">
              Card details submitted successfully!
            </span>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/account"
          className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors group"
        >
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 group-hover:bg-emerald-50 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 text-gray-500 group-hover:text-emerald-600" />
          </div>
          <span className="font-medium">Back to Account</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Create Your QFS Ledger Card
        </h1>
        {/* <p className="text-gray-600 mt-2">
          Personalize your quantum-secure card with your details
        </p> */}
      </div>

      {/* Card Image at the Top - Standing Alone */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <img
              src={cardImage}
              alt="QFS Card Preview"
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
                const parent = e.target.parentElement;
                parent.innerHTML = `
                  <div class="w-full aspect-[1.6] rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex flex-col items-center justify-center text-white">
                    <div class="text-center p-6">
                      <CreditCardIcon class="h-16 w-16 mx-auto mb-4" />
                      <span class="font-bold text-2xl block mb-2">QFS LEDGER CARD</span>
                      <span class="text-emerald-100 text-sm">Quantum Secure Payment Card</span>
                    </div>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </div>

      {/* Form Below */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Card Details Form
          </h2>
          <p className="text-gray-600">
            Enter your information to personalize your card
          </p>
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-6 w-6 text-gray-400" />
              </div>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="pl-12 w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Address
            </label>
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <MapPinIcon className="h-6 w-6 text-gray-400" />
              </div>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="pl-12 w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter your complete address"
              />
            </div>
          </div>

          {/* Country Field */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-3">
              Country
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <GlobeAltIcon className="h-6 w-6 text-gray-400" />
              </div>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="pl-12 w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="">Select your country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-5 px-6 text-lg rounded-xl font-bold text-white transition-all duration-300 mt-8 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Submitting...
              </div>
            ) : (
              "Create Quantum-Secure Card"
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="mt-10 pt-8 border-t border-gray-200 mb-7">
          <div className="flex items-start">
            <ShieldCheckIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">
                Security Guarantee
              </h3>
              <p className="text-gray-600 ">
                All your card details are protected with quantum-resistant
                encryption. Your personal information is securely encrypted and
                will only be used for card issuance and verification purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation for slide-in notification */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CardCreation;
