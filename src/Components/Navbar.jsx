import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshtoken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-md fixed w-full z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl font-bold text-blue-500">
              Task <span className="text-red-600">Manager</span>
            </span>
          </div>

          {/* Desktop Right Side */}
          {token && (
            <div className="hidden md:flex items-center ml-auto space-x-4">
              {/* Profile Button */}
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-blue-500 cursor-pointer rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                <FaUser size={18} />
              </button>

              {/* Logout Button at Far Right */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 cursor-pointer border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-green-400 focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && token && (
          <div className="md:hidden flex flex-col bg-gray-800 px-4 pb-4 space-y-2">
            <button
              onClick={() => navigate("/profile")}
              className="w-full px-4 py-2 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition flex items-center justify-center"
            >
              <FaUser size={18} />
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
