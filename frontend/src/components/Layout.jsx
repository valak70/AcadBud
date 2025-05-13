// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
    const {user} = useAuth();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700"></h1>
          {/* You can add user info, logout, etc. here */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">Logged in as <strong>{user?.name}</strong></span>
            {/* Add Logout button */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
