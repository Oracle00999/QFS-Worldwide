// components/UserNav.jsx
import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png"; // Add your logo import

const UserNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logoImage}
                alt="QFS WorldWide Ledger Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                      <span class="font-bold text-white text-sm">Q</span>
                    </div>
                  `;
                }}
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 leading-tight">
                QFS WorldWide
              </span>
              <span className="text-xs font-medium text-emerald-600 leading-tight">
                Ledger
              </span>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-gray-200 hover:border-emerald-300"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
