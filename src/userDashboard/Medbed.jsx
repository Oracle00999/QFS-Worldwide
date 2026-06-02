import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const MEDBED_DEPOSIT_AMOUNT = "$5,000";
const MEDBED_PAYMENT_ASSET = "XRP";
const MEDBED_PAYMENT_NETWORK = "Ripple";
const MEDBED_WALLET_ADDRESS = "rnnzcuLZavvZrmcde7eqjDCmXRUFgsdvqK";

const Medbed = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    transactionId: "",
    message: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "https://qfs-backend-ghuv.onrender.com/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        const user = data?.data?.user;

        if (response.ok && data.success && user) {
          setFormData((previousData) => ({
            ...previousData,
            fullName: user.fullName || user.name || "",
            email: user.email || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setShowSuccess(true);
      setFormData((previousData) => ({
        ...previousData,
        transactionId: "",
        message: "",
      }));

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

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
              className="absolute h-8 w-8 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: "#F5F7FA" }}
            ></div>
          </div>
          <p className="font-medium" style={{ color: "#6B7280" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mb-20">
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className="border rounded-xl p-4 shadow-lg flex items-center"
            style={{
              backgroundColor: "rgba(107, 207, 61, 0.1)",
              borderColor: "#6BCF3D",
              color: "#1F2D3D",
            }}
          >
            <CheckCircleIcon
              className="h-5 w-5 mr-2"
              style={{ color: "#6BCF3D" }}
            />
            <span className="font-medium">Medbed request submitted.</span>
          </div>
        </div>
      )}

      <div className="mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center transition-colors group"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#2F80ED")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center mr-3 transition-colors group-hover:scale-105 border"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E1E6EC",
            }}
          >
            <ArrowLeftIcon className="h-4 w-4" style={{ color: "#6B7280" }} />
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: "#1F2D3D" }}>
          Medbed Request
        </h1>
        <p style={{ color: "#6B7280" }}>
          Complete payment and send your request details for review
        </p>
      </div>

      <div
        className="rounded-2xl border shadow-xl overflow-hidden mb-8"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "#1F2D3D" }}
              >
                Pay with {MEDBED_PAYMENT_ASSET} ({MEDBED_PAYMENT_NETWORK})
              </h2>
              <p style={{ color: "#6B7280" }}>
                Send the required amount to the address below:
              </p>
            </div>
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center border shrink-0"
              style={{
                backgroundColor: "rgba(47, 128, 237, 0.1)",
                borderColor: "rgba(47, 128, 237, 0.24)",
                color: "#2F80ED",
              }}
            >
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
              }}
            >
              <div
                className="text-xs uppercase mb-1"
                style={{ color: "#6B7280" }}
              >
                Amount
              </div>
              <div className="text-lg font-bold" style={{ color: "#2F80ED" }}>
                {MEDBED_DEPOSIT_AMOUNT}
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
              }}
            >
              <div
                className="text-xs uppercase mb-1"
                style={{ color: "#6B7280" }}
              >
                Asset
              </div>
              <div className="text-lg font-bold" style={{ color: "#1F2D3D" }}>
                {MEDBED_PAYMENT_ASSET}
              </div>
            </div>
            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
              }}
            >
              <div
                className="text-xs uppercase mb-1"
                style={{ color: "#6B7280" }}
              >
                Network
              </div>
              <div className="text-lg font-bold" style={{ color: "#1F2D3D" }}>
                {MEDBED_PAYMENT_NETWORK}
              </div>
            </div>
          </div>

          <div
            className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{
              backgroundColor: "#1F2D3D",
              borderColor: "#2F80ED",
            }}
          >
            <p
              className="font-mono text-sm break-all"
              style={{ color: "#FFFFFF" }}
            >
              {MEDBED_WALLET_ADDRESS}
            </p>
            <button
              type="button"
              onClick={() => copyToClipboard(MEDBED_WALLET_ADDRESS)}
              className="inline-flex items-center justify-center rounded-xl border px-4 py-3 font-semibold shrink-0"
              style={{
                backgroundColor: "rgba(47, 128, 237, 0.18)",
                borderColor: "#2F80ED",
                color: "#FFFFFF",
              }}
            >
              <DocumentDuplicateIcon className="h-4 w-4 mr-2" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div
            className="mt-5 rounded-xl border p-4 text-sm"
            style={{
              backgroundColor: "rgba(247, 147, 26, 0.08)",
              borderColor: "rgba(247, 147, 26, 0.35)",
              color: "#1F2D3D",
            }}
          >
            If your deposit is not received, your medbed request will not be
            processed.
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border shadow-xl overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div
          className="px-6 md:px-8 py-6 border-b flex items-start justify-between"
          style={{ borderColor: "#E1E6EC" }}
        >
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#1F2D3D" }}>
              Request Details
            </h2>
            <p style={{ color: "#6B7280" }}>
              Your name and email are prefilled from your account
            </p>
          </div>
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center border shrink-0"
            style={{
              backgroundColor: "rgba(47, 128, 237, 0.1)",
              borderColor: "rgba(47, 128, 237, 0.24)",
              color: "#2F80ED",
            }}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </div>
        </div>

        <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#6B7280" }}
            >
              Full Name
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: "#8FA6BF" }}
              />
              <input
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border py-4 pl-12 pr-4 text-lg focus:outline-none"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#6B7280" }}
            >
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                style={{ color: "#8FA6BF" }}
              />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border py-4 pl-12 pr-4 text-lg focus:outline-none"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#6B7280" }}
            >
              Transaction ID
            </label>
            <input
              name="transactionId"
              type="text"
              required
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-4 text-lg focus:outline-none"
              placeholder="Paste your payment transaction ID"
              style={{
                backgroundColor: "#F5F7FA",
                borderColor: "#E1E6EC",
                color: "#1F2D3D",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color: "#6B7280" }}
            >
              Message
            </label>
            <div className="relative">
              <PencilSquareIcon
                className="absolute left-4 top-5 h-5 w-5"
                style={{ color: "#8FA6BF" }}
              />
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full resize-none rounded-xl border py-4 pl-12 pr-4 text-lg focus:outline-none"
                placeholder="Write your medbed request or payment details"
                style={{
                  backgroundColor: "#F5F7FA",
                  borderColor: "#E1E6EC",
                  color: "#1F2D3D",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full rounded-xl py-4 text-lg font-bold transition-all ${
              submitting ? "cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{
              backgroundColor: submitting
                ? "rgba(47, 128, 237, 0.5)"
                : "#2F80ED",
              color: "#FFFFFF",
            }}
          >
            {submitting ? "Submitting..." : "Submit Medbed Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Medbed;
