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

const colorPalette = [
  "#6B5B95", // Purple Gray
  "#FF6F61", // Coral
  "#88B04B", // Olive Green
  "#D65076", // Deep Pink (replacement)
  "#3E78B2", // Bold Blue (replacement)
  "#955251", // Dusty Rose
  "#B565A7", // Orchid
  "#009B77", // Teal Green
];


const courseColorMap = new Map();

export const getColorForCourse = (courseId) => {
  if (!courseColorMap.has(courseId)) {
    const color = colorPalette[courseColorMap.size % colorPalette.length];
    courseColorMap.set(courseId, color);
  }
  return courseColorMap.get(courseId);
};
