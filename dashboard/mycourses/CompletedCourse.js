import React, { useState } from "react";
import groupCircles from "../../../assets/svgs/groupCircles.svg";
import { Steps, Popover, Progress } from "antd";
import { checkIsMobile } from "../../../utils/helpers";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const completedCourseData = [
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    details: "9 Chapters | 1hour 30min | 48hrs 45mins",
    classMode: "Offline",
    completed: "100",
  },
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    details: "12 Chapters | From 8 Jun - 8 Aug | 48hrs 45mins",
    classMode: "Offline",
    completed: "90",
  },
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    details: "12 Chapters | From 8 Jun - 8 Aug | 48hrs 45mins",
    classMode: "Offline",
    completed: "50",
  },
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    details: "12 Chapters | From 8 Jun - 8 Aug | 48hrs 45mins",
    classMode: "Offline",
    completed: "100",
  },
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    details: "12 Chapters | From 8 Jun - 8 Aug | 48hrs 45mins",
    classMode: "Offline",
    completed: "100",
  },
];

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }>
    {dot}
  </Popover>
);

function CompletedCourse({ batches }) {
  const isMobile = checkIsMobile();
  const [completedBatches, setCompletedBatches] = useState(
    batches?.completedBatches
  );
  const navigate = useNavigate();
  const getCourseDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start; // Difference in milliseconds
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Convert to days

    if (days === 1) return "1 Day Course";
    if (days <= 7) return "1 Week Course";
    if (days < 30) return `${Math.ceil(days / 7)} Weeks Course`;
    if (days < 365) return `${Math.floor(days / 30)} Months Course`;
    return "1 Year Course";
  };

  const calculateProgress = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
      return null; // Return null instead of a string
    }

    const totalDuration = end - start;
    const progressTime = today - start;
    let percentage = (progressTime / totalDuration) * 100;

    return Math.min(Math.max(percentage, 0), 100).toFixed(0);
  };

  return (
    <div className="w-full flex flex-col gap-4 overflow-y-auto md:px-14 mt-6 h-screen">
      {completedBatches.length > 0 ? (
        <h1 className="text-base text-secondary font-medium md:mb-4">
          You have {completedBatches.length} active courses
        </h1>
      ) : (
        <h1>!Oops No Active batches found</h1>
      )}

      {completedBatches.map((item, index) => {
        const progress = calculateProgress(item?.startDate, item?.endDate);
        const chapters =
          item?.batchCurriculumDetails
            ?.map((detail) => detail.order)
            .sort((a, b) => a - b) || [];

        const chapterCount = chapters.length;
        return (
          <div
            className="w-full flex flex-row justify-between gap-4  relative border shadow-lg p-3 md:p-6 rounded-xl"
            key={item.id}>
            <div className="flex flex-row gap-4 items-center">
              <div className="bg-gray-100 w-28 h-28 rounded-2xl"></div>
              <div className="w-full flex flex-row gap-6 items-center">
                <div className="flex flex-col gap-2 md:gap-4  w-full">
                  <div className="flex flex-row flex-wrap gap-1 md:gap-2">
                    {item?.batchMode === null ||
                    item?.batchMode === undefined ? (
                      <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                        !No BatchMode
                      </p>
                    ) : (
                      <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                        {item?.batchMode}
                      </p>
                    )}

                    {item?.batchMode === null ||
                    item?.batchMode === undefined ? (
                      ""
                    ) : (
                      <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                        {item?.batchMode === "ONLINE" ||
                        item?.batchMode === "CLASSROOM"
                          ? "Group Class"
                          : "One on One"}
                      </p>
                    )}

                    {item?.startDate === null ||
                    item?.startDate === undefined ||
                    item?.endDate === null ||
                    item?.endDate === undefined ? (
                      ""
                    ) : (
                      <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                        {getCourseDuration(item?.startDate, item?.endDate)}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-base md:text-xl text-secondary font-medium leading-tight md:leading-none">
                      {item.title}
                    </h1>
                    {/* <p className="text-sm text-primary">{item.classType}</p> */}
                  </div>
                  <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                    {isMobile && (
                      <p className="text-xs text-primary">{item.details}</p>
                    )}
                    <div className="flex flex-row gap-1">
                      <div className="flex flex-row gap-1">
                        <div className="w-5 h-5 bg-gray-100 rounded-full"></div>
                        <p className="text-xs text-primary md:mr-4">
                          {item?.createdBy?.name}&nbsp; | &nbsp;{chapterCount}{" "}
                          Chapters&nbsp; | &nbsp;From{" "}
                          {`${
                            item?.startDate === null ||
                            item?.startDate === undefined ||
                            item?.endDate === null ||
                            item?.endDate === undefined
                              ? "!Date Not Found"
                              : `${moment(item?.startDate).format(
                                  "DD MMM"
                                )} - ${moment(item?.endDate).format("DD MMM")}`
                          }`}{" "}
                        </p>
                      </div>
                      {isMobile ? (
                        <div className="flex flex-row items-center ">
                          <img src={groupCircles} alt="" />
                          <p className="text-sm text-primary">
                            {item?.createdBy?.name}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-primary">{item.details}</p>
                      )}
                    </div>
                  </div>

                  {/* {progress !== null && (
                    <div className="w-full">
                      <div
                        aria-hidden="true"
                        className="flex flex-row gap-4 w-full items-center">
                        <div className="overflow-hidden w-4/6  h-2 rounded-full bg-gray-200">
                          <div
                            style={{ width: `${progress}%` }}
                            className="h-2 rounded-full bg-black"
                          />
                        </div>
                        <span className="whitespace-nowrap">
                          {progress}% Completed
                        </span>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {!isMobile && (
              <div className="flex flex-row gap-8">
                <div className="w-[2px] h-36 m-auto bg-gray-200"></div>
                <div className="flex flex-col gap-1 pt-16 pr-5 w-full justify-start">
                  <div className="flex flex-row items-center gap-1 ">
                    <img src={groupCircles} alt="" />
                    <p className="text-sm text-primary">
                      {item?.enrolledCount} Enrolled
                    </p>
                  </div>
                  <button
                    className="text-base font-medium text-secondary text-start"
                    onClick={() => navigate(`/dashboard/courses/${item?.id}`)}>
                    Course Details &#62;
                  </button>
                  <button
                    className="text-sm font-medium text-white bg-gray-500 px-2 py-1 rounded-md hover:text-black"
                    onClick={() =>
                      navigate("/rating_reviews")
                    }>
                    Review This Course
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CompletedCourse;
