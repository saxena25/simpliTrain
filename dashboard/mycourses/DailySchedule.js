import React, { useEffect } from "react";
import { useState } from "react";
import groupCircles from "../../../assets/svgs/groupCircles.svg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../../utils/helpers";
import moment from "moment";

const days = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true, isToday: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const courseData = [
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    classMode: "Online",
  },
  {
    title: "How to becoming UX designer",
    timing: "Today 8am - 10am",
    time: "2 hour",
    // class: "Class 5",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "501 Enrolled",
    classMode: "Offline",
  },
];

const courseTomorrowData = [
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    classMode: "Offline",
  },
];

const restAllData = [
  {
    title: "How to becoming UX designer",
    timing: "Today 10am - 11am",
    time: "60min",
    class: "Class 2",
    classType: "Online | Group Class | Chapter 3 & 4",
    name: "Rohan Joshi",
    students: "42 Enrolled",
    classMode: "Offline",
  },
];

function DailySchedule({ batches }) {
  const navigate = useNavigate();
  const [onlineClass, setOnlineClass] = useState(true);
  const isMobile = checkIsMobile();
  const [groupedClasses, setGroupedClasses] = useState([]);

  const openCourseDetail = (obj) => {
    navigate("/dashboard/courses/courseid");
  };


  const calculatingClasses = () => {
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "day").startOf("day");
    const groups = [];

    const addToGroup = (label, cls) => {
      const group = groups.find((g) => g.label === label);
      if (group) {
        group.classes.push(cls);
      } else {
        groups.push({ label, classes: [cls] });
      }
    };

    batches.forEach((cls) => {
      const classDate = moment(cls.date).startOf("day");
      if (classDate.isSame(today)) {
        addToGroup("Today", cls);
      } else if (classDate.isSame(tomorrow)) {
        addToGroup("Tomorrow", cls);
      } else {
        addToGroup(classDate.format("YYYY-MM-DD"), cls);
      }
    });

    // console.log("Grouped Classes before setting state: ", groups);
    setGroupedClasses(groups);
  };

  useEffect(() => {
    calculatingClasses();
  }, []);

  return (
    <div className="flex flex-row gap-6 w-full md:pl-12 mt-4 mb-8 h-[calc(100vh-250px)] overflow-y-auto">
      {batches.length > 0 ? (
        <div className="w-full md:w-[70%] flex flex-col gap-2 overflow-y-auto border-r border-gray-100 md:pr-4">
          {groupedClasses.map((item, index) => (
            <div key={index}>
              <h1 className="text-sm text-secondary font-medium mt-8 mb-2">
                {moment(item.label).format("dddd, MMM DD")}
              </h1>
              {item.classes.map((cls, index) => {
                const chapters =
                  cls?.parentBatch?.batchCurriculumDetails
                    ?.map((detail) => detail.order)
                    .sort((a, b) => a - b) || [];

                let chapterText = "";
                if (chapters.length === 1) {
                  chapterText = `Order ${chapters[0]}`;
                } else if (chapters.length > 1) {
                  const lastOrder = chapters.pop();
                  chapterText = `Chapter ${chapters.join(", ")} & ${lastOrder}`;
                }
                // console.log("chapterText", orderText);

                const currentTime = moment().format("HH:mm:ss");
                const classStartTime = moment(
                  cls?.parentBatch?.startTime,
                  "HH:mm:ss"
                ).format("HH:mm:ss");
                // console.log("batchId: ", cls.batchId)
                return (
                  <div
                    key={cls.id}
                    onClick={() => navigate(`/dashboard/courses/${cls?.batchId}`)}
                    className="w-full cursor-pointer relative flex flex-row gap-2 border shadow-lg p-3 md:p-6 rounded-xl md:mb-4">
                    <div className="bg-gray-100 w-28 h-28 rounded-2xl"></div>
                    <div className="w-full flex flex-col gap-2 ">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row flex-wrap gap-1 md:gap-2">
                          <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                            Today{" "}
                            {moment(
                              cls?.parentBatch?.startTime,
                              "HH:mm:ss"
                            ).format("hA")}{" "}
                            -{" "}
                            {moment(
                              cls?.parentBatch?.startTime,
                              "HH:mm:ss"
                            ).format("hA")}
                          </p>
                          <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                            {moment(cls?.parentBatch?.endTime, "m:ss").diff(
                              moment(cls?.parentBatch?.startTime, "m:ss"),
                              "minutes"
                            )}
                            min
                          </p>
                          <p className=" border border-gray-300 text-xs px-3 py-1 text-primary rounded-full">
                            Class{" "}
                            {moment(
                              cls?.parentBatch?.endDate,
                              "YYYY-MM-DD"
                            ).diff(
                              moment(cls?.parentBatch?.startDate, "YYYY-MM-DD"),
                              "days"
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="leading-tight md:leading-none text-base md:text-xl text-secondary font-medium">
                            {cls?.parentBatch?.title}
                          </h1>
                          <p className="text-xs md:text-sm text-primary">
                            {cls?.parentBatch?.batchMode && `${cls?.parentBatch?.batchMode} |`} {cls?.parentBatch?.batchMode === "ONLINE" || cls?.parentBatch?.batchMode === "CLASSROOM" ? "Group Class |" : ""} {chapterText}
                          </p>
                        </div>
                        <div className="flex flex-row gap-1 md:gap-4">
                          <div className="flex flex-row gap-1 md:gap-2">
                            <div className="w-5 h-5 bg-gray-100 rounded-full"></div>
                            <p className="text-xs text-gray-500 font-medium">
                              {cls?.parentBatch?.createdBy?.name}
                            </p>
                          </div>
                          <div className="flex flex-row gap-1 md:gap-2">
                            <img src={groupCircles} alt="" />
                            {cls?.enrolledCount === null || cls?.enrolledCount === undefined ? "" : (
                              <p className="text-xs text-gray-500 font-medium">{cls?.enrolledCount} Enrolled</p>
                            )}
                          </div>
                        </div>
                      </div>
                      {item.classMode === "Online" &&
                      classStartTime === currentTime ? (
                        <button className="w-fit md:absolute bottom-6 right-6 text-sm bg-black text-white px-5 py-2 md:py-1 rounded-2xl md:h-10 whitespace-nowrap">
                          Join Class
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <p>No Batches Available</p>
      )}

      {/* calendar */}
      {!isMobile && (
        <div className="hidden max-w-md w-[30%]  flex-none  px-6 py-10 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">January 2022</div>
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs/6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  "py-1.5 hover:bg-gray-100 focus:z-10",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-400",
                  day.isToday && !day.isSelected && "text-indigo-600",
                  dayIdx === 0 && "rounded-tl-lg",
                  dayIdx === 6 && "rounded-tr-lg",
                  dayIdx === days.length - 7 && "rounded-bl-lg",
                  dayIdx === days.length - 1 && "rounded-br-lg"
                )}>
                <time
                  dateTime={day.date}
                  className={classNames(
                    "mx-auto flex size-7 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900"
                  )}>
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DailySchedule;
