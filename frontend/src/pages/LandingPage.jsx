import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">AcadBud</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
        Your all-in-one academic companion. Track attendance, manage courses, and stay on top of your academic goals effortlessly.
      </p>

      <div className="flex gap-4">
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-200">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-600 font-semibold py-2 px-6 rounded-xl shadow-md transition-all duration-200">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
