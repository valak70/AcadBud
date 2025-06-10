import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Layout = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen ">
  {/* Sidebar */}
  <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

  {/* Main content */}
  <div className="flex-1 flex flex-col bg-white shadow-inner">
    {/* Top Navbar */}
    <header className="w-full bg-white px-6 py-3 flex justify-between items-center shadow-md border-b relative z-10">
      {/* Hamburger (only on mobile) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden p-2 rounded bg-blue-600 text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="text-xl font-bold text-blue-700"></h1>

      <div className="flex items-center gap-4">
        <span className="text-lg text-blue-800">
          <strong>{user?.name || "User"}</strong>
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>

    {/* Page content */}
    <main className="flex-1 p-6 overflow-y-auto">
      <Outlet />
    </main>
  </div>
</div>


  );
};

export default Layout;
