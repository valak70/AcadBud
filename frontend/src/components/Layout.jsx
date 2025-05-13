import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-gray-200 px-6 py-2 flex justify-between items-center z-10 shadow">
          <h1 className="text-xl font-bold text-gray-200"></h1>

          <div className="flex items-center gap-4 px-4 py-2 ">
            <span className="text-lg ">
               <strong>{user?.name || "User"}</strong>
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
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
