import React from "react";
import { Container } from "../../components/ui-components";
import CourseItemCard from "../../components/shared-components/CourseItemCard";
import { Link } from "react-router-dom";
import CourseCard from "./courseCard";

function CoursesAll({courses, setFilters, filters}) {
    console.log("All Tab: ", courses);
  return (
    <div className="md:py-6 custom-scroll">
      <Container className="custom-scroll">
        <p className="text-base text-gray-500 font-medium">
          You have{" "}
          <span className="text-black font-medium">
            {courses.length === 0 ? "No Courses Available" : courses.length} Courses
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-5 pb-10 custom-scroll">
          {courses.map((course, index) => (
            <Link to={`/courses/${course.courseId}`} key={index + 1}>
              <CourseItemCard course={course} type={index} />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default CoursesAll;
