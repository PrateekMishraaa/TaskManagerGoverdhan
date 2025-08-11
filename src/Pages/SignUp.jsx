import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../Components/Loader';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim() ||
    !formData.password.trim() ||
    !formData.role.trim()
  ) {
    toast.error("All fields are required");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/route/user/create",
      formData,
      // { withCredentials: true } // include if your backend needs cookies/sessions
    );

    toast.success(response.data.message || "🎉 Registration successful!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    });

    setTimeout(() => navigate("/login"), 2500);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong 🚨");
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
            Sign Up Here
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-semibold text-xl text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Full Name"
              />
            </div>

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

            {/* Phone */}
            <div>
              <label className="block font-semibold text-xl text-white mb-2">
                Mobile
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Mobile Number"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block font-semibold text-xl text-white mb-2">
                Role
              </label>
            <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full h-12 cursor-pointer border-2 border-gray-500 rounded-2xl bg-gray-700 text-white focus:border-purple-600 focus:outline-none"
>
  <option value="">-- Select Role --</option>
  <option value="Developer">Developer</option>
  <option value="Projectmanager">Project Manager</option>
  <option value="admin">Admin</option>
</select>

            </div>

            {/* Password */}
            <div className="relative">
              <label className="block font-semibold text-xl text-white mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
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

            <p className="text-white">
              Already have an Account?{' '}
              <a href="/login" className="text-blue-500">
                Login
              </a>
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 h-12 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default SignUp;
