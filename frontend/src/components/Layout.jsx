import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-blue-100">
  {/* Sidebar */}
  <Sidebar />

  {/* Main layout */}
  <div className="flex-1 flex flex-col bg-white shadow-inner">
    {/* Full-width Top Navbar */}
    <header className="w-full bg-white px-6 py-3 flex justify-between items-center shadow-md border-b">
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
