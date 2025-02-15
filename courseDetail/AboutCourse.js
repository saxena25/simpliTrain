import React from "react";

const AboutCourse = ({course}) => {
  return (
    <div className="flex flex-col md:px-6">
      <h3 className="text-2xl font-bold mb-5">About Course</h3>
      <p className="text-text text-sm">
        {course?.description}
      </p>
      {/* <p className="text-text text-sm pt-2">
        The goal of UX design is to create products that provide meaningful and relevant experiences to users. This invol they design of the entire process of acquiring and integrating the product, including aspect of branding, designin usability and function.
      </p> */}
    </div>
  );
};

export default AboutCourse;
