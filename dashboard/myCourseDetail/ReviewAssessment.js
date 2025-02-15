import React from "react";
import { useState } from "react";
import twoUserCircles from "../../../assets/svgs/twoUserCircles.svg";
import { checkIsMobile } from "../../../utils/helpers";

function ReviewAssessment() {
  const [reviewData, setReviewData] = useState([
    {
      title: "UX for Beginners Quiz",
      courseTitle: "Course Title",
      summary: "Quiz | Chapter 3 | Duration : 60mins | Need 80 points to pass",
      timeLeft: "2 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: 25,
      type: "quiz",
      dateLeft: "June 8, 2023",
    },
    {
      title: "Programming with Java Primary Assessment",
      courseTitle: "Course Title",
      summary:
        "Assessment | Chapter 5 | Duration : 60mins | Need 80 points to pass",
      timeLeft: "3 Days Left",
      dueDate: "12 Sep 2024, 6pm",
      responded: "12",
      dateLeft: "June 8, 2023",
    },
  ]);
  const isMobile = checkIsMobile();

  return (
    <div className="flex flex-col gap-4 px-2 pb-20 md:px-8 md:max-w-5xl">
      {reviewData.map((item, index) => (
        <div
          className="bg-white py-3 md:py-4 rounded-4xl flex flex-col gap-2 md:gap-4"
          key={index}>
          <div className="w-full flex flex-col md:flex-row justify-between px-4 md:px-8">
            <div className="flex flex-col">
              <p className="bg-black text-xs text-white h-fit w-fit px-2 py-px md:py-1 md:px-3 rounded-full">
                Submitted for Review
              </p>
              <h1 className="text-base md:text-lg text-secondary font-bold">
                {item.title}
              </h1>
              <p
                className={`text-sm md:text-base text-gray-500 font-medium ${
                  isMobile && "hidden"
                }`}>
                Course : {item.courseTitle}
              </p>
              <p className="text-sm md:text-base text-gray-500 font-medium">
                {item.summary}
              </p>
            </div>
            <div className="content-end mt-2 md:mt-0">
              <button
                className={`flex flex-row gap-1 border border-b text-sm md:text-base py-2 rounded-lg px-6`}>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.5 11H8.5V9H9.5C9.78333 9 10.0208 8.90417 10.2125 8.7125C10.4042 8.52083 10.5 8.28333 10.5 8V7C10.5 6.71667 10.4042 6.47917 10.2125 6.2875C10.0208 6.09583 9.78333 6 9.5 6H7.5V11ZM8.5 8V7H9.5V8H8.5ZM11.5 11H13.5C13.7833 11 14.0208 10.9042 14.2125 10.7125C14.4042 10.5208 14.5 10.2833 14.5 10V7C14.5 6.71667 14.4042 6.47917 14.2125 6.2875C14.0208 6.09583 13.7833 6 13.5 6H11.5V11ZM12.5 10V7H13.5V10H12.5ZM15.5 11H16.5V9H17.5V8H16.5V7H17.5V6H15.5V11ZM6.5 16.5C5.95 16.5 5.47917 16.3042 5.0875 15.9125C4.69583 15.5208 4.5 15.05 4.5 14.5V2.5C4.5 1.95 4.69583 1.47917 5.0875 1.0875C5.47917 0.695833 5.95 0.5 6.5 0.5H18.5C19.05 0.5 19.5208 0.695833 19.9125 1.0875C20.3042 1.47917 20.5 1.95 20.5 2.5V14.5C20.5 15.05 20.3042 15.5208 19.9125 15.9125C19.5208 16.3042 19.05 16.5 18.5 16.5H6.5ZM6.5 14.5H18.5V2.5H6.5V14.5ZM2.5 20.5C1.95 20.5 1.47917 20.3042 1.0875 19.9125C0.695833 19.5208 0.5 19.05 0.5 18.5V4.5H2.5V18.5H16.5V20.5H2.5Z"
                    fill="#363A49"
                  />
                </svg>
                <span>View Assignment</span>
              </button>
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
                    Due Date : {item.dateLeft}
                  </p>
                </div>
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

export default ReviewAssessment;
