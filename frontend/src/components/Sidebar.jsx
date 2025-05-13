import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/courses", label: "Courses" },
    { to: "/timetable", label: "Timetable" },
    { to: "/attendance", label: "Attendance" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6">
      {/* Original Logo as it was */}
      <div className="flex items-center mb-6">
      <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold ">AcadBud</h2>
      </div>

      <nav className="space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-800 ${
                isActive ? "bg-indigo-500 font-semibold" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
