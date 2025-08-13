import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar.jsx';
import axios from "axios";
import { FaCriticalRole, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Loader from '../../Components/Loader.jsx';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "" });
  const [userData, setUserData] = useState(null);

  // Load user from localStorage
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

  // Set initial profile form
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

  // Fetch tasks
// Fetch tasks
useEffect(() => {
  const fetchTasks = async () => {
    if (!userData) return;

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/route/manager/get-task");
      console.log(response.data);
      setTasks(response.data.data || []); // FIX: directly use `data` array
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
      setLoading(false);
    }
  };
  fetchTasks();
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
      if (!formData.name || !formData.email) {
        alert("Name and email are required fields");
        return;
      }

      const { name, email, phone } = formData;
      const saveButton = document.querySelector('.bg-green-500');
      const originalText = saveButton.textContent;

      saveButton.textContent = 'Saving...';
      saveButton.disabled = true;

      const res = await axios.put(
        `http://localhost:3000/api/route/auth/update-user/${userData._id}`,
        { name, email, phone },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const updatedUser = {
        ...userData,
        name: res.data.user?.name || name,
        email: res.data.user?.email || email,
        phone: res.data.user?.phone || phone
      };

      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error('Update error:', error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      const saveButton = document.querySelector('.bg-green-500');
      if (saveButton) {
        saveButton.textContent = 'Save';
        saveButton.disabled = false;
      }
    }
  };

  const handleCancel = () => {
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
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Profile Card */}
        <div className="lg:w-1/3 xl:w-1/4">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-6 border border-gray-700">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
              </div>
            </div>
            {isEditing ? (
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="mb-6 text-center text-gray-900 bg-gray-200 rounded-md p-2 w-full" />
            ) : (
              <h2 className="mb-6 text-center text-2xl font-bold">{formData.name}</h2>
            )}
            {/* Email */}
            <div className="mb-3">
              <FaEnvelope className="text-blue-400 inline mr-2" />
              {isEditing ? (
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="text-gray-900 bg-gray-200 rounded-md p-1 w-full" />
              ) : (
                <span>{formData.email}</span>
              )}
            </div>
            {/* Phone */}
            <div className="mb-3">
              <FaPhoneAlt className="text-green-400 inline mr-2" />
              {isEditing ? (
                <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                  className="text-gray-900 bg-gray-200 rounded-md p-1 w-full" />
              ) : (
                <span>{formData.phone}</span>
              )}
            </div>
            {/* Role */}
            <div className="mb-3">
              <FaCriticalRole className="text-green-400 inline mr-2" />
              {isEditing ? (
                <select name="role" value={formData.role} onChange={handleChange}
                  className="text-gray-900 bg-gray-200 rounded-md p-1 w-full">
                  <option value="admin">Admin</option>
                  <option value="developer">Developer</option>
                  <option value="projectmanager">Project Manager</option>
                  <option value="user">User</option>
                </select>
              ) : (
                <span className="capitalize">{formData.role}</span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="bg-green-500 px-4 py-2 rounded-md">Save</button>
                  <button onClick={handleCancel} className="bg-gray-500 px-4 py-2 rounded-md">Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-blue-500 px-6 py-2 rounded-md">Edit</button>
              )}
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="flex-1">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">Tasks</h3>
              <p className="text-gray-400">Manage and track tasks</p>
            </div>
            <div className="p-6">
              {loading ? (
                <Loader />
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : tasks.length === 0 ? (
                <p className="text-gray-400">No tasks found</p>
              ) : (
               <table className="w-full text-sm border border-gray-700">
  <thead className="bg-gray-700">
    <tr>
      <th className="p-3 text-left">Title</th>
      <th className="p-3 text-left">Priority</th>
      <th className="p-3 text-left">Assigned To</th>
      <th className="p-3 text-left">Assigned By</th>
      <th className="p-3 text-left">Status</th>
      <th className="p-3 text-left">Deadline</th>
    </tr>
  </thead>
  <tbody>
    {tasks.map((task) => (
      <tr key={task._id} className="border-b border-gray-700">
        <td className="p-3">{task.title}</td>
        <td className="p-3 capitalize">{task.priority}</td>
        <td className="p-3">{task.assignedTo?.map(user => user.name).join(", ")}</td>
        <td className="p-3">{task.assignedBy?.name}</td>
        <td className="p-3 capitalize">{task.status}</td>
        <td className="p-3">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
      </tr>
    ))}
  </tbody>
</table>

              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;
