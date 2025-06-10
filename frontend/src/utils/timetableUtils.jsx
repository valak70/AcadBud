// src/utils/timetableUtils.js
export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const timeSlots = Array.from({ length: 9 }, (_, i) => {
  const start = 9 + i;
  const end = start + 1;
  return `${start}:00 - ${end}:00`;
});



const cardColors = [
  "bg-green-100",   // Existing
  "bg-yellow-100",  // Existing
  "bg-pink-100",    // Existing
  "bg-purple-100",  // Existing
  "bg-teal-100",    // Existing
  "bg-indigo-100",  // Existing
  "bg-rose-100",    // Existing
  "bg-cyan-100",    // Existing
  "bg-sky-100",     // Light sky blue
];

const courseColorMap = new Map();
export const getColorFromId = (id) => {
  
  if (!courseColorMap.has(id)) {
    const color = cardColors[courseColorMap.size % cardColors.length];
    courseColorMap.set(id, color);
  }
  
  return courseColorMap.get(id);
};

