import React, { useState, useEffect } from "react";

const WhomeCourse = ({ course }) => {
  const [targetAudiences, setTargetAudiences] = useState([]);

  useEffect(() => {
    if (course && course.targetAudiences) {
      const data = course.targetAudiences.sort(function (a, b) {
        return a.order - b.order;
      });
      setTargetAudiences([...data]);
    }
  }, []);

  // console.log("tagetAudiences", targetAudiences);

  return (
    <div className="flex flex-col md:px-6">
      <h5 className="text-lg font-bold mb-5">Whom this Course for?</h5>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {targetAudiences.map((data, index) => (
          // <div key={data.id} className="flex flex-row gap-3 justify-start items-center">
          //     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          //     <rect width="10" height="10" rx="2" fill="black" fill-opacity="0.2"/>
          //     </svg>
          //     <p className="text-sm text-text">{data.title}</p>
          // </div>
          <div
            key={data.id}
            className="flex flex-row gap-2 justify-start items-baseline">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                width="10"
                height="10"
                rx="2"
                fill="black"
                fill-opacity="0.2"
              />
            </svg>
            <div className="flex flex-col w-full">
              <h5 className="text-base md:text-lg text-text font-medium">
                {data.title}
              </h5>
              <p className="text-sm text-text">{data.description}</p>
            </div>
          </div>
        ))}
        {/* <div className="flex flex-row gap-3 justify-start items-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" rx="2" fill="black" fill-opacity="0.2"/>
                </svg>
                <p className="text-sm text-text">Product Managers and Developers</p>
            </div>
            <div className="flex flex-row gap-3 justify-start items-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" rx="2" fill="black" fill-opacity="0.2"/>
                </svg>
                <p className="text-sm text-text">Individuals looking to start a career in UX design</p>
            </div> */}
      </div>
    </div>
  );
};

export default WhomeCourse;
