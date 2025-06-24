# Hostel Maintenance System

A comprehensive web application for managing maintenance requests and complaints in hostel environments. This system connects students, maintenance engineers, and administrators through a streamlined workflow for reporting, tracking, and resolving maintenance issues.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Dashboard Interfaces](#dashboard-interfaces)
- [Tech Stack](#tech-stack)
- [Installation and Setup](#installation-and-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication and Authorization](#authentication-and-authorization)
- [Database Schema](#database-schema)
- [Email Notifications](#email-notifications)
- [Contributors](#contributors)

## 🔍 Overview

The Hostel Maintenance System is designed to streamline the process of reporting and resolving maintenance issues in hostel environments. It provides a seamless experience for students to report problems, engineers to manage assigned tasks, and administrators to oversee the entire maintenance workflow.

## ✨ Features

### Core Features

- **Multi-Role Authentication**: Separate login flows for students, engineers, and administrators.
- **Real-time Dashboard**: Interactive dashboards with statistics and pending actions.
- **Complaint Management**: Complete lifecycle management from submission to resolution.
- **Assignment System**: Admin assignment of engineers to specific complaints.
- **Scheduled Visits**: Engineers can schedule maintenance visits.
- **Feedback System**: Students can provide feedback on completed maintenance tasks.
- **Notification System**: Email and in-app notifications for status updates.
- **Reports and Analytics**: Visualization of maintenance data and performance metrics.

## 🖥️ Dashboard Interfaces

### Student Dashboard

- **Report New Issues**: Form for submitting new maintenance complaints.
- **Track Complaints**: Monitor status of submitted complaints.
- **Complaint History**: View past complaints and their resolutions.
- **Feedback**: Submit ratings and feedback for completed maintenance work.
- **Notifications**: Receive updates on complaint status changes.

### Engineer Dashboard

- **Task Management**: View and manage assigned complaints.
- **Status Updates**: Update complaint status (In Progress, Completed, etc.).
- **Work Scheduling**: Schedule maintenance visits.
- **Detailed Reports**: Document work done, parts replaced, and other maintenance details.
- **Performance Metrics**: Track personal performance and feedback ratings.

### Admin Dashboard

- **Overview**: Statistics and charts showing maintenance system performance.
- **Complaint Assignment**: Assign engineers to pending complaints.
- **Engineer Management**: Add, view, and manage maintenance engineers.
- **Priority Management**: Adjust complaint priorities.
- **System Monitoring**: Track overall system performance and bottlenecks.

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend

- Node.js
- Express.js
- MySQL database
- JWT for authentication
- Nodemailer for email notifications

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/hostel-maintenance-system.git
   cd hostel-maintenance-system
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Configure environment variables by creating a `.env` file in the server directory:

   ```
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRY=1h
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=hostel_maintenance
   MAIL_USER=your_email@gmail.com
   MAIL_PASS=your_email_app_password
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```

2. Start the client development server:

   ```bash
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

## 📁 Project Structure

```
Hostel-Maintenance-System/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # React components
│       ├── adminDashBoardComponents/
│       ├── studentDashBoardComponents/
│       ├── EngineerDashboardComponents/
│       ├── styles/         # CSS files
│       └── utils/          # Utility functions
├── server/                 # Backend Node.js application
│   ├── controllers/        # Route controllers
│   ├── db/                 # Database connection and models
│   ├── middlewares/        # Express middlewares
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
└── Table Structure/        # Database schema and sample data
```

## 📡 API Endpoints

### Authentication

- `POST /api/login` - User login (Student, Engineer, or Admin)

### Student Routes

- `GET /api/student/profile/:id` - Get student profile
- `GET /api/complaint-history/:userId` - Get student's complaint history
- `GET /api/recent-complaints/:userId` - Get student's recent complaints
- `POST /api/student/add-complaint` - Submit a new complaint
- `GET /api/notifications/:userId` - Get student notifications

### Engineer Routes

- `GET /api/engineer/profile/:id` - Get engineer profile
- `GET /api/engineer/complaints/assigned/:id` - Get assigned complaints
- `GET /api/engineer/complaints/completed/:id` - Get completed complaints
- `GET /api/engineer/complaints/pending/:id` - Get pending assignments
- `POST /api/engineer/complaints/accept` - Accept a complaint assignment
- `PATCH /api/engineer/complaints/update-status` - Update complaint status
- `GET /api/engineer/scheduled-visits/:id` - Get scheduled visits

### Admin Routes

- `GET /api/admin/complaints` - Get all complaints
- `GET /api/admin/engineers` - Get all engineers
- `POST /api/admin/engineers/add` - Add a new engineer
- `POST /api/admin/complaints/assign` - Assign complaint to an engineer

### Feedback

- `POST /api/feedback` - Submit feedback for a completed complaint

## 🔐 Authentication and Authorization

The system uses JWT (JSON Web Tokens) for authentication and role-based authorization:

- **Students** authenticate using their roll number and password
- **Engineers and Admins** authenticate using their user ID and password
- Each role has access only to their specific dashboard and functionalities
- Token expiry is configured to ensure security

## 💾 Database Schema

The database consists of several interconnected tables:

- **Users**: Central user information
- **Students**: Student-specific data
- **Engineers**: Engineer-specific data
- **Admin**: Administrator data
- **Complaints**: Maintenance issue details
- **Assignments**: Engineer assignments to complaints
- **Feedback**: Student feedback on completed maintenance
- **Notifications**: System notifications
- **Rooms**: Hostel room information

## 📧 Email Notifications

The system sends email notifications for important events:

- Complaint submission confirmation
- Complaint status updates
- Engineer assignment notifications
- Scheduled visit reminders
- Feedback requests

## 👥 Contributors

- [Kartik Sharma](https://github.com/kartiksharma1227)
- [Ishita Agrawal](https://github.com/Ishu0112)


