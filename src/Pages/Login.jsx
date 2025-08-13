import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import Loader from '../Components/Loader';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Role-based navigation function
  const navigateBasedOnRole = (userRole) => {
    console.log('Navigating based on role:', userRole);
    
    switch (userRole.toLowerCase()) {
      case 'ProjectManager':
      case 'ProjectManager':
      case 'manager':
        navigate('/project-manager-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'developer':
        navigate('/developer-dashboard');
        break;
      default:
        navigate('/dashboard'); // Default dashboard
        break;
    }
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
        }
      );

      toast.success(data.message || "Login Successfully! ✅");
      console.log('Login response:', data);
      console.log('User role:', data.payload.role);

      // Store tokens and user data
      localStorage.setItem("accessToken", data.tokens.access.AccessToken);
      localStorage.setItem("refreshToken", data.tokens.refresh.RefreshToken);
      localStorage.setItem("user", JSON.stringify(data.payload));
      localStorage.setItem("token", data.tokens.access.AccessToken); // For backward compatibility

      // Navigate based on user role after a short delay
      setTimeout(() => {
        navigateBasedOnRole(data.payload.role);
      }, 2000);

    } catch (error) {
      console.error('Login error:', error);
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

      <section className="min-h-screen w-full px-4 py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-white text-2xl" />
            </div>
            <h2 className="text-4xl font-bold text-white hover:text-blue-400 transition">
              Welcome Back
            </h2>
            <p className="text-gray-300 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-semibold text-lg text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 pl-12 pr-4 border border-white/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold text-lg text-white mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-12 pl-12 pr-12 border border-white/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <a href="/forgot-password" className="text-blue-400 hover:text-blue-300 transition">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                  Sign Up
                </a>
              </p>
            </div>
          </form>

          {/* Role Information Card */}
          {/* <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-center">Dashboard Access</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-300">
                <span>Project Manager</span>
                <span className="text-blue-400">→ Manager Dashboard</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Admin</span>
                <span className="text-green-400">→ Admin Dashboard</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Developer</span>
                <span className="text-cyan-400">→ Developer Dashboard</span>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Login;