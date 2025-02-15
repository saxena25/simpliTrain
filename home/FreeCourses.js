import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link, useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import CourseItemCard from "../../components/shared-components/CourseItemCard";
import moment from "moment";

const FreeCourses = ({ data }) => {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [allFreeCourseList, setAllFreeCourseList] = useState(data || []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center md:mb-3">
        <h5 className="text-2xl md:text-3xl font-bold ">
          Get Started with Free Courses
        </h5>
        <button
          className="w-20 flex flex-row justify-between items-center"
          onClick={() => navigate("/courses")}>
          <span className="text-lg font-medium text-text">See All</span>
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div
        className={`md:grid md:grid-cols-3 md:gap-10 py-10 ${
          isMobile &&
          "flex flex-row gap-5 overflow-x-auto scroll-smooth custom-scroll"
        }`}>
        {allFreeCourseList.slice(0, 3).map((item, index) => {
          const sortedBatches = Array.isArray(item?.courseBatches)
          ? [...item.courseBatches].filter((batch) => batch.startDate)
          : [];

          const firstBatch = sortedBatches[0]; // First batch (earliest)
          const nextBatch = sortedBatches[1]; // Next upcoming batch (if exists)
          const remainingBatches = sortedBatches.length - 1; // Count remaining batches

          let batchStatus = "Popular";

          if (nextBatch) {
            const seatsLeft = nextBatch?.remaningSeatas || 0;
            const batchStartDate = moment(nextBatch.startDate);
            const today = moment();

            if (seatsLeft <= 10) {
              batchStatus = "Last 2 Seats left for batch 1";
            } else if (seatsLeft > 10) {
              batchStatus = "Batches are filling faster";
            }

            // Check if today is one day before batch start
            if (batchStartDate.diff(today, "days") === 1) {
              batchStatus = "Last day to register for Batch 1";
            }
          }

          return (
            <Link
              to={"/courses/courseid"}
              key={index + 1}
              className={`${isMobile && "shrink-0 w-80"}`}>
              <div className={`relative`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-medium bg-gray-200 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
                    {item?.subCategoryName}
                  </span>
                  <span className="text-[10px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
                    {batchStatus}
                  </span>
                </div>
                <div className={`h-44 bg-gray-200 rounded-3xl `}></div>
                <h2 className="mt-4 text-base md:text-sm font-bold">
                  {item?.title}
                </h2>
                <p className="mt-2 text-xs font-semibold text-gray-600">
                  {item?.batchMode}
                </p>
                <div className="flex flex-row items-center mt-2">
                  <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
                  <div className="ml-2 flex flex-row gap-2">
                    <p className="text-sm font-medium">Rohan Joshi</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">4.8</span> (200)
                    </p>
                  </div>
                </div>
                <div className="py-2 px-3 bg-gray-4 rounded-full mt-2 w-fit">
                  {firstBatch
                    ? `Next Batch : ${moment(firstBatch.startDate).format(
                        "MMM YY"
                      )} - ${moment(firstBatch.endDate).format("MMM YY")}`
                    : "No Upcoming Batches"}{" "}
                  {nextBatch && ` | +${sortedBatches.length - 1} More Batches`}
                </div>
                <p className="mt-2 text-sm font-semibold">FREE</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FreeCourses;
