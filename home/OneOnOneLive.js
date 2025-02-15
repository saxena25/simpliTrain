import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link, useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import CourseItemCard from "../../components/shared-components/CourseItemCard";
import moment from "moment";

const OneOnOneLive = ({ data }) => {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [oneOnOneData, setOneOnOneData] = useState(data || []);
  // console.log("OneOnOneLive: ", data);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center mb-3">
        <h5 className="text-2xl md:text-3xl font-bold ">
          One on{isMobile && <br />} One Live Course
        </h5>
        <button
          className="w-20 flex flex-row justify-between items-center"
          onClick={() =>
            navigate("/courses", { state: { BatchMode: "ONLINE" } })
          }>
          <span className="text-lg font-medium text-text">See All</span>
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div
        className={`md:grid md:grid-cols-3 gap-10 py-5 md:py-10 ${
          isMobile &&
          "flex flex-row gap-5 overflow-x-auto scroll-smooth custom-scroll"
        }`}>
        {oneOnOneData.slice(0, 3).map((item, index) => (
          <Link
            to={"/courses/courseid"}
            key={item?.id}
            className={`${isMobile && "shrink-0 w-80"}`}>
            <div className={`relative`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-medium bg-gray-200 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
                  {item?.subCategoryName}
                </span>
                <span className="text-[10px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
                  {
                    index == 1
                      ? "Last 2 Seats left for batch 1" //   Next Start Date batch  10 seat left
                      : index == 2
                      ? "Batches are filling faster" //   Next Start Date batch  more then 10 seats
                      : index == 3
                      ? "Last day to register for Batch 1" //   Next Start Date batch  one day left
                      : index == 4
                      ? ""
                      : "Popular" //  Popular Cat
                  }
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
                  <p className="text-sm font-medium">{item?.createdBy?.name}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">{item?.averageRating}</span> ({item?.totalRatings})
                  </p>
                </div>
              </div>
              <div className="py-2 px-3 bg-gray-4 rounded-full mt-2 w-fit">
                {index == 1 ? (
                  <p
                    className={`text-text text-sm font-medium  ${
                      isMobile && "whitespace-nowrap"
                    }`}>
                    Next Batch : {moment(item?.startDate).format("DD MMM YY")} -{" "}
                    {moment(item?.endDate).format("DD MMM YY")}
                  </p>
                ) : index == 3 ? (
                  <div className="relative flex items-center space-x-2">
                    <div className="shrink-0">
                      <svg
                        width="17"
                        height="18"
                        viewBox="0 0 17 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.00065 17.3346C6.54232 17.3346 6.14996 17.1714 5.82357 16.845C5.49718 16.5187 5.33398 16.1263 5.33398 15.668H8.66732C8.66732 16.1263 8.50412 16.5187 8.17774 16.845C7.85135 17.1714 7.45899 17.3346 7.00065 17.3346ZM12.0007 9.83463V7.33463H9.50065V5.66797H12.0007V3.16797H13.6673V5.66797H16.1673V7.33463H13.6673V9.83463H12.0007ZM0.333984 14.8346V13.168H2.00065V7.33463C2.00065 6.18186 2.34787 5.15755 3.04232 4.26172C3.73676 3.36589 4.63954 2.77908 5.75065 2.5013V1.91797C5.75065 1.57075 5.87218 1.27561 6.11523 1.03255C6.35829 0.789497 6.65343 0.667969 7.00065 0.667969C7.34787 0.667969 7.64301 0.789497 7.88607 1.03255C8.12912 1.27561 8.25065 1.57075 8.25065 1.91797V2.5013C8.4451 2.55686 8.63607 2.61589 8.82357 2.67839C9.01107 2.74089 9.18815 2.82075 9.35482 2.91797C9.14649 3.11241 8.95899 3.32422 8.79232 3.55339C8.62565 3.78255 8.47982 4.02908 8.35482 4.29297C8.14649 4.19575 7.92774 4.12283 7.69857 4.07422C7.4694 4.02561 7.23676 4.0013 7.00065 4.0013C6.08398 4.0013 5.29926 4.32769 4.64648 4.98047C3.99371 5.63325 3.66732 6.41797 3.66732 7.33463V13.168H10.334V10.8346C10.584 10.9874 10.8479 11.1124 11.1257 11.2096C11.4034 11.3069 11.6951 11.3832 12.0007 11.4388V13.168H13.6673V14.8346H0.333984Z"
                          fill="#3A3D41"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      {/* On click add to wishlist  */}
                      <p className="text-xs font-medium text-text">
                        {"No Batches Available, Notify Me "}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {"Be the first to know when a new batch is scheduled."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-text text-sm font-medium">
                    Next Batch : {moment(item?.startDate).format("DD MMM YY")} -{" "}
                    {moment(item?.endDate).format("DD MMM YY")}
                  </p>
                )}
              </div>
              <p className="mt-2 text-sm font-semibold">
                <span className="text-xs text-gray-500">Starts From</span> ₹{" "}
                {item?.discountedPrice}/-
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OneOnOneLive;
