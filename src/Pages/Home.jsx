import React from 'react';
import Navbar from '../Components/Navbar';
import { FaEnvelope, FaPhoneAlt, FaUserAlt,FaCriticalRole } from 'react-icons/fa';

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);

  if (!userData) {
    return (
      <section className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">No user data found. Please login.</p>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen w-full bg-gray-900">
        <Navbar />
        <div className="flex justify-center items-center px-4 py-20 relative right-[34%]">
          <div className="w-full max-w-md bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl p-8 text-white relative overflow-hidden border border-gray-700">
            
            {/* Profile Avatar */}
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Name */}
            <h2 className="mt-4 text-center text-2xl font-bold">{userData.name}</h2>
            {/* <p className="text-center text-gray-400">User ID: {userData.id}</p> */}

            {/* Info Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
                <FaEnvelope className="text-blue-400 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
                <FaPhoneAlt className="text-green-400 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="font-semibold">{userData.phone}</p>
                </div>
              </div>
               <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
                <FaCriticalRole className="text-green-400 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="font-semibold">{userData.role}</p>
                </div>
              </div>
            </div>
            

            
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
