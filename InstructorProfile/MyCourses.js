import React, { useState } from "react";
import heart from "../../assets/svgs/heart.svg";
import downArrow from "../../assets/svgs/downArrow.svg";

const decideMonth = (month) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[parseInt(month, 10) - 1]; // Convert string to number and get month name
};

function MyCourses({ profile }) {
  const [showAll, setShowAll] = useState(false);

  const courses = profile?.instructorCourses || [];
  const visibleCourses = showAll ? courses : courses.slice(0, 3);

  return (
    <div className="w-full">
      <div>
        <h1 className="text-lg font-medium text-secondary">My Courses</h1>
        <p className="text-base text-primary">You have {courses.length} Courses</p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-3 gap-10 my-8">
        {visibleCourses.map((ele, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center">
              <span className="text-[13px] font-medium bg-gray-100 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
                Design
              </span>
              <span className="text-[13px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-10">
                Popular
              </span>
            </div>
            <div className="h-44 xl:w-[355px] bg-gray-100 rounded-2xl lg:w-72"></div>
            <div className="flex flex-row justify-between items-center mt-4 pr-4">
              <h2 className="text-sm font-bold">{ele.title}</h2>
              <img src={heart} alt="Favorite" />
            </div>
            <p className="mt-2 text-xs font-semibold text-gray-600">
              {ele.classType || "Online | Classroom | One on One | 60hrs"}
            </p>

            <div className="flex flex-row items-center mt-2">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
              <div className="ml-2 flex flex-row gap-2">
                <p className="text-sm font-medium">{profile?.instructorProfileData.name}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">{ele.averageRating}</span> ({ele.reviewsCount})
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-2 my-2">
              {ele?.courseBatches.slice(0, 2).map((batch, index) => (
                <div key={index} className="flex flex-col bg-input-background px-4 py-2 rounded-xl">
                  <p className="text-sm text-secondary">Batch {index + 1}</p>
                  <p className="text-[10px] text-primary">
                    {decideMonth(batch.startDate.slice(5, 7))} {batch.startDate.slice(2, 4)} -{" "}
                    {decideMonth(batch.endDate.slice(5, 7))} {batch.endDate.slice(2, 4)}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-2 text-sm font-semibold">
              <span className="text-xs text-gray-500">Starts From</span> ₹ {ele.price || "9,999/-"}
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {courses.length > 3 && (
        <div
          className="flex flex-row gap-2 bg-white px-3 py-1 border border-gray-400 rounded-full w-28 justify-center m-auto hover:cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          <button>{showAll ? "Show Less" : "View All"}</button>
          <img src={downArrow} alt="DownArrow" className={`transform ${showAll ? "rotate-180" : ""}`} />
        </div>
      )}
    </div>
  );
}

export default MyCourses;
