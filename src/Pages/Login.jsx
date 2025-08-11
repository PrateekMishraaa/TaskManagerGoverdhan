import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from '../Components/Loader';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({

        Email: "",

        Password: ""
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    console.log(formData)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (! !formData.Email  || !formData.Password) {
            toast.error("Invalid Credentials")
            return
        }

        setLoading(true)

        try {
            const response = await axios.post("API", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            toast.success("Login Successfully!✅")
            localStorage.setItem("token",response.token)
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!🚨")
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <Loader />
                </div>
            )}

            <section className='min-h-screen w-full px-4 py-20 bg-gray-900'>
                <div className='max-w-md mx-auto bg-gray-800 border-2 border-gray-600 rounded-3xl p-8'>
                    <h2 className='text-4xl font-bold text-white text-center mb-8 cursor-pointer hover:text-purple-600 transition'>
                        Login
                    </h2>

                    <div className='space-y-6'>


                        <div>
                            <label htmlFor="Email" className='block font-semibold text-xl text-white mb-2'>
                                Email
                            </label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                className='w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none'
                                placeholder='Enter Your Email'
                            />
                        </div>



                        <div className='relative'>
                            <label htmlFor="Password" className='block font-semibold text-xl text-white mb-2'>
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="Password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                className='w-full h-12 px-4 pr-12 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none'
                                placeholder='Enter Your Password'
                            />
                            <button
                                type="button"
                                onClick={handleShowPassword}
                                className='absolute right-4 top-11 text-gray-400 hover:text-white transition-colors'
                            >
                                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </button>
                        <a href="/forgot-password" className='text-blue-500 text-xs mb-4'>Forgot Password</a>
                        </div>
                        <p className='text-white'>Already have an Account ? <a href="/signup" className='text-blue-600'>Signup</a></p>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className='w-full mt-6 h-12 cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none'
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
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
    )
}

export default Login