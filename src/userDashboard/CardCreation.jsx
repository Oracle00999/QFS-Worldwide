// components/CardCreation.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft as ArrowLeftIcon,
  CircleCheck as CheckCircleIcon,
  Copy as DocumentDuplicateIcon,
  CreditCard as CreditCardIcon,
  Globe2 as GlobeAltIcon,
  LockKeyhole as LockClosedIcon,
  MapPin as MapPinIcon,
  ShieldCheck as ShieldCheckIcon,
  UserRound as UserIcon,
} from "lucide-react";
import { apiUrl } from "../config/api";

const CARD_DEPOSIT_AMOUNT = "$1,000";
const CARD_DEPOSIT_CRYPTO = "XRP";
const CARD_DEPOSIT_NETWORK = "Ripple";
const CARD_DEPOSIT_WALLET = "rnnzcuLZavvZrmcde7eqjDCmXRUFgsdvqK";

const CardCreation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentData, setPaymentData] = useState({
    transactionId: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    country: "",
  });

  // Simple authorization check
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(apiUrl("/api/auth/me"), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        const user = data?.data?.user;
        const userName = user?.fullName || user?.name || "";

        if (response.ok && data.success && userName) {
          setFormData((previousData) => ({
            ...previousData,
            name: previousData.name || userName,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!paymentData.transactionId.trim()) return;

    setPaymentConfirmed(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const cardHolderName = formData.name.trim() || "CARD HOLDER";

  // Use your loading animation
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="relative h-16 w-16 mb-4 mx-auto">
            <div
              className="absolute h-full w-full rounded-full border-4"
              style={{ borderColor: "#E1E6EC" }}
            ></div>
            <div
              className="absolute h-full w-full rounded-full border-4 border-transparent animate-spin"
              style={{ borderTopColor: "#2F80ED", animationDuration: "1s" }}
            ></div>
            <div
              className="absolute h-full w-full rounded-full border-4 border-transparent animate-spin"
              style={{
                borderRightColor: "#5DA9E9",
                animationDuration: "1.2s",
                animationDelay: "0.1s",
              }}
            ></div>
            <div
              className="absolute h-8 w-8 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: "#F5F7FA" }}
            ></div>
          </div>
          <p className="text-gray-600 font-medium" style={{ color: "#6B7280" }}>
            Loading ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mb-11">
      {/* Success Notification - Top Right */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className="text-emerald-800 border rounded-xl p-4 shadow-lg flex items-center"
            style={{
              backgroundColor: "rgba(107, 207, 61, 0.1)",
              borderColor: "#6BCF3D",
            }}
          >
            <CheckCircleIcon
              className="h-5 w-5 mr-2"
              style={{ color: "#6BCF3D" }}
            />
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
          className="inline-flex items-center transition-colors group"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2F80ED")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center mr-2 transition-colors group-hover:scale-105"
            style={{ backgroundColor: "#F5F7FA" }}
          >
            <ArrowLeftIcon className="h-4 w-4" style={{ color: "#6B7280" }} />
          </div>
          <span className="font-medium">Back to Account</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "#1F2D3D" }}
        >
          Create Your Coindraw Card
        </h1>
        <p className="mt-3" style={{ color: "#6B7280" }}>
          Complete the XRP activation deposit, then submit your card request.
        </p>
      </div>

      {/* Card Preview */}
      <div className="mb-8 flex justify-center">
        <div
          className="w-full max-w-2xl rounded-2xl p-6 md:p-8 shadow-2xl border overflow-hidden relative"
          style={{
            background:
              "linear-gradient(135deg, #111827 0%, #1F2D3D 44%, #2F80ED 100%)",
            borderColor: "rgba(93, 169, 233, 0.45)",
            aspectRatio: "1.65 / 1",
          }}
        >
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(0deg, rgba(30, 201, 232, 0.18), rgba(30, 201, 232, 0))",
            }}
          ></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="text-xs uppercase tracking-[0.24em] mb-2"
                  style={{ color: "#8FA6BF" }}
                >
                  QFS Ledger
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "#FFFFFF" }}
                >
                  COINDRAW
                </div>
              </div>
              <div
                className="h-12 w-16 rounded-xl border"
                style={{
                  background:
                    "linear-gradient(135deg, #F7D774 0%, #B8860B 100%)",
                  borderColor: "rgba(255, 255, 255, 0.35)",
                }}
              ></div>
            </div>

            <div>
              <div
                className="font-mono text-xl md:text-2xl tracking-[0.18em] mb-6"
                style={{ color: "#FFFFFF" }}
              >
                5280 **** **** 9042
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div
                    className="text-[10px] uppercase mb-1"
                    style={{ color: "#8FA6BF" }}
                  >
                    Cardholder
                  </div>
                  <div
                    className="text-base md:text-lg font-semibold uppercase truncate max-w-[220px] md:max-w-sm"
                    style={{ color: "#FFFFFF" }}
                  >
                    {cardHolderName}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-[10px] uppercase mb-1"
                    style={{ color: "#8FA6BF" }}
                  >
                    Valid Thru
                  </div>
                  <div className="font-semibold" style={{ color: "#FFFFFF" }}>
                    12/30
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activation Deposit */}
      {!paymentConfirmed && (
        <div
          className="rounded-2xl border shadow-lg p-8 mb-8"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E1E6EC",
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "#1F2D3D" }}
              >
                Card Activation Deposit
              </h2>
              <p style={{ color: "#6B7280" }}>
                Submit the required {CARD_DEPOSIT_CRYPTO} activation deposit of{" "}
                {CARD_DEPOSIT_AMOUNT} before sending your card request.
              </p>
            </div>
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
            >
              <LockClosedIcon
                className="h-6 w-6"
                style={{ color: "#2F80ED" }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
              }}
            >
              <div className="text-sm mb-1" style={{ color: "#6B7280" }}>
                Amount
              </div>
              <div className="font-bold text-lg" style={{ color: "#1F2D3D" }}>
                {CARD_DEPOSIT_AMOUNT}
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
              }}
            >
              <div className="text-sm mb-1" style={{ color: "#6B7280" }}>
                Asset
              </div>
              <div className="font-bold text-lg" style={{ color: "#1F2D3D" }}>
                {CARD_DEPOSIT_CRYPTO}
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
              }}
            >
              <div className="text-sm mb-1" style={{ color: "#6B7280" }}>
                Network
              </div>
              <div className="font-bold text-lg" style={{ color: "#1F2D3D" }}>
                {CARD_DEPOSIT_NETWORK}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium" style={{ color: "#1F2D3D" }}>
                XRP Deposit Wallet
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(CARD_DEPOSIT_WALLET)}
                className="inline-flex items-center text-sm font-medium"
                style={{ color: "#2F80ED" }}
              >
                <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#1F2D3D",
                borderColor: "#2F80ED",
              }}
            >
              <p
                className="font-mono text-sm break-all"
                style={{ color: "#FFFFFF" }}
              >
                {CARD_DEPOSIT_WALLET}
              </p>
            </div>
          </div>

          <div
            className="mb-6 rounded-xl border p-4 text-sm"
            style={{
              backgroundColor: "rgba(247, 147, 26, 0.08)",
              borderColor: "rgba(247, 147, 26, 0.35)",
              color: "#1F2D3D",
            }}
          >
            If your deposit is not received, your card request will not be
            processed.
          </div>

          <form className="space-y-5" onSubmit={handlePaymentSubmit}>
            <div>
              <label
                className="block text-lg font-medium mb-3"
                style={{ color: "#1F2D3D" }}
              >
                Transaction ID
              </label>
              <input
                name="transactionId"
                type="text"
                required
                value={paymentData.transactionId}
                onChange={handlePaymentChange}
                className="w-full px-5 py-4 text-lg border rounded-xl focus:outline-none transition-all"
                style={{
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2F80ED";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(47, 128, 237, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Paste your XRP transaction ID"
              />
            </div>
            <button
              type="submit"
              className="w-full py-5 px-6 text-lg rounded-xl font-bold text-white transition-all duration-300 hover:opacity-90 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: "#2F80ED" }}
            >
              I Have Made Payment
            </button>
          </form>
        </div>
      )}

      {/* Form Below */}
      <div
        className={`rounded-2xl border shadow-lg p-8 ${
          paymentConfirmed ? "" : "opacity-60"
        }`}
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#1F2D3D" }}>
            Request Card
          </h2>
          <p className="text-gray-600" style={{ color: "#6B7280" }}>
            {paymentConfirmed
              ? "Enter your information to personalize your card"
              : "Complete the XRP activation deposit before submitting your request"}
          </p>
          {paymentConfirmed && (
            <div
              className="mt-4 rounded-xl border p-3 text-sm"
              style={{
                backgroundColor: "rgba(107, 207, 61, 0.1)",
                borderColor: "#6BCF3D",
                color: "#1F2D3D",
              }}
            >
              Payment marked as made. Transaction ID:{" "}
              <span className="font-mono">{paymentData.transactionId}</span>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              className="block text-lg font-medium mb-3"
              style={{ color: "#1F2D3D" }}
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <UserIcon className="h-6 w-6" style={{ color: "#8FA6BF" }} />
              </div>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="pl-12 w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2F80ED";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(47, 128, 237, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label
              className="block text-lg font-medium mb-3"
              style={{ color: "#1F2D3D" }}
            >
              Address
            </label>
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                <MapPinIcon className="h-6 w-6" style={{ color: "#8FA6BF" }} />
              </div>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="pl-12 w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                style={{
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2F80ED";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(47, 128, 237, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your complete address"
              />
            </div>
          </div>

          {/* Country Field */}
          <div>
            <label
              className="block text-lg font-medium mb-3"
              style={{ color: "#1F2D3D" }}
            >
              Country
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <GlobeAltIcon
                  className="h-6 w-6"
                  style={{ color: "#8FA6BF" }}
                />
              </div>
              <input
                name="country"
                type="text"
                required
                value={formData.country}
                onChange={handleChange}
                className="pl-12 w-full px-5 py-4 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                  backgroundColor: "#FFFFFF",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2F80ED";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(47, 128, 237, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E1E6EC";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="Enter your country"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !paymentConfirmed}
            className={`w-full py-5 px-6 text-lg rounded-xl font-bold text-white transition-all duration-300 mt-8 ${
              submitting || !paymentConfirmed
                ? "cursor-not-allowed"
                : "hover:opacity-90 shadow-lg hover:shadow-xl"
            }`}
            style={{
              backgroundColor:
                submitting || !paymentConfirmed
                  ? "rgba(47, 128, 237, 0.5)"
                  : "#2F80ED",
            }}
          >
            {submitting ? (
              <div className="flex items-center justify-center">
                <div
                  className="h-6 w-6 border-2 border-t-transparent rounded-full animate-spin mr-3"
                  style={{
                    borderColor: "#FFFFFF",
                    borderTopColor: "transparent",
                  }}
                ></div>
                Submitting...
              </div>
            ) : (
              "Request Coindraw Card"
            )}
          </button>
        </form>

        {/* Security Note */}
        <div
          className="mt-10 pt-8 border-t mb-7"
          style={{ borderColor: "#E1E6EC" }}
        >
          <div className="flex items-start">
            <ShieldCheckIcon
              className="h-6 w-6 mr-3 flex-shrink-0 mt-1"
              style={{ color: "#2F80ED" }}
            />
            <div>
              <h3 className="font-bold mb-2" style={{ color: "#1F2D3D" }}>
                Security Guarantee
              </h3>
              <p className="" style={{ color: "#6B7280" }}>
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
