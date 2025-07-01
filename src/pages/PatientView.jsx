// File: src/pages/PatientView.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PatientView = () => {
  const { user } = useContext(AuthContext);
  const patient = (JSON.parse(localStorage.getItem("patients")) || []).find(
    (p) => p.id === user.patientId
  );
  const myIncidents = (JSON.parse(localStorage.getItem("incidents")) || []).filter(
    (i) => i.patientId === user.patientId
  );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center">My Profile</h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400 border-b border-gray-600 pb-2">Personal Details</h2>
        <p className="mb-2"><span className="font-semibold text-gray-300">Name:</span> {patient.name}</p>
        <p className="mb-2"><span className="font-semibold text-gray-300">DOB:</span> {patient.dob}</p>
        <p className="mb-2"><span className="font-semibold text-gray-300">Contact:</span> {patient.contact}</p>
        <p><span className="font-semibold text-gray-300">Health Info:</span> {patient.healthInfo}</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b border-gray-600 pb-2">My Appointments</h2>
        <div className="space-y-6">
          {myIncidents.map((i) => (
            <div key={i.id} className="bg-gray-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{i.title}</h3>
              <p className="mb-1"><span className="text-gray-300 font-medium">Description:</span> {i.description}</p>
              <p className="mb-1"><span className="text-gray-300 font-medium">Comments:</span> {i.comments}</p>
              <p className="mb-1"><span className="text-gray-300 font-medium">Date:</span> {new Date(i.appointmentDate).toLocaleString()}</p>
              <p className="mb-1"><span className="text-gray-300 font-medium">Status:</span> {i.status}</p>
              <p className="mb-1"><span className="text-gray-300 font-medium">Cost:</span> ${i.cost}</p>
              <p className="mb-2"><span className="text-gray-300 font-medium">Treatment:</span> {i.treatment || "N/A"}</p>
              {i.files && i.files.length > 0 && (
                <div className="mt-3">
                  <span className="text-gray-300 font-medium">Files:</span>
                  <ul className="list-disc ml-6 mt-1 text-sm">
                    {i.files.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:underline"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientView;