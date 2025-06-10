import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/courses", label: "Courses" },
    { to: "/timetable", label: "Timetable" },
    { to: "/attendance", label: "Attendance" },
  ];

  return (
    <>
      {/* Hamburger button (visible only on mobile) */}
      

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
  fixed md:static top-0 left-0 z-50 w-64 h-screen
  bg-blue-50 text-blue-700 p-6 transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:transform-none
`}

      >
        {/* Logo */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
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
          <h2 className="text-2xl font-bold text-blue-700">AcadBud</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-xl transition-all duration-150 ${
                  isActive
                    ? "bg-blue-200 text-gray-800 font-semibold"
                    : "hover:bg-blue-100 text-gray-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
