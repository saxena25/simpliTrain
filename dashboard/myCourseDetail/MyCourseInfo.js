import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  ExclamationCircleIcon,
  MapPinIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../../utils/helpers";
import moment from "moment";

const MyCourseInfo = ({ batch }) => {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  // console.log("MyCourseInfo batch: ", batch);
  return (
    <div className="flex flex-col px-5 md:px-6 py-6 gap-5 bg-[#FFFFFF80]">
      {isMobile && (
        <div className="flex flex-row justify-between items-center">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon
              className="size-10 border border-gray-400 p-2 rounded-full"      
            />
          </button>
          {/* chat button mobile */}
          <button onClick={() => navigate("/chat")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.0039 10C19.0039 14.9706 14.9745 19 10.0039 19C7.9675 19 1.00463 19 1.00463 19C1.00463 19 2.56382 15.2561 1.93982 14.0008C1.34076 12.7956 1.00391 11.4372 1.00391 10C1.00391 5.02944 5.03334 1 10.0039 1C14.9745 1 19.0039 5.02944 19.0039 10Z"
                stroke="#131A29"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-row justify-start items-start gap-2">
        {!isMobile && (
          <button className="w-8" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="size-6 mt-9" />
          </button>
        )}

        <div className="flex flex-col w-full gap-6 justify-start items-start">
          <div className="flex flex-row justify-between items-start gap-2 w-full">
            {isMobile ? (
              <div className="w-full flex flex-col gap-2">
                <p className="px-2 w-fit rounded-full text-gray-2 text-xs md:text-sm border border-gray-1">
                  Classroom
                </p>
                <div className="flex flex-row justify-between">
                  <h1 className="text-lg text-text font-bold pr-10 leading-tight">
                    Mastering the Essentials of UX Design
                  </h1>
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="flex flex-row justify-evenly items-center px-1.5 bg-gray-100 py-1 gap-3 rounded-full">
                      <EllipsisVerticalIcon className="size-5 text-gray-700" />
                    </MenuButton>

                    <MenuItems
                      transition
                      // right-0 z-10 mt-2
                      className="absolute right-0 top-[46px] w-56 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center px-2">
                      <div className="py-4 px-2 flex flex-col gap-2.5">
                        <MenuItem>
                          <p className="text-xs text-primary">
                            BOOKING ID{" "}
                            <span className="text-black font-medium text-xs">
                              - SA090023
                            </span>
                          </p>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Download Course Details
                          </Link>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none leading-none">
                            Download Payment Receipt
                          </Link>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none leading-none">
                            See Payment History
                          </Link>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none leading-none">
                            Download Course Materials
                          </Link>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none leading-none">
                            Download Certificate
                          </Link>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none leading-none">
                            Request Additional Support?
                          </Link>
                        </MenuItem>
                        <MenuItem
                          as="div"
                          className="flex flex-row gap-1 items-center">
                          <div className="rounded-full w-7 h-7 bg-gray-200"></div>
                          <Link
                            to={"/auth"}
                            className="block  text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none leading-none">
                            View Cancellation Policy
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <div className="shrink-0">
                    <svg
                      width="64"
                      height="30"
                      viewBox="0 0 64 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="12.0658"
                        cy="15.0658"
                        r="12.0658"
                        fill="#F1F1F1"
                      />
                      <circle
                        cx="30.4993"
                        cy="15.0658"
                        r="13.1626"
                        fill="#F1F1F1"
                        stroke="white"
                        strokeWidth="2.19377"
                      />
                      <circle
                        cx="48.9329"
                        cy="15.0658"
                        r="13.1626"
                        fill="#F1F1F1"
                        stroke="white"
                        strokeWidth="2.19377"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base text-primary font-normal">
                    30 Enrolled
                  </h4>
                </div>
                <p className="flex flex-row flex-wrap gap-1 items-center">
                  <span className="text-base text-primary">
                    May 24 - Aug 24
                  </span>
                  <div className="h-4 w-[2px] bg-gray-300"></div>
                  <span className="text-base text-primary">4 classes</span>
                  <div className="h-4 w-[2px] bg-gray-300"></div>
                  <span className="text-base text-primary">
                    2 Classes per week
                  </span>
                  <div className="h-4 w-[2px] bg-gray-300"></div>
                  <span className="text-base text-primary">
                    60min per class
                  </span>
                </p>
                <div className="flex items-center justify-start gap-2">
                  <div className="shrink-0">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 52 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle
                        cx="26"
                        cy="26"
                        r="26"
                        fill="#D9D9D9"
                        fill-opacity="0.7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base text-primary font-normal">
                    by Rohan Joshi & 2 More Cohost
                  </h4>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col justify-start items-start gap-2">
                  <span className="px-2 w-auto rounded-full text-gray-2 text-xs md:text-sm border border-gray-1">
                    {batch?.batchMode}
                  </span>
                  <h3 className="text-lg md:text-2xl text-text font-bold">
                    {batch?.title}
                  </h3>
                  <p className="flex flex-row gap-2">
                    <span>{`${moment(batch?.startDate).format("MMM DD")} - ${moment(batch?.endDate).format("MMM DD")} |`}</span>
                    {/* <span>{batch?.batchClasses.length} classes</span> | */}
                    <span>
                      {batch?.numberOfClassPerWeek} Classes per week
                    </span>{" "}
                    |<span>{batch?.durationPerClasss}min per class</span>
                  </p>
                  <div className="flex items-center justify-start gap-3">
                    <div className="shrink-0">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 52 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                          cx="26"
                          cy="26"
                          r="26"
                          fill="#D9D9D9"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-normal">
                        by {batch?.createdBy?.name}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center gap-3 pt-9">
                  <svg
                    width="64"
                    height="30"
                    viewBox="0 0 64 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                      cx="12.0658"
                      cy="15.0658"
                      r="12.0658"
                      fill="#F1F1F1"
                    />
                    <circle
                      cx="30.4998"
                      cy="15.0658"
                      r="13.1626"
                      fill="#F1F1F1"
                      stroke="white"
                      strokeWidth="2.19377"
                    />
                    <circle
                      cx="48.9344"
                      cy="15.0658"
                      r="13.1626"
                      fill="#F1F1F1"
                      stroke="white"
                      strokeWidth="2.19377"
                    />
                  </svg>
                  <span>{batch?.total_enrolled} Enrolled</span>
                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="flex flex-row justify-evenly items-center px-2 py-1 gap-3 rounded-4xl border border-gray-3 hover:shadow-3xl">
                      <EllipsisVerticalIcon className="size-5 text-gray-700" />
                    </MenuButton>

                    <MenuItems
                      transition
                      // right-0 z-10 mt-2
                      className="absolute z-20 right-0 top-[46px] w-60 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center">
                      <div className="py-2 px-2">
                        <MenuItem as="div" className="border-b">
                          <p className="block px-4 py-2 text-xs font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            BOOKING ID -{" "}
                            <span className="text-primary font-medium">
                              SA900021
                            </span>
                          </p>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Download Course Details
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Download Payment Receipt
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            See Payment History
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Download Course Material
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Download Certificate
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Request Additional Support?
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={"/auth"}
                            className="block px-4 py-2 text-sm font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            View Cancellation Policy
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
              </>
            )}
          </div>
          {batch?.batchMode === "ONLINE" || "ONE ON ONE" ? (
            <div className="flex flex-row justify-between w-full">
              <button className="flex flex-row gap-2 items-center w-7/12">
                <div className="border rounded-full p-2">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.75 6.33463V12.668H11.0833V6.33463H4.75Z"
                      fill="white"
                    />
                    <path
                      d="M1.1875 6.72786V12.2695L3.16667 12.6654L5.14583 12.2695V6.72786L3.16667 6.33203L1.1875 6.72786Z"
                      fill="#1E88E5"
                    />
                    <path
                      d="M14.6458 9.5013V15.043C14.6458 15.6989 14.1142 16.2305 13.4583 16.2305H5.14583L4.75 14.2513L5.14583 12.2721H10.6875V9.5013L12.6667 9.10547L14.6458 9.5013Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M14.6458 3.95703V9.4987H10.6875V6.72786H5.14583L4.75 4.7487L5.14583 2.76953H13.4583C14.1142 2.76953 14.6458 3.30114 14.6458 3.95703Z"
                      fill="#FBC02D"
                    />
                    <path
                      d="M5.14583 12.2695V16.2279H2.375C1.7191 16.2279 1.1875 15.6963 1.1875 15.0404V12.2695H5.14583Z"
                      fill="#1565C0"
                    />
                    <path
                      d="M5.14583 2.76953V6.72786H1.1875L5.14583 2.76953Z"
                      fill="#E53935"
                    />
                    <path
                      d="M15.0417 9.50104L14.6458 12.8458L10.6875 9.50104L14.6458 6.15625L15.0417 9.50104Z"
                      fill="#2E7D32"
                    />
                    <path
                      d="M18.207 4.00295V14.9992C18.207 15.3317 17.8191 15.5177 17.5618 15.308L14.6445 12.8459V6.15629L17.5618 3.6942C17.8191 3.48441 18.207 3.67045 18.207 4.00295Z"
                      fill="#4CAF50"
                    />
                  </svg>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <div>
                    <p className="w-fit text-sm text-gray-500 font-medium">
                      {batch.length > 0 &&
                      batch[0]?.batchOnlineMeetings?.length > 0
                        ? batch[0].batchOnlineMeetings[0]?.platformName
                          ? batch[0].batchOnlineMeetings[0].platformName
                          : "!No Link"
                        : "!No Link"}{" "}
                    </p>
                    <p className="w-fit text-sm font-medium">
                      {batch.length > 0 &&
                      batch[0]?.batchOnlineMeetings?.length > 0
                        ? batch[0].batchOnlineMeetings[0]?.meetingUrl
                          ? batch[0].batchOnlineMeetings[0].meetingUrl
                          : "!No Meeting URL"
                        : "!No Meeting URL"}
                    </p>
                  </div>
                  <button className="text-white bg-black px-5 py-2 rounded-xl h-fit">
                    Join Meeting
                  </button>
                </div>
              </button>
              <button className="flex flex-row justify-start gap-3 items-center pr-10">
                <div className="shrink-0">
                  <span className="flex justify-center items-center w-8 h-8 bg-white border border-gray-1 rounded-full">
                    <ExclamationCircleIcon className="size-5 text-gray-2" />
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <p className="text-sm font-medium text-gray-400 w-fit">
                    {"Prerequisites"}
                  </p>
                  <p className="text-base md:text-sm font-semibold text-black">
                    {"Things to be ready"}
                  </p>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-baseline justify-start gap-3 md:gap-6">
              <div className="flex gap-3 items-center">
                <div className="shrink-0">
                  <span className="flex justify-center items-center w-8 h-8 bg-white border border-gray-1 rounded-full">
                    <MapPinIcon className="size-5 text-gray-2" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">
                    {"Venue Details"}
                  </p>
                  <p className="text-base md:text-sm font-semibold text-black">
                    {"Halcyon Venue, Bangalo.."}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="shrink-0">
                  <span className="flex justify-center items-center w-8 h-8 bg-white border border-gray-1 rounded-full">
                    <QrCodeIcon className="size-5 text-gray-2" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">
                    {"Venue Check-in"}
                  </p>
                  <p className="text-base md:text-sm font-semibold text-black">
                    {"Scan QR code to check in"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="shrink-0">
                  <span className="flex justify-center items-center w-8 h-8 bg-white border border-gray-1 rounded-full">
                    <ExclamationCircleIcon className="size-5 text-gray-2" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">
                    {"Prerequisites"}
                  </p>
                  <p className="text-base md:text-sm font-semibold text-black">
                    {"Things to be ready"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="w-full p-5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5 rounded-2xl border border-gray-5">
            <div className="flex flex-col justify-start items-start gap-1">
              <span className="text-xs font-medium bg-gray-200 text-gray-600 px-3 py-1.5 rounded-full">
                Active Poll: Participate Now!
              </span>
              <h6 className="text-dark text-base md:text-sm font-semibold">
                Share your thoughts on the latest topic!
              </h6>
            </div>
            <div>
              <Link to="/dashboard/poll">
                <button className="bg-primary px-4 py-2 rounded-lg text-white text-sm">
                  Join Poll
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseInfo;
