// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/courses", label: "Courses" },
    { to: "/timetable", label: "Timetable" },
    { to: "/attendance", label: "Attendance" },
    { to: "/gpa", label: "GPA" },
  ];

  return (
    <aside className="w-64 h-screen bg-indigo-600 text-white p-6">
        
      <h2 className="text-2xl font-bold mb-8"> AcadBud</h2>
      <nav className="space-y-4">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-indigo-500 ${
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
