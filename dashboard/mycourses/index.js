import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DailySchedule from "./DailySchedule";
import ActiveCourses from "./ActiveCourses";
import CompletedCourse from "./CompletedCourse";
import { checkIsMobile } from "../../../utils/helpers";
import Datepicker from "react-tailwindcss-datepicker";
import store from "../../../redux/store";
import {
  getActiveCompletedCourses,
  getDailySchedules,
  getMyCourses,
} from "../../../redux/my_courses/actionCreator";
import { useLoaderData } from "react-router-dom";
import moment from "moment";

const allMyCourses = () => {
  return new Promise(async (resolve, reject) => {
    let response = await store.dispatch(getMyCourses());
    if (response && response.type === "MYCOURSES_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const allDailySchedules = () => {
  return new Promise(async (resolve, reject) => {
    let response = await store.dispatch(getDailySchedules());
    if (response && response.type === "MYCOURSES_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const activeCompletedCourses = () => {
  return new Promise(async (resolve, reject) => {
    let response = await store.dispatch(getActiveCompletedCourses());
    if (response && response.type === "MYCOURSES_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export async function myCoursesLoader() {
  let myCourses = await allMyCourses();
  let dailySchedule = await allDailySchedules();
  let allCourses = await activeCompletedCourses();
  return {
    date: new Date().toISOString(),
    myCourses: myCourses,
    dailySchedule: dailySchedule,
    allCourses: allCourses,
  };
}

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
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-22", isCurrentMonth: true },
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

function MyCourses() {
  const loaderData = useLoaderData();
  const isMobile = checkIsMobile();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dailySchedule, setDailySchedule] = useState(
    loaderData?.dailySchedule || []
  );
  const [batches, setBatches] = useState(loaderData.allCourses || []);
  const [activeBatches, setActiveBatches] = useState(
    loaderData.allCourses?.activeBatches || []
  );
  const [completedBatches, setCompletedBatches] = useState(
    loaderData.allCourses?.completedBatches || []
  );
  const tabsData = [
    {
      title: `Daily Schedule ${
        dailySchedule.length > 0 ? `(${dailySchedule.length})` : ""
      }`,
      name: "Daily Schedule",
      href: "#",
      current: true,
    },
    {
      title: `Active Courses ${
        activeBatches.length > 0 ? `(${activeBatches.length})` : ""
      }`,
      name: "Active Courses",
      href: "#",
      current: false,
    },
    {
      title: `Completed Courses ${
        completedBatches.length > 0 ? `(${completedBatches.length})` : ""
      }`,
      name: "Completed Courses",
      href: "#",
      current: false,
    },
  ];
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );

  // console.log("My courses data:", batches);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.name === tabName
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
  };

  return (
    <>
      <div className="pt-4 w-full bg-gray-50 px-5 md:bg-white">
        {isMobile ? (
          <div className="flex flex-row justify-between items-center pt-4">
            <h1 className="text-2xl text-secondary font-medium md:px-14 pb-2">
              My Courses
            </h1>
            <div className="flex flex-row gap-4">
              <button
                className="border p-2 rounded-full"
                onClick={() => setOpen(true)}>
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.6654 8.16681H1.33179M14.6654 8.16681V14.8336C14.6654 15.7541 13.9192 16.5003 12.9987 16.5003H2.99849C2.078 16.5003 1.33179 15.7541 1.33179 14.8336V4.83341C1.33179 3.91291 2.078 3.1667 2.99849 3.1667H12.9987C13.9192 3.1667 14.6654 3.91291 14.6654 4.83341V8.16681ZM10.4987 1.5V4.83341M5.49854 1.5V4.83341"
                    stroke="#0E121D"
                    strokeWidth="1.25003"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button className="border p-2 rounded-full">
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.83288 10.0017V8.33478H9.16679V10.0017H5.83288ZM2.49897 5.83435V4.16739H12.5007V5.83435H2.49897ZM-0.00146484 1.66696V0H15.0011V1.66696H-0.00146484Z"
                    fill="#0E121D"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl text-secondary font-medium md:px-14 pt-4 pb-2">
            My Courses
          </h1>
        )}

        <div
          className={`border-b border-gray-200 flex flex-row justify-between items-center md:px-14 ${
            isMobile &&
            "sticky top-0 bg-gray-50 z-10 justify-start overflow-x-auto scroll whitespace-nowrap scroll-smooth gap-1"
          } custom-scroll`}>
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(tab.name);
                }}
                aria-current={tab.current ? "page" : undefined}
                className={classNames(
                  tab.current
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 md:px-1 py-4 text-base font-medium"
                )}>
                {tab.title}
              </a>
            ))}
          </nav>
          {!isMobile && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-gray-100">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="size-6" />
                  <span className="text-base">All</span>
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-8 top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                      Set as default
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                      Remove as default
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                      Remove Card
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>

        {activeTab === "Daily Schedule" ? (
          <DailySchedule batches={dailySchedule} />
        ) : activeTab === "Active Courses" ? (
          <ActiveCourses batches={batches} />
        ) : (
          activeTab === "Completed Courses" && (
            <CompletedCourse batches={batches} />
          )
        )}
      </div>

      {isMobile && (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <div className="fixed inset-0" style={{ background: "#00000040" }} />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 bottom-0 flex max-w-full pt-[60%]">
                <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-y-full sm:duration-700 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
                  <div className="w-full flex h-full flex-col overflow-y-auto bg-white  py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h1 className="text-xl font-medium">My Activity</h1>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="relative mt-6 mx-5 rounded-xl flex-1 p-4 sm:px-6 bg-gray-100">
                      {/* your content */}
                      {/* <div>
                        <div className="flex items-center">
                          <h2 className="flex-auto text-sm font-semibold text-gray-900">
                            January 2022
                          </h2>
                          <button
                            type="button"
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon
                              className="size-5"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon
                              className="size-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-gray-500">
                          <div>M</div>
                          <div>T</div>
                          <div>W</div>
                          <div>T</div>
                          <div>F</div>
                          <div>S</div>
                          <div>S</div>
                        </div>
                        <div className="mt-2 grid grid-cols-7 text-sm">
                          {days.map((day, dayIdx) => (
                            <div
                              key={day.date}
                              className={classNames(
                                dayIdx > 6 && "border-t border-gray-200",
                                "py-2"
                              )}>
                              <button
                                type="button"
                                className={classNames(
                                  day.isSelected && "text-white",
                                  !day.isSelected &&
                                    day.isToday &&
                                    "text-indigo-600",
                                  !day.isSelected &&
                                    !day.isToday &&
                                    day.isCurrentMonth &&
                                    "text-gray-900",
                                  !day.isSelected &&
                                    !day.isToday &&
                                    !day.isCurrentMonth &&
                                    "text-gray-400",
                                  day.isSelected &&
                                    day.isToday &&
                                    "bg-indigo-600",
                                  day.isSelected &&
                                    !day.isToday &&
                                    "bg-gray-900",
                                  !day.isSelected && "hover:bg-gray-200",
                                  (day.isSelected || day.isToday) &&
                                    "font-semibold",
                                  "mx-auto flex size-8 items-center justify-center rounded-full"
                                )}>
                                <time dateTime={day.date}>
                                  {day.date.split("-").pop().replace(/^0/, "")}
                                </time>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div> */}
                      <Datepicker
                        // inputClassName="hidden"

                        selected={date}
                        onChange={(date) => setDate(date)}
                      />
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default MyCourses;
