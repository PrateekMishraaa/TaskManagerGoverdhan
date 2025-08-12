import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from '../Components/Loader';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
console.log(formData)
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email.trim() || !formData.password.trim()) {
    toast.error("Please enter email and password");
    return;
  }

  setLoading(true);

  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/route/auth/login",
      formData,
      {
        headers: { "Content-Type": "application/json" },
        // withCredentials: true 
      }
    );

    toast.success(data.message || "Login Successfully! ✅");
    console.log(data)

   localStorage.setItem("accessToken", data.tokens.access.AccessToken);
localStorage.setItem("refreshToken", data.tokens.refresh.RefreshToken);
localStorage.setItem("user", JSON.stringify(data.payload)); // store payload

    setTimeout(() => {
      navigate('/');
    }, 2000);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong! 🚨");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <section className="min-h-screen w-full px-4 py-20 bg-gray-900">
        <div className="max-w-md mx-auto bg-gray-800 border-2 border-gray-600 rounded-3xl p-8">
          <h2 className="text-4xl font-bold text-white text-center mb-8 hover:text-purple-600 transition">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-semibold text-xl text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Email"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block font-semibold text-xl text-white mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 px-4 pr-12 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Password"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-4 top-11 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
              {/* <a href="/signup" className="text-blue-500">Sign Up</a> */}
            </div>
             <p className="text-white">
              Don't have an Account?{' '}
              <a href="/signup" className="text-blue-500">
                Signup
              </a>
              </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-12 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Login;
