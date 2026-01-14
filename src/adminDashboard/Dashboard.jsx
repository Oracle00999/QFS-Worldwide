import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Loader2,
  Calendar,
  Wallet,
  AlertCircle,
  Shield,
  X,
  Send,
} from "lucide-react";

// Get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Format KYC status
const formatKYCStatus = (status) => {
  const statusMap = {
    not_submitted: {
      label: "Not Submitted",
      color: "bg-gray-100 text-gray-800",
    },
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    verified: { label: "Verified", color: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  };

  return (
    statusMap[status] || { label: status, color: "bg-gray-100 text-gray-800" }
  );
};

// Format role
const formatRole = (role) => {
  const roleMap = {
    user: { label: "User", color: "bg-blue-100 text-blue-800" },
    admin: { label: "Admin", color: "bg-purple-100 text-purple-800" },
    super_admin: { label: "Super Admin", color: "bg-red-100 text-red-800" },
  };

  return roleMap[role] || { label: role, color: "bg-gray-100 text-gray-800" };
};

// Format status
const formatStatus = (isActive) => {
  return isActive
    ? { label: "Active", color: "bg-green-100 text-green-800" }
    : { label: "Inactive", color: "bg-red-100 text-red-800" };
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "Never";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount || 0);
};

// Filter out admin users
const filterOutAdmins = (users) => {
  return users.filter((user) => user.role !== "admin");
};

// Toast Notification Component
const Toast = ({ message, type = "success", isVisible }) => {
  if (!isVisible) return null;

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-right-10 duration-300`}
    >
      {type === "success" && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {type === "error" && (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span>{message}</span>
    </div>
  );
};

// Fund Modal Component
const FundModal = ({ isOpen, onClose, user, onFundSuccess, onShowToast }) => {
  const [cryptocurrency, setCryptocurrency] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const token = getAuthToken();

      const response = await fetch(
        `https://qfs-backend-ghuv.onrender.com/api/admin/users/${user.id}/fund`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cryptocurrency,
            amount: parseFloat(amount),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setAmount("");
        setCryptocurrency("bitcoin");
        if (onShowToast) {
          onShowToast(
            `Successfully funded ${user?.fullName} with $${amount} ${cryptocurrency}`,
            "success"
          );
        }
        if (onFundSuccess) onFundSuccess();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(data.message || "Failed to fund user");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Fund User Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-green-800 font-medium">
                Fund transfer initiated successfully!
              </p>
            </div>
          ) : (
            <>
              {/* User Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Funding user:</p>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.fullName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Cryptocurrency Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cryptocurrency
                  </label>
                  <select
                    value={cryptocurrency}
                    onChange={(e) => setCryptocurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    {cryptoOptions.map((crypto) => (
                      <option key={crypto} value={crypto}>
                        {crypto.charAt(0).toUpperCase() +
                          crypto.slice(1).replace("-", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Funding...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Fund User
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Users Component
const UsersManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [fundModalOpen, setFundModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    visible: false,
  });

  // Fetch users - GET request
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();

      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const response = await fetch(
        "https://qfs-backend-ghuv.onrender.com/api/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        setError("Session expired. Please login again.");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setAllUsers(data.data.users);
        // Filter out admin users
        const regularUsers = filterOutAdmins(data.data.users);
        setFilteredUsers(regularUsers);
        setPagination(data.data.pagination || {});
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFundClick = (user) => {
    setSelectedUser(user);
    setFundModalOpen(true);
  };

  const handleFundSuccess = () => {
    // Refresh users list after successful fund
    fetchUsers();
  };

  const handleShowToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast({ message: "", type: "success", visible: false });
    }, 3000);
  };

  // Calculate statistics from filtered users only
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter((user) => user.isActive).length;
  const kycVerified = filteredUsers.filter(
    (user) => user.kycStatus === "verified"
  ).length;
  const totalWalletValue = filteredUsers.reduce(
    (sum, user) => sum + (user.wallet?.totalValue || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
  //       <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
  //       <h3 className="text-lg font-medium text-red-800 mb-2">
  //         Failed to load users
  //       </h3>
  //       <p className="text-red-600 mb-4">{error}</p>
  //       <button
  //         onClick={fetchUsers}
  //         className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">
            View all regular users and their account information
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{totalUsers}</span>{" "}
            regular users
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Loader2
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">KYC Verified</p>
              <p className="text-2xl font-bold">{kycVerified}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium text-gray-900 mb-1">
                        No regular users found
                      </p>
                      <p className="text-gray-500">
                        No regular users have registered yet
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const kycStatus = formatKYCStatus(user.kycStatus);
                  const role = formatRole(user.role);
                  const status = formatStatus(user.isActive);

                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            ID: {user.id.substring(0, 8)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${role.color}`}
                          >
                            {role.label}
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${kycStatus.color}`}
                          >
                            {kycStatus.label}
                          </span>
                          {user.kycSubmittedAt && (
                            <span className="ml-2 text-xs text-gray-500">
                              {formatDate(user.kycSubmittedAt)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Wallet className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(user.wallet?.totalValue || 0)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(user.lastLogin)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleFundClick(user)}
                          className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                        >
                          <Send className="h-4 w-4" />
                          Fund
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Modal */}
      <FundModal
        isOpen={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        user={selectedUser}
        onFundSuccess={handleFundSuccess}
        onShowToast={handleShowToast}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
      />
    </div>
  );
};

export default UsersManagement;
