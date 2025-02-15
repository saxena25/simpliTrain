import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link, useNavigate } from "react-router-dom";

const SimilarCourses = ({ course, SimilarCourses }) => {
  console.log("Courses from SimilarCourses: ", course);
  console.log("CategoryId from SimilarCourses: ", course?.categoryId);
  console.log("SubCategoryId from SimilarCourses: ", course?.subCategoryId);
  const navigate = useNavigate();
  //   console.log("SimilarCourses: ", SimilarCourses);
  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center md:mb-3">
        <h5 className="text-2xl md:text-3xl font-bold ">Similar Courses</h5>
        <button
          className="w-20 flex flex-row justify-between items-center"
          onClick={() =>
            navigate("/courses", {
              state: {
                categoryId: course?.categoryId,
                subCategoryId: course?.subCategoryId,
              },
            })
          }>
          <span className="text-lg font-medium text-text">See All</span>
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-5 md:py-10">
        {SimilarCourses.slice(0, 3).map((item, index) => (
          <Link
            to={`/courses/${item.id}`}
            onClick={handleClick}
            key={index + 1}>
            <CourseCard type={index} data={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarCourses;
