import { Fragment, useEffect, useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import FilterSideBar from "./filterSidebar";
import { Button, Container } from "../../components/ui-components";
import CourseCard from "./courseCard";
import { Filter } from "../../components/icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { checkIsMobile } from "../../utils/helpers";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import filter from "../../assets/svgs/filter.svg";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import store from "../../redux/store";
import { getCourseCategory, getCourses } from "../../redux/courses/actionCreator";
import CourseItemCard from "../../components/shared-components/CourseItemCard";
import { useDispatch, useSelector } from "react-redux";
import CoursesAll from "./CoursesAll";
import { getLanguages } from "../../redux/master_data/actionCreator";

const popularOptions = [
  {
    label: "Most Popular",
    key: "Popular",
  },
  {
    label: "Newly Added",
    key: "Newly Added",
  },
  {
    label: "High to Low Reviews",
    key: "reviews_high",
  },
  {
    label: "Low to High Reviews",
    key: "reviews_low",
  },
  {
    label: "Price: Low to High",
    key: "price_low",
  },
  {
    label: "Price: High to Low",
    key: "price_high",
  },
  {
    label: "Shortest Duration",
    key: "shortest_duration",
  },
  {
    label: "Longest Duration",
    key: "longest_duration",
  },
];

const ratingOptions = [
  {
    label: "4.5 and above",
    key: "4.5",
  },
  {
    label: "4.0 and above",
    key: "4.0",
  },
  {
    label: "3.5 and above",
    key: "3.5",
  },
  {
    label: "3.0 and above",
    key: "3.0",
  },
  {
    label: "2.5 and above",
    key: "2.5",
  },
  {
    label: "2.0 and above",
    key: "2.0",
  },
  {
    label: "1.5 and above",
    key: "1.5",
  },
];

const courseLevelOptions = [
  {
    label: "ALL",
    key: "ALL",
  },
  {
    label: "BEGINNER",
    key: "BEGINNER",
  },
  {
    label: "INTERMEDIATE",
    key: "INTERMEDIATE",
  },
  {
    label: "ADVANCED",
    key: "ADVANCED",
  },
];

const durationOptions = [
  {
    label: "Hours",
    key: "hours",
  },
  {
    label: "Days",
    key: "days",
  },
  {
    label: "Weeks",
    key: "weeks",
  },
  {
    label: "Months",
    key: "months",
  },
];

const getCoursesList = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log("getCoursesList data: ", data);
    const response = await store.dispatch(getCourses(data));
    // console.log("responceresponceresponce", responce);
    if (response && response.type === "COURSES_SUCCESS") {
      resolve(response.data);
    } else {
      console.error("Courses fetch failed, resolving with empty array.");
      resolve([]);
    }
  });
};

const allLanguages = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getLanguages());
    console.log("Language 1: ", response);
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getCourseCategory());
    console.log("index 001: ", response);
    if (response && response.type === "COURSES_SUCCESS") {
      resolve(response.data);
    } else {
      console.log("not sending data");
      resolve([]);
    }
  });
};

export async function coursesLoader() {
  const courses = await getCoursesList();
  const languages = await allLanguages();
  const categories = await getAllCategories();

  console.log("loader index: ", categories);

  return {
    date: new Date().toISOString(),
    courses: courses,
    languages: languages,
    categories: categories,
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sort = [
  { id: 1, name: "Sort" },
  { id: 2, name: "Ascending" },
  { id: 3, name: "Descending" },
];

export default function Courses() {
  let loaderData = useLoaderData();
  const location = useLocation();
  const instructorId = location?.state?.instructorId;
  const categoryId = location?.state?.categoryId;
  const subCategoryId = location?.state?.subCategoryId;
  const mode = location?.state?.mode; //From Home
  const dispatch = useDispatch();
  const [courses, setCourses] = useState(loaderData.courses || []);
  const [sorting, setSorting] = useState("Popular");
  const [rating, setRating] = useState("Rating");
  const [courseLevel, setCourseLevel] = useState("Course Level");
  const [duration, setDuration] = useState("Duration");
  const [filterSidebar, setFilterSidebar] = useState(false);
  const tabsData = [
    { name: "All", href: "#", current: true },
    { name: "Online", href: "#", current: false },
    { name: "Classroom", href: "#", current: false },
    { name: "One on One", href: "#", current: false },
  ];
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );
  const isMobile = checkIsMobile();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});

  console.log("Mode From Home: ", mode);
  // console.log("CourseByMe Courses Instructor: ", instructorId);
  // console.log("CategoryId & SubCategoryId from SimilarCourses: ", categoryId, subCategoryId);

  const handleChange = (name) => {
    setFilters((prev) => ({ ...prev, courseLevel: name }));
  };

  const handleTabClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);

      setTabs((prevTabs) =>
        prevTabs.map((tab) => ({
          ...tab,
          current: tab.name === tabName,
        }))
      );
      fetchCourses(tabName, filters);
    }
  };

  const fetchCourses = async (tabName, appliedFilters) => {
    let response;
    const batchMode =
      tabName === "All"
        ? "ALL"
        : tabName === "Online"
        ? "ONLINE"
        : tabName === "Classroom"
        ? "OFFLINE"
        : "ONE ON ONE";

    try {
      response = await getCoursesList({ batchMode, ...appliedFilters });
      setCourses(response || []);
    } catch (error) {
      console.log("Error Fetching Courses", error);
    }
  };

  useEffect(() => {
    fetchCourses(activeTab, filters);
  }, [filters]);

  useEffect(() => {
    fetchCourses("All", filters);
  }, []);

  const applySorting = (action) => {
    setSorting(action.key);
  };

  const applyRating = (action) => {
    setRating(action.key);
  };

  const applyCourseLevel = (action) => {
    setCourseLevel(action.key);
  };
  const applyDuration = (action) => {
    setDuration(action.key);
  };

  return (
    <>
      <div className="bg-white flex flex-row justify-start items-stretch custom-scroll h-[calc(100vh-64px)]">
        <div
          className={`hidden md:flex h-[calc(100vh-64px)] transition-all duration-300 ease-in-out w-96 ${
            filterSidebar ? "ml-0" : "-ml-96"
          }`}>
          <FilterSideBar
            filters={filters}
            setFilters={setFilters}
            onClose={setFilterSidebar}
            languages={loaderData.languages}
            categories={loaderData.categories}
          />
        </div>

        <div className="flex flex-col w-full custom-scroll">
          {isMobile && (
            <div className="flex flex-row gap-4 pt-8 sticky top-0 z-10 bg-white border-b pb-2 px-5">
              <div className="bg-white rounded-full flex justify-center items-center">
                <img src={reviewLeftArrow} alt="" className="py-2 px-3" />
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-[#F0F0F0] border-none rounded-full pl-12 py-3"
                />
                <MagnifyingGlassIcon className="w-5 absolute top-[14px] left-4 text-[#363A49]" />
              </div>
            </div>
          )}
          <div className="border-b border-b-gray-5 md:pt-6 sticky top-16 z-10">
            <div className="flex flex-row justify-center items-center w-full p-4">
              <h3 className="text-text text-2xl md:text-3xl text-center font-medium">
                {"Guitar for Beginner"}
              </h3>
            </div>
            <div className="md:sticky top-0 bg-white">
              <Container>
                <div className=" flex flex-row justify-between w-full items-center">
                  <div className="mb-3 hidden md:flex">
                    <button
                      onClick={() => setFilterSidebar(!filterSidebar)}
                      className={
                        "bg-white border border-gray-5 rounded-full px-4 py-2 text-sm inline-flex gap-2 justify-center font-semibold text-text items-center"
                      }>
                      <Filter /> <span>Filter</span>
                    </button>
                  </div>
                  <div className="md:pt-3 m-auto md:m-0">
                    <nav
                      className={`flex md:gap-8 justify-center ${
                        isMobile &&
                        " overflow-x-scroll scroll whitespace-nowrap scroll-smooth custom-scroll"
                      }`}>
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
                            "whitespace-nowrap border-b-2 px-1 py-4 text-base md:text-lg lg:text-lg xl:text-lg font-medium"
                          )}>
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="hidden md:flex mb-3">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex justify-center items-center border border-gray-5 w-full gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-text">
                          {sorting}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="-mr-1 size-5 text-gray-400"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                        <div className="py-1">
                          {popularOptions.map((item, index) => (
                            <MenuItem
                              key={index}
                              onClick={() => applySorting(item)}>
                              <a className="flex flex-row justify-between items-center px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none font-medium">
                                <span>{item.label}</span>
                                {sorting == item.key ? (
                                  <CheckIcon className="size-4" />
                                ) : null}
                              </a>
                            </MenuItem>
                          ))}
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div className="overflow-y-auto custom-scroll">
            <Container className="w-full">
              <div className="pt-5 flex flex-row gap-4 w-full">
                {/* rating */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex justify-center items-center border border-gray-5 w-full gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-text">
                      {rating}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-5 text-gray-400"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute -right-26 z-20 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">
                      {ratingOptions.map((item, index) => (
                        <MenuItem key={index} onClick={() => applyRating(item)}>
                          <p className="flex flex-row justify-between items-center px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none font-medium whitespace-nowrap">
                            <span>{item.label}</span>
                            {sorting == item.key ? (
                              <CheckIcon className="size-4" />
                            ) : null}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                {/* Course Level */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex justify-center items-center border border-gray-5 w-full gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-text">
                      {courseLevel}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-5 text-gray-400"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">
                      {courseLevelOptions.map((item, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            applyCourseLevel(item);
                            handleChange(item.key);
                          }}>
                          <p className="flex flex-row justify-between items-center px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none font-medium whitespace-nowrap">
                            <span>{item.label}</span>
                            {sorting == item.key ? (
                              <CheckIcon className="size-4" />
                            ) : null}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                {/* Duration */}
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex justify-center items-center border border-gray-5 w-full gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-text">
                      {duration}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-5 text-gray-400"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-20 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-1">
                      {durationOptions.map((item, index) => (
                        <MenuItem key={index} onClick={() => applyDuration(item)}>
                          <p className="flex flex-row justify-between items-center px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none font-medium whitespace-nowrap">
                            <span>{item.label}</span>
                            {sorting == item.key ? (
                              <CheckIcon className="size-4" />
                            ) : null}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </Container>
            {isMobile && (
              <div className="h-fit pl-2 pt-5 flex flex-row justify-start overflow-x-auto scroll gap-1 whitespace-nowrap scroll-smooth custom-scroll">
                <button
                  className="h-10 rounded-3xl border"
                  onClick={() => setOpen(true)}>
                  <img src={filter} alt="" className="px-5 py-2 max-w-none" />
                </button>

                {/* sort */}
                <select
                  name="sort"
                  className="h-10 border border-gray-300 rounded-full w-20 px-4 py-2">
                  <option value="#">Sort</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
                {/* rating */}
                <select
                  name="Rating"
                  className="h-10 border border-gray-300 rounded-full w-24 px-4 py-2">
                  <option value="#">Rating</option>
                  <option value="4.5 above">4.5 & Above</option>
                  <option value="3 above">3 & Above</option>
                  <option value="2 above">2 & Above</option>
                  <option value="1 above">1 & Above</option>
                </select>
                {/* course level */}
                <select
                  name="courseLevel"
                  className="h-10 border border-gray-300 rounded-full w-36 pl-4 pr-8 py-2">
                  <option value="#">Course Level</option>
                  <option value="all">All Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advance">Advance</option>
                </select>
                {/* Duration */}
                <select
                  name="duration"
                  className="h-10 border border-gray-300 rounded-full w-28 px-4 py-2">
                  <option value="#">Duration</option>
                  <option value="all">All</option>
                  <option value="one day">One day Course</option>
                  <option value="weekly">Weekly Course</option>
                </select>
                {/* Discount */}
                <select
                  name="discount"
                  className="h-10 border border-gray-300 rounded-full w-28 px-4 py-2">
                  <option value="#">Discount</option>
                  <option value="10% above">10% & Above</option>
                  <option value="20% above">20% & Above</option>
                  <option value="30% above">30% & Above</option>
                  <option value="40% above">40% & Above</option>
                  <option value="50% above">50% & Above</option>
                </select>
              </div>
            )}
            {activeTab === "All" ? (
              <CoursesAll courses={courses} setFilters={setFilters} filters={filters} />
            ) : activeTab === "Online" ? (
              <CoursesAll courses={courses} setFilters={setFilters} filters={filters} />
            ) : activeTab === "Classroom" ? (
              <CoursesAll courses={courses} setFilters={setFilters} filters={filters} />
            ) : (
              activeTab === "One on One" && <CoursesAll courses={courses} setFilters={setFilters} filters={filters} />
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <div className="fixed inset-0" style={{ background: "#00000040" }} />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-y-full sm:duration-700  overflow-hidden">
                  <div className="w-full flex h-full flex-col overflow-y-auto bg-white  py-6 shadow-xl">
                    <div className="px-4 sm:px-6 border-b pb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-medium">Filter</span>
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
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <FilterSideBar onClose={setFilterSidebar} />
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
