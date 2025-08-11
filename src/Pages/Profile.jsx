import React from "react";
import Navbar from "../Components/Navbar";
import { FaUserEdit } from "react-icons/fa";
import {jwtDecode} from "jwt-decode"
const Profile = () => {
        const token  = localStorage.getItem("refreshToken")
        console.log(token)
        if(token){
            const decodeToken = jwtDecode(token)
            console.log(decodeToken)
        }
  return (
    <>
      <section className="min-h-screen w-full bg-gray-900 text-white">
        <Navbar />

        <div className="max-w-4xl mx-auto pt-24 px-4">
      
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
          

            {/* Name */}
            <h2 className="mt-4 text-2xl font-bold">Prateek mishra</h2>
            <p className="text-gray-400">pm921670@gmail.com</p>

            {/* Info Section */}
            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-300 text-sm">Phone</h3>
                <p className="font-semibold">+91 9876543210</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-300 text-sm">Address</h3>
                <p className="font-semibold">Mumbai, India</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-300 text-sm">Role</h3>
                <p className="font-semibold">Admin</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-300 text-sm">Joined</h3>
                <p className="font-semibold">12 Jan 2024</p>
              </div>
            </div>

            {/* Edit Button */}
            <button className="mt-6 px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
