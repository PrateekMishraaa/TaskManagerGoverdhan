import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from "axios";
import { FaCriticalRole, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "" });

  // Get user data once and store in state to avoid recreating on every render
  const [userData, setUserData] = useState(null);

  // Initialize userData from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  // Initialize form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        role: userData.role || ""
      });
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.role) return;

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/route/auth/users");

        let filtered = [];

        if (userData.role.toLowerCase() === "admin") {
          filtered = response.data.data.users.filter(user =>
            ["Developer", "ProjectManager"].includes(user.role.toLowerCase())
          );
        }

        setFilteredUsers(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load users");
        setLoading(false);
      }
    };
    fetchData();
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ 
      ...prevData, 
      [name]: value 
    }));
  };

  const handleSave = async () => {
    try {
      // Only send allowed fields
      const { name, email, phone } = formData;

      const res = await axios.put(
        `http://localhost:3000/api/route/auth/update-user/${userData._id}`,
        { name, email, phone }
      );
      console.log(res);
      
      // Update both userData state and localStorage
      const updatedUser = { ...userData, name, email, phone };
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset form data to original userData values
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        role: userData.role || ""
      });
    }
    setIsEditing(false);
  };

  if (!userData) {
    return (
      <section className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center px-4">
        <p className="text-lg text-center">No user data found. Please login.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-gray-900 text-white">
      <Navbar />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8">
        
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Editable Profile Card */}
          <div className="flex-shrink-0 lg:w-1/3 xl:w-1/4">
            <div className="w-full max-w-md mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-6 sm:p-8 text-white border border-gray-700">
              
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-2xl sm:text-4xl font-bold">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
                </div>
              </div>

              {/* Name */}
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mb-6 text-center text-gray-900 bg-gray-200 rounded-md p-2 w-full text-sm sm:text-base"
                  placeholder="Enter name"
                />
              ) : (
                <h2 className="mb-6 text-center text-xl sm:text-2xl font-bold break-words">{formData.name}</h2>
              )}

              {/* Info Section */}
              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="flex items-start sm:items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
                  <FaEnvelope className="text-blue-400 text-lg mt-1 sm:mt-0 flex-shrink-0" />
                  <div className="w-full min-w-0">
                    <p className="text-gray-400 text-sm">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-gray-900 bg-gray-200 rounded-md p-1 w-full text-sm"
                        placeholder="Enter email"
                      />
                    ) : (
                      <p className="font-semibold text-sm break-all">{formData.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start sm:items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
                  <FaPhoneAlt className="text-green-400 text-lg mt-1 sm:mt-0 flex-shrink-0" />
                  <div className="w-full min-w-0">
                    <p className="text-gray-400 text-sm">Phone</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="text-gray-900 bg-gray-200 rounded-md p-1 w-full text-sm"
                        placeholder="Enter phone"
                      />
                    ) : (
                      <p className="font-semibold text-sm break-all">{formData.phone}</p>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start sm:items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition">
                  <FaCriticalRole className="text-green-400 text-lg mt-1 sm:mt-0 flex-shrink-0" />
                  <div className="w-full min-w-0">
                    <p className="text-gray-400 text-sm">Role</p>
                    {isEditing ? (
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="text-gray-900 bg-gray-200 rounded-md p-1 w-full text-sm"
                      >
                        <option value="admin">Admin</option>
                        <option value="developer">Developer</option>
                        <option value="projectmanager">Project Manager</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      <p className="font-semibold text-sm capitalize">{formData.role}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-center gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 px-3 sm:px-4 py-2 rounded-md hover:bg-green-600 text-sm sm:text-base transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 px-3 sm:px-4 py-2 rounded-md hover:bg-gray-600 text-sm sm:text-base transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 px-4 sm:px-6 py-2 rounded-md hover:bg-blue-600 text-sm sm:text-base transition-colors"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Users Table Section */}
          <div className="flex-1 lg:w-2/3 xl:w-3/4">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-700">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Team Members</h3>
                <p className="text-gray-400 text-sm sm:text-base mt-1">Manage your team members and their roles</p>
              </div>

              <div className="p-4 sm:p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="ml-3 text-gray-400">Loading...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 text-sm sm:text-base">{error}</p>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    {/* <p className="text-gray-400 text-sm sm:text-base">No team members found</p> */}
                  </div>
                ) : (
                  <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gray-700">
                          <tr>
                            <th className="p-3 border-b border-gray-600 text-left text-sm font-semibold">Name</th>
                            <th className="p-3 border-b border-gray-600 text-left text-sm font-semibold">Email</th>
                            <th className="p-3 border-b border-gray-600 text-left text-sm font-semibold">Phone</th>
                            <th className="p-3 border-b border-gray-600 text-left text-sm font-semibold">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user, index) => (
                            <tr key={user._id} className={`hover:bg-gray-700 transition-colors ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}`}>
                              <td className="p-3 border-b border-gray-600 text-sm">{user.name}</td>
                              <td className="p-3 border-b border-gray-600 text-sm break-all">{user.email}</td>
                              <td className="p-3 border-b border-gray-600 text-sm">{user.phone}</td>
                              <td className="p-3 border-b border-gray-600">
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white capitalize">
                                  {user.role}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                      {filteredUsers.map(user => (
                        <div key={user._id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="font-semibold text-white text-sm">{user.name}</h4>
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white capitalize mt-1">
                                  {user.role}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FaEnvelope className="text-blue-400 text-sm flex-shrink-0" />
                              <span className="text-gray-300 text-sm break-all">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaPhoneAlt className="text-green-400 text-sm flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{user.phone}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;