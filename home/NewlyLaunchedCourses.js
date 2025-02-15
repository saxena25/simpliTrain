import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link, useNavigate } from "react-router-dom";
import { Button, Carousel } from "antd";
import { checkIsMobile } from "../../utils/helpers";
import { data } from "autoprefixer";
import CourseItemCard from "../../components/shared-components/CourseItemCard";
import moment from "moment";

const NewlyLaunchedCourses = ({ courses }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [newAddedCourses, setNewAddedCourses] = useState(courses || []);
  // console.log("newAddedCourses : ", courses)

  const goToPrev = () => {
    carouselRef.current.prev();
    setCurrentSlide(currentSlide - 1);
  };

  const goToNext = () => {
    carouselRef.current.next();
    setCurrentSlide(currentSlide + 1);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div
        className={`flex flex-row md:flex-col justify-between items-start gap-6 ${
          isMobile && "relative"
        }`}>
        <h5 className="text-2xl md:text-6xl font-bold ">
          Newly{isMobile && <br />} Launched Courses
        </h5>
        <button
          href="#"
          className={`rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            isMobile && "absolute bottom-0 right-0"
          }`}
          onClick={() => navigate("/courses")}>
          Explore all
        </button>
        {!isMobile && (
          <div className="flex flex-row justify-center items-end gap-5">
            <div className="w-10 flex items-center">
              <Button
                index="text"
                onClick={goToPrev}
                shape="circle"
                className="border-none"
                icon={<ChevronLeftIcon className="size-7 text-dark" />}
              />
            </div>
            <div className="w-10 flex items-center">
              <Button
                index="text"
                onClick={goToNext}
                shape="circle"
                className="border-none"
                icon={<ChevronRightIcon className="size-7 text-dark" />}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex col-span-2 w-full">
        <div className="w-full">
          <Carousel
            ref={carouselRef}
            // dots
            // arrows
            draggable
            // autoplay
            // autoplaySpeed={3000}
            slidesToShow={isMobile ? 1 : 3}
            slidesToScroll={1}
            style={{ height: "100%" }}
            id={"review-slider"}>
            {newAddedCourses.map((item, index) => {
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

              const lowestPrice = Math.min(
                ...item.courseBatches
                  .map((batch) => batch.discountedPrice)
                  .filter((price) => price !== null && price !== undefined)
              );
              // console.log("item Id: ", item.id)
              return (
                <div className="p-5" key={`${item?.id}`}>
                  <Link to={"/courses/courseid"}>
                    <div className={`relative`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-medium bg-gray-200 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
                          {item?.subCategoryName}
                        </span>
                        <span className="text-[10px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
                          {batchStatus}
                          {/* {
                            index == 1
                              ? "Last 2 Seats left for batch 1" //   Next Start Date batch  10 seat left
                              : index == 2
                              ? "Batches are filling faster" //   Next Start Date batch  more then 10 seats
                              : index == 3
                              ? "Last day to register for Batch 1" //   Next Start Date batch  one day left
                              : index == 4
                              ? ""
                              : "Popular" //  Popular Cat
                          } */}
                        </span>
                      </div>
                      <div className={`h-44 bg-gray-200 rounded-3xl `}></div>
                      <h2 className="mt-4 text-base md:text-sm font-bold">
                        {item?.title}
                      </h2>
                      <p className="mt-2 text-xs font-semibold text-gray-600 ">
                        {item?.courseBatches.length > 0
                          ? item?.courseBatches.map((ele, index) =>
                              ele.batchMode === null || ele.batchMode === "" ? (
                                ""
                              ) : (
                                <span key={index}>
                                  {ele?.batchMode} <span>|</span>
                                </span>
                              )
                            )
                          : "No Batch Mode"}
                      </p>
                      <div className="flex flex-row items-center mt-2">
                        <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
                        <div className="ml-2 flex flex-row gap-2">
                          <p className="text-sm font-medium">
                            {item?.instructor?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">
                              {item?.instructor?.averageRating}
                            </span>{" "}
                            ({item?.instructor?.totalRatings})
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
                        {/* {index == 1 ? (
                        <p
                          className={`text-text text-sm font-medium  ${
                            isMobile && "whitespace-nowrap"
                          }`}>
                          {"Next Batch : May 24 - Aug 24 | +2 More Batches"}
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
                            
                            <p className="text-xs font-medium text-text">
                              {"No Batches Available, Notify Me "}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {
                                "Be the first to know when a new batch is scheduled."
                              }
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-text text-sm font-medium">
                          {"Next Batch : May 24 - Aug 24"}
                        </p>
                      )} */}
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        <span className="text-xs text-gray-500">
                          Starts From
                        </span>{" "}
                        {lowestPrice ? `₹${lowestPrice}/-` : "Not Available"}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default NewlyLaunchedCourses;
