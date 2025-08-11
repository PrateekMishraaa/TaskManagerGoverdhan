import React from "react";
import Navbar from "../Components/Navbar";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate()
  const userData = JSON.parse(localStorage.getItem("user")); // retrieve payload

  if (!userData) {
    return (
      <section className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">No user data found. Please login.</p>
      </section>
    );
  }
  const handleBack=()=>{
    navigate('/')
  }
  return (
    <section className="min-h-screen w-full bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-24 px-4">
        <button onClick={()=>handleBack()}>
            <FaArrowAltCircleLeft className="text-2xl cursor-pointer"/>
        </button>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <h2 className="mt-4 text-2xl font-bold">{userData.name}</h2>
          <p className="text-gray-400">{userData.email}</p>

          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-300 text-sm">Phone</h3>
              <p className="font-semibold">{userData.phone}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-gray-300 text-sm">Role</h3>
              <p className="font-semibold">{userData.role}</p>
            </div>
          </div>

          <button className="mt-6 px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
