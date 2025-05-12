const { subscribe } = require("../routes/courseRoutes");

async function removeTimetableEntriesByCourseId(user, courseId) {
    const before = user.timetable.length;
    user.timetable = user.timetable.filter(entry => !entry.courseId.equals(courseId));
    return before !== user.timetable.length; // returns true if anything was removed
  }
  
exports.getTimetable = async (req, res) => {
  try {
    const { timetable, courses } = req.user;

    const enrichedTimetable = timetable.map(entry => {
      const course = courses.find(c => c._id.toString() === entry.courseId.toString());

      return {
        _id: entry._id,
        day: entry.day,
        startTime: entry.startTime,
        endTime: entry.endTime,
        courseId: entry.courseId,
        subjectName: course ? course.subjectName : "Unknown Course",
        subjectCode: course ? course.subjectCode : "Unknown Code",
      };
    });

    res.json(enrichedTimetable);
  } catch (err) {
    console.error("Timetable fetch error:", err);
    res.status(500).json({ error: "Failed to fetch timetable" });
  }
};

  
  exports.updateTimetable = async (req, res) => {
  const { timetable } = req.body;

  if (!Array.isArray(timetable)) {
    return res.status(400).json({ error: 'Timetable must be an array' });
  }

  try {
    const existingTimetable = req.user.timetable;

    // Merge logic: Replace existing entries with the same day/time, add new ones
    const updatedTimetable = [...existingTimetable];
    timetable.forEach(newEntry => {
      const existingIndex = existingTimetable.findIndex(
        entry => entry.day === newEntry.day && entry.startTime === newEntry.startTime
      );

      if (existingIndex !== -1) {
        // Update existing entry
        updatedTimetable[existingIndex] = newEntry;
      } else {
        // Add new entry
        updatedTimetable.push(newEntry);
      }
    });

    req.user.timetable = updatedTimetable;
    await req.user.save();
    res.json({ message: 'Timetable updated', timetable: req.user.timetable });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update timetable' });
  }
};
  exports.removeSingleEntry = async (req, res) => {
    try {
      const { day, startTime, courseId } = req.body;
      if (!day || !startTime || !courseId) {
        return res.status(400).json({ message: "day, startTime, and subjectCode are required" });
      }
  
      const user = req.user;
      const before = user.timetable.length;
  
      user.timetable = user.timetable.filter(
        entry =>
          !(
            entry.day === day &&
            entry.startTime === startTime &&
            entry.courseId.equals(courseId)
          )
      );
  
      const after = user.timetable.length;
  
      if (before === after) {
        return res.status(404).json({ message: "No matching timetable entry found" });
      }
  
      await user.save();
      res.json({ message: "Timetable entry removed" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  exports.removeAllEntriesForSubject = async (req, res) => {
    try {
      const { courseId } = req.params;
      const user = req.user;
  
      const deleted = await removeTimetableEntriesByCourseId(user, courseId);
  
      if (!deleted) {
        return res.status(404).json({ message: "No timetable entries found for this subject" });
      }
  
      await user.save();
      res.json({ message: "All timetable entries for subject removed" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  module.exports.removeTimetableEntriesByCourseId = removeTimetableEntriesByCourseId;
  
  