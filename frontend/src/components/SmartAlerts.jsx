const SmartAlerts = () => {
  const alerts = [
    { course: "OS", status: "safe", message: "You can miss 2 more classes" },
    { course: "DBMS", status: "warning", message: "Attend 3 more to reach 75%" },
  ];

  const statusColor = {
    safe: "text-green-700 bg-green-100",
    warning: "text-yellow-700 bg-yellow-100",
    danger: "text-red-700 bg-red-100",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Smart Alerts</h2>
      <ul className="space-y-2">
        {alerts.map((a, i) => (
          <li key={i} className={`p-3 rounded ${statusColor[a.status]}`}>
            <strong>{a.course}:</strong> {a.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartAlerts;
// This component displays smart attendance alerts based on the user's attendance data.