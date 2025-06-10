import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const GPACalculatorCard = () => {
  const [gpa, setGpa] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const [cgpaInput, setCgpaInput] = useState({ prevGPA: "", prevCredits: "" });
  const [error, setError] = useState("");
  const [showGPA, setShowGPA] = useState(false);

  useEffect(() => {
    fetchGPA();
  }, []);

  const fetchGPA = async () => {
    try {
      const res = await axios.get("/api/gpa/calculate", { withCredentials: true });
      setGpa(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to calculate GPA");
    }
  };

  const fetchCGPA = async () => {
    const { prevGPA, prevCredits } = cgpaInput;
    if (!prevGPA || !prevCredits) {
      setError("Please provide both previous GPA and credits");
      return;
    }

    try {
      const res = await axios.get("/api/gpa/cgpa", {
        withCredentials: true,
        params: { prevGPA, prevCredits },
      });
      setCgpa(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to calculate CGPA");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h3 className="text-xl font-bold text-blue-700 mb-4">GPA & CGPA Calculator</h3>

      <div
        className="mb-4 flex items-center gap-2 cursor-pointer"
        onClick={() => setShowGPA(!showGPA)}
      >
        <span className="text-sm text-gray-600">Your Current GPA:</span>
        <span
          className={`text-xl text-blue-800 transition-all ${
            showGPA ? "" : "blur-[4px] text-blue-600 font-medium"
          }`}
        >
          {gpa ? gpa.GPA : "--"}
        </span>
        {showGPA ? (
          <EyeOff className="w-5 h-5 text-blue-700" />
        ) : (
          <Eye className="w-5 h-5 text-blue-700" />
        )}
      </div>
        <span className="text-sm text-gray-600">Total Credits: {gpa ? gpa.totalCredits  : "--"}</span>
      <hr className="my-4 border-gray-300" />

      <div className="space-y-3">
        <input
          type="number"
          step="0.01"
          placeholder="Previous GPA"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={cgpaInput.prevGPA}
          onChange={(e) => setCgpaInput({ ...cgpaInput, prevGPA: e.target.value })}
        />
        <input
          type="number"
          placeholder="Previous Credits"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={cgpaInput.prevCredits}
          onChange={(e) => setCgpaInput({ ...cgpaInput, prevCredits: e.target.value })}
        />
        
      </div>
        <button
          onClick={fetchCGPA}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-6"
        >
          Calculate CGPA
        </button>
      {cgpa && (
        <p className="text-blue-700 font-medium mt-4">
          CGPA: <strong>{cgpa.CGPA}</strong> ({cgpa.totalCredits} credits)
        </p>
      )}

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default GPACalculatorCard;
