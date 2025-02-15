import React from "react";

const Curriculum = () => {
  const modules = [
    { title: "Introduction to UX", duration: "10 mins" },
    { title: "Design Thinking Process", duration: "25 mins" },
  ];

  return (
    <section className="p-6 bg-white shadow">
      <h3 className="text-xl font-bold mb-4">Curriculum</h3>
      <ul className="space-y-2">
        {modules.map((module, index) => (
          <li key={index} className="flex justify-between">
            <span>{module.title}</span>
            <span>{module.duration}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Curriculum;
