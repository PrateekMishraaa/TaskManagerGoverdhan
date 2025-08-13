import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { gsap } from "gsap";
import Loader from "./Loader";
import Logo from "../assets/time-management.png"
const Navbar = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    setLoading(true); 

    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setLoading(false); 
      navigate("/login");
    }, 1000); 
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader /> 
        </div>
      )}

      <nav className="bg-gray-900 shadow-md fixed w-full z-40">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
    
            <div className="flex items-center cursor-pointer">
               <div className='h-10 w-10 '>
                          <img src={Logo} alt="logo" className='h-full w-full p-1 opacity-50 brightness-610' />
                        </div>
              <span className="text-2xl font-bold text-blue-500">
                Task <span className="text-red-600">Dashboard</span>
              </span>
            </div>

            
            {token && (
              <div className="hidden md:flex items-center ml-auto space-x-4">
               
                <button
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 text-blue-500 cursor-pointer rounded-lg hover:bg-blue-500 hover:text-white transition"
                >
                  <FaUser size={18} />
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 cursor-pointer border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}

            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 hover:text-green-400 focus:outline-none text-2xl"
              >
                ☰
              </button>
            </div>
          </div>

         
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
    </>
  );
};

export default Navbar;
