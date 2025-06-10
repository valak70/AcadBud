import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";

const getRiskColor = (attendance) => {
  if (attendance >= 75) return "#16a34a"; // green
  if (attendance >= 65) return "#eab308"; // yellow
  return "#dc2626"; // red
};

const AttendanceBarChart = () => {
  const data = [
    { course: "OS", attendance: 82 },
    { course: "DBMS", attendance: 74 },
    { course: "CN", attendance: 67 },
    { course: "ML", attendance: 90 },
    { course: "AI", attendance: 40 },
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Attendance by Course</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip />
          <ReferenceLine y={75} stroke="#f87171" strokeDasharray="4 4" />
          <Bar
            dataKey="attendance"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
            label={{ position: "top", formatter: (v) => `${v}%` }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getRiskColor(entry.attendance)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );};
export default AttendanceBarChart;