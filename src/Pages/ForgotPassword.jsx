import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                "API", 
                { email },
                { headers: { "Content-Type": "application/json" } }
            );
            
            console.log(response.data);
            toast.success("Password reset link sent to your email!");
            setEmail("");
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='min-h-screen w-full px-4 py-20 bg-gray-900'>
                <div className='max-w-md mx-auto bg-gray-800 border-2 border-gray-600 rounded-3xl p-8'>
                    <h2 className='text-4xl font-bold text-white text-center mb-8 hover:text-purple-500 transition cursor-pointer'>
                        Forgot Password
                    </h2>
                    <p className='text-gray-400 text-center mb-6'>
                        Enter your registered email and we'll send you a password reset link.
                    </p>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor="email" className='block font-semibold text-xl text-white mb-2'>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full h-12 px-4 border-2 border-gray-500 rounded-2xl bg-gray-700 text-white placeholder-gray-400 focus:border-purple-600 focus:outline-none'
                                placeholder='Enter Your Email'
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full h-12 cursor-pointer bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none'
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                </div>
            </section>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
            />
        </>
    );
};

export default ForgotPassword;
