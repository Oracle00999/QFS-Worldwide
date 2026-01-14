// pages/Account.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import CardLogo from "../assets/cardlogo1.jpg";

const Account = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/auth/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setUserData(data.data.user);
        setError("");
      } else {
        setError(data.message || "Failed to fetch account data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getKycStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
            KYC Verified
          </div>
        );
      case "pending":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium">
            <ClockIcon className="h-4 w-4 mr-1.5" />
            KYC Pending
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium">
            <XCircleIcon className="h-4 w-4 mr-1.5" />
            KYC Required
          </div>
        );
    }
  };

  const getKycIconColor = (status) => {
    switch (status) {
      case "verified":
        return "text-emerald-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-red-600";
    }
  };

  const getKycActionText = (status) => {
    switch (status) {
      case "verified":
        return "Verified";
      case "pending":
        return "Pending Review";
      default:
        return "Verify Now";
    }
  };

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
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        <p className="text-gray-600 mt-2">
          Manage your wallet and account settings
        </p>
      </div>

      {/* User Profile Card */}
      <div
        className="bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl border border-emerald-800 shadow-xl overflow-hidden mb-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${CardLogo})` }}
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white">
                {userData?.fullName || "User"}
              </h2>
              <p className="text-emerald-300 mt-1 text-lg">
                {userData?.email || "user@example.com"}
              </p>
              <div className="mt-4">
                {getKycStatusBadge(userData?.kycStatus)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Actions - Horizontal Scroll on Mobile */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Wallet Actions
        </h2>

        {/* Horizontal Container */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex space-x-4 min-w-min">
            {/* Send */}
            <Link
              to="/deposit"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <ArrowUpTrayIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  Send Funds
                </h3>
                <p className="text-sm text-gray-600">Deposit to your wallet</p>
              </div>
            </Link>

            {/* Receive */}
            <Link
              to="/withdraw"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <ArrowDownTrayIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  Withdraw Funds
                </h3>
                <p className="text-sm text-gray-600">
                  {" "}
                  Withdraw to external wallet
                </p>
              </div>
            </Link>

            {/* card */}
            <Link
              to="/card-creation"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <CreditCardIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  Create Card
                </h3>
                <p className="text-sm text-gray-600"> Create a new card</p>
              </div>
            </Link>
            {/* Buy & Sell */}
            <a
              href="https://www.moonpay.com/buy/xlm"
              target="_blank"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <ShoppingCartIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  Buy & Sell Crypto
                </h3>
                <p className="text-sm text-gray-600">Trade cryptocurrencies</p>
              </div>
            </a>

            {/* Swap */}
            <Link
              to="/swap"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <ArrowsRightLeftIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  Swap
                </h3>
                <p className="text-sm text-gray-600">
                  Exchange between cryptos
                </p>
              </div>
            </Link>

            {/* History */}
            <Link
              to="/history"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <ClockIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  History
                </h3>
                <p className="text-sm text-gray-600">
                  View Transaction History
                </p>
              </div>
            </Link>
            {/* Link Wallet */}
            <Link
              to="/link"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                  <Cog6ToothIcon className="h-7 w-7 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  Link Wallet
                </h3>
                <p className="text-sm text-gray-600">Connect external wallet</p>
              </div>
            </Link>

            {/* KYC Verification */}
            <Link
              to="/kyc-verify"
              className="bg-white rounded-xl border border-emerald-100 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 group min-w-[180px] flex-shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors ${
                    userData?.kycStatus === "verified"
                      ? "bg-emerald-100 group-hover:bg-emerald-200"
                      : userData?.kycStatus === "pending"
                      ? "bg-yellow-100 group-hover:bg-yellow-200"
                      : "bg-red-100 group-hover:bg-red-200"
                  }`}
                >
                  <ShieldCheckIcon
                    className={`h-7 w-7 ${getKycIconColor(
                      userData?.kycStatus
                    )}`}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  KYC Verification
                </h3>
                <p className="text-sm text-gray-600">
                  {getKycActionText(userData?.kycStatus)}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-emerald-100 bg-emerald-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Information
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Member Since */}
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Member Since
              </label>
              <div className="text-sm text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-100">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </div>
            </div>

            {/* Last Login */}
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Last Login
              </label>
              <div className="text-sm text-gray-900 p-3 bg-gray-50 rounded-lg border border-gray-100">
                {userData?.lastLogin
                  ? new Date(userData.lastLogin).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A"}
              </div>
            </div>

            {/* Account Status */}
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                Account Status
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                {userData?.isActive ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* KYC Status Detail */}
            <div>
              <label className="block text-sm text-gray-500 font-medium mb-2">
                KYC Status
              </label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">
                    {userData?.kycStatus === "verified"
                      ? "Fully Verified"
                      : userData?.kycStatus === "pending"
                      ? "Under Review"
                      : "Not Verified"}
                  </span>
                  {userData?.kycStatus === "verified" &&
                    userData?.kycVerifiedAt && (
                      <span className="text-xs text-gray-500">
                        Verified:{" "}
                        {new Date(userData.kycVerifiedAt).toLocaleDateString()}
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-100 mb-9">
            <p className="text-sm text-gray-600">
              Need help with your account?
            </p>
            <button className="mt-2 w-full py-2 text-sm bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
