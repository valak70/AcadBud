async function removeTimetableEntriesBySubjectCode(user, subjectCode) {
    const before = user.timetable.length;
    user.timetable = user.timetable.filter(entry => entry.subjectCode !== subjectCode);
    return before !== user.timetable.length; // returns true if anything was removed
  }
  
exports.getTimetable = async (req, res) => {
    try {
      res.json({ timetable: req.user.timetable });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch timetable' });
    }
  };
  
  exports.updateTimetable = async (req, res) => {
    const { timetable } = req.body;
  
    if (!Array.isArray(timetable)) {
      return res.status(400).json({ error: 'Timetable must be an array' });
    }
  
    try {
      req.user.timetable = timetable;
      await req.user.save();
      res.json({ message: 'Timetable updated', timetable: req.user.timetable });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update timetable' });
    }
  };
  exports.removeSingleEntry = async (req, res) => {
    try {
      const { day, startTime, subjectCode } = req.body;
      if (!day || !startTime || !subjectCode) {
        return res.status(400).json({ message: "day, startTime, and subjectCode are required" });
      }
  
      const user = await User.findById(req.userId);
      const before = user.timetable.length;
  
      user.timetable = user.timetable.filter(
        entry =>
          !(
            entry.day === day &&
            entry.startTime === startTime &&
            entry.subjectCode === subjectCode
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
      const { subjectCode } = req.params;
      const user = await User.findById(req.userId);
  
      const deleted = await removeTimetableEntriesBySubjectCode(user, subjectCode);
  
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
  
  module.exports.removeTimetableEntriesBySubjectCode = removeTimetableEntriesBySubjectCode;
  
  