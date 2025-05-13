// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
