

// File: src/pages/Calendar.jsx
import React, { useEffect, useState } from "react";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("incidents")) || [];
    setAppointments(data);
  }, []);

  const groupedByDate = appointments.reduce((acc, curr) => {
    const date = new Date(curr.appointmentDate).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(curr);
    return acc;
  }, {});

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const result = [];
    while (date.getMonth() === month) {
      result.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const now = new Date();
  const days = getDaysInMonth(now.getMonth(), now.getFullYear());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointment Calendar</h1>
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => {
          const dateStr = day.toISOString().split("T")[0];
          return (
            <div key={dateStr} className="bg-white shadow p-2 rounded">
              <h3 className="font-semibold text-sm">
                {day.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <ul className="mt-1 text-xs space-y-1">
                {groupedByDate[dateStr]?.map((appt) => (
                  <li key={appt.id} className="bg-blue-100 p-1 rounded">
                    {appt.title} @ {new Date(appt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </li>
                )) || <li className="text-gray-400">No Appointments</li>}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
