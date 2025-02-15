import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import CourseInfo from "../../courseDetail/CourseInfo";
import MyCourseInfo from "./MyCourseInfo";
import CourseSchedule from "./CourseSchedule";
import Assessments from "./Assessments";
import Attendance from "./Attendance";
import CourseChat from "./CourseChat";
import { checkIsMobile } from "../../../utils/helpers";
import { getBatchId } from "../../../redux/courses/actionCreator";
import store from "../../../redux/store";
// import Chat from "../../chat";

const getBatch = (id) => {
  return new Promise(async (resolve, reject) => {
    let response = await store.dispatch(getBatchId({ batchId: id }));
    // console.log("function getBatch: ", response);
    if (response && response.type === "BATCH_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export async function myCourseDetailLoader({ params }) {
  const batchId = params.batchid;
  const batch = await getBatch(batchId);
  return {
    date: new Date().toISOString(),
    batch: batch,
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyCourseDetail() {
  let location = useLocation();
  const loaderData = useLoaderData();
  const [isProfile, setIsProfile] = useState(false);
  const tabsData = [
    { name: "Schedules", href: "#", current: true },
    { name: "Assessments", href: "#", current: false },
    { name: "Attendence", href: "#", current: false },
  ];
  const isMobile = checkIsMobile();

  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );
  const [batchData, setBatchData] = useState(loaderData.batch || []);

  // console.log("loaderData", loaderData.batch);
  // console.log("data: ", item)

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

  useEffect(() => {
    // console.log("checkHome", location);
    if (
      (location && location.pathname == "/dashboard/profile") ||
      location.pathname == "/dashboard" ||
      location.pathname === "/dashboard/courses/:courseId"
    ) {
      setIsProfile(true);
    }
  }, []);
  return (
    <div className="w-full flex flex-row relative items-start justify-between h-[calc(100vh-64px)]">
      <div className="h-full flex w-full bg-white">
        <div className="w-full flex flex-col h-full overflow-auto">
          <MyCourseInfo batch={batchData} />
          <div className="flex flex-col h-full w-full">
            <div className="sticky bg-white top-0 border-b border-gray-200 flex flex-row justify-between items-center px-5 md:px-14">
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
                      "whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                    )}>
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex w-full">
              {activeTab === "Schedules" ? (
                <CourseSchedule />
              ) : activeTab === "Assessments" ? (
                <Assessments />
              ) : (
                activeTab === "Attendence" && <Attendance />
              )}
            </div>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className={`h-full flex sticky top-0 w-[420px]`}>
          {/* <h1>Chat UI</h1> */}
          {/* <DashboardSideBar isProfile={isProfile} /> */}
          <CourseChat />
        </div>
      )}
    </div>
  );
}

export default MyCourseDetail;
