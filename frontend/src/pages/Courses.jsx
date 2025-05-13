import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false); // New state for calculator visibility

  const [gpa, setGpa] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const [cgpaInput, setCgpaInput] = useState({ prevGPA: "", prevCredits: "" });
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses", { withCredentials: true });
      setCourses(res.data);
      // Automatically recalculate GPA when courses change
      if (showCalculator) {
        await fetchGPA();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGPA = async () => {
    try {
      const res = await axios.get("/api/gpa/calculate", { withCredentials: true });
      setGpa(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to calculate GPA");
    }
  };

  const fetchCGPA = async () => {
    try {
      const { prevGPA, prevCredits } = cgpaInput;
      if (!prevGPA || !prevCredits) {
        setError("Please provide both previous GPA and credits");
        return;
      }

      const res = await axios.get("/api/gpa/cgpa", {
        withCredentials: true,
        params: { prevGPA, prevCredits },
      });
      setCgpa(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to calculate CGPA");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`, { withCredentials: true });
      await fetchCourses(); // This will trigger GPA recalculation if calculator is open
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setSelectedCourse(null);
    await fetchCourses(); // This will trigger GPA recalculation if calculator is open
  };

  return (
    <div className="space-y-6 pb-16"> {/* Added padding-bottom for floating button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add Course
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onDelete={handleDelete}
              onEdit={() => {
                setSelectedCourse(course);
                setShowForm(true);
              }}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CourseForm
          course={selectedCourse}
          onClose={() => {
            setShowForm(false);
            setSelectedCourse(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Toggle Calculator Button */}
<div className="mt-8 flex justify-end">
  <button
    onClick={() => setShowCalculator(!showCalculator)}
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
  >
    {showCalculator ? "Hide" : "GPA Calculator"}
  </button>
</div>

{/* Inline, Right-Aligned Calculator Panel */}
{showCalculator && (
  <div className="mt-4 flex justify-end">
    <div className="bg-white p-4 rounded-lg shadow border w-72">
      <h3 className="font-bold text-lg mb-4">GPA Calculator</h3>

      <button
        onClick={fetchGPA}
        className="w-full mb-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Calculate Current GPA
      </button>

      <div className="space-y-2 mb-3">
        <input
          type="number"
          step="0.01"
          placeholder="Previous GPA"
          className="w-full px-3 py-2 border rounded"
          value={cgpaInput.prevGPA}
          onChange={(e) => setCgpaInput({ ...cgpaInput, prevGPA: e.target.value })}
        />
        <input
          type="number"
          placeholder="Previous Credits"
          className="w-full px-3 py-2 border rounded"
          value={cgpaInput.prevCredits}
          onChange={(e) => setCgpaInput({ ...cgpaInput, prevCredits: e.target.value })}
        />
        <button
          onClick={fetchCGPA}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Calculate CGPA
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {gpa && (
        <p className="text-sm font-medium text-green-700 mt-2">
          Current GPA: <strong>{gpa.GPA}</strong> ({gpa.totalCredits} credits)
        </p>
      )}

      {cgpa && (
        <p className="text-sm font-medium text-purple-700 mt-1">
          Combined CGPA: <strong>{cgpa.CGPA}</strong> (Total: {cgpa.totalCredits} credits)
        </p>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Courses;