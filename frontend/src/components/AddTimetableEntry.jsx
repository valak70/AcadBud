import { useState, useEffect, useRef } from "react";
import { daysOfWeek, timeSlots } from "../utils/timetableUtils";
import axios from "axios";

const AddTimetableEntry = ({ courses, onAdd, onCancel }) => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const formRef = useRef(null);

  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  const toggleSlot = (day, time) => {
    const key = `${day}_${time}`;
    const updated = new Set(selectedSlots);
    updated.has(key) ? updated.delete(key) : updated.add(key);
    setSelectedSlots(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourseId || selectedSlots.size === 0) return;

    const timetable = Array.from(selectedSlots).map((slot) => {
      const [day, startTime] = slot.split("_");
      const paddedTime = startTime.padStart(2, "0");
      return {
        day,
        courseId: selectedCourseId,
        startTime: `${paddedTime}:00`,
        endTime: `${parseInt(startTime) + 1}:00`,
      };
    });

    try {
      const res = await axios.put("/api/timetable", { timetable }, { withCredentials: true });
      onAdd(res.data.timetable);
      setSelectedSlots(new Set());
      setSelectedCourseId("");
    } catch (err) {
      alert("Failed to add entries");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-xl font-bold mb-4">Add New Timetable Entries</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Select Subject</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
            >
              <option value="">-- Choose Subject --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.subjectName} ({course.subjectCode})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Select Time Slots</label>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full text-sm">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-100">Day / Time</th>
                    {timeSlots.map((slot) => (
                      <th key={slot} className="border p-2 bg-gray-100">
                        {slot}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {daysOfWeek.map((day) => (
                    <tr key={day}>
                      <td className="border p-2 font-medium bg-gray-50">{day}</td>
                      {timeSlots.map((slot) => {
                        const [start] = slot.split(" - ");
                        const key = `${day}_${start}`;
                        const isSelected = selectedSlots.has(key);
                        return (
                          <td
                            key={key}
                            className={`border text-center cursor-pointer p-1 transition ${
                              isSelected ? "bg-indigo-500 text-white" : "hover:bg-indigo-100"
                            }`}
                            onClick={() => toggleSlot(day, start)}
                          >
                            {isSelected ? "✓" : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              disabled={!selectedCourseId || selectedSlots.size === 0}
            >
              Add Entries
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTimetableEntry;