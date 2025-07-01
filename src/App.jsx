import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientView from "./pages/PatientView";
import PatientManagement from "./pages/PatientManagement";
import IncidentManagement from "./pages/IncidentManagement";
import Calendar from "./pages/Calendar";
import Navbar from "./components/Navbar";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: "1",
            role: "Admin",
            email: "admin@entnt.in",
            password: "admin123",
          },
          {
            id: "2",
            role: "Patient",
            email: "john@entnt.in",
            password: "patient123",
            patientId: "p1",
          },
        ])
      );
    }
    if (!localStorage.getItem("patients")) {
      localStorage.setItem(
        "patients",
        JSON.stringify([
          {
            id: "p1",
            name: "John Doe",
            dob: "1990-05-10",
            contact: "1234567890",
            healthInfo: "No allergies",
          },
        ])
      );
    }
    if (!localStorage.getItem("incidents")) {
      localStorage.setItem(
        "incidents",
        JSON.stringify([
          {
            id: "i1",
            patientId: "p1",
            title: "Toothache",
            description: "Upper molar pain",
            comments: "Sensitive to cold",
            appointmentDate: "2025-07-01T10:00:00",
            cost: 80,
            status: "Completed",
            files: [],
          },
        ])
      );
    }
  }, []);

  if (!user) return <Login />;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {user.role === "Admin" && (
          <>
            <Route path="/patients" element={<PatientManagement />} />
            <Route path="/incidents" element={<IncidentManagement />} />
            <Route path="/calendar" element={<Calendar />} />
          </>
        )}
        {user.role === "Patient" && (
          <Route path="/mydata" element={<PatientView />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
