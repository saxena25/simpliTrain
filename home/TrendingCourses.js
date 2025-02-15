import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link, useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import moment from "moment";

const TrendingCourses = ({ data }) => {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [trendingCourses, setTrendingCourses] = useState(data || []);
  const [selectedId, setSelectedId] = useState(trendingCourses[0].id);
  // console.log("trending Data: ", trendingCourses)
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center mb-3">
        <h5 className="text-2xl md:text-3xl font-bold ">Trending Courses</h5>
        <button
          className="w-20 flex flex-row justify-between items-center"
          onClick={() => navigate("/courses")}>
          <span className="text-lg font-medium text-text">See All</span>
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div className="flex flex-row gap-5">
        {trendingCourses.map((item, index) => (
          <button
            className={`text-sm font-medium border py-1 px-2 rounded-full ${
              selectedId === item?.id
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            }`}
            key={item?.id}
            onClick={() => setSelectedId(item?.id)}>
            {item?.name}
          </button>
        ))}
      </div>

      <div
        className={`md:grid md:grid-cols-3 gap-10 py-5 md:py-10 ${
          isMobile &&
          "flex flex-row gap-5 overflow-x-auto scroll-smooth custom-scroll"
        }`}>
        {trendingCourses
          .filter((item) => item.id === selectedId)
          .map((course) =>
            course?.courses.slice(0, 3).map((ele, index) => {
              const sortedBatches = Array.isArray(ele?.courseBatches)
                ? [...ele.courseBatches].filter((batch) => batch.startDate)
                : [];

              const firstBatch = sortedBatches[0]; // First batch (earliest)
              const nextBatch = sortedBatches[1]; // Next upcoming batch (if exists)

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

              const lowestPrice = Math.min(
                ...ele.courseBatches
                  .map((batch) => batch.discountedPrice)
                  .filter((price) => price !== null && price !== undefined)
              );

              const availableBatchModes = ele?.courseBatches
                ?.map((batch) => batch.batchMode)
                .filter((mode) => mode !== null && mode !== undefined);

              const uniqueBatchModes = [...new Set(availableBatchModes)].join(
                " | "
              );

              return (
                <Link
                  to={"/courses/courseid"}
                  key={ele.id}
                  className={`${isMobile && "shrink-0 w-80"}`}>
                  <div className={`relative`}>
                    <div className="flex justify-between items-center">
                      {ele?.subCategoryName && (
                        <span className="text-[10px] font-medium bg-gray-200 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
                          {ele?.subCategoryName}
                        </span>
                      )}

                      <span className="text-[10px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
                        {batchStatus}
                      </span>
                    </div>
                    <div className={`h-44 bg-gray-200 rounded-3xl `}></div>
                    <h2 className="mt-4 text-base md:text-sm font-bold">
                      {ele?.title}
                    </h2>
                    <p className="mt-2 text-xs font-semibold text-gray-600">
                      {uniqueBatchModes || "No Batch Mode Available"}
                    </p>
                    <div className="flex flex-row items-center mt-2">
                      <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
                      <div className="ml-2 flex flex-row gap-2">
                        <p className="text-sm font-medium">
                          {ele?.instructor?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">
                            {ele?.instructor?.ratingDetails?.averageRating}
                          </span>{" "}
                          ({ele?.instructor?.ratingDetails?.totalRatings})
                        </p>
                      </div>
                    </div>
                    <div className="py-2 px-3 text-sm font-medium bg-gray-4 rounded-full mt-2 w-fit">
                      {firstBatch
                        ? `Next Batch : ${moment(firstBatch.startDate).format(
                            "MMM YY"
                          )} - ${moment(firstBatch.endDate).format("MMM YY")}`
                        : "No Upcoming Batches"}{" "}
                      {nextBatch &&
                        ` | +${sortedBatches.length - 1} More Batches`}
                    </div>
                    <p className="mt-2 text-sm font-semibold">
                      <span className="text-xs text-gray-500">Starts From</span>{" "}
                      {lowestPrice ? `₹${lowestPrice}/-` : "Not Available"}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
      </div>
    </div>
  );
};

export default TrendingCourses;
