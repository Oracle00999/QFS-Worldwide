// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import logoImage from "../assets/logo.png"; // Add your logo import

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        "https://qfs-backend-ghuv.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setNotification({
          type: "success",
          message: "Login successful! Redirecting...",
        });

        // Store token and user data
        if (data.data?.token) {
          localStorage.setItem("token", data.data.token);
        }

        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));

          // Role-based redirection
          setTimeout(() => {
            if (data.data.user.role === "admin") {
              navigate("/admindashboard");
            } else {
              navigate("/dashboard");
            }
          }, 1500);
        } else {
          // Default to user dashboard if no user data
          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }
      } else {
        setNotification({
          type: "error",
          message:
            data.message || "Login failed. Please check your credentials.",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Home */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors group"
            >
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 group-hover:bg-emerald-50 transition-colors">
                <ArrowLeftIcon className="h-4 w-4 text-gray-500 group-hover:text-emerald-600" />
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Green accent header with Logo */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6">
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
                    Welcome Back
                  </h2>
                  <p className="text-emerald-100 text-sm">
                    Access your account
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
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <div className="flex items-center">
                    {notification.type === "success" ? (
                      <CheckCircleIcon className="h-5 w-5 mr-2 text-emerald-600" />
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
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="user@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-12 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember this device
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In to Your Account"
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600 text-sm">
                  Don't have a account?{" "}
                  <Link
                    to="/signup"
                    className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Create account here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
