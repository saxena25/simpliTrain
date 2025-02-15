import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Carousel } from "antd";
import { useRef, useState } from "react";
import SchedulesTab from "./Schedules";
import CourseVenueTab from "./CourseVenue";
import moment from "moment";
import { Link } from "react-router-dom";

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

export default function CourseDrawer({ open, onClose, batch }) {
  const [activeBatch, setActiveBatch] = useState(batch[0]);
  const [activeTab, setActiveTab] = useState("tab1");
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const selectedBatch = batch.find((b) => b.id === activeBatch?.id);

  // console.log("Group batches from drawer: ", batch);

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
    setActiveTab(tabName);
  };

  // console.log("batch no. ", batch.indexOf(activeBatch))

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className="relative z-50"
        style={{ zIndex: 1000 }}>
        <div className="fixed inset-0" style={{ background: "#00000040" }} />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden h-full">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full h-full p-0">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-4xl h-full transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 overflow-hidden">
                <div className="flex flex-col justify-between items-start w-full h-full bg-white">
                  <div className="w-full">
                    <div className="w-full flex flex-row justify-between gap-2 px-5 pt-5">
                      <div className="w-full">
                        <div className="">
                          <Carousel
                            ref={carouselRef}
                            draggable
                            slidesToShow={8}
                            slidesToScroll={1}
                            style={{ height: "100%" }}
                            id={"course-batch-slider"}>
                            {batch.map((item, idx) => (
                              <a
                                key={item.id}
                                className="px-5 py-1"
                                onClick={() => setActiveBatch(item)}>
                                <span
                                  className={`py-1 px-3 text-lg text-text rounded-full text-nowrap ${
                                    activeBatch == item
                                      ? "bg-gray-200 font-medium"
                                      : "bg-white font-normal"
                                  }`}>
                                  Batch {idx + 1}
                                </span>
                              </a>
                            ))}
                          </Carousel>
                        </div>
                      </div>
                      <div className="">
                        <div className="flex flex-row items-center justify-between px-3 gap-2">
                          {batch.length > 1 && (
                            <div className="flex flex-row border border-gray-3 rounded-full py-1 px-2 gap-3">
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
                          )}
                          <button
                            type="button"
                            onClick={() => onClose(false)}
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-full">
                      <div className="flex flex-col justify-start items-start py-4 px-8">
                        <div className="flex flex-row justify-between w-full items-start">
                          <div className="flex flex-col gap-4">
                            <h4 className="text-3xl text-text font-semibold flex flex-row justify-start items-center gap-4">
                              Batch {batch.indexOf(activeBatch) + 1}
                              <span className="py-px px-2 rounded-full border border-gray-400 text-sm text-gray-400">
                                {selectedBatch?.batchMode === null
                                  ? "No Mode"
                                  : selectedBatch?.batchMode}
                              </span>
                            </h4>
                            <div className="flex flex-row gap-3 text-gray-600 justify-start items-center">
                              <span>
                                {moment(selectedBatch?.startDate).format(
                                  "DD MMM YY"
                                )}{" "}
                                -{" "}
                                {moment(selectedBatch?.endDate).format(
                                  "DD MMM YY"
                                )}
                              </span>
                              |
                              <span>
                                {selectedBatch?.batchClasses?.length} classes
                              </span>
                              |
                              <span>
                                {selectedBatch?.numberOfClassPerWeek === null
                                  ? "!No Classes per week"
                                  : `${selectedBatch?.numberOfClassPerWeek} Classes per week`}{" "}
                              </span>
                              |
                              <span>
                                {selectedBatch?.durationPerClasss === null
                                  ? "!No minutes per Class"
                                  : `${selectedBatch?.durationPerClasss} min per class`}
                              </span>
                            </div>
                            <div className="flex flex-row gap-5 items-center justify-start">
                              <div className="flex -space-x-2 overflow-hidden">
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  className="inline-block size-8 rounded-full ring-2 ring-white"
                                />
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  className="inline-block size-8 rounded-full ring-2 ring-white"
                                />
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                  className="inline-block size-8 rounded-full ring-2 ring-white"
                                />
                                <img
                                  alt=""
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  className="inline-block size-8 rounded-full ring-2 ring-white"
                                />
                              </div>
                              <div className="flex flex-row gap-3 text-gray-600 justify-start items-center">
                                <span>
                                  {selectedBatch?.total_enrolled === 0
                                    ? "Be first to Enroll"
                                    : `${selectedBatch?.total_enrolled} Enrolled`}
                                </span>
                                |
                                <span>
                                  {selectedBatch?.remaningSeatas < 10
                                    ? `Few Seats Left Enroll Fast`
                                    : `${selectedBatch?.remaningSeatas} seats left`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row items-start justify-end">
                            <a className="rounded-full bg-primary hover:cursor-pointer px-3.5 py-2.5 w-48 flex justify-center text-sm font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                              Last day to register
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="relative border-b border-gray-200 py-0 px-8">
                        <nav
                          aria-label="Tabs"
                          className="-mb-px sticky top-0 flex space-x-8 justify-start">
                          {selectedBatch?.batchMode === "ONE ON ONE" || selectedBatch?.batchMode === "ONLINE" ? (
                            
                              <p
                               
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleTabClick("tab1");
                                }}
                                className={`${
                                  activeTab == "tab1"
                                    ? "border-gray-900 text-gray-900"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } whitespace-nowrap border-b-2 px-1 py-4 text-lg font-medium hover:cursor-pointer`}>
                                {"Schedules"}
                              </p>
                          ) : (
                            <>
                              <p
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleTabClick("tab1");
                                }}
                                className={`${
                                  activeTab == "tab1"
                                    ? "border-gray-900 text-gray-900"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } whitespace-nowrap border-b-2 px-1 py-4 text-lg font-medium hover:cursor-pointer`}>
                                {"Schedules"}
                              </p>
                              <p
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleTabClick("tab2");
                                }}
                                className={`${
                                  activeTab == "tab2"
                                    ? "border-gray-900 text-gray-900"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                } whitespace-nowrap border-b-2 px-1 py-4 text-lg font-medium hover:cursor-pointer`}>
                                {"Course Venue"}
                              </p>
                            </>
                          )}
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full overflow-auto">
                    <div className="flex flex-col w-full h-full items-start py-4 px-8">
                      {activeTab == "tab1" ? (
                        <SchedulesTab batch={selectedBatch} />
                      ) : activeTab == "tab2" ? (
                        <CourseVenueTab />
                      ) : null}
                    </div>
                  </div>
                  {/* footer */}
                  <div className="w-full border-t">
                    <div className="w-full flex flex-row justify-between items-center py-3 px-8">
                      <div>
                        <h4 className="flex flex-row justify-start items-center gap-3">
                          <span className="text-xl text-text font-semibold">
                            ₹ {selectedBatch?.discountedPrice}
                          </span>
                          <span className="text-sm text-gray-600 font-medium">
                            {((selectedBatch?.actualPrice -
                              selectedBatch?.discountedPrice) /
                              selectedBatch?.actualPrice) *
                              100}
                            % Off
                          </span>
                        </h4>
                        <h6 className="text-sm  text-gray-600 font-medium">
                          <del>₹ {selectedBatch?.actualPrice}</del>
                        </h6>
                      </div>
                      <div>
                        <Link className="rounded-2xl bg-primary px-3.5 py-2.5 w-48 flex justify-center text-lg font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                          Enroll Now
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
