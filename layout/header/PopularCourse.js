import React from "react";

const coursesData = [
  { courseTitle: "How to becoming Python developer", name: "Santheeb taylor" },
  { courseTitle: "Learn python and java", name: "Santheeb taylor" },
  { courseTitle: "Basic of python", name: "Santheeb taylor" },
  { courseTitle: "Master TailwindCSS in 10 minutes", name: "Santheeb taylor" },
  { courseTitle: "Learn python hacking", name: "Santheeb taylor" },
];

function PopularCourse() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold text-secondary">
        Popular Instructors
      </h1>
      <div className="grid grid-cols-2 gap-2">
        {coursesData.map((item, index) => (
          <div className="flex flex-row gap-4" key={index}>
            <div className="w-14 h-14 bg-gray-100 rounded-2xl"></div>
            <div className="flex flex-col justify-center">
              <p className="text-sm text-secondary font-medium">{item.courseTitle}</p>
              <p className="text-sm text-primary">- {item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCourse;
