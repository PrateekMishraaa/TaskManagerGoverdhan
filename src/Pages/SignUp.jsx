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
    FullName: '',
    Email: '',
    Mobile: '',
    Password: '',
    // Role: '',
  });
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.Password.length < 3){
        toast.error("Password length between 3 to 10 characters")
    }
    if(formData.Mobile.length < 10){
            toast.error("Phone number should be in 10 digits")
    }

    if (
      !formData.FullName.trim() ||
      !formData.Email.trim() ||
      !formData.Mobile.trim() ||
      !formData.Password.trim() 
    
    ) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'YOUR_API_ENDPOINT_HERE',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      toast.success('Congratulations, You are Registered! ✅');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Something went wrong 🚨'
      );
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
          <h2 className="text-4xl font-bold text-white text-center mb-8 cursor-pointer hover:text-purple-600 transition">
            Sign Up Here
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="FullName"
                className="block font-semibold text-xl text-white mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="FullName"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Full Name"
              />
            </div>

            <div>
              <label
                htmlFor="Email"
                className="block font-semibold text-xl text-white mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Email"
              />
            </div>

            <div>
              <label
                htmlFor="Mobile"
                className="block font-semibold text-xl text-white mb-2"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="Mobile"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                className="w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none"
                placeholder="Enter Your Mobile Number"
              />
            </div>

      
            {/* <div>
              <label
                htmlFor="Role"
                className="block font-semibold text-xl text-white mb-2"
              >
                Role
              </label>
              <select
                id="Role"
                name="Role"
                value={formData.Role}
                onChange={handleChange}
                className="w-full h-12 px-4 cursor-pointer border-2 border-gray-500 rounded-2xl bg-gray-700 text-white focus:border-purple-600 focus:outline-none"
              >

                <option value="developer" >Developer</option>
                <option value="projectmanager" >Project Manager</option>
              </select>
            </div> */}

            <div className="relative">
              <label
                htmlFor="Password"
                className="block font-semibold text-xl text-white mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="Password"
                name="Password"
                value={formData.Password}
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
              className="w-full mt-6 h-12 cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
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
      />
    </>
  );
};

export default SignUp;
