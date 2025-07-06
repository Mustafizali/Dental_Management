# ENTNT Dental Center Management Dashboard

This is a frontend-only dental center management system built in React as a technical assignment. It supports simulated login, patient and appointment management, calendar view, and file upload — using  localStorage for persistence.

 🌐 Live Demo
https://dental-management-git-main-mdalisayedma-gmailcoms-projects.vercel.app/

 Login-ID 
```
Admin:
Email: admin@entnt.in
Password: admin123

Patient:
Email: john@entnt.in
Password: patient123
```

 👥 User Roles
- Admin (Dentist):** Full access to dashboard, patients, appointments, incidents.
- Patient: Can only view their own profile, appointment history, and files.

 🔐 Authentication (Simulated)
- Login using hardcoded users.
- Session persistence using `localStorage`.

 🧑‍⚕️ Patient Management
- View/Add/Edit/Delete patients
- Stores name, DOB, contact, health info

🗓️ Appointment / Incident Management
- Manage multiple treatment incidents per patient
- Fields: title, description, comments, datetime, status, cost, treatment, next date
- File uploads (invoices, images) stored as base64/Blob URLs
📆 Calendar View
- Grouped monthly/weekly appointment overview
- Clickable dates to reveal incidents scheduled

🧾 Dashboard
- Next 10 appointments
- Top patients, total revenue, completed/pending counts

 👤 Patient View
- Own data only: appointments, files, status, cost, next treatment

### 💾 Data Persistence
- Everything stored in `localStorage` — no backend required

---

 🛠️ Technologies Used
- React (Functional Components)*
- React Router DOM for navigation
- Context API for auth
- TailwindCSS for styling
- UUID for generating unique IDs

---

 🚀 How to Run Locally
```bash
git clone https://github.com/your-username/entnt-dental-dashboard.git
cd entnt-dental-dashboard
npm install
npm start
```

---

## ✅ Completed Assignment Checklist
- [x] Simulated user login
- [x] Role-based access
- [x] Patient CRUD
- [x] Incident CRUD with file upload
- [x] Calendar view
- [x] Patient profile
- [x] Data in localStorage
- [x] Responsive UI
- [x] Deployed + GitHub + README

---
 
 
  
![Screenshot 2025-07-01 155605](https://github.com/user-attachments/assets/a2499ca5-6004-4292-b7de-e4fe69f89147)
![Screenshot 2025-07-01 155601](https://github.com/user-attachments/assets/a8eab008-9c33-4fdd-916e-278520758cc5)
![Screenshot 2025-07-01 152721](https://github.com/user-attachments/assets/a307c8e9-84f5-40f7-9ab7-f90b6cf9ba7c)
![Screenshot 2025-07-01 152652](https://github.com/user-attachments/assets/d3233e27-bd58-4e69-95ac-d2603f97d1a3)
