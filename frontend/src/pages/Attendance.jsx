import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUpcomingAndRecentSlots } from "../utils/attendanceUtils";
import { format } from "date-fns";

const Attendance = () => {
  const [summaries, setSummaries] = useState({});
  const [markingCourseId, setMarkingCourseId] = useState(null);
  const [slotSelections, setSlotSelections] = useState({});
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get today's date in required formats
  const today = format(new Date(), "EEEE"); // e.g. "Monday"
  const todayDate = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [courseRes, timetableRes] = await Promise.all([
          axios.get("/api/courses"),
          axios.get("/api/timetable")
        ]);

        setCourses(courseRes.data);
        // Ensure we're setting timetable data correctly
        setTimetable(timetableRes.data?.timetable || timetableRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (courses.length === 0) return;

    const fetchSummaries = async () => {
      try {
        const summaryPromises = courses.map(course =>
          axios.get(`/api/attendance/summary/${course._id}`)
        );

        const summaryResults = await Promise.all(summaryPromises);
        const newSummaries = {};

        summaryResults.forEach((res, index) => {
          newSummaries[courses[index]._id] = res.data;
        });

        setSummaries(newSummaries);
      } catch (err) {
        console.error("Error fetching attendance summaries:", err);
      }
    };

    fetchSummaries();
  }, [courses]);

  // Debug function to check timetable data
  

  const handleStatusChange = (courseId, date, startTime, value) => {
    setSlotSelections(prev => ({
      ...prev,
      [`${courseId}-${date}-${startTime}`]: value,
    }));
  };

  const handleSubmit = async (courseId) => {
    try {
      const toSubmit = Object.entries(slotSelections)
        .filter(([key, status]) => key.startsWith(courseId) && status)
        .map(([key, status]) => {
          const parts = key.split("-");
          const courseIdFromKey = parts[0];
          const date = `${parts[1]}-${parts[2]}-${parts[3]}`; // yyyy-MM-dd
          const startTime = parts.slice(4).join("-"); // handles times like 13:00 or even 13-00 safely

          return {
            courseId: courseIdFromKey,
            date,
            startTime,
            status
          };
        });



      if (toSubmit.length === 0) {
        alert("Please select attendance status for at least one slot");
        return;
      }

      await Promise.all(
        toSubmit.map(record => axios.post("/api/attendance/mark", record))
      );

      // Refresh the summary for this course
      const { data } = await axios.get(`/api/attendance/summary/${courseId}`);
      setSummaries(prev => ({ ...prev, [courseId]: data }));

      // Clear selections for this course
      setSlotSelections(prev => {
        const newSelections = { ...prev };
        Object.keys(newSelections).forEach(key => {
          if (key.startsWith(courseId)) delete newSelections[key];
        });
        return newSelections;
      });

      setMarkingCourseId(null);
    } catch (err) {
      console.error("Error submitting attendance:", err);
      alert("Failed to submit attendance. Please try again.");
    }
  };

  if (loading) {
    return <div className="p-6">Loading attendance data...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


        {courses.map((course) => {
          const summary = summaries[course._id] || {};
          const percent = parseFloat(summary.percentage || 0);
          const threshold = course.attendanceThreshold || 75;
          const color = percent >= threshold ? "bg-green-100" : "bg-red-100";

          // Get slots and debug if needed
          const slots = getUpcomingAndRecentSlots(timetable, course._id, 3);
          

          return (
            <div key={course._id} className={`p-4 rounded-lg shadow-sm border ${color} self-start`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-md font-bold">{course.subjectName}</h3>
                  <p className="text-sm text-gray-700">{course.subjectCode}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${percent >= threshold ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}>
                  {percent.toFixed(1)}%
                </span>
              </div>

              <div className="mt-2 text-sm grid grid-cols-3 gap-1">
                <div>Total: <span className="font-medium">{summary.totalClasses || 0}</span></div>
                <div>Present: <span className="font-medium">{summary.presentCount || 0}</span></div>
                <div>Absent: <span className="font-medium">{(summary.totalClasses || 0) - (summary.presentCount || 0)}</span></div>
              </div>

              <button
                className="mt-3 w-full px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={() => setMarkingCourseId(markingCourseId === course._id ? null : course._id)}
              >
                {markingCourseId === course._id ? "Close" : "Mark Attendance"}
              </button>

              {markingCourseId === course._id && (
                <div className="mt-4 space-y-2 bg-gray-50 p-3 rounded border">
                  {slots.length > 0 ? (
                    slots.map((slot) => {
                      const key = `${course._id}-${slot.date}-${slot.startTime}`;
                      return (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm">
                            {slot.day}, {slot.date} @ {slot.startTime}
                          </span>
                          <select
                            className="border rounded px-2 py-1 text-sm"
                            value={slotSelections[key] || ""}
                            onChange={(e) => handleStatusChange(course._id, slot.date, slot.startTime, e.target.value)}
                          >
                            <option value="">--</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                          </select>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500">
                      No upcoming/recent slots found.
                    </p>
                  )}

                  <button
                    onClick={() => handleSubmit(course._id)}
                    disabled={!Object.keys(slotSelections).some(key => key.startsWith(course._id))}
                    className={`mt-3 w-full px-3 py-1.5 rounded text-sm ${Object.keys(slotSelections).some(key => key.startsWith(course._id))
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Attendance;