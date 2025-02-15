import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Container } from "../../components/ui-components";
import FaqSection from "./FaqSection";
import HomeGetStarted from "./HomeGetStarted";
import FreeCourses from "./FreeCourses";
import SimilarInstructor from "./SimilarInstructor";
import FeaturedCourses from "./FeaturedCourses";
import PopularCourses from "./PopularCourses";
import WhySimplitrain from "./WhySimplitrain";
import OneOnOneLive from "./OneOnOneLive";
import NewlyLaunchedCourses from "./NewlyLaunchedCourses";
import TrendingCourses from "./TrendingCourses";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ChevronDownIcon,
  DocumentPlusIcon,
  FolderIcon,
  FolderPlusIcon,
  HashtagIcon,
  StarIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  DialogTitle,
} from "@headlessui/react";
import HomeSearch from "./HomeSearch";
import { checkIsMobile } from "../../utils/helpers";
import like from "../../assets/svgs/like.svg";
import notification from "../../assets/svgs/notification.svg";
import MobDrawer from "../../components/ui-components/MobDrawer";
import NotificationPage from "../notification";
import MobNotificationDrawer from "../../components/ui-components/MobNotificationDrawer";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import star from "../../assets/svgs/star.svg";
import {
  getAllCounts,
  getFeaturedCourses,
  getFreeCourses,
  getHomeFaqs,
  getNewAddedCourses,
  getOneOnOneCourses,
  getPopularCourses,
  getTopInstructors,
  getTrendingCourses,
} from "../../redux/home/actionCreator";
import store from "../../redux/store";
import Testimonial from "./Testimonial";
import { getTestimonialRequest } from "../../redux/testimonials/actionCreator";
import { data } from "autoprefixer";

const projects = [
  { id: 1, name: "Workflow Inc. / Website Redesign", url: "#" },
  // More projects...
];
const recent = [projects[0]];
const quickActions = [
  { name: "Add new file...", icon: DocumentPlusIcon, shortcut: "N", url: "#" },
  { name: "Add new folder...", icon: FolderPlusIcon, shortcut: "F", url: "#" },
  { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
  { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
];

const getFeaturedCourseList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getFeaturedCourses());
    if (responce && responce.type == "HOME_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getNewAddedCourseList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getNewAddedCourses());
    if (responce && responce.type == "HOME_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getPopularCourseList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getPopularCourses());
    if (responce && responce.type == "HOME_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getTestimonialList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getTestimonialRequest());
    if (responce && responce.type == "TEST_SUCCESS") {
      resolve(responce.data.data);
    } else {
      resolve([]);
    }
  });
};

const getOneOnOne = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getOneOnOneCourses());
    if (response && response.type === "HOME_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getInstructors = () =>{
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getTopInstructors());
    // console.log("Before Loader: ", response);
    if(response && response.type === "HOME_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([]);
    }
  })
}

const getFaqs = () =>{
  return new Promise(async (resolve, reject)=>{
    const response = await store.dispatch(getHomeFaqs());
    if(response && response.type === "HOME_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([]);
    }
  })
}

const getCounts = () =>{
  return new Promise(async (resolve,reject)=>{
    const response = await store.dispatch(getAllCounts());
    if(response && response.type === "HOME_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([])
    }
  })
}

const getFreeCoursesList = () =>{
  return new Promise (async(resolve, reject)=>{
    let response = await store.dispatch(getFreeCourses());
    if(response && response.type === "HOME_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([])
    }
  })
}

const getTrendingData = () =>{
  return new Promise (async(resolve, reject)=>{
    let response = await store.dispatch(getTrendingCourses());
    if(response && response.type === "HOME_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([])
    }
  })
}

export async function homeLoader() {
  const featuredCourses = await getFeaturedCourseList();
  const newAddedCourses = await getNewAddedCourseList();
  const popularCourses = await getPopularCourseList();
  const testimonialData = await getTestimonialList();
  const oneOnOneData = await getOneOnOne();
  const topInstructor = await getInstructors();
  const homeFaq = await getFaqs();
  const counts = await getCounts();
  const freeCourses = await getFreeCoursesList();
  const trendingCourses = await getTrendingData();

  return {
    date: new Date().toISOString(),
    featuredCourses: featuredCourses,
    newAddedCourses: newAddedCourses,
    popularCourses: popularCourses,
    testimonialData: testimonialData,
    oneOnOneData: oneOnOneData,
    topInstructor: topInstructor,
    homeFaq: homeFaq,
    counts: counts,
    freeCourses: freeCourses,
    trendingCourses: trendingCourses
  };
}

const suggestData = [
  { name: "Artificial Intelligence" },
  { name: "Product Design" },
  { name: "UX Laws" },
  { name: "UX Research" },
  { name: "Heuristic Evaluation" },
];

const searchData = [
  { name: "Python" },
  { name: "Python for beginners" },
  { name: "Python Programming" },
  { name: "Data Science" },
  { name: "Web Development" },
  { name: "Esports" },
];

const popularInstructor = [
  { name: "Rohan Joshi", rating: 4.8 },
  { name: "Albert Kumar", rating: 2.2 },
  { name: "Ashish", rating: 6.4 },
  { name: "Harry Singh", rating: 2.8 },
  { name: "Narendra Modi", rating: 10 },
  { name: "Amit Shah", rating: 9.9 },
  { name: "Hrithik", rating: 4.9 },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = checkIsMobile();
  const MobSearchRef = useRef(null);
  const filteredProjects =
  query === ""
  ? []
  : projects.filter((project) => {
    return project.name.toLowerCase().includes(query.toLowerCase());
  });
  let loadingData = useLoaderData();
  const [allCounts, setAllCounts] = useState(loadingData.counts || {});
      
  // console.log("trending Course: ", loadingData.trendingCourses);
  // console.log("Home Instructor: ", loadingData.topInstructor);
  // console.log("Home oneOnOneData: ", loadingData.oneOnOneData);
  // console.log("loadingData", loadingData);
  // console.log("Home LoaderData: ", loadingData.popularCourses)
  useEffect(() => {
    if (MobSearchRef.current) {
      MobSearchRef.current.focus();
    }
  }, []);
  return (
    <>
      <section className="relative bg-[#F0F0F0] md:py-16">
        <Container className={`max-w-[100%] lg:px-0 ${isMobile ? "py-5" : ""}`}>
          {isMobile ? (
            <div className="flex flex-col gap-12 pb-10">
              <div className="py-5 flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2">
                  {/* <Logo /> */}
                  <h1 className="text-lg font-bold text-secondary">
                    SimpliTrain
                  </h1>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-1 text-sm font-semibold text-secondary  border">
                        Categories
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 size-5 text-secondary"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                      <div className="py-1 px-2">
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm whitespace-nowrap text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Learners
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm whitespace-nowrap text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Instructors
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm whitespace-nowrap text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Venue Providers
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <button onClick={() => navigate("/dashboard/wishlist")}>
                    <img src={like} alt="" />
                  </button>
                  <button onClick={() => setNotificationOpen(true)}>
                    <img src={notification} alt="" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 justify-center items-center">
                <div className="flex flex-row gap-2">
                  <h2 className="text-4xl font-semibold">Unlock</h2>
                  <img
                    src={require("../../assets/images/home-banner.png")}
                    className="w-36"
                    alt=""
                  />
                </div>
                <h2 className="text-4xl font-semibold">Live Learning</h2>
              </div>
            </div>
          ) : (
            <div className="mx-auto md:h-96 text-center flex justify-center items-end">
              <h2 className="text-6xl font-semibold tracking-tight text-gray-900 w-full flex justify-center items-center gap-3">
                <span>Unlock</span>{" "}
                <img
                  src={require("../../assets/images/home-banner.png")}
                  className="w-[132px]"
                  alt=""
                />{" "}
                <span>Live Learning</span>
              </h2>
            </div>
          )}
        </Container>
        <div
          className={`absolute flex justify-center w-full -bottom-6 ${
            isMobile && "px-5"
          }`}
          onClick={() => setSearchOpen(true)}>
          <HomeSearch />
        </div>

        {/* Search Drawer */}
        {isMobile && (
          <Dialog
            open={searchOpen}
            onClose={setSearchOpen}
            className="relative z-50">
            <div
              className="fixed inset-0"
              style={{ background: "#00000040" }}
            />
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
                  <DialogPanel
                    transition
                    className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-y-full sm:duration-700 overflow-hidden">
                    <div className="w-full flex h-full flex-col overflow-y-auto bg-white  py-6 shadow-xl">
                      <div className=" sm:px-6">
                        <div className="flex items-center justify-between">
                          <DialogTitle className="w-full">
                            <div className="fixed top-0 w-full bg-white z-20 py-2 px-5">
                              <div className="relative w-full border border-secondary rounded-full bg-white">
                                <input
                                  type="text"
                                  ref={MobSearchRef}
                                  className="w-full pl-14 focus:ring-0 border-none rounded-full"
                                  placeholder="What would you like to learn?"
                                />
                                <img
                                  src={reviewLeftArrow}
                                  className="absolute top-2.5 left-3 w-6"
                                  alt=""
                                  onClick={() => setSearchOpen(false)}
                                />
                              </div>
                            </div>
                          </DialogTitle>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="relative mt-10 flex-1 px-4 sm:px-6">
                        <div>
                          <div className="flex flex-col gap-2">
                            <h2 className="text-base text-[#000000] font-medium">
                              Suggested
                            </h2>
                            <div className="flex flex-row flex-wrap gap-1">
                              {suggestData.map((ele, index) => (
                                <p
                                  key={index}
                                  className="text-sm border border-gray-500 rounded-full px-2 py-1 w-fit">
                                  {ele?.name}
                                </p>
                              ))}
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                              {searchData.map((ele, index) => (
                                <p className="flex flex-row items-center gap-2">
                                  <MagnifyingGlassIcon className="h-5 w-5" />
                                  <span className="text-base text-black">
                                    {ele.name}
                                  </span>
                                </p>
                              ))}
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                              <h2 className="text-base font-medium">
                                Popular Instructor
                              </h2>
                              <div className="grid grid-cols-3 gap-2">
                                {popularInstructor.map((ele, index) => (
                                  <div className="relative flex flex-col gap-1">
                                    <div className="bg-[#F7F7F7] w-24 h-24 rounded-xl"></div>
                                    <p className="absolute top-2 left-2 flex flex-row gap-px">
                                      <img src={star} alt="" />
                                      <span className="text-xs">
                                        {ele?.rating}
                                      </span>
                                    </p>
                                    <p className="text-sm font-medium pl-1">
                                      {ele?.name}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </div>
          </Dialog>
        )}

        {/* notification drawer */}
        {isMobile && (
          <MobNotificationDrawer
            open={notificationOpen}
            onClose={setNotificationOpen}
          />
        )}
      </section>

      <section className={`py-16 ${isMobile && "px-0"}`}>
        <Container className={`max-w-[100%] lg:px-0 ${isMobile && "px-0"}`}>
          <div
            className={`flex flex-row md:justify-center items-center md:gap-4 ${
              isMobile &&
              "justify-start overflow-x-scroll scroll whitespace-nowrap scroll-smooth gap-1"
            } custom-scroll`}>
            <a className="px-4 py-1 border border-gray-300 bg-white rounded-full text-sm md:text-base">
              Artificial Intelligence
            </a>
            <a className="px-4 py-1 border border-gray-300 bg-white rounded-full text-sm md:text-base">
              Product Design
            </a>
            <a className="px-4 py-1 border border-gray-300 bg-white rounded-full text-sm md:text-base">
              UX Research
            </a>
            <a className="px-4 py-1 border border-gray-300 bg-white rounded-full text-sm md:text-base">
              Prototyping
            </a>
            <a className="px-4 py-1 border border-gray-300 bg-white rounded-full text-sm md:text-base">
              Heuristic Evaluation
            </a>
            <a className="px-4 py-1 border border-gray-300 bg-white rounded-full text-sm md:text-base">
              UX Laws
            </a>
          </div>
        </Container>
      </section>
      <section className="md:py-12 ">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="bg-[#D9D9D966] pt-28 rounded-2xl flex justify-start items-end p-5 text-sm font-medium text-text"
              onClick={() => {
                navigate("/courses", { state: { mode: "ALL" } });
              }}>
              Newly Launched courses
            </button>
            <button
              className="bg-[#D9D9D966] pt-28 rounded-2xl flex justify-start items-end p-5 text-sm font-medium text-text"
              onClick={() =>
                navigate("/courses", { state: { mode: "ONLINE" } })
              }>
              Online Courses
            </button>
            <button
              className="bg-[#D9D9D966] pt-28 rounded-2xl flex justify-start items-end p-5 text-sm font-medium text-text"
              onClick={() =>
                navigate("/courses", { state: { mode: "CLASSROOM" } })
              }>
              Class room
            </button>
            <button
              className="bg-[#D9D9D966] pt-28 rounded-2xl flex justify-start items-end p-5 text-sm font-medium text-text"
              onClick={() =>
                navigate("/courses", { state: { mode: "ONE ON ONE" } })
              }>
              One on One
            </button>
          </div>
        </Container>
      </section>
      <section className="py-12 md:py-16">
        <Container>
          <h3 className="text-center font-bold text-lg md:text-3xl mb-4 md:mb-6">
            Partnering with{isMobile && <br />} world leading companies
          </h3>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <a className="md:p-5 text-sm font-medium text-text">
              <img src={require("../../assets/images/logo.png")} />
            </a>
            <a className="md:p-5 text-sm font-medium text-text">
              <img src={require("../../assets/images/logo.png")} />
            </a>
            <a className="md:p-5 text-sm font-medium text-text">
              <img src={require("../../assets/images/logo.png")} />
            </a>
            <a className="md:p-5 text-sm font-medium text-text">
              <img src={require("../../assets/images/logo.png")} />
            </a>
          </div>
        </Container>
      </section>
      <section className="py-16 ">
        <Container>
          <FeaturedCourses courses={loadingData.featuredCourses} />
        </Container>
      </section>
      <section className="py-10 md:py-16 ">
        <Container>
          <h3 className="text-center font-bold text-lg md:text-3xl lg:text-3xl mb-2 md:mb-3">
            Real Storied, Incredible Journeys
          </h3>
          <p className="text-center font-normal text-sm mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry
          </p>
          <div className="flex items-center justify-center gap-2 md:gap-8">
            <p className="px-3 py-5 md:p-5 text-sm font-medium text-text flex flex-col md:gap-1 justify-center md:justify-start items-center">
              <span className="text-xl md:text-5xl text-text font-bold">
                {allCounts?.courseCount}+
              </span>
              <span className="text-sm md:text-lg text-text font-medium md:font-normal md:-ml-5">
                Courses
              </span>
            </p>
            <p className="px-3 py-5 md:p-5 text-sm font-medium text-text flex flex-col md:gap-1 justify-start items-center">
              <span className="text-xl md:text-5xl text-text font-bold">
                {allCounts?.learnerCount}+
              </span>
              <span className="text-sm md:text-lg text-text font-medium md:font-normal md:-ml-5">
                Learners
              </span>
            </p>
            <p className="px-3 py-5 md:p-5 text-sm font-medium text-text flex flex-col md:gap-1 justify-start items-center">
              <span className="text-xl md:text-5xl text-text font-bold">
              {allCounts?.instructorCount}+
              </span>
              <span className="text-sm md:text-lg text-text font-medium md:font-normal md:-ml-5">
                Instructors
              </span>
            </p>
            {/* <p className="px-3 py-5 md:p-5 text-sm font-medium text-text flex flex-col md:gap-1 justify-start items-center">
              <span className="text-xl md:text-5xl text-text font-bold">
              {allCounts?.venueProviderCount}+
              </span>
              <span className="text-sm md:text-lg text-text font-medium md:font-normal md:-ml-5">
                Venues
              </span>
            </p> */}
          </div>
        </Container>
      </section>

      <section className="py-16 ">
        <Container>
          <PopularCourses courses={loadingData.popularCourses} />
        </Container>
      </section>
      <section className="md:py-16 ">
        <Container>
          <WhySimplitrain />
        </Container>
      </section>
      <section className="py-16 ">
        <Container>
          <NewlyLaunchedCourses courses={loadingData.newAddedCourses} />
        </Container>
      </section>
      <section className="md:py-16 ">
        <Container>
          <OneOnOneLive data={loadingData.oneOnOneData} />
        </Container>
      </section>
      <section className="py-16 ">
        <Container className="text-center">
          <div className="flex flex-row justify-center items-center mb-6 md:mb-16">
            <h5 className="text-2xl md:text-6xl font-bold ">
              Popular Category
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F0F0F0] rounded-2xl px-5 py-10 flex justify-center text-center items-center text-xl md:text-2xl text-text font-medium">
                  Finance & Accounting
                </div>
                <div className="bg-[#F0F0F0] rounded-2xl px-5 py-10 flex justify-center text-center items-center text-xl md:text-2xl text-text font-medium">
                  Personal Development
                </div>
                <div className="col-span-2 bg-[#F0F0F0] rounded-2xl px-5 py-10 flex justify-center items-center text-xl md:text-2xl text-text font-medium">
                  Teaching & Academics
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`${
                    isMobile && "col-span-2 h-64 text-xl"
                  } md:row-span-2 bg-[#F0F0F0] rounded-2xl px-5 py-10 flex justify-center items-center md:text-2xl text-text font-medium`}>
                  Photography & Video
                </div>
                <div className="bg-[#F0F0F0] rounded-2xl px-5 py-10 flex justify-center items-center text-xl md:text-2xl text-text font-medium">
                  Health & Fitness
                </div>
                <div className="bg-[#F0F0F0] rounded-2xl px-5 py-10 flex justify-center items-center text-xl md:text-2xl text-text font-medium">
                  Lifestyle
                </div>
              </div>
            </div>
          </div>
          <button
            className="text-lg text-text font-medium border border-black rounded-full px-5 py-1 mt-5 hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
            onClick={() => navigate("/categories")}>
            Explore All Category
          </button>
        </Container>
      </section>

      <section className="md:py-16 ">
        <Container>
          <TrendingCourses data={loadingData.trendingCourses} />
        </Container>
      </section>

      <section className="py-16 ">
        <Container>
          <SimilarInstructor data={loadingData.topInstructor} />
        </Container>
      </section>
      <section className="md:py-16 ">
        <Container>
          <h3 className="text-center text-2xl  md:text-3xl font-bold mb-10">
            Choose Your Learning Path
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a className="bg-[#D9D9D966] rounded-4xl flex flex-col justify-center items-start px-6 py-10 md:py-16 text-sm font-medium text-text">
              <span className="text-text text-base md:text-3xl font-semibold">
                Online Courses
              </span>
              <span className="text-gray-500 text-sm md:text-2xl">{allCounts?.onlineCount} courses</span>
            </a>
            <a className="bg-[#D9D9D966] rounded-4xl flex flex-col justify-center items-start px-6 py-10 md:py-16 text-sm font-medium text-text">
              <span className="text-text text-base md:text-3xl font-semibold">
                Classroom Courses
              </span>
              <span className="text-gray-500 text-sm md:text-2xl">{allCounts?.classroomCount} courses</span>
            </a>
            <a className="bg-[#D9D9D966] rounded-4xl flex flex-col justify-center items-start px-6 py-10 md:py-16 text-sm font-medium text-text">
              <span className="text-text text-base md:text-3xl font-semibold">
                One on One
              </span>
              <span className="text-gray-500 text-sm md:text-2xl">{allCounts?.oneOnOneCount} courses</span>
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16 ">
        <Container className="max-w-[100%] lg:px-0">
          <FreeCourses data={loadingData.freeCourses} />
        </Container>
      </section>
      <section className="py-6">
        <Container className="max-w-[100%] lg:px-0">
          <Testimonial data={loadingData.testimonialData} />
        </Container>
      </section>
      <section className="bg-white md:py-16">
        <Container>
          <div className="w-full text-center flex flex-col gap-4 justify-center items-center mb-10">
            <h3 className="text-text text-2xl md:text-6xl font-semibold">
              Enhance Your Learning Journey
            </h3>
            <p className="text-gray-800 text-sm md:text-lg font-normal">
              Track your progress effortlessly with Simplitrain. Log in to your
              account and gain the skills you need to succeed.
            </p>
            <Link
              to="/courses"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Enroll for free classes
            </Link>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={require("../../assets/images/enhance_your_learning_journey.png")}
            />
          </div>
        </Container>
      </section>
      <section className="bg-white py-10 md:py-0">
        {/* <Container > */}
        <div className="grid grid-cols-12">
          <div className="bg-[#585E6D] pl-5 md:pl-40 pr-10 py-32 col-span-8">
            <div className="w-full max-w-xl flex flex-col gap-6 justify-start items-start">
              <h1 className="text-white text-2xl md:text-6xl font-semibold tracking-tight text-gray-900">
                Share Your Expertise. Become a Simplitrain Instructor.
              </h1>
              <p className="text-white text-sm md:text-lg font-medium text-gray-500 sm:text-xl/8">
                Empower others by sharing your knowledge. Join our passionate
                instructor community and create high-quality online courses on
                Simplitrain. Reach a global audience and make a difference in
                the lives of learners everywhere.
              </p>
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-text shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Become an Instructor
              </a>
            </div>
          </div>
          <div className="relative bg-[#F0F1F4] col-span-4 ">
            {/* <img
              alt=""
              src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            /> */}
          </div>
        </div>
        {/* </Container> */}
      </section>
      <section className="bg-white py-16">
        <Container>
          <FaqSection faqs={loadingData.homeFaq} />
        </Container>
      </section>
      <section className="bg-white md:py-16">
        <Container>
          <HomeGetStarted />
        </Container>
      </section>
    </>
  );
}
