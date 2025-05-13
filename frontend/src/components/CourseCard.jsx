// src/components/CourseCard.jsx
const CourseCard = ({ course, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2 border">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{course.subjectName}</h2>
        <span className="text-sm text-gray-500">{course.subjectCode}</span>
      </div>
      <p className="text-sm text-gray-600">Credits: {course.credits || "—"}</p>
      <div className="flex space-x-2 pt-2">
        <button
          onClick={onEdit}
          className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(course._id)}
          className="text-sm px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};


export default CourseCard;
