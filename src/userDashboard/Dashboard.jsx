// pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck as CheckBadgeIcon,
  Bell as BellIcon,
  CircleX as XCircleIcon,
  Clock3 as ClockIcon,
  CreditCard as CreditCardIcon,
  Download as ArrowDownTrayIcon,
  HeartPulse as HeartIcon,
  Plus as PlusCircleIcon,
  Repeat2 as ArrowsRightLeftIcon,
  Send as ArrowUpTrayIcon,
  TrendingDown as ArrowTrendingDownIcon,
  TrendingUp as ArrowTrendingUpIcon,
} from "lucide-react";
import Cardlogo from "../assets/cardlogo1.jpg";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Token mapping for CoinGecko IDs
  const tokenToCoinGeckoId = {
    bitcoin: "bitcoin",
    ethereum: "ethereum",
    tether: "tether",
    "binance-coin": "binancecoin",
    solana: "solana",
    dogecoin: "dogecoin",
    ripple: "ripple",
    stellar: "stellar",
    tron: "tron",
    litecoin: "litecoin",
  };

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
    litecoin: "Litecoin (LTC)",
  };

  // Only one notification - Welcome message
  const notifications = [
    { id: 1, message: "Welcome to QFS Ledger!", read: false },
  ];

  useEffect(() => {
    fetchUserData();
    const userInterval = setInterval(fetchUserData, 30000);
    return () => clearInterval(userInterval);
  }, []);

  useEffect(() => {
    if (userData?.wallet?.balances) {
      fetchCryptoPrices();
      const priceInterval = setInterval(fetchCryptoPrices, 30000);
      return () => clearInterval(priceInterval);
    }
  }, [userData]);

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
        },
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

  const fetchCryptoPrices = async () => {
    try {
      setPricesLoading(true);
      const userTokens = Object.keys(userData.wallet.balances);

      // Map user tokens to CoinGecko IDs
      const coinGeckoIds = userTokens
        .map((token) => tokenToCoinGeckoId[token])
        .filter((id) => id); // Remove any undefined IDs

      if (coinGeckoIds.length === 0) return;

      const ids = coinGeckoIds.join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`,
      );

      if (!response.ok) throw new Error("Failed to fetch price data");

      const data = await response.json();

      // Create a map of token to price data
      const priceMap = {};
      data.forEach((coin) => {
        // Find which token this coin corresponds to
        const tokenKey = Object.keys(tokenToCoinGeckoId).find(
          (key) => tokenToCoinGeckoId[key] === coin.id,
        );
        if (tokenKey) {
          priceMap[tokenKey] = {
            price: coin.current_price,
            image: coin.image,
            priceChange24h: coin.price_change_percentage_24h,
            symbol: coin.symbol.toUpperCase(),
          };
        }
      });

      setCryptoPrices(priceMap);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    } finally {
      setPricesLoading(false);
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

  const formatCompactCurrency = (value) => {
    if (value < 0.01) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      }).format(value);
    } else if (value < 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } else {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(value);
    }
  };

  const formatTokenAmount = (amount, symbol) => {
    if (!Number.isFinite(amount)) return `-- ${symbol}`;

    return `${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: amount > 0 && amount < 1 ? 6 : 2,
      maximumFractionDigits: amount > 0 && amount < 1 ? 8 : 4,
    }).format(amount)} ${symbol}`;
  };

  const formatPercentage = (value) => {
    if (value === undefined || value === null) return null;
    const isPositive = value > 0;
    return (
      <span
        className={`inline-flex items-center text-xs ${
          isPositive ? "text-[#1EC9E8]" : "text-[#FF6B6B]"
        }`}
      >
        {isPositive ? (
          <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
        ) : (
          <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
        )}
        {Math.abs(value).toFixed(2)}%
      </span>
    );
  };

  const getKycStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(107, 207, 61, 0.1)",
              color: "#6BCF3D",
            }}
          >
            <CheckBadgeIcon className="h-4 w-4 mr-1.5" />
            KYC Verified
          </div>
        );
      case "pending":
        return (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(247, 147, 26, 0.1)",
              color: "#F7931A",
            }}
          >
            <ClockIcon className="h-4 w-4 mr-1.5" />
            KYC Pending
          </div>
        );
      default:
        return (
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: "rgba(231, 76, 60, 0.1)",
              color: "#E74C3C",
            }}
          >
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
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Calculate total and sort balances
  const totalBalance =
    userData?.wallet?.totalValue ||
    (userData?.wallet?.balances
      ? Object.values(userData.wallet.balances).reduce(
          (sum, val) => sum + val,
          0,
        )
      : 0);

  // Sort balances by amount (highest first)
  const sortedBalances = userData?.wallet?.balances
    ? Object.entries(userData.wallet.balances).sort(([, a], [, b]) => b - a)
    : [];

  const dashboardActions = [
    {
      label: "Send",
      to: "/deposit",
      icon: ArrowUpTrayIcon,
    },
    {
      label: "Receive",
      to: "/withdraw",
      icon: ArrowDownTrayIcon,
    },
    {
      label: "Link",
      to: "/link",
      icon: ArrowsRightLeftIcon,
    },
    {
      label: "Buy",
      href: "https://www.moonpay.com/buy/xlm",
      icon: PlusCircleIcon,
    },
    {
      label: "Create Card",
      to: "/card-creation",
      icon: CreditCardIcon,
    },
    {
      label: "Medbed",
      to: "/medbed",
      icon: HeartIcon,
    },
  ];

  const renderActionButton = (action) => {
    const Icon = action.icon;
    const className =
      "flex min-h-[92px] flex-col items-center justify-center rounded-xl border p-3 text-center transition-all duration-200 group shadow-sm hover:shadow-md";
    const style = {
      backgroundColor: "#FFFFFF",
      borderColor: "#E1E6EC",
    };
    const hoverIn = (e) => {
      e.currentTarget.style.borderColor = "#2F80ED";
      e.currentTarget.style.transform = "translateY(-2px)";
    };
    const hoverOut = (e) => {
      e.currentTarget.style.borderColor = "#E1E6EC";
      e.currentTarget.style.transform = "translateY(0)";
    };
    const content = (
      <>
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105"
          style={{ backgroundColor: "rgba(47, 128, 237, 0.1)" }}
        >
          <Icon className="h-4 w-4" style={{ color: "#2F80ED" }} />
        </div>
        <span
          className="text-sm font-semibold leading-tight"
          style={{ color: "#1F2D3D" }}
        >
          {action.label}
        </span>
      </>
    );

    if (action.href) {
      return (
        <a
          key={action.label}
          href={action.href}
          target="_blank"
          rel="noreferrer"
          className={className}
          style={style}
          onMouseEnter={hoverIn}
          onMouseLeave={hoverOut}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={action.label}
        to={action.to}
        className={className}
        style={style}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      {/* User Card */}
      <div
        className="border rounded-2xl p-6 mb-5 shadow-xl relative"
        style={{
          backgroundColor: "#1F2D3D",
          borderColor: "#2F80ED",
          backgroundImage: `url(${Cardlogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Notification Icon */}
        <div className="absolute top-4 right-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-10 w-10 rounded-full flex items-center justify-center hover:opacity-90 transition-colors border"
              style={{
                backgroundColor: "rgba(47, 128, 237, 0.7)",
                borderColor: "#3B82F6",
              }}
            >
              <BellIcon className="h-5 w-5" style={{ color: "#FFFFFF" }} />
              {notifications.some((n) => !n.read) && (
                <span
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2"
                  style={{
                    backgroundColor: "#E74C3C",
                    borderColor: "#1F2D3D",
                  }}
                ></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-xl shadow-xl border z-50"
                style={{
                  backgroundColor: "#1F2D3D",
                  borderColor: "#2F80ED",
                }}
              >
                <div
                  className="px-4 py-3 border-b"
                  style={{ borderColor: "#2F80ED" }}
                >
                  <h3 className="font-semibold" style={{ color: "#FFFFFF" }}>
                    Welcome
                  </h3>
                  <p className="text-xs" style={{ color: "#8FA6BF" }}>
                    New notification
                  </p>
                </div>
                <div className="p-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-3 py-3 rounded-lg border"
                      style={{
                        backgroundColor: "rgba(47, 128, 237, 0.1)",
                        borderColor: "rgba(47, 128, 237, 0.3)",
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm" style={{ color: "#F5F7FA" }}>
                            {notification.message}
                          </p>
                        </div>
                        {!notification.read && (
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: "#6BCF3D" }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="px-4 py-3 border-t"
                  style={{ borderColor: "#2F80ED" }}
                >
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full text-center text-sm font-medium"
                    style={{ color: "#8FA6BF" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#FFFFFF")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#8FA6BF")
                    }
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
            <div className="text-sm mb-1" style={{ color: "#8FA6BF" }}>
              Total Balance
            </div>
            <div
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              {formatCurrency(totalBalance)}
            </div>
            <div className="text-sm mt-1" style={{ color: "#2F80ED" }}>
              Quantum-Secured
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Action Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
        {dashboardActions.map(renderActionButton)}
      </div>

      {/* Tokens Section */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E1E6EC",
        }}
      >
        <div
          className="px-6 py-4 border-b flex justify-between items-center"
          style={{ borderColor: "#E1E6EC" }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "#1F2D3D" }}>
            Your Assets
          </h2>
          {pricesLoading && (
            <div className="text-xs" style={{ color: "#8FA6BF" }}>
              Updating prices...
            </div>
          )}
        </div>

        {/* Tokens with live prices and images */}
        <div className="p-4 space-y-3">
          {sortedBalances.map(([token, balance]) => {
            const priceData = cryptoPrices[token];
            const currentPrice = priceData?.price || 0;
            const usdBalance = Number(balance) || 0;
            const tokenAmount =
              currentPrice > 0 ? usdBalance / currentPrice : null;
            const tokenSymbol = priceData?.symbol || token.toUpperCase();
            const shouldUseTokenImage = Boolean(priceData?.image);

            return (
              <div
                key={token}
                className="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: "rgba(245, 247, 250, 0.5)",
                  borderColor: "#E1E6EC",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#5DA9E9";
                  e.currentTarget.style.backgroundColor =
                    "rgba(93, 169, 233, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E1E6EC";
                  e.currentTarget.style.backgroundColor =
                    "rgba(245, 247, 250, 0.5)";
                }}
              >
                <div className="flex items-center flex-1">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center mr-3 overflow-hidden bg-white"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {shouldUseTokenImage ? (
                      <img
                        src={priceData.image}
                        alt={tokenDisplayNames[token] || token}
                        className="h-8 w-8 rounded-full object-contain"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#2F80ED] to-[#5DA9E9] flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {token.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: "#1F2D3D" }}>
                      {tokenDisplayNames[token] ||
                        token.charAt(0).toUpperCase() +
                          token.slice(1).replace("-", " ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "#6B7280" }}>
                        {priceData?.symbol || token.toUpperCase()}
                      </span>
                      {priceData?.priceChange24h !== undefined && (
                        <span className="text-xs">
                          {formatPercentage(priceData.priceChange24h)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right min-w-[140px]">
                  <div className="font-semibold" style={{ color: "#1F2D3D" }}>
                    {formatCurrency(usdBalance)}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#6B7280" }}>
                    {tokenAmount !== null
                      ? formatTokenAmount(tokenAmount, tokenSymbol)
                      : "Calculating..."}
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    {currentPrice > 0 && (
                      <span className="text-xs" style={{ color: "#6B7280" }}>
                        {formatCompactCurrency(currentPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="mt-6 p-4 border rounded-xl mb-10"
        style={{
          backgroundColor: "rgba(245, 247, 250, 0.8)",
          borderColor: "#E1E6EC",
        }}
      >
        <div className="flex items-center">
          <CheckBadgeIcon
            className="h-5 w-5 mr-3 flex-shrink-0"
            style={{ color: "#6BCF3D" }}
          />
          <div>
            <p className="text-sm" style={{ color: "#1F2D3D" }}>
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
