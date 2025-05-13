// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from "./pages/Courses";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import GPA from "./pages/GPA";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/gpa" element={<GPA />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;



