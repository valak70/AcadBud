import { useEffect, useState } from "react";
import axios from "axios";
import TimetableGrid from "../components/TimetableGrid";
import AddTimetableEntry from "../components/AddTimetableEntry";

const Timetable = () => {
  const [entries, setEntries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showAddEntry, setShowAddEntry] = useState(false);

  const fetchData = async () => {
    try {
      const [coursesRes, timetableRes] = await Promise.all([
        axios.get("/api/courses", { withCredentials: true }),
        axios.get("/api/timetable", { withCredentials: true }),
      ]);
      setCourses(coursesRes.data);
      setEntries(timetableRes.data);
    } catch (err) {
      console.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddEntry = (newTimetable) => {
    setEntries(newTimetable);
    setShowAddEntry(false);
  };

  const handleDeleteEntry = async (entry) => {
    try {
      await axios.delete("/api/timetable/entry", {
        data: entry,
        withCredentials: true,
      });
      fetchData(); // Refresh data after deletion
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  const handleDeleteAllByCourse = async (courseId) => {
    try {
      await axios.delete(`/api/timetable/course/${courseId}`, {
        withCredentials: true,
      });
      fetchData(); // Refresh data after deletion
    } catch (err) {
      console.error("Failed to delete all entries", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Timetable</h2>
      <TimetableGrid
        entries={entries}
        courses={courses}
        onDeleteEntry={handleDeleteEntry}
        onDeleteAllByCourse={handleDeleteAllByCourse}
      />
      
      {!showAddEntry && (
        <button
          onClick={() => setShowAddEntry(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Entry
        </button>
      )}

      {showAddEntry && (
        <AddTimetableEntry
          courses={courses}
          onAdd={handleAddEntry}
          onCancel={() => setShowAddEntry(false)}
        />
      )}
    </div>
  );
};

export default Timetable;