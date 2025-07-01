

// File: src/pages/PatientManagement.jsx
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem("patients", JSON.stringify(data));
    setPatients(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const updated = patients.map((p) => (p.id === form.id ? form : p));
      saveToLocal(updated);
      setEditing(false);
    } else {
      const newPatient = { ...form, id: uuidv4() };
      saveToLocal([...patients, newPatient]);
    }
    setForm({ id: "", name: "", dob: "", contact: "", healthInfo: "" });
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditing(true);
  };

  const handleDelete = (id) => {
    const filtered = patients.filter((p) => p.id !== id);
    saveToLocal(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patient Management</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="healthInfo"
          placeholder="Health Info"
          value={form.healthInfo}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <div className="grid gap-4">
        {patients.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>DOB:</strong> {p.dob}</p>
              <p><strong>Contact:</strong> {p.contact}</p>
              <p><strong>Health Info:</strong> {p.healthInfo}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(p)} className="bg-yellow-400 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientManagement;
