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
  "#6B5B95", "#FF6F61", "#88B04B", "#F7CAC9",
  "#92A8D1", "#955251", "#B565A7", "#009B77",
];

const courseColorMap = new Map();

export const getColorForCourse = (courseId) => {
  if (!courseColorMap.has(courseId)) {
    const color = colorPalette[courseColorMap.size % colorPalette.length];
    courseColorMap.set(courseId, color);
  }
  return courseColorMap.get(courseId);
};
