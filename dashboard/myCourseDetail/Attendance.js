import React from "react";
import greenright from "../../../assets/svgs/greenright.svg";
import redwrong from "../../../assets/svgs/redwrong.svg";
import { useState } from "react";
import { checkIsMobile } from "../../../utils/helpers";

function Attendance() {
  const [attendance, setAttendance] = useState([
    {
      class: "Class 1",
      dateTime: "Monday, Aug 04, 9:15Am - 11AM",
      status: "Present",
    },
    {
      class: "Class 2",
      dateTime: "Wednesday, Aug 12, 9:15AM - 11AM",
      status: "Absent",
    },
    {
      class: "Class 3",
      dateTime: "Thursday, Aug 04, 9:15Am - 11AM",
      status: "Present",
    },
    {
      class: "Class 4",
      dateTime: "Friday, Aug 04, 9:15Am - 11AM",
      status: "Present",
    },
    {
      class: "Class 5",
      dateTime: "Sunday, Aug 04, 9:15Am - 11AM",
      status: "Absent",
    },
    {
      class: "Class 6",
      dateTime: "Saturday, Aug 04, 9:15Am - 11AM",
      status: "Absent",
    },
  ]);
  const isMobile = checkIsMobile();
  return (
    <div className="bg-gray-100 px-2 md:px-8 w-full py-2 md:py-4">
      <p className="text-sm text-gray-500 font-medium px-4 md:px-0">
        Your Attendance for 12 Classes
      </p>
      <div className="flex flex-col gap-4 mt-4">
        {attendance.map((item, index) => (
          <div className="flex flex-row justify-between items-center bg-white w-full p-3 md:p-4 rounded-2xl" key={index}>
            <div className="flex flex-row gap-1 md:gap-2 items-center">
              <p className="text-sm md:text-base text-secondary font-medium">{item.class} -</p>
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                {item.dateTime}
              </p>
            </div>
            <div className={`flex flex-row gap-2 items-center border border-gray-400  py-1 rounded-full ${item.status === "Present" ? "px-2" : "px-3"}`}>
                {item.status === "Present" ? (
                    <img src={greenright} alt="right" />
                ): ( 
                    <img src={redwrong} alt="wrong" />
                )}
              
              <p className={`text-xs font-medium  ${item.status === "Present" ? "text-green-500" : "text-red-500"}`}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;
