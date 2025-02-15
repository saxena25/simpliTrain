import moment from "moment/moment";
import React from "react";

function CategoryVideo({ data, categoryId }) {
  // console.log("category Video: ",data, categoryId)
  return (
    <>
      <div>
        <h2 className="text-base font-semibold mb-4">Most Popular Courses</h2>
        <div className="flex flex-col gap-5">
          {data
            .filter((ele) => ele.id === categoryId)
            .slice(0, 5)
            .map((item) =>
              item?.courses.length > 0 ? (
                item?.courses.map((ele, index) => {
                  const batches = ele?.courseBatches || [];

                  // Step 1: Count the number of batches
                  const totalBatches = batches.length;

                  // Step 2: Find the next available batch
                  const nextBatch = batches
                    .filter((batch) =>
                      moment(batch.startDate).isAfter(moment())
                    )
                    .sort((a, b) =>
                      moment(a.startDate).diff(moment(b.startDate))
                    )[0];

                  // Step 3: Group all batch modes
                  const batchModes = Array.from(
                    new Set(batches.map((batch) => batch.batchMode))
                  ).join(" | ");

                  return (
                    <div
                      className=" px-4"
                      key={`${ele.id || ele.title}-${index}`}>
                      <div className="h-44 bg-gray-100 rounded-3xl relative">
                        <span className="text-xs font-medium bg-gray-100 border border-gray-400 py-px px-2 rounded-full absolute top-4 left-5">
                          Design
                        </span>
                        <span className="text-xs font-medium bg-gray-500 text-white py-px px-2 rounded-full absolute top-4 right-5">
                          Popular
                        </span>
                        <span className="text-xs font-medium text-gray-500 absolute bottom-3 left-5">
                          {nextBatch
                            ? `Next Batch From ${moment(
                                nextBatch.startDate
                              ).format("DD MMM")}`
                            : "No Upcoming Batches"}
                          {totalBatches > 0
                            ? ` | ${totalBatches} Batches Available`
                            : ""}
                        </span>
                      </div>

                      <h2 className="mt-4 text-sm font-bold">{ele?.title}</h2>
                      <p className="mt-2 text-xs font-semibold text-gray-600">
                      {batchModes || "!No BatchMode Found"}
                      </p>

                      <div className="flex flex-row items-center mt-2">
                        <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
                        <div className="ml-2 flex flex-row gap-2">
                          <p className="text-sm font-medium">
                            {ele?.instructor?.name}
                          </p>
                          <div className="text-sm text-gray-500 flex flex-row items-center gap-1">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M6.47596 10.0849L3.31961 11.971C3.17847 12.048 3.04054 12.0801 2.90582 12.0672C2.7711 12.0544 2.65241 12.0095 2.54977 11.9325C2.44712 11.8555 2.37014 11.7497 2.31882 11.615C2.26749 11.4802 2.26108 11.3423 2.29957 11.2012L3.12715 7.67916L0.336478 5.3119C0.221002 5.20925 0.150433 5.09057 0.124772 4.95585C0.0991105 4.82113 0.105526 4.68961 0.144018 4.56131C0.18251 4.433 0.253079 4.32715 0.355724 4.24375C0.458369 4.16035 0.586676 4.11223 0.740644 4.0994L4.39739 3.77222L5.84084 0.423412C5.90499 0.282275 5.99481 0.176422 6.11028 0.105853C6.22576 0.0352844 6.34765 0 6.47596 0C6.60426 0 6.72615 0.0352844 6.84163 0.105853C6.95711 0.176422 7.04692 0.282275 7.11107 0.423412L8.55452 3.79146L12.2113 4.0994C12.3652 4.11223 12.4935 4.16355 12.5962 4.25337C12.6988 4.34318 12.7694 4.45224 12.8079 4.58055C12.8464 4.70886 12.8496 4.83716 12.8175 4.96547C12.7854 5.09378 12.7117 5.20925 12.5962 5.3119L9.82476 7.67916L10.6523 11.2012C10.6908 11.3423 10.6844 11.4802 10.6331 11.615C10.5818 11.7497 10.5048 11.8555 10.4021 11.9325C10.2995 12.0095 10.1808 12.0544 10.0461 12.0672C9.91137 12.0801 9.77344 12.048 9.6323 11.971L6.47596 10.0849Z"
                                fill="#5F6368"
                              />
                            </svg>
                            <span className="font-semibold">4.8</span> (200)
                          </div>
                        </div>
                      </div>

                      <p className="mt-2 text-sm font-semibold">
                        <span className="text-xs text-gray-500">
                          Starts From
                        </span>{" "}
                        ₹ 9,999/-
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>!No Courses Found</p>
              )
            )}
        </div>
      </div>
    </>
  );
}

export default CategoryVideo;
