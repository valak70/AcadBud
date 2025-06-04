// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import React from "react"; 

const Dashboard = () => {
  const { user } = useAuth();
  // Dummy data – replace these with actual values from API or props
  const totalCourses = user?.courses?.length || 0; // Assuming user.courses is an array of courses
  const classesThisWeek = user?.timetable?.length || 0; // Assuming user.timetable is an array of timetable entries
  const attendedThisWeek = Math.floor(Math.random()*classesThisWeek); // Assuming user.attendance is an array of attendance records with an 'attended' boolean field

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-900">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{totalCourses}</p>
        </div>

        <div className="bg-green-100 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-900">Classes This Week</h2>
          <p className="text-3xl font-bold mt-2">{classesThisWeek}</p>
        </div>

        <div className="bg-yellow-100 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-yellow-900">Attended This Week</h2>
          <p className="text-3xl font-bold mt-2">{attendedThisWeek}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
