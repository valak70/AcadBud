import React, { useEffect, useState } from "react";
import { timeSlots, daysOfWeek, getColorForCourse } from "../utils/timetableUtils";

const TimetableGrid = ({ entries, courses, onDeleteEntry, onDeleteAllByCourse }) => {
  const [activeCell, setActiveCell] = useState(null);

  const getCourseById = (id) => courses.find((c) => c._id === id);
  const normalize = (t) => t.padStart(2, '0') + ':00';

  const TrashIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-3.5 h-3.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  useEffect(() => {
    const handleClickOutside = () => setActiveCell(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative overflow-visible pb-4">
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full relative z-0">
          <thead>
            <tr>
              <th className="sticky top-0 left-0 border px-2 py-2 bg-gray-100 z-10">
                Day / Time
              </th>
              {timeSlots.map((slot) => (
                <th
                  key={slot}
                  className="sticky top-0 border px-4 py-2 bg-gray-100 text-sm z-10"
                >
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => (
              <tr key={day}>
                <td className="border px-4 py-2 font-medium bg-gray-50 sticky left-0 z-10">
                  {day}
                </td>
                {timeSlots.map((slot) => {
                  const [start] = slot.split(" - ");
                  const entry = entries.find(
                    (e) => e.day === day && e.startTime === normalize(start)
                  );
                  const cellKey = `${day}-${start}`;

                  if (entry) {
                    const course = getCourseById(entry.courseId);
                    const isActive = activeCell === cellKey;

                    return (
                      <td
                        key={slot}
                        className="relative border text-center text-xs cursor-pointer overflow-visible"
                        style={{
                          backgroundColor: getColorForCourse(entry.courseId),
                          color: "white",
                          minWidth: "100px",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCell(isActive ? null : cellKey);
                        }}
                      >
                        <div className="py-3">
  <div className="font-semibold">{course?.subjectName}</div>
  <div className="text-[0.7rem]">{course?.subjectCode}</div>
</div>

                        {isActive && (
                          <div
                            className="absolute right-0 mt-1 z-50 bg-white shadow-lg rounded-md overflow-hidden w-48"
                            style={{ top: "100%" }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteEntry(entry);
                                setActiveCell(null);
                              }}
                              className="flex items-center w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 gap-2"
                            >
                              <TrashIcon />
                              <span>Delete this slot</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteAllByCourse(entry.courseId);
                                setActiveCell(null);
                              }}
                              className="flex items-center w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 gap-2 border-t border-gray-100"
                            >
                              <TrashIcon />
                              <span>Delete all {course?.subjectName} slots</span>
                            </button>
                          </div>
                        )}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={slot}
                      className="border hover:bg-gray-50 cursor-pointer"
                      style={{ minWidth: "100px" }}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimetableGrid;
