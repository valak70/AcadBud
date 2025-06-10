const SummaryCards = () => {
  const cards = [
    { label: "Total Courses", value: 4 },
    { label: "Total Credits (Classes per week)", value: 15 },
    { label: "Classes Today", value: "3" },
    { label: "Overall Attendance", value: "78%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white shadow-md rounded-xl p-4 text-center text-blue-700"
        >
          <div className="text-sm">{card.label}</div>
          <div className="text-2xl font-bold">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
