import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { CircleOutlineIcon } from "../icons";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/instructor_courses/dashboard",
    icon: CircleOutlineIcon,
  },
  {
    name: "Schedules/Calender",
    href: "/instructor_courses/dashboard",
    icon: CircleOutlineIcon,
  },
  { name: "My Account", href: "#", icon: CircleOutlineIcon },
];

const navigationCourseManagement = [
  {
    name: "Courses",
    href: "/instructor_courses/dashboard/course_listing",
    icon: CircleOutlineIcon,
  },
  {
    name: "Batches",
    href: "/instructor_courses/dashboard/batch_listing",
    icon: CircleOutlineIcon,
  },
  { name: "Venues", href: "#", icon: CircleOutlineIcon },
];

const navigationFormsAndAssessments = [
  { name: "Survey", href: "/instructor/survey", icon: CircleOutlineIcon },
  { name: "Polls", href: "/instructor/polls", icon: CircleOutlineIcon },
  { name: "Quiz", href: "/instructor/quiz", icon: CircleOutlineIcon },
  {
    name: "Assessments",
    href: "/instructor/assessment",
    icon: CircleOutlineIcon,
  },
];

const navigationCommunication = [
  { name: "Reviews", href: "/instructor/reviews/courses", icon: CircleOutlineIcon },
  { name: "Announcements", href: "/instructor/announcements", icon: CircleOutlineIcon },
];

const InstructorSidebar = ({ isProfile }) => {
  let location = useLocation();
  const [activeRoute, setActiveRoute] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("checkHome", location.pathname);
    if (location && location.pathname) {
      if (location.pathname == "/instructor_courses/Dashboard/batch_details") {
        setActiveRoute("/instructor_courses/course_listing");
      } else {
        setActiveRoute(location.pathname);
      }
    }
  }, []);

  return (
    // transition-all duration-300 ease-in-out w-96 ${filterSidebar?'ml-0':'-ml-96'}`
    <div
      className={`flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 py-8 transition-all duration-300 ease-in-out ${
        isProfile ? "px-3" : "px-8"
      }`}>
      <nav className="flex flex-1 flex-col justify-evenly items-start mt-8">
        <ul role="list" className="w-full space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={clsx(
                  activeRoute == item.href ? "bg-gray-4" : "hover:bg-gray-4",
                  "group flex rounded-full gap-3 px-2 py-1"
                )}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="#D9D9D9"
                    fillOpacity="0.4"
                  />
                </svg>
                {isProfile ? null : (
                  <span
                    className={clsx(
                      activeRoute == item.href ? "text-gray-2" : "text-gray-2",
                      "text-sm font-semibold"
                    )}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <ul role="list" className="w-full space-y-2">
          <p
            className={`${
              isProfile ? "hidden" : ""
            } text-[12px] text-gray-1 font-thin mt-2`}>
            COURSE MANAGEMENT
          </p>
          {navigationCourseManagement.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={clsx(
                  activeRoute == item.href ? "bg-gray-4" : "hover:bg-gray-4",
                  "group flex rounded-full gap-3 px-2 py-1"
                )}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="#D9D9D9"
                    fillOpacity="0.4"
                  />
                </svg>
                {isProfile ? null : (
                  <span
                    className={clsx(
                      activeRoute == item.href ? "text-gray-2" : "text-gray-2",
                      "text-sm/6 font-semibold"
                    )}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <ul role="list" className="w-full space-y-2">
          <p
            className={`${
              isProfile ? "hidden" : ""
            } text-[12px] text-gray-1 font-thin mt-2`}>
            FORMS & ASSESSMENTS
          </p>
          {navigationFormsAndAssessments.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={clsx(
                  activeRoute == item.href ? "bg-gray-4" : "hover:bg-gray-4",
                  "group flex rounded-full gap-3 px-2 py-1"
                )}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="#D9D9D9"
                    fillOpacity="0.4"
                  />
                </svg>
                {isProfile ? null : (
                  <span
                    className={clsx(
                      activeRoute == item.href ? "text-gray-2" : "text-gray-2",
                      "text-sm/6 font-semibold"
                    )}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <ul role="list" className="w-full space-y-2">
          <p
            className={`${
              isProfile ? "hidden" : ""
            } text-[12px] text-gray-1 font-thin mt-2`}>
            COMMUNICATION
          </p>
          {navigationCommunication.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={clsx(
                  activeRoute == item.href ? "bg-gray-4" : "hover:bg-gray-4",
                  "group flex rounded-full gap-3 px-2 py-1"
                )}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="#D9D9D9"
                    fillOpacity="0.4"
                  />
                </svg>
                {isProfile ? null : (
                  <span
                    className={clsx(
                      activeRoute == item.href ? "text-gray-2" : "text-gray-2",
                      "text-sm/6 font-semibold"
                    )}>
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default InstructorSidebar;
