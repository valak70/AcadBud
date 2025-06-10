const UpcomingFeatures = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-blue-700 mb-4">Coming Soon 🚀</h2>
        <ul className="text-gray-800 list-disc pl-5 space-y-2 text-base leading-relaxed">
          <li>📌 Assignment Deadline Tracker</li>
          <li>🎯 Academic Goal Planner</li>
        </ul>
      </div>
      <p className="text-sm text-gray-500 mt-6 italic">
        Stay tuned — exciting updates are on the way!
      </p>
    </div>
  );
};

export default UpcomingFeatures;