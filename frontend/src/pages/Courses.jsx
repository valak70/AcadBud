// src/pages/Courses.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import CourseForm from "../components/CourseForm";

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

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`, { withCredentials: true });
      setCourses(courses.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setSelectedCourse(null);
    await fetchCourses(); // refetch after add/edit
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default Courses;
