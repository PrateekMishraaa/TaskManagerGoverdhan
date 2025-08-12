import React, { useState } from 'react';
import Navbar from '../../Components/Navbar.jsx';
import { FaEnvelope, FaPhoneAlt, FaCriticalRole } from 'react-icons/fa';
import axios from 'axios';

const ProjectManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedTo: [],
    priority: 'medium',
    deadline: '',
    status: 'pending',
  });

  const userData = JSON.parse(localStorage.getItem('user'));

  if (!userData) {
    return (
      <section className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
        <p className="text-lg">No user data found. Please login.</p>
      </section>
    );
  }

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleAssign = (e) => {
    e.preventDefault();
    const payload = { ...taskData, assignedBy: userData._id };

    axios
      .post('http://localhost:3000/tasks', payload)
      .then(() => {
        alert('Task Assigned Successfully!');
        setTaskData({
          title: '',
          description: '',
          assignedTo: [],
          priority: 'medium',
          deadline: '',
          status: 'pending',
        });
      })
      .catch((err) => console.error(err));
  };

  return (
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
          <form onSubmit={handleAssign} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700/70 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={taskData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-lg bg-gray-700/70 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={(e) =>
                setTaskData({ ...taskData, assignedTo: [e.target.value] })
              }
              className="w-full p-3 rounded-lg bg-gray-700/70 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Assign To</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700/70 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={taskData.deadline}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700/70 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition-transform font-semibold shadow-lg"
            >
              🚀 Assign Task
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectManagerDashboard;
