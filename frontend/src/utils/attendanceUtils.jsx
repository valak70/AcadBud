import { format, addDays, isBefore, isEqual } from "date-fns";

export const getUpcomingAndRecentSlots = (entries, courseId, recentCount = 4) => {
  const today = new Date();
  const todaySlots = [];
  const pastSlots = [];

  // Filter entries for the specific course
  const courseEntries = entries.filter(e => e.courseId === courseId);

  // Process past 8 days (including today)
  for (let i = -8; i <= 0; i++) {
    const date = addDays(today, i);
    const day = format(date, "EEEE"); // Get full day name (e.g. "Monday")

    // Find matching entries for this day
    courseEntries.forEach((entry) => {
      if (entry.day === day) {
        const slotDateTime = new Date(`${format(date, 'yyyy-MM-dd')}T${entry.startTime}`);
        
        if (isEqual(date, today)) {
          // Today's classes
          todaySlots.push({
            date: format(date, "yyyy-MM-dd"),
            startTime: entry.startTime,
            day,
            slotDateTime,
            isToday: true
          });
        } else if (isBefore(slotDateTime, today)) {
          // Past classes
          pastSlots.push({
            date: format(date, "yyyy-MM-dd"),
            startTime: entry.startTime,
            day,
            slotDateTime,
            isToday: false
          });
        }
      }
    });
  }

  // Sort past slots by date/time (newest first)
  pastSlots.sort((a, b) => b.slotDateTime - a.slotDateTime);
  
  // Return today's classes first, then most recent past classes
  return [
    ...todaySlots,
    ...pastSlots.slice(0, recentCount)
  ];
};