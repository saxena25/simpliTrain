import React from "react";
import { useState } from "react";
import twoUserCircles from "../../../assets/svgs/twoUserCircles.svg";
import { Progress } from "antd";
import quiz from "../../../assets/svgs/quiz.svg";
import { checkIsMobile } from "../../../utils/helpers";

function Completed() {
  const [completedAssessments, setCompletedAssessments] = useState([
    {
      title: "UX for Beginners Quiz",
      courseTitle: "Course Title",
      summary: "Quiz | Chapter 3 | Duration : 60mins | Need 80 points to pass",
      timeLeft: "2 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: 25,
      type: "quiz",
      completed: 3,
      completedDate: "June 8,2024",
      missed: false,
    },
    {
      title: "Programming with Java Primary Assessment",
      courseTitle: "Course Title",
      summary:
        "Assessment | Chapter 5 | Duration : 60mins | Need 80 points to pass",
      timeLeft: "3 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: "12",
      completed: 10,
      completedDate: "June 8,2024",
      missed: true,
    },
  ]);
  const isMobile = checkIsMobile();
  return (
    <div className="flex flex-col gap-4 px-2 pb-20 md:px-8 md:max-w-5xl">
      {completedAssessments.map((item, index) => (
        <div
          className="bg-white py-3 md:py-4 rounded-4xl flex flex-col gap-2 md:gap-4"
          key={index}>
          <div className="w-full flex flex-row justify-between items-center px-4 md:px-8">
            <div className="flex flex-col">
              {!isMobile && item.missed ? (
                <div className="bg-[#EA7676] rounded-full w-fit px-3 py-1 flex flex-row gap-1 items-center">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 16.5C6.90278 16.5 5.86806 16.2917 4.89583 15.875C3.92361 15.4583 3.07292 14.8854 2.34375 14.1562C1.61458 13.4271 1.04167 12.5764 0.625 11.6042C0.208333 10.6319 0 9.59722 0 8.5C0 7.38889 0.208333 6.35069 0.625 5.38542C1.04167 4.42014 1.61458 3.57292 2.34375 2.84375C3.07292 2.11458 3.92361 1.54167 4.89583 1.125C5.86806 0.708333 6.90278 0.5 8 0.5C9.11111 0.5 10.1493 0.708333 11.1146 1.125C12.0799 1.54167 12.9271 2.11458 13.6562 2.84375C14.3854 3.57292 14.9583 4.42014 15.375 5.38542C15.7917 6.35069 16 7.38889 16 8.5C16 9.59722 15.7917 10.6319 15.375 11.6042C14.9583 12.5764 14.3854 13.4271 13.6562 14.1562C12.9271 14.8854 12.0799 15.4583 11.1146 15.875C10.1493 16.2917 9.11111 16.5 8 16.5ZM8 15C8.76389 15 9.48611 14.875 10.1667 14.625C10.8472 14.375 11.4653 14.0278 12.0208 13.5833L2.91667 4.47917C2.47222 5.03472 2.125 5.65278 1.875 6.33333C1.625 7.01389 1.5 7.73611 1.5 8.5C1.5 10.3056 2.13194 11.8403 3.39583 13.1042C4.65972 14.3681 6.19444 15 8 15ZM13.0833 12.5208C13.5278 11.9653 13.875 11.3472 14.125 10.6667C14.375 9.98611 14.5 9.26389 14.5 8.5C14.5 6.69444 13.8681 5.15972 12.6042 3.89583C11.3403 2.63194 9.80556 2 8 2C7.23611 2 6.51389 2.125 5.83333 2.375C5.15278 2.625 4.53472 2.97222 3.97917 3.41667L13.0833 12.5208Z"
                      fill="white"
                    />
                  </svg>
                  <p className="text-sm text-white">You have missed to complete this quiz</p>
                </div>
              ): null}
              <p
                className={`text-xs bg-[#7B808E] text-white w-fit px-1 rounded-full py-px ${
                  !isMobile && "hidden"
                }`}>
                COMPLETED
              </p>
              <h1 className="text-base md:text-lg text-secondary font-bold">
                {item.title}
              </h1>
              <p
                className={`text-sm md:text-base text-gray-500 font-medium ${
                  isMobile ? "hidden" : ""
                }`}>
                Course : {item.courseTitle}
              </p>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                {item.summary}
              </p>
              <div className="flex flex-row items-center border border-gray-400 rounded-lg w-fit h-fit gap-2 px-4 py-2 hover:cursor-pointer hover:bg-gray-100 mt-2">
                <img src={quiz} alt="" />
                <p className="text-xs md:text-sm md:font-medium text-secondary">
                  Review Quiz Submission
                </p>
              </div>
            </div>
            <div className="hidden md:flex flex-col text-center">
              <Progress
                percent={item.completed}
                type="circle"
                strokeColor="#379D46"
                format={(percent) => `${percent} Points`}
                size="small"
              />
              <p className="text-xs text-secondary font-medium">
                Exceeds <br /> Expectation
              </p>
            </div>
          </div>

          {/* divider */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>

          <div className="w-full flex flex-row justify-between px-4 md:px-8">
            {isMobile ? (
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-1 md:gap-2 items-center">
                  <img
                    src={twoUserCircles}
                    className={`${isMobile && "w-6"}`}
                    alt="Users"
                  />
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    {item.completed} Submitted
                  </p>
                  <div className="bg-gray-400 w-[1px] h-3 mt-px"></div>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    Due Date : {item.completedDate}
                  </p>
                </div>
                <button className="text-xs text-gray-500 font-medium">
                  View Quiz
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 md:items-center">
                  <p className="h-fit w-fit py-px md:py-px md:px-3 px-2 bg-gray-400 text-xs md:text-sm text-white rounded-full whitespace-nowrap">
                    {item.timeLeft}
                  </p>

                  <p className="text-xs md:text-base text-gray-500 font-medium">
                    Due Date : {item.dueDate}
                  </p>
                </div>
                <div className="flex flex-row gap-1 md:gap-2 items-center">
                  <img
                    src={twoUserCircles}
                    className={`${isMobile && "w-8"}`}
                    alt="Users"
                  />
                  <p className="text-xs md:text-base text-gray-500 font-medium">
                    Responded {item.responded}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Completed;
