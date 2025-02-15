import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link, useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import CourseItemCard from "../../components/shared-components/CourseItemCard";
import moment from "moment";
import FeaturedCard from "./FeaturedCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FeaturedCourses = ({ courses }) => {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const tabsData = [
    { name: "All", href: "#", current: true },
    { name: "Online", href: "#", current: false },
    { name: "Classroom", href: "#", current: false },
    { name: "One on One", href: "#", current: false },
  ];
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );
  const [featuredCoursesData, setFeaturedCoursesData] = useState(courses || []);
  const [groupedData, setGroupedData] = useState([]);
  const [onlineData, setOnlineData] = useState(courses?.ONLINE || []);
  const [classRoomData, setClassRoomData] = useState(courses?.CLASSROOM || []);
  const [oneOnOneData, setOneOnOneData] = useState(
    courses?.["ONE ON ONE"] || []
  );

  const getVisibleTabs = () => {
    return tabsData.filter((tab) => {
      if (tab.name === "All") return groupedData.length >= 5;
      if (tab.name === "Online") return onlineData.length >= 5;
      if (tab.name === "Classroom") return classRoomData.length >= 5;
      if (tab.name === "One on One") return oneOnOneData.length >= 5;
      return false;
    });
  };
  
  const visibleTabs = getVisibleTabs();

  // console.log("Featured Courses : ", featuredCoursesData);
  const handleTabClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);

      setTabs((prevTabs) =>
        prevTabs.map((tab) => ({
          ...tab,
          current: tab.name === tabName,
        }))
      );
      // fetchCourses(tabName);
    }
  };

  // const fetchCourses = async (tabName) => {
  //   let response;
  //   const batchMode =
  //     tabName === "All"
  //       ? "ALL"
  //       : tabName === "Online"
  //       ? "ONLINE"
  //       : tabName === "Classroom"
  //       ? "OFFLINE"
  //       : "ONE ON ONE";

  // };

  useEffect(() => {
    // const mergedData = [
    //   ...courses["ONE ON ONE"],
    //   ...courses["ONLINE"],
    //   ...courses["CLASSROOM"],
    // ];
    const mergedData = [
      ...(Array.isArray(courses["ONE ON ONE"]) ? courses["ONE ON ONE"] : []),
      ...(Array.isArray(courses["ONLINE"]) ? courses["ONLINE"] : []),
      ...(Array.isArray(courses["CLASSROOM"]) ? courses["CLASSROOM"] : []),
    ];

    setGroupedData(mergedData);
  }, []);

  // console.log("Grouped Data : ", groupedData);

  return (
    <div
      className={`${
        groupedData.length > 0 ? "block" : "hidden"
      } flex flex-col`}>
      <div className="flex flex-row justify-between items-center mb-6">
        <h5 className="text-3xl font-bold ">Featured Courses</h5>
        <button
          className="w-20 flex flex-row justify-between items-center"
          onClick={() => navigate("/courses")}>
          <span className="text-lg font-medium text-text">See All</span>
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div className="hidden md:flex flex-row gap-5">
        <nav
          className={`flex md:gap-4 justify-center ${
            isMobile &&
            " overflow-x-scroll scroll whitespace-nowrap scroll-smooth custom-scroll"
          }`}>
          {visibleTabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(tab.name);
              }}
              aria-current={tab.current ? "page" : undefined}
              className={classNames(
                tab.current
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "text-gray-500  hover:text-gray-700",
                "whitespace-nowrap px-4 rounded-full py-1  text-sm font-medium border border-gray-300"
              )}>
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      {activeTab === "All" ? (
        <FeaturedCard data={groupedData} />
      ) : activeTab === "Online" ? (
        <FeaturedCard data={onlineData} />
      ) : activeTab === "Classroom" ? (
        <FeaturedCard data={classRoomData} />
      ) : (
        <FeaturedCard data={oneOnOneData} />
      )}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5 md:py-10">
        {groupedData?.length > 0 ? (
          (isMobile ? groupedData.slice(0, 2) : groupedData.slice(0, 5)).map(
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
                      <h2 className="mt-4 text-xl md:text-sm font-bold">
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
      </div> */}
    </div>
  );
};

export default FeaturedCourses;
