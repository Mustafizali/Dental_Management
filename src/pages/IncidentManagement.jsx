

// File: src/pages/IncidentManagement.jsx
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    id: "",
    patientId: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "Pending",
    files: [],
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setPatients(JSON.parse(localStorage.getItem("patients")) || []);
    setIncidents(JSON.parse(localStorage.getItem("incidents")) || []);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem("incidents", JSON.stringify(data));
    setIncidents(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((result) => {
      setForm({ ...form, files: result });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const updated = incidents.map((i) => (i.id === form.id ? form : i));
      saveToLocal(updated);
      setEditing(false);
    } else {
      const newIncident = { ...form, id: uuidv4() };
      saveToLocal([...incidents, newIncident]);
    }
    setForm({
      id: "",
      patientId: "",
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      treatment: "",
      status: "Pending",
      files: [],
    });
  };

  const handleEdit = (incident) => {
    setForm(incident);
    setEditing(true);
  };

  const handleDelete = (id) => {
    const filtered = incidents.filter((i) => i.id !== id);
    saveToLocal(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointment / Incident Management</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 space-y-2">
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="comments"
          placeholder="Comments"
          value={form.comments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={form.cost}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="treatment"
          placeholder="Treatment"
          value={form.treatment}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editing ? "Update Incident" : "Add Incident"}
        </button>
      </form>

      <div className="space-y-4">
        {incidents.map((i) => (
          <div key={i.id} className="bg-white shadow p-4 rounded">
            <p><strong>Patient:</strong> {patients.find(p => p.id === i.patientId)?.name}</p>
            <p><strong>Title:</strong> {i.title}</p>
            <p><strong>Date:</strong> {new Date(i.appointmentDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {i.status}</p>
            <p><strong>Cost:</strong> ${i.cost}</p>
            <p><strong>Treatment:</strong> {i.treatment}</p>
            {i.files.length > 0 && (
              <div>
                <strong>Files:</strong>
                <ul className="list-disc ml-6">
                  {i.files.map((file, idx) => (
                    <li key={idx}>
                      <a href={file.url} target="_blank" rel="noreferrer">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(i)} className="bg-yellow-400 px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(i.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentManagement;
