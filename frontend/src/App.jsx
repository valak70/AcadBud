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
import Layout from "./components/Layout";
import { useEffect } from 'react';
import { subscribeUser } from './utils/subscribe';
import LandingPage from './pages/LandingPage';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


function App() {
  useEffect(() => {
    subscribeUser();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element = {<LandingPage/>}/>          
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/attendance" element={<Attendance />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;



