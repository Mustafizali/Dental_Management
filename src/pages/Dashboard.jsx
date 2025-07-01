// File: src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const incidents = JSON.parse(localStorage.getItem("incidents")) || [];
  const upcoming = incidents
    .filter((i) => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const revenue = incidents.reduce((sum, i) => sum + (i.cost || 0), 0);
  const completed = incidents.filter((i) => i.status === "Completed").length;
  const pending = incidents.filter((i) => i.status !== "Completed").length;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Welcome, {user.email}</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 text-white font-semibold rounded-lg shadow-md bg-red-600 hover:bg-red-700 transition transform hover:scale-105 border border-red-400"
          style={{
            textShadow: "0 0 5px #ff4d4d, 0 0 10px #ff4d4d",
            boxShadow: "0 0 10px #ff4d4d, 0 0 20px #ff1a1a, 0 0 30px #ff0000",
          }}
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-800 rounded-xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
          <p className="text-3xl font-bold text-cyan-400">{upcoming.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Completed Treatments</h2>
          <p className="text-3xl font-bold text-green-400">{completed}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Pending Treatments</h2>
          <p className="text-3xl font-bold text-yellow-400">{pending}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-purple-400">${revenue}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Next 10 Appointments</h2>
        <ul className="divide-y divide-gray-700">
          {upcoming.map((i) => (
            <li key={i.id} className="py-3 flex justify-between text-sm">
              <span className="font-medium">{i.title}</span>
              <span className="text-gray-300">{new Date(i.appointmentDate).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
