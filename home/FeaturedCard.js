import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";

function FeaturedCard({ data }) {
    const isMobile = checkIsMobile();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5 md:py-10 md:h-[773px]">
      {data?.length > 0 ? (
        (isMobile ? data.slice(0, 2) : data.slice(0, 5)).map(
          (item, index) => {
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

            return index == 0 ? (
              <div className="md:row-span-2" key={item?.id}>
                <div className="relative h-60 md:h-full flex flex-col bg-gray-200 rounded-3xl justify-between items-start">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-medium bg-gray-200 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
                      {item?.categoryName}
                    </span>
                    <span className="text-[10px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
                      {item?.subCategoryName}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="mt-4 text-xl md:text-4xl md:mr-24 font-bold">
                      {item?.title}
                    </h2>
                    {!isMobile && (
                      <>
                        <p className="mt-2 text-xs font-semibold text-gray-600">
                          {item?.batchMode}
                        </p>
                        <div className="flex flex-row items-center mt-2">
                          <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
                          <div className="ml-2 flex flex-row gap-2">
                            <p className="text-sm font-medium">
                              {item?.createdBy?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-semibold">4.8</span> (200)
                            </p>
                          </div>
                        </div>
                        <div className="py-2 px-3 bg-gray-4 rounded-full mt-2">
                          <p className="text-text text-sm font-medium">
                            {firstBatch
                              ? `Next Batch : ${moment(
                                  firstBatch.startDate
                                ).format("MMM YY")} - ${moment(
                                  firstBatch.endDate
                                ).format("MMM YY")}`
                              : "No Upcoming Batches"}{" "}
                            {nextBatch &&
                              ` | +${sortedBatches.length - 1} More Batches`}
                          </p>
                        </div>
                        <p className="mt-2 text-sm font-semibold">
                          {item?.discountedPrice === null ||
                          item?.discountedPrice === "" ? (
                            "Price Will Update Soon"
                          ) : (
                            <>
                              <span className="text-xs text-gray-500">
                                Starts From
                              </span>{" "}
                              ₹ {item?.discountedPrice}/-
                            </>
                          )}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link to={"/courses/courseid"} key={index + 1}>
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
                      <p className="text-sm font-medium">
                        {item?.createdBy?.name}
                      </p>
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
                    {nextBatch &&
                      ` | +${sortedBatches.length - 1} More Batches`}
                  </div>
                  <p className="mt-2 text-sm font-semibold">
                    {item?.discountedPrice === null ||
                    item?.discountedPrice === "" ? (
                      "Price Will Update Soon"
                    ) : (
                      <>
                        <span className="text-xs text-gray-500">
                          Starts From
                        </span>{" "}
                        ₹ {item?.discountedPrice}/-
                      </>
                    )}
                  </p>
                </div>
              </Link>
            );
          }
        )
      ) : (
        <p>No Courses Available</p>
      )}
    </div>
  );
}

export default FeaturedCard;
