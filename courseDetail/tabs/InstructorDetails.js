import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Button } from "../../../components/ui-components";
import { Link, useNavigate } from "react-router-dom";

const InstructorDetails = ({ course }) => {
  const [expertise, setExpertise] = useState(
    course?.instructor?.instructor_onboarding?.expertises || []
  );
  const navigate = useNavigate();
  // console.log("expertise: ", expertise);
  // console.log("instructor Id: ", course?.instructor?.id);
  return (
    <div className="flex flex-col">
      <h5 className="text-2xl md:text-lg font-bold mb-5">Instructor Details</h5>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-96">
          <div className="w-full flex flex-row gap-4 md:gap-0 justify-center md:flex-col bg-gray-100 rounded-2xl px-5 py-10 md:px-5 md:py-5">
            <div className="w-20 h-20 relative">
              <img
                src={require("../../../assets/images/testimonial1.jpg")}
                alt="Uploaded Content"
                className="w-20 h-20 rounded-full"
              />
              <CheckBadgeIcon className="absolute bottom-3 -right-2 size-5" />
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <h4 className="text-base font-medium text-text">
                {course?.instructor?.name}
              </h4>
              <p className="text-gray-600">
                @ {course?.instructor?.WorkExperiences.map(
                  (item) => item.isCurrent && item.company_name
                )}
              </p>
              <p className="text-gray-600">
                {course?.instructor?.instructor_onboarding?.experienceInYears}{" "}
                of Experience{" "}
              </p>
              <p className="text-gray-600">
                No. Courses Conducted{" "}
                <b className="ml-1 text-lg">
                  {course?.instructor?.courseCount}
                </b>
              </p>
              <Link
                to={`/instructor_profile/${course?.instructor?.id}`}
                className="w-full rounded-xl bg-black text-white text-sm font-medium text-center py-3 px-7 mt-2">
                View Detail
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h5 className="text-text text-lg md:text-base font-medium">About</h5>
          <p className="text-gray-2 text-sm">
            {course?.instructor?.onboarding[0]?.bio}
          </p>
          <h5 className="text-text text-lg md:text-base font-medium">
            Languages Known
          </h5>
          <p className="text-gray-2 text-sm">English, Hindi</p>
          <h5 className="text-text text-lg md:text-base font-medium">
            Expert In
          </h5>
          <div className="flex flex-wrap gap-1 md:gap-4">
            {expertise.map((item) => (
              <span
                key={item.id}
                className="bg-white px-4 py-2 rounded-full text-text text-sm border border-gray-3">
                {item.courseSubCategory.n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
