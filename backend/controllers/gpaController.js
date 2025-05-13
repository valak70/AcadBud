const User = require('../models/User');

exports.calculateGPA = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.courses || user.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    let totalCredits = 0;
    let weightedSum = 0;

    user.courses.forEach(course => {
      if (course.credits != null && course.expectedGrade != "") {
        totalCredits += course.credits;
        weightedSum += course.credits * course.expectedGrade;
      }
    });

    if (totalCredits === 0) {
      return res.status(400).json({ message: "No valid data to calculate GPA" });
    }

    const GPA = (weightedSum / totalCredits).toFixed(2);
    res.json({ GPA: parseFloat(GPA), totalCredits });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.calculateCGPA = async (req, res) => {
  try {
    const { prevGPA, prevCredits } = req.query;

    if (!prevGPA || !prevCredits) {
      return res.status(400).json({ message: "Previous GPA and credits are required" });
    }

    const user = await User.findById(req.userId);
    if (!user || !user.courses || user.courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    let currCredits = 0;
    let currWeightedSum = 0;

    user.courses.forEach(course => {
      if (course.credits != null && course.expectedGrade != null) {
        currCredits += course.credits;
        currWeightedSum += course.credits * course.expectedGrade;
      }
    });

    if (currCredits === 0) {
      return res.status(400).json({ message: "No valid course data to calculate current GPA" });
    }

    const currentGPA = currWeightedSum / currCredits;
    const CGPA = (
      (parseFloat(prevGPA) * parseFloat(prevCredits) + currentGPA * currCredits)
      / (parseFloat(prevCredits) + currCredits)
    ).toFixed(2);

    res.json({
      CGPA: parseFloat(CGPA),
      totalCredits: parseFloat(prevCredits) + currCredits
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
