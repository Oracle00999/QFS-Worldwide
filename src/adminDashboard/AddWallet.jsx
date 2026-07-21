import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  Loader2,
  Plus,
  RefreshCw,
  Wallet,
  X,
} from "lucide-react";
import { apiUrl } from "../config/api";

const getAuthToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const cryptoOptions = [
  "bitcoin",
  "ethereum",
  "tether",
  "binance-coin",
  "solana",
  "ripple",
  "stellar",
  "dogecoin",
  "tron",
  "litecoin",
];

const formatName = (name = "") =>
  name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const emptyForm = { cryptocurrency: "", address: "", network: "" };

const AddWallet = () => {
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const fetchAddresses = useCallback(async () => {
    try {
      setLoadingAddresses(true);
      setError("");
      const token = getAuthToken();
      const response = await fetch(apiUrl("/api/wallet/deposit/addresses"), {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        throw new Error(
          payload?.message || "Failed to retrieve wallet addresses",
        );
      }
      setAddresses(
        Array.isArray(payload.data?.addresses) ? payload.data.addresses : [],
      );
    } catch (err) {
      setError(err.message || "Failed to retrieve wallet addresses");
    } finally {
      setLoadingAddresses(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 3000);
  };

  const copyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      window.setTimeout(() => setCopiedAddress(""), 2000);
    } catch {
      showNotice("error", "Could not copy the wallet address");
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    setFormData(emptyForm);
    setErrors({});
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!formData.cryptocurrency)
      nextErrors.cryptocurrency = "Select a cryptocurrency";
    if (!formData.address.trim())
      nextErrors.address = "Wallet address is required";
    else if (formData.address.trim().length < 10)
      nextErrors.address = "Address seems too short";
    if (!formData.network.trim()) nextErrors.network = "Network is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);
      const token = getAuthToken();
      if (!token)
        throw new Error("No authentication token found. Please login again.");
      const response = await fetch(apiUrl("/api/admin/crypto-addresses"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cryptocurrency: formData.cryptocurrency,
          address: formData.address.trim(),
          network: formData.network.trim(),
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to save wallet address");
      }
      closeForm();
      showNotice("success", "Wallet address saved successfully");
      await fetchAddresses();
    } catch (err) {
      showNotice("error", err.message || "Failed to save wallet address");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallet Addresses</h1>
          <p className="mt-1 text-gray-600">
            View and manage deposit addresses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchAddresses}
            disabled={loadingAddresses}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={`mr-2 ${loadingAddresses ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} className="mr-2" />
            Add Wallet
          </button>
        </div>
      </div>

      {loadingAddresses ? (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
          <p className="font-medium text-red-900">{error}</p>
          <button
            type="button"
            onClick={fetchAddresses}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm text-white"
          >
            Try again
          </button>
        </div>
      ) : addresses.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <Wallet className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="font-medium text-gray-900">No wallet addresses</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Cryptocurrency",
                    "Network",
                    "Wallet address",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${heading === "Action" ? "text-right" : "text-left"}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {addresses.map((item) => (
                  <tr
                    key={`${item.cryptocurrency}-${item.network}-${item.address}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                          {item.symbol}
                        </span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {formatName(item.cryptocurrency)}
                          </p>
                          <p className="text-sm text-gray-500">{item.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                        {item.network}
                      </span>
                    </td>
                    <td className="max-w-md px-6 py-4">
                      <code className="block break-all text-sm text-gray-700">
                        {item.address}
                      </code>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => copyAddress(item.address)}
                        className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                      >
                        {copiedAddress === item.address ? (
                          <Check size={16} className="mr-2" />
                        ) : (
                          <Copy size={16} className="mr-2" />
                        )}
                        {copiedAddress === item.address ? "Copied" : "Copy"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) =>
            event.target === event.currentTarget && closeForm()
          }
        >
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Add or update wallet
                </h2>
                <p className="text-sm text-gray-500">
                  Enter the deposit address details
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cryptocurrency
                </label>
                <select
                  name="cryptocurrency"
                  value={formData.cryptocurrency}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 ${errors.cryptocurrency ? "border-red-300" : "border-gray-300"}`}
                >
                  <option value="">Select a cryptocurrency</option>
                  {cryptoOptions.map((crypto) => (
                    <option key={crypto} value={crypto}>
                      {formatName(crypto)}
                    </option>
                  ))}
                </select>
                {errors.cryptocurrency && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cryptocurrency}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Wallet address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter the full wallet address"
                  className={`w-full rounded-lg border px-4 py-3 font-mono text-sm ${errors.address ? "border-red-300" : "border-gray-300"}`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Network
                </label>
                <input
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  placeholder="e.g. ERC-20, TRC-20 or Mainnet"
                  className={`w-full rounded-lg border px-4 py-3 ${errors.network ? "border-red-300" : "border-gray-300"}`}
                />
                {errors.network && (
                  <p className="mt-1 text-sm text-red-600">{errors.network}</p>
                )}
              </div>
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Plus size={16} className="mr-2" />
                  )}
                  {saving ? "Saving..." : "Save address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notice && (
        <div
          className={`fixed right-4 top-4 z-[60] flex items-center rounded-lg border p-4 shadow-lg ${notice.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}
        >
          {notice.type === "success" ? (
            <Check size={18} className="mr-2" />
          ) : (
            <AlertCircle size={18} className="mr-2" />
          )}
          <span className="text-sm font-medium">{notice.message}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            className="ml-4"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddWallet;
