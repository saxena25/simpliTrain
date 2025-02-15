import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseDrawer from "../CourseDrawer";
import { checkIsMobile } from "../../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Carousel } from "antd";
import SchedulesTab from "../Schedules";
import CourseVenueTab from "../CourseVenue";

export async function chooseBatchLoader() {
  return {
    date: new Date().toISOString(),
  };
}

const batches = [
  "Batch 1",
  "Batch 2",
  "Batch 3",
  "Batch 4",
  "Batch 5",
  "Batch 6",
  "Batch 7",
  "Batch 8",
  "Batch 9",
  "Batch 10",
  "Batch 11",
  "Batch 12",
];

function ChooseBatch() {
  const [activeTab, setActiveTab] = useState("group");
  const [open, setOpen] = useState(false);
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [activeBatch, setActiveBatch] = useState("false");
  const [activeTabs, setActiveTabs] = useState("tab1");
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrev = () => {
    carouselRef.current.prev();
    setCurrentSlide(currentSlide - 1);
  };

  const goToNext = () => {
    carouselRef.current.next();
    setCurrentSlide(currentSlide + 1);
    if (currentSlide + 1 >= batches.length) {
      carouselRef.current.slickGoTo(0);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTabs(tabName);
  };
  return (
    <>
      {isMobile && (
        <div className="px-5 pt-5 flex flex-col gap-1 bg-[#F7F7F7]">
          <button
            className="w-fit bg-white border p-2 rounded-full"
            onClick={() => navigate("/courses/courseid")}>
            <ArrowLeftIcon className="size-6" />
          </button>
          <h1 className="text-[28px] font-semibold text-secondary">
            Choose Batch
          </h1>
        </div>
      )}
      <div className="bg-white rounded-xl md:shadow-3xl overflow-hidden mb-5">
        <div className="bg-[#F7F7F7] p-3 flex flex-col gap-4">
          <div className="aspect-w-16 aspect-h-9 bg-[#EEEEEE] rounded-xl gap-3"></div>
          <div className="flex flex-row flex-nowrap justify-between items-center p-2 rounded-lg border border-[#D9D9D9]">
            <button
              onClick={() => setActiveTab("group")}
              className={`w-full font-semibold px-4 py-2 rounded-lg ${
                activeTab == "group"
                  ? "bg-gray-300 text-black"
                  : "bg-transparent text-gray-500"
              }`}>
              Group Course
            </button>
            <button
              onClick={() => setActiveTab("one_on_one")}
              className={`w-full font-semibold px-4 py-2 rounded-lg ${
                activeTab == "one_on_one"
                  ? "bg-gray-300 text-black"
                  : "bg-transparent text-gray-500"
              }`}>
              One on One
            </button>
          </div>
          <h2 className="text-sm text-gray-500 font-semibold mt-2">
            3 Batches Available
          </h2>
        </div>

        {/* Batch Selection */}
        <div>
          {activeTab == "group" ? (
            <div className="bg-white flex flex-col pt-4">
              {/* Batch 1 */}
              <div className="rounded-lg flex gap-2 items-start mb-4">
                <div className="pl-4 pt-1.5">
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9.5" cy="9" r="8.5" stroke="black" />
                    <circle cx="9.5" cy="9" r="5" fill="black" />
                  </svg>
                </div>
                <div className="pr-4 pb-4 w-full flex-1 border-b border-b-gray-300">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <h3 className="text-sm md:text-lg font-medium flex gap-2 items-center">
                        Batch 1{" "}
                        <span className="text-[10px] md:text-xs text-gray-400 px-2 border border-gray-400 rounded-full uppercase">
                          ONLINE
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">May 24 - Aug 24</p>
                      <p className="text-sm text-gray-600">
                        24 Enrolled | 2 seats left
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-end">
                      <p className="text-sm md:text-lg flex font-semibold">
                        ₹ 6,000
                      </p>
                      <p className="text-green-600 text-xs md:text-sm">
                        40% Off
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center py-2">
                    <a
                      onClick={() => setOpen(true)}
                      className="text-text text-sm font-medium flex items-center cursor-pointer">
                      View full schedules{" "}
                      <ChevronRightIcon className="size-4" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 text-sm font-medium cursor-pointer">
                      Installment Available
                    </a>
                  </div>
                </div>
              </div>
              {/* Batch 2 */}
              <div className="rounded-lg flex gap-2 items-start mb-4">
                <div className="pl-4 pt-1.5">
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                      opacity="0.7"
                      cx="9.5"
                      cy="9"
                      r="8.5"
                      stroke="black"
                      stroke-opacity="0.4"
                    />
                  </svg>
                </div>
                <div className="pr-4 pb-4 w-full flex-1 border-b border-b-gray-300">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <h3 className="text-sm md:text-lg font-medium flex gap-2 items-center">
                        Batch 2{" "}
                        <span className="text-[10px] md:text-xs text-gray-400 px-2 border border-gray-400 rounded-full uppercase">
                          Classroom
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">May 24 - Aug 24</p>
                      <p className="text-sm text-gray-600">
                        24 Enrolled | 2 seats left
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-end">
                      <p className="text-sm md:text-lg flex font-semibold">
                        ₹ 6,000
                      </p>
                      <p className="text-green-600 text-xs md:text-sm">
                        40% Off
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center py-2">
                    <a
                      onClick={() => setOpen(true)}
                      className="text-text text-sm font-medium flex items-center cursor-pointer">
                      View full schedules{" "}
                      <ChevronRightIcon className="size-4" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 text-sm font-medium cursor-pointer">
                      Installment Available
                    </a>
                  </div>
                  <div className="p-2 bg-[#F2F2F2] flex flex-row justify-between items-center rounded-full">
                    <p className="flex text-sm md:text-base items-center gap-1">
                      <MapPinIcon className="size-5" />
                      Koramangala, Bangalore
                    </p>
                    <button className="w-6 h-6 md:w-8 md:h-8 bg-white flex justify-center items-center rounded-full">
                      <ChevronRightIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Batch 3 */}
              <div className="rounded-lg flex gap-2 items-start mb-4">
                <div className="pl-4 pt-1.5">
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9.5" cy="9" r="8.5" stroke="black" />
                    <circle cx="9.5" cy="9" r="5" fill="black" />
                  </svg>
                </div>
                <div className="pr-4 pb-4 w-full flex-1 border-b border-b-gray-300">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <h3 className="text-sm md:text-lg font-medium flex gap-2 items-center">
                        Batch 3{" "}
                        <span className="text-[10px] md:text-xs text-gray-400 px-2 border border-gray-400 rounded-full uppercase">
                          ONLINE
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">May 24 - Aug 24</p>
                      <p className="text-sm text-gray-600">
                        24 Enrolled | 2 seats left
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-end">
                      <p className="text-sm md:text-lg flex font-semibold">
                        ₹ 6,000
                      </p>
                      <p className="text-green-600 text-xs md:text-sm">
                        40% Off
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center py-2">
                    <a
                      onClick={() => setOpen(true)}
                      className="text-text text-sm font-medium flex items-center cursor-pointer">
                      View full schedules{" "}
                      <ChevronRightIcon className="size-4" />
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 text-sm font-medium cursor-pointer">
                      Installment Available
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white flex flex-col">
              <div className="p-4 rounded-lg flex gap-2 items-start mb-4">
                <div className="w-full flex-1">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <h3 className="text-sm md:text-lg font-medium flex gap-2 items-center">
                        One on One{" "}
                        <span className="text-[10px] md:text-xs text-gray-400 px-2 border border-gray-400 rounded-full uppercase">
                          ONLINE
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">1 Day Course</p>
                      <p className="text-sm text-gray-600">60min per class </p>
                    </div>
                    <div className="flex flex-col justify-start items-end">
                      <p className="text-sm md:text-lg flex font-semibold">
                        ₹ 6,000
                      </p>
                      <p className="text-green-600 text-xs md:text-sm">
                        40% Off
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center py-2">
                    <a
                      onClick={() => setOpen(true)}
                      className="text-text text-sm font-medium flex items-center cursor-pointer">
                      View full schedules{" "}
                      <ChevronRightIcon className="size-4" />
                    </a>
                    {/* <a href="#" className="text-gray-400 text-sm font-medium cursor-pointer">Installment Available</a> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-[#F7F7F7] p-4 flex flex-col gap-5">
          <div className="py-2 px-3 bg-white rounded-full mt-2">
            <div className="relative flex items-center space-x-2">
              <div className="shrink-0">
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.00065 17.3346C6.54232 17.3346 6.14996 17.1714 5.82357 16.845C5.49718 16.5187 5.33398 16.1263 5.33398 15.668H8.66732C8.66732 16.1263 8.50412 16.5187 8.17774 16.845C7.85135 17.1714 7.45899 17.3346 7.00065 17.3346ZM12.0007 9.83463V7.33463H9.50065V5.66797H12.0007V3.16797H13.6673V5.66797H16.1673V7.33463H13.6673V9.83463H12.0007ZM0.333984 14.8346V13.168H2.00065V7.33463C2.00065 6.18186 2.34787 5.15755 3.04232 4.26172C3.73676 3.36589 4.63954 2.77908 5.75065 2.5013V1.91797C5.75065 1.57075 5.87218 1.27561 6.11523 1.03255C6.35829 0.789497 6.65343 0.667969 7.00065 0.667969C7.34787 0.667969 7.64301 0.789497 7.88607 1.03255C8.12912 1.27561 8.25065 1.57075 8.25065 1.91797V2.5013C8.4451 2.55686 8.63607 2.61589 8.82357 2.67839C9.01107 2.74089 9.18815 2.82075 9.35482 2.91797C9.14649 3.11241 8.95899 3.32422 8.79232 3.55339C8.62565 3.78255 8.47982 4.02908 8.35482 4.29297C8.14649 4.19575 7.92774 4.12283 7.69857 4.07422C7.4694 4.02561 7.23676 4.0013 7.00065 4.0013C6.08398 4.0013 5.29926 4.32769 4.64648 4.98047C3.99371 5.63325 3.66732 6.41797 3.66732 7.33463V13.168H10.334V10.8346C10.584 10.9874 10.8479 11.1124 11.1257 11.2096C11.4034 11.3069 11.6951 11.3832 12.0007 11.4388V13.168H13.6673V14.8346H0.333984Z"
                    fill="#3A3D41"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-text">
                  {"No Batches Available, Notify Me "}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {"Be the first to know when a new batch is scheduled."}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center px-4">
            <div className="shrink-0">
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.75 10.0208L0 5.27083L1.1875 4.08333L4.75 7.64583L12.3958 0L13.5833 1.1875L4.75 10.0208Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {"Flexible Installments"}
              </p>
              <p className="truncate text-xs md:text-sm text-gray-500">
                {"Starts at 3900/month"} <a className="underline">Know more</a>
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-center  px-4">
            <div className="shrink-0">
              <svg
                width="15"
                height="19"
                viewBox="0 0 15 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.58516 12.6062L11.5289 7.6625L10.282 6.41563L6.58516 10.1125L4.74766 8.275L3.50078 9.52187L6.58516 12.6062ZM7.50391 18.25C5.47682 17.7396 3.80339 16.5766 2.48359 14.7609C1.1638 12.9453 0.503906 10.9292 0.503906 8.7125V3.375L7.50391 0.75L14.5039 3.375V8.7125C14.5039 10.9292 13.844 12.9453 12.5242 14.7609C11.2044 16.5766 9.53099 17.7396 7.50391 18.25ZM7.50391 16.4125C9.02057 15.9312 10.2747 14.9688 11.2664 13.525C12.2581 12.0813 12.7539 10.4771 12.7539 8.7125V4.57812L7.50391 2.60938L2.25391 4.57812V8.7125C2.25391 10.4771 2.74974 12.0813 3.74141 13.525C4.73307 14.9688 5.98724 15.9312 7.50391 16.4125Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {"Sercured Transaction"}
              </p>
              <p className="truncate text-sm text-gray-500">
                {"Razorpay & UPI"}
              </p>
            </div>
          </div>

          <button className="w-full bg-[#0E121D] text-white py-3 rounded-lg text-[15px] md:text-lg font-semibold" onClick={()=>navigate("/checkout")}>
            ENROLL
          </button>
        </div>
      </div>
      {/* Question Section */}
      <div className="bg-[#F7F7F7] p-4 rounded-lg shadow-3xl">
        <h3 className="text-2xl md:text-3xl text-text font-medium mb-2">
          Have a Question?
        </h3>
        <p className="text-xs text-gray-50">
          Send your questions to the instructor
        </p>
        <div className="relative rounded-md  border border-[#00000040]">
          <textarea
            placeholder="Send your questions to the instructor"
            className="w-full min-h-36 relative p-3 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"></textarea>
          <button className="absolute right-3 bottom-3">
            <svg
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="23.5"
                cy="23.5"
                r="23.5"
                fill="#0E121D"
                fill-opacity="0.1"
              />
              <path
                d="M17.625 30.5V16.5L34.25 23.5L17.625 30.5ZM19.375 27.875L29.7438 23.5L19.375 19.125V22.1875L24.625 23.5L19.375 24.8125V27.875Z"
                fill="#A0A0A0"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* <CourseDrawer open={open} onClose={setOpen} /> */}

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0" style={{ background: "#00000040" }} />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pt-12">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-y-full sm:duration-700 rounded-tr-3xl rounded-tl-3xl overflow-hidden">
                <div className="flex flex-col justify-between items-start w-full h-full bg-white pt-2">
                  <div className="w-full">
                    <div className="w-full flex flex-row justify-between items-center gap-1 border-b pb-2">
                      <div className="w-2/3">
                        <div className="">
                          <Carousel
                            ref={carouselRef}
                            draggable
                            slidesToShow={3}
                            slidesToScroll={1}
                            style={{ height: "100%" }}
                            id={"course-batch-slider"}>
                            {batches.map((item) => (
                              <a className="px-5">
                                <span
                                  className={`py-1 px-3 text-sm text-text text-nowrap ${
                                    activeBatch == item ? "bg-[#F1F1F1]" : ""
                                  }`}>
                                  {item}
                                </span>
                              </a>
                            ))}
                          </Carousel>
                        </div>
                      </div>
                      <div className="w-fit">
                        <div className="flex flex-row items-center justify-between px-3 gap-2">
                          <div className="flex flex-row border border-gray-3 rounded-full py-1 px-2 gap-1">
                            <button onClick={() => goToPrev()}>
                              <ChevronLeftIcon
                                aria-hidden="true"
                                className="size-5"
                              />
                            </button>
                            <button onClick={() => goToNext()}>
                              <ChevronRightIcon
                                aria-hidden="true"
                                className="size-5"
                              />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-full">
                      <div className="flex flex-col justify-start items-start py-4 px-5">
                        <div className="flex flex-col justify-between w-full items-start">
                          <div className="flex flex-col gap-2">
                            <h4 className="text-3xl text-text font-semibold flex flex-row justify-start items-center gap-3 pb-2">
                              Batch 1{" "}
                              <span className="py-px px-2 rounded-full border border-gray-400 text-xs text-gray-400">
                                Classroom
                              </span>
                            </h4>
                            <div className="flex flex-row items-start pb-2">
                              <a className="rounded-full bg-primary px-2 py-1 flex justify-center text-xs font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                Last day to register
                              </a>
                            </div>
                            <div className="flex flex-row flex-wrap gap-[6px] text-gray-600 justify-start items-center leading-tight pb-4">
                              <span className="text-xs">May 24 - Aug 24</span>|
                              <span className="text-xs">8 classes</span>|
                              <span className="text-xs">2 Classes per week</span>|
                              <span className="text-xs">60min per class</span>
                            </div>
                            <div className="flex flex-row gap-3 items-center justify-start">
                              <div className="flex -space-x-2 overflow-hidden">
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  className="inline-block size-6 rounded-full ring-2 ring-white"
                                />
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  className="inline-block size-6 rounded-full ring-2 ring-white"
                                />
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                  className="inline-block size-6 rounded-full ring-2 ring-white"
                                />
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  className="inline-block size-6 rounded-full ring-2 ring-white"
                                />
                              </div>
                              <div className="flex flex-row gap-1 text-gray-600 justify-start items-center">
                                <span className="text-sm">24 Enrolled</span>|
                                <span className="text-sm">2 seats left</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative border-b border-gray-200 py-0 px-5">
                        <nav
                          aria-label="Tabs"
                          className="-mb-px sticky top-0 flex space-x-8 justify-start">
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleTabClick("tab1");
                            }}
                            className={`${
                              activeTabs == "tab1"
                                ? "border-gray-900 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}>
                            {"Schedules"}
                          </a>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              handleTabClick("tab2");
                            }}
                            className={`${
                              activeTabs == "tab2"
                                ? "border-gray-900 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}>
                            {"Course Venue"}
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full overflow-auto">
                    <div className="flex flex-col w-full h-full items-start py-4 px-5">
                      {activeTabs == "tab1" ? (
                        <SchedulesTab />
                      ) : activeTabs == "tab2" ? (
                        <CourseVenueTab />
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full shadow-3xl">
                    <div className="w-full flex flex-row justify-between items-center py-3 px-8">
                      <div>
                        <h4 className="flex flex-row justify-start items-center gap-1 md:gap-3">
                          <span className="text-lg md:text-xl text-text font-semibold">
                            ₹ 30,090
                          </span>
                          <span className="text-sm text-gray-600 font-medium">
                            20% Off
                          </span>
                        </h4>
                        <h6 className="text-sm  text-gray-600 font-medium">
                          <del>₹ 14,057</del>
                        </h6>
                      </div>
                      <div>
                        <Link to="/checkout" className="rounded-xl md:rounded-2xl bg-[#0E121D] px-6 md:px-3.5 py-2.5 md:w-48 flex justify-center text-xs md:text-lg font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                          Explore Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ChooseBatch;
