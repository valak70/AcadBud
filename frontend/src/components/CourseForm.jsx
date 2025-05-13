import { useState, useEffect } from "react";
import axios from "axios";

const CourseForm = ({ course, onClose, onSubmit }) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credits, setCredits] = useState("");
  const [expectedGrade, setExpectedGrade] = useState("");
  const [attendanceThreshold, setAttendanceThreshold] = useState("");

  useEffect(() => {
    if (course) {
      setSubjectName(course.subjectName || "");
      setSubjectCode(course.subjectCode || "");
      setCredits(course.credits || "");
      setExpectedGrade(course.expectedGrade || "");
      setAttendanceThreshold(course.attendanceThreshold || "");
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      subjectName,
      subjectCode,
      credits,
      expectedGrade,
      attendanceThreshold,
    };

    try {
      if (course) {
        await axios.put(
          `/api/courses/${course._id}`,
          payload,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "/api/courses",
          payload,
          { withCredentials: true }
        );
      }
      onSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {course ? "Edit Course" : "Add New Course"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Credits"
            value={credits}
            onChange={(e) => setCredits(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Expected Grade"
            value={expectedGrade}
            onChange={(e) => setExpectedGrade(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Attendance Threshold"
            value={attendanceThreshold}
            onChange={(e) => setAttendanceThreshold(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {course ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
