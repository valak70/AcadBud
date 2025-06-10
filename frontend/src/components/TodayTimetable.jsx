const TodayTimetable = () => {
  const classes = [
    { time: "9:00 - 10:00", subject: "OS" },
    { time: "11:00 - 12:00", subject: "DBMS" },
    { time: "2:00 - 3:00", subject: "ML" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Today's Classes</h2>
      <ul className="space-y-2">
        {classes.map((cls, idx) => (
          <li key={idx} className="flex justify-between text-gray-700">
            <span>{cls.subject}</span>
            <span>{cls.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayTimetable;
