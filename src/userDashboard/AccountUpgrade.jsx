import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Copy, ShieldCheck } from "lucide-react";

const UPGRADE_DEPOSIT_AMOUNT = "$500";
const UPGRADE_DEPOSIT_ASSET = "XRP";
const UPGRADE_DEPOSIT_NETWORK = "Ripple";
const UPGRADE_DEPOSIT_WALLET = "rnnzcuLZavvZrmcde7eqjDCmXRUFgsdvqK";

const AccountUpgrade = () => {
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState({
    transactionId: "",
  });

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!paymentData.transactionId.trim()) return;

    setSubmitting(true);

    setTimeout(() => {
      const request = {
        transactionId: paymentData.transactionId.trim(),
        amount: UPGRADE_DEPOSIT_AMOUNT,
        asset: UPGRADE_DEPOSIT_ASSET,
        network: UPGRADE_DEPOSIT_NETWORK,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem("accountUpgradeRequest", JSON.stringify(request));
      setSubmitting(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mb-20">
      {showSuccess && (
        <div
          className="rounded-2xl border p-8 text-center shadow-sm"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E1E6EC",
          }}
        >
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(107, 207, 61, 0.1)" }}
          >
            <CheckCircle2 className="h-8 w-8" style={{ color: "#6BCF3D" }} />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#1F2D3D" }}>
            Upgrade Request Submitted
          </h1>
          <p className="mb-6" style={{ color: "#6B7280" }}>
            Your payment details have been submitted. Your account upgrade will
            be processed after the deposit is confirmed.
          </p>
          <Link
            to="/account"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold"
            style={{ backgroundColor: "#2F80ED", color: "#FFFFFF" }}
          >
            Back to Account
          </Link>
        </div>
      )}

      {!showSuccess && (
        <>
          <div className="mb-8">
            <Link
              to="/account"
              className="inline-flex items-center transition-colors group"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2F80ED")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center mr-3 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E1E6EC",
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Back to Account</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#1F2D3D" }}
            >
              Account Upgrade
            </h1>
            <p style={{ color: "#6B7280" }}>
              Complete the XRP deposit and submit your upgrade request for
              verification.
            </p>
          </div>

          <div
            className="rounded-2xl border shadow-lg p-6 md:p-8 mb-8"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E1E6EC",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-7">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Upgrade Deposit
                </h2>
                <p style={{ color: "#6B7280" }}>
                  Send the required XRP deposit before submitting your request.
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
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mb-5">
              {[
                ["Amount", UPGRADE_DEPOSIT_AMOUNT],
                ["Asset", UPGRADE_DEPOSIT_ASSET],
                ["Network", UPGRADE_DEPOSIT_NETWORK],
              ].map(([label, value]) => (
                <div
                  key={label}
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
                    {label}
                  </div>
                  <div
                    className="text-lg font-bold"
                    style={{
                      color: label === "Amount" ? "#2F80ED" : "#1F2D3D",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5"
              style={{
                backgroundColor: "#1F2D3D",
                borderColor: "#2F80ED",
              }}
            >
              <p
                className="font-mono text-sm break-all"
                style={{ color: "#FFFFFF" }}
              >
                {UPGRADE_DEPOSIT_WALLET}
              </p>
              <button
                type="button"
                onClick={() => copyToClipboard(UPGRADE_DEPOSIT_WALLET)}
                className="inline-flex items-center justify-center rounded-xl border px-4 py-3 font-semibold shrink-0"
                style={{
                  backgroundColor: "rgba(47, 128, 237, 0.18)",
                  borderColor: "#2F80ED",
                  color: "#FFFFFF",
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div
              className="rounded-xl border p-4 text-sm mb-6"
              style={{
                backgroundColor: "rgba(247, 147, 26, 0.08)",
                borderColor: "rgba(247, 147, 26, 0.35)",
                color: "#1F2D3D",
              }}
            >
              Your account upgrade will not be processed if the required deposit
              is not received.
            </div>

            <form className="space-y-5" onSubmit={handlePaymentSubmit}>
              <div>
                <label
                  className="block font-medium mb-3"
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
                  className="w-full px-5 py-4 border rounded-xl focus:outline-none"
                  style={{
                    borderColor: "#E1E6EC",
                    color: "#1F2D3D",
                  }}
                  placeholder="Paste your XRP transaction ID"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-opacity ${
                  submitting ? "cursor-not-allowed" : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: submitting
                    ? "rgba(47, 128, 237, 0.5)"
                    : "#2F80ED",
                }}
              >
                {submitting ? "Submitting..." : "I Have Made Payment"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountUpgrade;
