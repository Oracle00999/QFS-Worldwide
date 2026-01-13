// pages/Deposit.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowDownIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

const Deposit = () => {
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
  const [depositData, setDepositData] = useState({
    cryptocurrency: "bitcoin",
    amount: "",
    txHash: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [depositResult, setDepositResult] = useState(null);
  const [copied, setCopied] = useState(false);

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
        setDepositData({
          ...depositData,
          [name]: value,
        });
      }
    } else {
      setDepositData({
        ...depositData,
        [name]: value,
      });
    }
    setError("");
  };

  const getCryptoName = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.name : cryptoId;
  };

  const getCryptoIcon = (cryptoId) => {
    const crypto = cryptoOptions.find((c) => c.id === cryptoId);
    return crypto ? crypto.icon : "◇";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Validation
    const amount = parseFloat(depositData.amount);

    if (!depositData.amount || amount <= 0) {
      setError("Please enter a valid deposit amount");
      return;
    }

    if (amount < 10) {
      setError("Minimum deposit amount is $10");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/wallet/deposit/request",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount,
            cryptocurrency: depositData.cryptocurrency,
            txHash: depositData.txHash || undefined, // Only send if provided
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setDepositResult(data.data);
        setSuccess(true);
        // Reset form
        setDepositData({
          cryptocurrency: "bitcoin",
          amount: "",
          txHash: "",
        });
      } else {
        setError(data.message || "Deposit request failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-lg mx-auto mb-11">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/dashboard" className="mr-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-emerald-700" />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deposit Funds</h1>
          <p className="text-gray-600">Add funds to your wallet</p>
        </div>
      </div>

      {/* Deposit Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl border border-emerald-800 shadow-xl overflow-hidden mb-8">
        {/* Card Header */}
        <div className="px-6 pt-6 pb-4 border-b border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Make a Deposit</h2>
              <p className="text-emerald-300 text-sm mt-1">
                Deposit cryptocurrency to your wallet
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-800 flex items-center justify-center">
              <ArrowDownTrayIcon className="h-5 w-5 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Deposit Form/Result */}
        <div className="p-6">
          {success && depositResult ? (
            <div className="space-y-6">
              {/* Success Header */}
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Deposit Request Submitted!
                </h3>
                <p className="text-emerald-300">
                  Your deposit request has been received and is pending
                  confirmation.
                </p>
              </div>

              {/* Deposit Address */}
              <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-emerald-300 font-medium">
                    {getCryptoName(depositResult.transaction.cryptocurrency)}{" "}
                    Deposit Address
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(depositResult.depositAddress)
                    }
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-800/50">
                  <p className="text-white font-mono text-sm break-all">
                    {depositResult.depositAddress}
                  </p>
                </div>
                <p className="text-xs text-emerald-400 mt-2">
                  Send funds to this address. The deposit will be credited after
                  blockchain confirmation.
                </p>
              </div>

              {/* Transaction Details */}
              <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800">
                <h4 className="text-sm text-emerald-300 font-medium mb-3">
                  Transaction Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">
                      Transaction ID
                    </span>
                    <span className="text-white text-sm font-medium">
                      {depositResult.transaction.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">Amount</span>
                    <span className="text-white text-sm font-medium">
                      {formatCurrency(depositResult.transaction.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">
                      Cryptocurrency
                    </span>
                    <span className="text-white text-sm font-medium">
                      {getCryptoName(depositResult.transaction.cryptocurrency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">Status</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/50 text-yellow-300">
                      {depositResult.transaction.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">
                      Request Time
                    </span>
                    <span className="text-white text-sm font-medium">
                      {formatDate(depositResult.transaction.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-emerald-950/30 rounded-lg p-4 border border-emerald-800/50">
                <h4 className="text-sm text-emerald-300 font-medium mb-2">
                  Next Steps
                </h4>
                <ul className="text-xs text-emerald-400 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>
                      Send the exact amount to the deposit address above
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>
                      Wait for blockchain confirmation (usually 2-6
                      confirmations)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>
                      Your funds will be credited after admin verification
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>
                      You can check deposit status in your transaction history
                    </span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSuccess(false)}
                  className="flex-1 py-2 bg-emerald-800 text-emerald-300 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  New Deposit
                </button>
                <Link
                  to="/dashboard"
                  className="flex-1 py-2 text-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDeposit}>
              {/* Cryptocurrency Selection */}
              <div className="mb-4">
                <label className="block text-sm text-emerald-300 font-medium mb-2">
                  Select Cryptocurrency
                </label>
                <div className="relative">
                  <select
                    name="cryptocurrency"
                    value={depositData.cryptocurrency}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-emerald-900 border border-emerald-700 rounded-xl pl-4 pr-10 py-3 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {cryptoOptions.map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol})
                      </option>
                    ))}
                  </select>
                  <ArrowDownIcon className="h-4 w-4 text-emerald-400 absolute right-3 top-4 pointer-events-none" />
                </div>
                <div className="flex items-center mt-2">
                  <div className="h-7 w-7 rounded-full bg-emerald-800 flex items-center justify-center mr-2">
                    <span className="text-emerald-300 font-bold">
                      {getCryptoIcon(depositData.cryptocurrency)}
                    </span>
                  </div>
                  <span className="text-sm text-emerald-300">
                    {getCryptoName(depositData.cryptocurrency)} deposits
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm text-emerald-300 font-medium mb-2">
                  Deposit Amount (USD)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="amount"
                    value={depositData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl pl-4 pr-4 py-3 text-2xl font-bold text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                  <div className="absolute right-4 top-3.5 text-emerald-400">
                    USD
                  </div>
                </div>
                <div className="text-xs text-emerald-500 mt-1">
                  Minimum deposit: $10.00
                </div>
              </div>

              {/* Transaction Hash (Optional) */}
              <div className="mb-6">
                <label className="block text-sm text-emerald-300 font-medium mb-2">
                  Transaction Hash (Optional)
                </label>
                <input
                  type="text"
                  name="txHash"
                  value={depositData.txHash}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl px-4 py-3 text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-500"
                />
                <div className="text-xs text-emerald-500 mt-1">
                  Provide if you've already sent the transaction
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <XCircleIcon className="h-4 w-4 text-red-400 mr-2 flex-shrink-0" />
                    <span className="text-red-300 text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Deposit Button */}
              <button
                type="submit"
                disabled={
                  loading ||
                  !depositData.amount ||
                  parseFloat(depositData.amount) < 10
                }
                className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                  loading ||
                  !depositData.amount ||
                  parseFloat(depositData.amount) < 10
                    ? "bg-emerald-800/50 text-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-lg"
                }`}
              >
                {loading ? "Processing..." : "Request Deposit"}
              </button>

              {/* Disclaimer */}
              <div className="mt-4 flex items-start text-xs text-emerald-400">
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                <p>
                  Deposit will be processed after blockchain confirmation.
                  Please ensure you send funds to the correct address.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
        <div className="px-4 py-3 border-b border-emerald-100">
          <h3 className="font-medium text-gray-900">Deposit Information</h3>
        </div>
        <div className="p-4">
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 shrink-0"></div>
              <span>Deposits are processed after blockchain confirmation</span>
            </li>
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 shrink-0"></div>
              <span>Minimum deposit amount is $10.00</span>
            </li>
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 shrink-0"></div>
              <span>
                Always double-check the deposit address before sending
              </span>
            </li>
            {/* <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 shrink-0"></div>
              <span>Do not send funds from exchanges directly</span>
            </li> */}
            <li className="flex items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 shrink-0"></div>
              <span>
                Contact support if deposit is not credited within 24 hours
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
