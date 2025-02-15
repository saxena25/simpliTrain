import React from "react";
import { useState } from "react";
import twoUserCircles from "../../../assets/svgs/twoUserCircles.svg";
import { checkIsMobile } from "../../../utils/helpers";

function Todo() {
  const [todoData, setTodoData] = useState([
    {
      title: "UX for Beginners Quiz",
      courseTitle: "Course Title",
      summary: "Quiz | Chapter 3 | Duration : 60mins | Need 80 points to pass",
      timeLeft: "2 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: "25",
      type: "quiz",
      
    },
    {
      title: "Programming with Java Primary Assessment",
      courseTitle: "Course Title",
      summary:
        "Assessment | Chapter 5 | Duration : 60mins | Need 80 points to pass",
      timeLeft: "3 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: "12",
      type: "assessment",
    },
    {
      title: "Hacking with Python",
      courseTitle: "Course Title",
      summary:
        "Assessment | Chapter 12 | Duration : 100mins | Need 800 points to pass",
      timeLeft: "5 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: "1200",
      type: "quiz",
    },
  ]);
  const isMobile = checkIsMobile();
  return (
    <div className="flex flex-col px-4 md:px-8 gap-5 pb-20 md:max-w-5xl">
      {todoData.map((item, index) => (
        <div className="bg-white py-3 md:py-4 rounded-4xl flex flex-col gap-2 md:gap-4" key={index}>
          <div className="w-full flex flex-col md:flex-row justify-between px-4 md:px-8">
            <div className="flex flex-col">
              <h1 className="text-base md:text-lg text-secondary font-bold">
                {item.title}
              </h1>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                Course : {item.courseTitle}
              </p>
              <p className="text-sm md:text-base text-gray-500 font-medium">
              {item.summary}
              </p>
            </div>
            <div className="content-end">
              <button className={`bg-[#0E121D] text-sm md:text-sm text-white px-6 mt-2 md:mt-0 md:px-10 py-2 rounded-lg ${item.type === "quiz" ? "" : "px-4"}`}>
                {item.type === "quiz" ? "Start" : "Assessment Details"}
              </button>
            </div>
          </div>

          {/* divider */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
          </div>

          <div className="w-full flex flex-row justify-between px-4 md:px-8">
            <div className="flex flex-col md:flex-row gap-1 md:gap-4 md:items-center">
              <p className="h-fit w-fit  py-px md:py-px md:px-3 px-2 bg-gray-400 text-xs md:text-sm text-white rounded-full whitespace-nowrap">
                {item.timeLeft}
              </p>

              <p className="text-xs md:text-base text-gray-500 font-medium">
                Due Date : {item.dueDate}
              </p>
            </div>
            <div className="flex flex-row gap-1 md:gap-2 items-center">
              <img src={twoUserCircles} className={`${isMobile && "w-8"}`} alt="Users" />
              <p className="text-xs md:text-base text-gray-500 font-medium">Responded {item.responded}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
