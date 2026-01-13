// pages/Transactions.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cryptoIcons = {
    bitcoin: "₿",
    ethereum: "Ξ",
    tether: "₮",
    "binance-coin": "ⓑ",
    solana: "◎",
    dogecoin: "Ð",
    ripple: "✕",
    stellar: "✤",
    tron: "Ⓣ",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffHours < 168) {
      // 7 days
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case "deposit":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "withdrawal":
        return "text-red-700 bg-red-50 border-red-200";
      case "swap":
        return "text-purple-700 bg-purple-50 border-purple-200";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "deposit":
        return <ArrowDownTrayIcon className="h-3.5 w-3.5" />;
      case "withdrawal":
        return <ArrowUpTrayIcon className="h-3.5 w-3.5" />;
      case "swap":
        return <ArrowsRightLeftIcon className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case "deposit":
        return "text-emerald-600";
      case "withdrawal":
        return "text-red-600";
      case "swap":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view transactions");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/wallet/transactions",
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
        // Get first 10 of each transaction type
        const allTransactions = data.data.transactions || [];

        const deposits = allTransactions
          .filter((tx) => tx.type === "deposit")
          .slice(0, 10);

        const withdrawals = allTransactions
          .filter((tx) => tx.type === "withdrawal")
          .slice(0, 10);

        const swaps = allTransactions
          .filter((tx) => tx.type === "swap")
          .slice(0, 10);

        // Combine and sort by date (newest first)
        const combined = [...deposits, ...withdrawals, ...swaps].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTransactions(combined);
        setError("");
      } else {
        setError(data.message || "Failed to load transactions");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading && transactions.length === 0) {
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
            <div className="absolute h-8 w-8 rounded-full bg-linear-to-br from-blue-100 to-purple-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <p className="text-gray-600 mt-4 animate-pulse">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link to="/account" className="mr-3">
              <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200">
                <ArrowLeftIcon className="h-4 w-4 text-emerald-700" />
              </div>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Transaction History
              </h1>
              <p className="text-gray-600 text-sm">
                First 10 of each transaction type
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {/* {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )} */}

        {/* Transactions Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="col-span-3 font-medium text-gray-900 text-sm">
              Type
            </div>
            <div className="col-span-3 font-medium text-gray-900 text-sm">
              Cryptocurrency
            </div>
            <div className="col-span-3 font-medium text-gray-900 text-sm">
              Amount
            </div>
            <div className="col-span-3 font-medium text-gray-900 text-sm">
              Date & Time
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div
                          className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs ${getTypeStyles(
                            transaction.type
                          )}`}
                        >
                          <span className="mr-1.5">
                            {getTypeIcon(transaction.type)}
                          </span>
                          <span className="font-medium">
                            {transaction.type}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`text-base font-semibold ${getAmountColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.type === "deposit"
                          ? "+"
                          : transaction.type === "withdrawal"
                          ? "-"
                          : "↔"}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-gray-700">
                            {cryptoIcons[transaction.cryptocurrency] ||
                              transaction.cryptocurrency
                                .charAt(0)
                                .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.cryptocurrency
                              .charAt(0)
                              .toUpperCase() +
                              transaction.cryptocurrency.slice(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.cryptocurrency.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatDate(transaction.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                    {/* Type */}
                    <div className="col-span-3">
                      <div
                        className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm ${getTypeStyles(
                          transaction.type
                        )}`}
                      >
                        <span className="mr-2">
                          {getTypeIcon(transaction.type)}
                        </span>
                        <span className="font-medium capitalize">
                          {transaction.type}
                        </span>
                      </div>
                    </div>

                    {/* Cryptocurrency */}
                    <div className="col-span-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-gray-700">
                            {cryptoIcons[transaction.cryptocurrency] ||
                              transaction.cryptocurrency
                                .charAt(0)
                                .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {transaction.cryptocurrency
                              .charAt(0)
                              .toUpperCase() +
                              transaction.cryptocurrency.slice(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {transaction.cryptocurrency.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="col-span-3">
                      <div
                        className={`text-lg font-semibold ${getAmountColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.type === "deposit"
                          ? "+"
                          : transaction.type === "withdrawal"
                          ? "-"
                          : "↔"}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="col-span-3">
                      <div className="text-gray-900">
                        {formatDate(transaction.createdAt)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <ArrowsRightLeftIcon className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No transactions
                </h3>
                <p className="text-xs text-gray-600">
                  Your transaction history will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg mb-6">
          <div className="flex items-center">
            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-xs text-emerald-700">i</span>
            </div>
            <p className="text-xs text-emerald-800">
              Showing first 10 of each transaction type. For full history,
              contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
