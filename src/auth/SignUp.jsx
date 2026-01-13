// pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import logoImage from "../assets/logo.png"; // Add your logo import

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const getStrengthColor = (strength) => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength) => {
    if (strength < 25) return "Very Weak";
    if (strength < 50) return "Weak";
    if (strength < 75) return "Fair";
    if (strength < 100) return "Strong";
    return "Very Strong";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ type: "", message: "" });

    try {
      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          message: "Account created successfully! Redirecting to login...",
        });

        // Clear form
        setFormData({ email: "", password: "", firstName: "", lastName: "" });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setNotification({
          type: "error",
          message: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Network error. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Password requirements checklist
  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    { label: "Contains number", met: /[0-9]/.test(formData.password) },
    {
      label: "Contains special character",
      met: /[^A-Za-z0-9]/.test(formData.password),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="pt-24 pb-12">
        {" "}
        {/* Added padding for navbar */}
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home - Fixed positioning */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors group"
            >
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 group-hover:bg-green-50 transition-colors">
                <ArrowLeftIcon className="h-4 w-4 text-gray-500 group-hover:text-green-600" />
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Green accent header with Logo */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <div className="flex flex-col items-center text-center">
                {/* Logo */}
                <div className="mb-4">
                  <img
                    src={logoImage}
                    alt="QFS WorldWide Ledger Logo"
                    className="h-16 w-auto"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                          <span class="font-bold text-2xl text-white">Q</span>
                        </div>
                      `;
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Join QFS Ledger
                  </h2>
                  <p className="text-emerald-100 text-sm mt-1">
                    Create your account
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Notification */}
              {notification.message && (
                <div
                  className={`mb-6 p-4 rounded-xl ${
                    notification.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <div className="flex items-center">
                    {notification.type === "success" ? (
                      <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 mr-2 text-red-600" />
                    )}
                    <span className="text-sm font-medium">
                      {notification.message}
                    </span>
                  </div>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="user@example.com"
                  />
                </div>

                {/* Password with Strength Meter */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-24 rounded-full bg-gray-200 mr-2 overflow-hidden`}
                      >
                        <div
                          className={`h-full ${getStrengthColor(
                            passwordStrength
                          )} transition-all duration-300`}
                          style={{ width: `${passwordStrength}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength < 50
                            ? "text-red-600"
                            : passwordStrength < 75
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                  </div>

                  {/* Password Input with Toggle */}
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="mt-4 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center">
                        {req.met ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-gray-300 mr-2"></div>
                        )}
                        <span
                          className={`text-xs ${
                            req.met
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Creating Your Account...
                    </div>
                  ) : (
                    "Create Quantum-Secure Account"
                  )}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-green-600 hover:text-green-700 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
