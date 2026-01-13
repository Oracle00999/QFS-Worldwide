// components/WalletNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const WalletNav = () => {
  const location = useLocation();

  const navItems = [
    {
      icon: HomeIcon,
      label: "Home",
      path: "/dashboard",
    },
    {
      icon: ArrowDownTrayIcon,
      label: "Receive",
      path: "/withdraw",
    },
    {
      icon: ArrowsRightLeftIcon,
      label: "Swap",
      path: "/swap",
    },
    {
      icon: UserCircleIcon,
      label: "Account",
      path: "/account",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-emerald-900 border-t border-emerald-800 shadow-lg z-40">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center w-20 h-full ${
                isActive ? "text-white" : "text-emerald-300 hover:text-white"
              } transition-colors`}
            >
              <div
                className={`p-2 rounded-lg ${isActive ? "bg-emerald-800" : ""}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WalletNav;
