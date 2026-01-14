// pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  PlusCircleIcon,
  CheckBadgeIcon,
  ClockIcon,
  XCircleIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Cardlogo from "../assets/cardlogo1.jpg";
import BtcLogo from "../assets/btc.svg";
import EthLogo from "../assets/eth.svg";
import UsdtLogo from "../assets/usdt.svg";
import BnbLogo from "../assets/bnb.svg";
import SolLogo from "../assets/sol.svg";
import DogeLogo from "../assets/doge.svg";
import XrpLogo from "../assets/xrp.svg";
import XlmLogo from "../assets/xlm.svg";
import TrxLogo from "../assets/trx.svg";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Token display names with symbols
  const tokenDisplayNames = {
    bitcoin: "Bitcoin (BTC)",
    ethereum: "Ethereum (ETH)",
    tether: "Tether (USDT)",
    "binance-coin": "Binance Coin (BNB)",
    solana: "Solana (SOL)",
    dogecoin: "Dogecoin (DOGE)",
    ripple: "Ripple (XRP)",
    stellar: "Stellar (XLM)",
    tron: "Tron (TRX)",
  };

  // Only one notification - Welcome message
  const notifications = [
    { id: 1, message: "Welcome to QFS Ledger!", read: false },
  ];

  // Token logo mapping (add more as assets are added)
  const tokenLogos = {
    bitcoin: BtcLogo,
    ethereum: EthLogo,
    tether: UsdtLogo,
    "binance-coin": BnbLogo,
    solana: SolLogo,
    dogecoin: DogeLogo,
    ripple: XrpLogo,
    stellar: XlmLogo,
    tron: TrxLogo,
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(fetchUserData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
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
        setError(null);
      } else {
        setError(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getKycStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
            <CheckBadgeIcon className="h-4 w-4 mr-1.5" />
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

  //   if (error) {
  //     return (
  //       <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
  //         <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
  //           <XCircleIcon className="h-6 w-6 text-red-600" />
  //         </div>
  //         <h3 className="text-lg font-semibold text-gray-900 mb-2">
  //           Error Loading Dashboard
  //         </h3>
  //         <p className="text-gray-600 mb-4">{error}</p>
  //         <button
  //           onClick={fetchUserData}
  //           className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     );
  //   }

  // Calculate total and sort balances
  const totalBalance =
    userData?.wallet?.totalValue ||
    (userData?.wallet?.balances
      ? Object.values(userData.wallet.balances).reduce(
          (sum, val) => sum + val,
          0
        )
      : 0);

  // Sort balances by amount (highest first)
  const sortedBalances = userData?.wallet?.balances
    ? Object.entries(userData.wallet.balances).sort(([, a], [, b]) => b - a) // Sort by value descending
    : [];

  return (
    <>
      {/* User Card - Darker Green Only */}
      <div
        className="bg-gradient-to-br from-emerald-900 to-green-900 border border-emerald-800 rounded-2xl p-6 mb-9 shadow-xl relative"
        style={{
          backgroundImage: `url(${Cardlogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Notification Icon - Top Right */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-10 w-10 rounded-full bg-emerald-800/70 flex items-center justify-center hover:bg-emerald-700 transition-colors border border-emerald-700"
            >
              <BellIcon className="h-5 w-5 text-emerald-300" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-emerald-900"></span>
              )}
            </button>

            {/* Notifications Dropdown - Only Welcome Message */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-900 rounded-xl shadow-xl border border-emerald-800 z-50">
                <div className="px-4 py-3 border-b border-emerald-800">
                  <h3 className="font-semibold text-white">Welcome</h3>
                  <p className="text-xs text-emerald-300">New notification</p>
                </div>
                <div className="p-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-3 py-3 bg-emerald-900/30 rounded-lg border border-emerald-800/30"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-200">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-emerald-800">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full text-center text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-start mb-8">
          <div className="flex items-center mb-4 md:mb-0"></div>

          <div className="text-left">
            <div className="text-sm text-emerald-300 mb-1">Total Balance</div>
            <div className="text-3xl md:text-4xl font-bold text-white">
              {formatCurrency(totalBalance)}
            </div>
            <div className="text-sm text-emerald-400 mt-1">Quantum-Secured</div>
          </div>
        </div>

        {/* Wallet Action Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-8">
          <Link
            to="/deposit"
            className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-emerald-700 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all group"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-800/70 flex items-center justify-center mb-2 group-hover:bg-emerald-700 transition-colors">
              <ArrowUpTrayIcon className="h-5 w-5 text-emerald-300" />
            </div>
            <span className="text-sm font-medium text-gray-200">Send</span>
          </Link>

          <Link
            to="/withdraw"
            className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-emerald-700 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all group"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-800/70 flex items-center justify-center mb-2 group-hover:bg-emerald-700 transition-colors">
              <ArrowDownTrayIcon className="h-5 w-5 text-emerald-300" />
            </div>
            <span className="text-sm font-medium text-gray-200">Receive</span>
          </Link>

          <Link
            to="/link"
            className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-emerald-700 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all group"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-800/70 flex items-center justify-center mb-2 group-hover:bg-emerald-700 transition-colors">
              <ArrowsRightLeftIcon className="h-5 w-5 text-emerald-300" />
            </div>
            <span className="text-sm font-medium text-gray-200">Link</span>
          </Link>

          <a
            href="https://www.moonpay.com/buy/xlm"
            target="_blank"
            className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-emerald-700 hover:border-emerald-500 hover:bg-emerald-800/50 transition-all group"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-800/70 flex items-center justify-center mb-2 group-hover:bg-emerald-700 transition-colors">
              <PlusCircleIcon className="h-5 w-5 text-emerald-300" />
            </div>
            <span className="text-sm font-medium text-gray-200">Buy</span>
          </a>
        </div>
      </div>

      {/* Tokens Section */}
      <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-emerald-100">
          <h2 className="text-lg font-semibold text-gray-900">Your Assets</h2>
        </div>

        {/* Tokens with spacing */}
        <div className="p-4 space-y-3">
          {sortedBalances.map(([token, balance]) => (
            <div
              key={token}
              className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200 shadow-sm"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center mr-3 overflow-hidden">
                  {tokenLogos[token] ? (
                    <img
                      src={tokenLogos[token]}
                      alt={`${token} logo`}
                      className="h-8 w-8"
                    />
                  ) : (
                    <span className="text-lg font-bold text-emerald-700">
                      {token.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {tokenDisplayNames[token] ||
                      token.charAt(0).toUpperCase() +
                        token.slice(1).replace("-", " ")}
                  </div>
                  <div className="text-sm text-gray-500">
                    {token.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-900">
                  {formatCurrency(balance)}
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full mt-1 ${
                    balance > 0
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {balance > 0 ? "Active" : "No Balance"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-xl mb-10">
        <div className="flex items-center">
          <CheckBadgeIcon className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              All assets are protected by quantum-resistant encryption and FRA
              fund recovery system.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
