// File: src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-widest hover:text-cyan-300 transition duration-300">Dental Dashboard</h1>
      <div className="flex flex-wrap gap-4 items-center">
        <Link to="/" className="hover:text-cyan-400 font-medium transition duration-200">
          Dashboard
        </Link>
        {user.role === "Admin" && (
          <>
            <Link to="/patients" className="hover:text-cyan-400 font-medium transition duration-200">
              Patients
            </Link>
            <Link to="/incidents" className="hover:text-cyan-400 font-medium transition duration-200">
              Appointments
            </Link>
            <Link to="/calendar" className="hover:text-cyan-400 font-medium transition duration-200">
              Calendar
            </Link>
          </>
        )}
        {user.role === "Patient" && (
          <Link to="/mydata" className="hover:text-cyan-400 font-medium transition duration-200">
            My Records
          </Link>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md bg-red-600 hover:bg-red-700 transition duration-300 shadow-md border border-red-300 text-white font-semibold"
          style={{
            textShadow: "0 0 4px #ff4d4d",
            boxShadow: "0 0 8px #ff4d4d, 0 0 16px #ff0000",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
