import React from "react";
import star from "../../assets/svgs/star.svg";
import PopularCourse from "./PopularCourse";

const instructorsData = [
  { name: "Pranav Mathew", position: "Developer", rating: 4.8 },
  { name: "Pablo", position: "SportsMan", rating: 4.5 },
  { name: "Ashish", position: "Frontend Dev", rating: 4.9 },
  { name: "Rohan Rakesh", position: "CEO", rating: 4.4 },
  { name: "Paul Ji", position: "Coach Sahab", rating: 5.0 },
];

function SearchContent() {
  return (
    <>
      <div className="w-full flex flex-col items-center py-10">
        <div className="max-w-[65%] flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold text-secondary">
              Popular Instructors
            </h1>
            <div className="flex flex-row gap-4">
              {instructorsData.map((item, index) => (
                <div className="relative flex flex-col gap-0.5">
                  <div className="w-32 h-32 bg-gray-100 rounded-3xl"></div>
                  <div className="absolute top-3 left-4 flex flex-row gap-1">
                    <img src={star} alt="" />
                    <p className="text-xs text-primary">{item.rating}</p>
                  </div>
                  <p className="text-sm text-secondary font-medium px-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-primary px-1">{item.position}</p>
                </div>
              ))}
            </div>
          </div>
          <PopularCourse />
        </div>
      </div>
    </>
  );
}

export default SearchContent;
