import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar.jsx';
import { FaEnvelope, FaPhoneAlt, FaCriticalRole } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    priority: "medium",
    deadline: ""
  });

  const userData = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); // Manager's JWT token

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/api/route/auth/users", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log("Users API Response:", res.data);

          // Filter only employees if needed
          const filteredUsers = res.data?.data?.filter(
            u => u.role === "employee"
          ) || [];

          setUsers(filteredUsers);
        })
        .catch(err => {
          console.error("Error fetching users:", err);
          toast.error("Failed to load users.");
        });
    }
  }, [token]);

  if (!userData) {
    return (
      <section className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">No user data found. Please login.</p>
      </section>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignedToChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, assignedTo: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      'http://localhost:3000/api/route/manager/create-task',
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        toast.success('Task Assigned Successfully!');
        setFormData({
          title: '',
          description: '',
          assignedTo: [],
          priority: 'medium',
          deadline: ''
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Can't assign task now! Please try again later");
      });
  };

  return (
    <>
      <section className="min-h-screen w-full bg-gray-900">
        <Navbar />

        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 px-4 md:px-8 lg:px-16 py-10">
          {/* Profile Card */}
          <div className="w-full lg:max-w-md bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-xl p-8 text-white border border-gray-700">
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold shadow-lg">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="mt-4 text-center text-2xl font-bold">{userData.name}</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-800/70 rounded-xl hover:bg-gray-700 transition">
                <FaEnvelope className="text-blue-400 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-semibold break-all">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/70 rounded-xl hover:bg-gray-700 transition">
                <FaPhoneAlt className="text-green-400 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="font-semibold">{userData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/70 rounded-xl hover:bg-gray-700 transition">
                <FaCriticalRole className="text-pink-400 text-lg" />
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="font-semibold">{userData.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assign Task Form */}
          <div className="w-full lg:max-w-lg bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl p-8 text-white border border-gray-700">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-center p-3 rounded-lg mb-6 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide">Assign a Task</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded-lg text-black">
              <input
                type="text"
                name="title"
                placeholder="Task Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Task Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <select
                multiple
                value={formData.assignedTo}
                onChange={handleAssignedToChange}
                className="w-full border p-2 rounded"
                required
              >
                {users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Assign Task
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ProjectManagerDashboard;
