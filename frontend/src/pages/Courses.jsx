import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";
import { getColorFromId } from "../utils/timetableUtils";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("/api/courses", { withCredentials: true });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`, { withCredentials: true });
      await fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setSelectedCourse(null);
    await fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-800">My Courses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => {
            const bgColor = getColorFromId(course._id);
            
            return (
              <CourseCard
                key={course._id}
                course={course}
                bgColor={bgColor}
                onDelete={handleDelete}
                onEdit={() => {
                  setSelectedCourse(course);
                  setShowForm(true);
                }}
              />
            );
          })}

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
    </div>
  );
};

export default Courses;
