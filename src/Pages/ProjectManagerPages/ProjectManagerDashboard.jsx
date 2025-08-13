import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt, FaCriticalRole, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUser, FaCalendarAlt, FaFlag } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../Components/Navbar.jsx"
const ProjectManagerDashboard = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // assignedTo: [],
    priority: "medium",
    deadline: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch users and tasks on component mount
  useEffect(() => {
    if (token) {
      // const fetchUsers = async () => {
      //   try {
      //     const response = await axios.get(
      //       "http://localhost:3000/api/route/auth/users",
      //       { headers: { Authorization: `Bearer ${token}` } }
      //     );
      //     const developers = response.data.filter(user => user.role === "developer");
      //     setUsers(developers);
      //   } catch (error) {
      //     console.error("Error fetching users:", error);
      //     toast.error("Failed to load developers list");
      //   }
      // };

      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/route/manager/get-assigned-tasks",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setTasks(response.data || []);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          toast.error("Failed to load tasks");
        }
      };

      // fetchUsers();
      fetchTasks();
    }
  }, [token]);

  // Check if user data exists
  if (!userData || !userData.name) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-lg">No user data found. Please login.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignedToChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, assignedTo: selected });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.deadline || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (isEditing) {
        // Update existing task
        const response = await axios.put(
          `http://localhost:3000/api/route/manager/update-task/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Update task in local state
        setTasks(tasks.map(task => 
          task._id === editingId 
            ? { ...task, ...formData }
            : task
        ));
        setIsEditing(false);
        setEditingId(null);
        console.log('Task updated successfully!');
      } else {
        // Create new task using your API
        const response = await axios.post(
          'http://localhost:3000/api/route/manager/create-task',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Add new task to local state
        const newTask = {
          _id: response.data._id || Date.now(),
          ...formData,
          status: "Pending",
          createdAt: new Date().toISOString().split('T')[0],
          managerId: userData._id
        };
        setTasks([...tasks, newTask]);
        console.log('Task created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        assignedTo: [],
        priority: 'medium',
        deadline: ''
      });
      setShowForm(false);
      
    } catch (error) {
      console.error('Error with task operation:', error);
      alert(error.response?.data?.message || 'Error occurred while processing task');
    }
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo || [],
      priority: task.priority,
      deadline: task.deadline
    });
    setIsEditing(true);
    setEditingId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // If you have a delete API endpoint, uncomment and use:
        // await axios.delete(
        //   `http://localhost:3000/api/route/manager/delete-task/${taskId}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );
        
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully!');
      } catch (error) {
        console.error('Error deleting task:', error);
        toast.error('Error occurred while deleting task');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      assignedTo: [],
      priority: 'medium',
      deadline: ''
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUserNames = (userIds) => {
    if (!userIds || userIds.length === 0) return 'Not Assigned';
    
    return userIds.map(id => {
      const user = users.find(u => u._id === id);
      return user ? user.name.split(' ')[0] : 'Unknown';
    }).join(', ');
  };

  return (
  <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navbar */}
     <Navbar/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 text-white border border-white/20">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                  {userData.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h2 className="mt-4 text-center text-xl font-bold">{userData.name}</h2>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <FaEnvelope className="text-blue-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-300 text-xs">Email</p>
                    <p className="font-semibold text-sm truncate">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <FaPhoneAlt className="text-green-400" />
                  <div>
                    <p className="text-gray-300 text-xs">Phone</p>
                    <p className="font-semibold text-sm">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <FaCriticalRole className="text-cyan-400" />
                  <div>
                    <p className="text-gray-300 text-xs">Role</p>
                    <p className="font-semibold text-sm">{userData.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Management Section */}
          <div className="lg:col-span-3 py-10">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaUser className="text-xl" />
                  Task Management
                </h2>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 backdrop-blur-sm"
                >
                  <FaPlus />
                  New Task
                </button>
              </div>

              {/* Task Form */}
              {showForm && (
                <div className="p-6 bg-white/5 border-b border-white/10">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="bg-white/10 border border-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <textarea
                      name="description"
                      placeholder="Task Description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        multiple
                        value={formData.assignedTo}
                        onChange={handleAssignedToChange}
                        className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        size="4"
                      >
                        {users.map(user => (
                          <option key={user._id} value={user._id} className="bg-slate-800 text-white">
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                      
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low" className="bg-slate-800">Low Priority</option>
                        <option value="medium" className="bg-slate-800">Medium Priority</option>
                        <option value="high" className="bg-slate-800">High Priority</option>
                      </select>
                    </div> */}
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={handleSubmit} 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200"
                      >
                        <FaSave />
                        {isEditing ? 'Update Task' : 'Create Task'}
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tasks Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left py-4 px-6 text-white font-semibold">Task Details</th>
                      {/* <th className="text-left py-4 px-6 text-white font-semibold">Assigned To</th> */}
                      <th className="text-left py-4 px-6 text-white font-semibold">Priority</th>
                      <th className="text-left py-4 px-6 text-white font-semibold">Deadline</th>
                      <th className="text-left py-4 px-6 text-white font-semibold">Status</th>
                      <th className="text-left py-4 px-6 text-white font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task._id} className="border-t border-white/10 hover:bg-white/5 transition-colors duration-200">
                        <td className="py-4 px-6">
                          <div className="text-white">
                            <h3 className="font-semibold text-lg">{task.title}</h3>
                            <p className="text-gray-300 text-sm mt-1 max-w-xs truncate">{task.description}</p>
                            <p className="text-gray-400 text-xs mt-1">Created: {task.createdAt}</p>
                          </div>
                        </td>
                        {/* <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <FaUser className="text-blue-400" />
                            <span className="text-white text-sm">{getUserNames(task.assignedTo)}</span>
                          </div>
                        </td> */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                            <FaFlag className="text-xs" />
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-white">
                            <FaCalendarAlt className="text-blue-400" />
                            <span className="text-sm">{task.deadline}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(task)}
                              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-lg transition-all duration-200"
                              title="Edit Task"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-all duration-200"
                              title="Delete Task"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {tasks.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No tasks assigned yet</p>
                    <p className="text-gray-500 text-sm mt-2">Click "New Task" to create your first task</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProjectManagerDashboard;