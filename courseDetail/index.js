import { act, Fragment, useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { uid } from "uid";
import AboutCourse from "./AboutCourse";
import Curriculum from "./Curriculum";
import { Button, Container } from "../../components/ui-components";
import CourseRightPart from "./CourseRightPart";
import CourseInfo from "./CourseInfo";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import CourseIncludes from "./CourseIncludes";
import CourseTabs from "./CourseTabs";
import Prerequisites from "./Prerequisites";
import WhomeCourse from "./WhomeCourse";
import CourseReview from "./CourseReview";
import SimilarCourses from "./SimilarCourses";
import CoursesByMe from "./CoursesbyMe";
import NewsLetterCourse from "./NewsLetter";
import { checkIsMobile } from "../../utils/helpers";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { setCourseVisit } from "../../redux/home/actionCreator";
import store from "../../redux/store";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  getCourseById,
  getSimilarCourseById,
  getBatchByCourseId,
  addToWishlist,
  getOtherCoursesByInstructor,
} from "../../redux/courses/actionCreator";

const getCourseDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getCourseById({ courseId: id }));
    if (responce && responce.type == "COURSE_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getSimilarCourses = (id) => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(
      getSimilarCourseById({ courseId: id })
    );
    if (responce && responce.type == "COURSE_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getBatchOfCourses = (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getBatchByCourseId({ courseId: id }));
    if (response && response.type === "COURSE_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export async function courseDetailLoader({ params }) {
  const course = await getCourseDetails(params.courseid);
  const SimilarCourses = await getSimilarCourses(params.courseid);
  const batches = await getBatchOfCourses(params.courseid);

  return {
    date: new Date().toISOString(),
    course: course,
    SimilarCourses: SimilarCourses,
    batches: batches,
  };
}

export default function CourseDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.login);
  const isMobile = checkIsMobile();
  const { courseid } = useParams();
  const logedinUser = useSelector((state) => {
    return state.auth.data;
  });
  // const myProfile = useSelector(state=>{
  //   return state.auth.data
  // })
  let loadingData = useLoaderData();
  // console.log("loadingData", loadingData);
  const navigate = useNavigate();
  const [otherCoursesInstructor, setOtherCoursesInstructor] = useState();
  const otherCoursesData = {
    instructorId: loadingData?.course?.instructor?.instructor_onboarding?.id,
    courseId: courseid,
  };
  const oneOnOneBatches = loadingData?.batches?.oneOnOneBatches || [];
  const groupBatches = loadingData?.batches?.groupBatches || [];
  const [batchClasses, setBatchClasses] = useState(
    groupBatches?.[0]?.batchClasses || oneOnOneBatches?.[0]?.batchClasses || []
  );
  const [groupDrawer, setGroupDrawer] = useState(false);

  const setCourseVisitAction = async (data) => {
    const response = await store.dispatch(setCourseVisit(data));
    if (response && response.type == "VISIT_SUCCESS") {
      console.log("response.data", response.data);
    } else {
    }
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime; // Duration in milliseconds

    const hours = Math.floor(durationMs / (1000 * 60 * 60)); // Convert to hours
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining to minutes

    return { hours, minutes };
  };

  const durations = batchClasses
    .filter((batchClass) => batchClass.start_time && batchClass.end_time) // Ensure valid data
    .map((batchClass) => {
      const duration = calculateDuration(
        batchClass.start_time,
        batchClass.end_time
      );
      return {
        id: batchClass.id,
        duration,
      };
    });

  // Find the lowest duration
  const lowestDuration =
    durations.length > 0
      ? durations.reduce((prev, curr) => {
          const prevTotalMinutes =
            prev.duration.hours * 60 + prev.duration.minutes;
          const currTotalMinutes =
            curr.duration.hours * 60 + curr.duration.minutes;
          return currTotalMinutes < prevTotalMinutes ? curr : prev;
        })
      : null;

  // for course duration
  const courseDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime; // Duration in milliseconds
    const durationDays = durationMs / (1000 * 60 * 60 * 24); // Convert to days

    let durationLabel;

    if (durationDays < 1) {
      durationLabel = "Less than a day";
    } else if (durationDays < 7) {
      durationLabel = `${Math.floor(durationDays)} day${
        Math.floor(durationDays) > 1 ? "s" : ""
      }`;
    } else if (durationDays < 30) {
      durationLabel = `${Math.floor(durationDays / 7)} week${
        Math.floor(durationDays / 7) > 1 ? "s" : ""
      }`;
    } else {
      durationLabel = `${Math.floor(durationDays / 30)} month${
        Math.floor(durationDays / 30) > 1 ? "s" : ""
      }`;
    }

    return durationLabel;
  };

  const courseDurations = batchClasses
    .filter((batchClass) => batchClass.start_time && batchClass.end_time) // Ensure valid data
    .map((batchClass) => {
      const duration = courseDuration(
        batchClass.start_time,
        batchClass.end_time
      );
      return {
        id: batchClass.id,
        duration,
      };
    });

  // Find the shortest duration
  const courseLowestDuration =
    courseDurations.length > 0
      ? courseDurations.reduce((prev, curr) => {
          const prevDays = parseInt(prev.duration);
          const currDays = parseInt(curr.duration);
          return currDays < prevDays ? curr : prev;
        })
      : null;

  // console.log("Course Duration: ", courseLowestDuration);

  useEffect(() => {
    setCourseVisitAction({
      userId: logedinUser && logedinUser.id ? logedinUser.id : uid(16),
      courseId: courseid,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const otherCourses = async () => {
      const response = await dispatch(
        getOtherCoursesByInstructor(otherCoursesData)
      );
      if (response && response.type === "COURSES_SUCCESS") {
        setOtherCoursesInstructor(response.data);
        // console.log('otherCourses by Instructor: ', response.data);
      } else {
        console.log("Error Other Courses");
      }
    };
    otherCourses();
  }, []);

  return (
    <div className="bg-white relative">
      <section className="bg-gray-3 py-9">
        {isMobile && (
          <div className="flex flex-row justify-between items-center px-5">
            <button
              className="bg-white p-2 rounded-full"
              onClick={() => navigate("/courses")}>
              <ArrowLeftIcon className="size-6" />
            </button>
            <div className="flex flex-row gap-6">
              <button>
                {/* <img src="" alt="" /> */}
                <MagnifyingGlassIcon className="w-6 text-[#363A49]" />
              </button>
              {/* like button */}
              <button>
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 18.9984L8.55 17.6984C6.86667 16.1818 5.475 14.8734 4.375 13.7734C3.275 12.6734 2.4 11.6859 1.75 10.8109C1.1 9.93594 0.645833 9.13177 0.3875 8.39844C0.129167 7.6651 0 6.9151 0 6.14844C0 4.58177 0.525 3.27344 1.575 2.22344C2.625 1.17344 3.93333 0.648438 5.5 0.648438C6.36667 0.648438 7.19167 0.831771 7.975 1.19844C8.75833 1.5651 9.43333 2.08177 10 2.74844C10.5667 2.08177 11.2417 1.5651 12.025 1.19844C12.8083 0.831771 13.6333 0.648438 14.5 0.648438C16.0667 0.648438 17.375 1.17344 18.425 2.22344C19.475 3.27344 20 4.58177 20 6.14844C20 6.9151 19.8708 7.6651 19.6125 8.39844C19.3542 9.13177 18.9 9.93594 18.25 10.8109C17.6 11.6859 16.725 12.6734 15.625 13.7734C14.525 14.8734 13.1333 16.1818 11.45 17.6984L10 18.9984ZM10 16.2984C11.6 14.8651 12.9167 13.6359 13.95 12.6109C14.9833 11.5859 15.8 10.6943 16.4 9.93594C17 9.1776 17.4167 8.5026 17.65 7.91094C17.8833 7.31927 18 6.73177 18 6.14844C18 5.14844 17.6667 4.3151 17 3.64844C16.3333 2.98177 15.5 2.64844 14.5 2.64844C13.7167 2.64844 12.9917 2.86927 12.325 3.31094C11.6583 3.7526 11.2 4.3151 10.95 4.99844H9.05C8.8 4.3151 8.34167 3.7526 7.675 3.31094C7.00833 2.86927 6.28333 2.64844 5.5 2.64844C4.5 2.64844 3.66667 2.98177 3 3.64844C2.33333 4.3151 2 5.14844 2 6.14844C2 6.73177 2.11667 7.31927 2.35 7.91094C2.58333 8.5026 3 9.1776 3.6 9.93594C4.2 10.6943 5.01667 11.5859 6.05 12.6109C7.08333 13.6359 8.4 14.8651 10 16.2984Z"
                    fill="#5F6368"
                  />
                </svg>
              </button>
              {/* share button   */}
              <button>
                <svg
                  width="16"
                  height="22"
                  viewBox="0 0 16 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 22C1.45 22 0.979167 21.8042 0.5875 21.4125C0.195833 21.0208 0 20.55 0 20V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H5V9H2V20H14V9H11V7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V20C16 20.55 15.8042 21.0208 15.4125 21.4125C15.0208 21.8042 14.55 22 14 22H2ZM7 15V3.825L5.4 5.425L4 4L8 0L12 4L10.6 5.425L9 3.825V15H7Z"
                    fill="#5F6368"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        <Container className={`${isMobile ? "px-0" : ""}`}>
          <div className="flex flex-row">
            <div className="flex flex-1">
              <CourseInfo
                course={loadingData.course}
                batch={loadingData.batches}
                isLoggedIn={isLoggedIn}
              />
            </div>
            <div className="hidden md:flex w-96 relative">
              <div className="absolute top-5 z-10 w-full">
                <CourseRightPart
                  course={loadingData.course}
                  batch={loadingData.batches}
                  userDetails={logedinUser}
                  groupDrawer={groupDrawer}
                  setGroupDrawer={setGroupDrawer}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-6">
        <Container className={`${isMobile ? "px-0" : ""}`}>
          <div className="md:flex md:flex-row md:px-6">
            <div className="flex flex-1 flex-col gap-9 md:py-9">
              <AboutCourse course={loadingData.course} />
              <CourseIncludes
                course={loadingData.course}
                batch={loadingData.batches}
              />
              <Prerequisites course={loadingData.course} />
              <WhomeCourse course={loadingData.course} />
              <CourseTabs course={loadingData.course} />
            </div>
            <div className="flex w-96 relative"></div>
          </div>
        </Container>
      </section>
      <section className="md:py-6">
        <Container>
          <CourseReview
            reviews={loadingData?.course?.review}
            course={loadingData?.course}
          />
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <SimilarCourses course={loadingData.course} SimilarCourses={loadingData.SimilarCourses} />
        </Container>
      </section>
      <section className="md:py-6">
        <Container>
          <CoursesByMe
            course={loadingData.course}
            otherCourses={otherCoursesInstructor}
          />
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <div className="md:py-16 grid lg:grid-cols-12">
            <div className={`md:col-span-7 ${isMobile && "m-auto"}`}>
              <svg
                width={isMobile ? "355" : "611"}
                height={isMobile ? "352" : "642"}
                viewBox="0 0 611 642"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  opacity="0.2"
                  width="492"
                  height="438.651"
                  rx="29.6386"
                  fill="#D9D9D9"
                />
                <rect
                  opacity="0.2"
                  x="199"
                  y="273"
                  width="411.234"
                  height="368.314"
                  rx="23.9554"
                  fill="#D9D9D9"
                />
              </svg>
            </div>
            <div className="md:col-span-5 md:px-6">
              <h4 className="text-2xl md:text-4xl text-text font-semibold mt-5 md:mt-0">
                A Course{isMobile && <br />} Designed by Professionals
              </h4>
              <p className="text-base md:text-lg text-gray-700">
                Discover the passion and expertise behind this course.
              </p>
              <div className="flex flex-col md:p-6 gap-2 md:gap-5">
                <div className="flex items-start gap-1 md:space-x-3 py-6">
                  <div className="shrink-0">
                    <svg
                      width="39"
                      height="40"
                      viewBox="0 0 39 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 40V31.4C4.1 29.6667 2.625 27.6417 1.575 25.325C0.525 23.0083 0 20.5667 0 18C0 13 1.75 8.75 5.25 5.25C8.75 1.75 13 0 18 0C22.1667 0 25.8583 1.225 29.075 3.675C32.2917 6.125 34.3833 9.31667 35.35 13.25L38.1 24.15C38.2333 24.6167 38.15 25.0417 37.85 25.425C37.55 25.8083 37.15 26 36.65 26H32V33C32 33.825 31.7063 34.5312 31.119 35.1185C30.5313 35.7062 29.825 36 29 36H24V40H21V33H29V23H34.7L32.45 14C31.65 10.7667 29.9 8.125 27.2 6.075C24.5 4.025 21.4333 3 18 3C13.8333 3 10.2917 4.44167 7.375 7.325C4.45833 10.2083 3 13.7257 3 17.877C3 20.0243 3.43867 22.0642 4.316 23.9965C5.19367 25.9292 6.43833 27.647 8.05 29.15L9 30.05V40H6ZM16.45 25.3H19.45L19.6 23.1C20 23.0333 20.3745 22.8923 20.7235 22.677C21.0725 22.4617 21.3813 22.2193 21.65 21.95L23.75 22.65L25.15 20.25L23.65 19.05C23.8167 18.5833 23.9 18.1 23.9 17.6C23.9 17.1 23.8167 16.6167 23.65 16.15L25.15 14.95L23.75 12.55L21.65 13.25C21.3723 12.9937 21.0528 12.7628 20.6915 12.5575C20.3305 12.3525 19.9667 12.2 19.6 12.1L19.45 9.9H16.45L16.3 12.1C15.9333 12.2 15.5695 12.3525 15.2085 12.5575C14.8472 12.7628 14.5277 12.9937 14.25 13.25L12.15 12.55L10.75 14.95L12.25 16.15C12.0833 16.6167 12 17.1 12 17.6C12 18.1 12.0833 18.5833 12.25 19.05L10.75 20.25L12.15 22.65L14.25 21.95C14.5187 22.2193 14.8275 22.4617 15.1765 22.677C15.5255 22.8923 15.9 23.0333 16.3 23.1L16.45 25.3ZM17.956 21.1C16.9853 21.1 16.1583 20.7603 15.475 20.081C14.7917 19.4017 14.45 18.5767 14.45 17.606C14.45 16.6353 14.7897 15.8083 15.469 15.125C16.1483 14.4417 16.9733 14.1 17.944 14.1C18.9147 14.1 19.7417 14.4397 20.425 15.119C21.1083 15.7983 21.45 16.6233 21.45 17.594C21.45 18.5647 21.1103 19.3917 20.431 20.075C19.7517 20.7583 18.9267 21.1 17.956 21.1Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="#">
                      <p className="text-base md:text-lg font-medium text-text">
                        {"Proven Expertise"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {
                          "With a strong background in development, Rohan provides expert guidance and real-world examples."
                        }
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-1 md:space-x-3 py-6">
                  <div className="shrink-0">
                    <svg
                      width="39"
                      height="35"
                      viewBox="0 0 39 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M29.9945 34.15C29.7982 34.15 29.6015 34.1278 29.4045 34.0835C29.2072 34.0388 29.0223 33.961 28.85 33.85L22.1 29.9C21.746 29.696 21.4742 29.422 21.2845 29.078C21.0948 28.734 21 28.358 21 27.95V20.1C21 19.692 21.0948 19.316 21.2845 18.972C21.4742 18.628 21.746 18.354 22.1 18.15L28.85 14.2C29.0237 14.089 29.2095 14.0112 29.4075 13.9665C29.6058 13.9222 29.8042 13.9 30.0025 13.9C30.2008 13.9 30.3908 13.9278 30.5725 13.9835C30.7545 14.0388 30.9303 14.111 31.1 14.2L37.85 18.15C38.2077 18.354 38.4888 18.628 38.6935 18.972C38.8978 19.316 39 19.692 39 20.1V27.95C39 28.358 38.8978 28.734 38.6935 29.078C38.4888 29.422 38.2077 29.696 37.85 29.9L31.1 33.85C30.928 33.939 30.75 34.0112 30.566 34.0665C30.3817 34.1222 30.1912 34.15 29.9945 34.15ZM16 15.75C13.8 15.75 12 15.05 10.6 13.65C9.2 12.25 8.5 10.45 8.5 8.25C8.5 6.05 9.2 4.25 10.6 2.85C12 1.45 13.8 0.75 16 0.75C18.2 0.75 20 1.45 21.4 2.85C22.8 4.25 23.5 6.05 23.5 8.25C23.5 10.45 22.8 12.25 21.4 13.65C20 15.05 18.2 15.75 16 15.75ZM0 31.8V27.1C0 25.9333 0.291667 24.8833 0.875 23.95C1.45833 23.0167 2.3 22.3 3.4 21.8C5.8 20.7333 8.025 19.9667 10.075 19.5C12.125 19.0333 14.1 18.8 16 18.8H17.15C16.95 19.2667 16.8 19.725 16.7 20.175C16.6 20.625 16.5167 21.1667 16.45 21.8H16C14.0667 21.8 12.175 22.0083 10.325 22.425C8.475 22.8417 6.56667 23.5333 4.6 24.5C4.06667 24.7667 3.66667 25.1417 3.4 25.625C3.13333 26.1083 3 26.6 3 27.1V28.8H16.45C16.6167 29.4 16.8167 29.9417 17.05 30.425C17.2833 30.9083 17.5667 31.3667 17.9 31.8H0ZM16 12.75C17.3 12.75 18.375 12.325 19.225 11.475C20.075 10.625 20.5 9.55 20.5 8.25C20.5 6.95 20.075 5.875 19.225 5.025C18.375 4.175 17.3 3.75 16 3.75C14.7 3.75 13.625 4.175 12.775 5.025C11.925 5.875 11.5 6.95 11.5 8.25C11.5 9.55 11.925 10.625 12.775 11.475C13.625 12.325 14.7 12.75 16 12.75ZM24.9 19.4L30 22.4L35.1 19.4L30 16.45L24.9 19.4ZM31.25 30.8L36.5 27.815V21.5L31.25 24.6V30.8ZM23.5 27.8L28.75 30.9V24.6425L23.5 21.6V27.8Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="#">
                      <p className="text-base md:text-lg font-medium text-text">
                        {"Engaging Teaching Style"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {
                          "His teaching style, that is interactive, hands-on, approach makes learning enjoyable and effective."
                        }
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-1 md:space-x-3 py-6">
                  <div className="shrink-0">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_2288_7135)">
                        <path
                          d="M11.7 46C10.1167 46 8.77083 45.4458 7.6625 44.3375C6.55417 43.2292 6 41.8833 6 40.3C6 38.7167 6.55417 37.3708 7.6625 36.2625C8.77083 35.1542 10.1167 34.6 11.7 34.6C12.1667 34.6 12.575 34.6417 12.925 34.725C13.275 34.8083 13.6333 34.9333 14 35.1L18.25 29.8C17.6167 29.0333 17.1333 28.1583 16.8 27.175C16.4667 26.1917 16.3833 25.1667 16.55 24.1L10.5 22.05C10 22.8833 9.34167 23.5333 8.525 24C7.70833 24.4667 6.76667 24.7 5.7 24.7C4.11667 24.7 2.77083 24.1458 1.6625 23.0375C0.554167 21.9292 0 20.5833 0 19C0 17.4167 0.554167 16.0708 1.6625 14.9625C2.77083 13.8542 4.11667 13.3 5.7 13.3C7.28333 13.3 8.62917 13.8542 9.7375 14.9625C10.8458 16.0708 11.4 17.4167 11.4 19V19.2L17.5 21.3C18.1 20.2333 18.825 19.4167 19.675 18.85C20.525 18.2833 21.4667 17.8833 22.5 17.65V11.2C21.2 10.8333 20.175 10.1167 19.425 9.05C18.675 7.98333 18.3 6.86667 18.3 5.7C18.3 4.11667 18.8542 2.77083 19.9625 1.6625C21.0708 0.554167 22.4167 0 24 0C25.5833 0 26.9292 0.554167 28.0375 1.6625C29.1458 2.77083 29.7 4.11667 29.7 5.7C29.7 6.86667 29.3167 7.98333 28.55 9.05C27.7833 10.1167 26.7667 10.8333 25.5 11.2V17.65C26.5333 17.8833 27.4833 18.2833 28.35 18.85C29.2167 19.4167 29.95 20.2333 30.55 21.3L36.6 19.2V19C36.6 17.4167 37.1542 16.0708 38.2625 14.9625C39.3708 13.8542 40.7167 13.3 42.3 13.3C43.8833 13.3 45.2292 13.8542 46.3375 14.9625C47.4458 16.0708 48 17.4167 48 19C48 20.5833 47.4458 21.9292 46.3375 23.0375C45.2292 24.1458 43.8833 24.7 42.3 24.7C41.2333 24.7 40.2833 24.4667 39.45 24C38.6167 23.5333 37.9667 22.8833 37.5 22.05L31.45 24.1C31.6167 25.1667 31.5417 26.1917 31.225 27.175C30.9083 28.1583 30.4167 29.0333 29.75 29.8L34 35.1C34.3667 34.9333 34.725 34.8083 35.075 34.725C35.425 34.6417 35.826 34.6 36.278 34.6C37.8927 34.6 39.25 35.1542 40.35 36.2625C41.45 37.3708 42 38.7167 42 40.3C42 41.8833 41.4458 43.2292 40.3375 44.3375C39.2292 45.4458 37.8833 46 36.3 46C34.7167 46 33.3708 45.4458 32.2625 44.3375C31.1542 43.2292 30.6 41.8833 30.6 40.3C30.6 39.6333 30.6917 39.0333 30.875 38.5C31.0583 37.9667 31.3167 37.45 31.65 36.95L27.4 31.65C26.329 32.2167 25.1863 32.5 23.972 32.5C22.7573 32.5 21.6167 32.2167 20.55 31.65L16.35 37C16.6833 37.5 16.9417 38.0083 17.125 38.525C17.3083 39.0417 17.4 39.6333 17.4 40.3C17.4 41.8833 16.8458 43.2292 15.7375 44.3375C14.6292 45.4458 13.2833 46 11.7 46ZM5.702 21.7C6.46733 21.7 7.10833 21.441 7.625 20.923C8.14167 20.4053 8.4 19.7637 8.4 18.998C8.4 18.2327 8.141 17.5917 7.623 17.075C7.10533 16.5583 6.46367 16.3 5.698 16.3C4.93267 16.3 4.29167 16.559 3.775 17.077C3.25833 17.5947 3 18.2363 3 19.002C3 19.7673 3.259 20.4083 3.777 20.925C4.29467 21.4417 4.93633 21.7 5.702 21.7ZM11.702 43C12.4673 43 13.1083 42.741 13.625 42.223C14.1417 41.7053 14.4 41.0637 14.4 40.298C14.4 39.5327 14.141 38.8917 13.623 38.375C13.1053 37.8583 12.4637 37.6 11.698 37.6C10.9327 37.6 10.2917 37.859 9.775 38.377C9.25833 38.8947 9 39.5363 9 40.302C9 41.0673 9.259 41.7083 9.777 42.225C10.2947 42.7417 10.9363 43 11.702 43ZM24.002 8.4C24.7673 8.4 25.4083 8.141 25.925 7.623C26.4417 7.10533 26.7 6.46367 26.7 5.698C26.7 4.93267 26.441 4.29167 25.923 3.775C25.4053 3.25833 24.7637 3 23.998 3C23.2327 3 22.5917 3.259 22.075 3.777C21.5583 4.29467 21.3 4.93633 21.3 5.702C21.3 6.46733 21.559 7.10833 22.077 7.625C22.5947 8.14167 23.2363 8.4 24.002 8.4ZM24.025 29.5C25.275 29.5 26.3333 29.0583 27.2 28.175C28.0667 27.2917 28.5 26.225 28.5 24.975C28.5 23.725 28.065 22.6667 27.195 21.8C26.325 20.9333 25.26 20.5 24 20.5C22.7667 20.5 21.7083 20.935 20.825 21.805C19.9417 22.675 19.5 23.74 19.5 25C19.5 26.2333 19.9417 27.2917 20.825 28.175C21.7083 29.0583 22.775 29.5 24.025 29.5ZM36.302 43C37.0673 43 37.7083 42.741 38.225 42.223C38.7417 41.7053 39 41.0637 39 40.298C39 39.5327 38.741 38.8917 38.223 38.375C37.7053 37.8583 37.0637 37.6 36.298 37.6C35.5327 37.6 34.8917 37.859 34.375 38.377C33.8583 38.8947 33.6 39.5363 33.6 40.302C33.6 41.0673 33.859 41.7083 34.377 42.225C34.8947 42.7417 35.5363 43 36.302 43ZM42.302 21.7C43.0673 21.7 43.7083 21.441 44.225 20.923C44.7417 20.4053 45 19.7637 45 18.998C45 18.2327 44.741 17.5917 44.223 17.075C43.7053 16.5583 43.0637 16.3 42.298 16.3C41.5327 16.3 40.8917 16.559 40.375 17.077C39.8583 17.5947 39.6 18.2363 39.6 19.002C39.6 19.7673 39.859 20.4083 40.377 20.925C40.8947 21.4417 41.5363 21.7 42.302 21.7Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2288_7135">
                          <rect width="48" height="48" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="#">
                      <p className="text-base md:text-lg font-medium text-text">
                        {"Industry Connections"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {
                          "Rohan maintains strong connections within the industry, ensuring course content remains relevant and up-to-date."
                        }
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-1 md:space-x-3 py-6">
                  <div className="shrink-0">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M24 24C22.3 24 20.875 23.425 19.725 22.275C18.575 21.125 18 19.7 18 18C18 16.3333 18.575 14.9167 19.725 13.75C20.875 12.5833 22.3 12 24 12C25.6667 12 27.0833 12.5833 28.25 13.75C29.4167 14.9167 30 16.3333 30 18C30 19.7 29.4167 21.125 28.25 22.275C27.0833 23.425 25.6667 24 24 24ZM23.9825 21C24.8275 21 25.5417 20.7142 26.125 20.1425C26.7083 19.5708 27 18.8625 27 18.0175C27 17.1725 26.7108 16.4583 26.1325 15.875C25.5542 15.2917 24.8375 15 23.9825 15C23.1275 15 22.4167 15.2892 21.85 15.8675C21.2833 16.4458 21 17.1625 21 18.0175C21 18.8725 21.2858 19.5833 21.8575 20.15C22.4292 20.7167 23.1375 21 23.9825 21ZM12 36V32.2C12 31.3 12.2917 30.5083 12.875 29.825C13.4583 29.1417 14.1667 28.5833 15 28.15C16.4 27.4167 17.849 26.875 19.347 26.525C20.8453 26.175 22.3953 26 23.997 26C25.599 26 27.15 26.175 28.65 26.525C30.15 26.875 31.6 27.4167 33 28.15C33.8333 28.5833 34.5417 29.1417 35.125 29.825C35.7083 30.5083 36 31.3 36 32.2V36H12ZM24 29C22.415 29 20.8688 29.2167 19.3615 29.65C17.8538 30.0833 16.4 30.7333 15 31.6V33H33V31.6C31.6 30.7333 30.1462 30.0833 28.6385 29.65C27.1312 29.2167 25.585 29 24 29ZM24 33H33H15H24ZM7 44C6.2 44 5.5 43.7 4.9 43.1C4.3 42.5 4 41.8 4 41V32.4H7V41H15.6V44H7ZM4 15.6V7C4 6.2 4.3 5.5 4.9 4.9C5.5 4.3 6.2 4 7 4H15.6V7H7V15.6H4ZM32.4 44V41H41V32.4H44V41C44 41.8 43.7 42.5 43.1 43.1C42.5 43.7 41.8 44 41 44H32.4ZM41 15.6V7H32.4V4H41C41.8 4 42.5 4.3 43.1 4.9C43.7 5.5 44 6.2 44 7V15.6H41Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="#">
                      <p className="text-base md:text-lg font-medium text-text">
                        {"Student-Centric Approach"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {
                          "Dedicated to helping learners succeed, Rohan provides personalised support and mentorship."
                        }
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <div className="relative bg-gray-6 rounded-2xl px-6 py-16 flex flex-col">
            <h6 className="mx-auto mb-5 max-w-lg text-center text-2xl text-dark">
              Reserve Your Spot in the Upcoming Cohort
            </h6>
            <h2 className="mx-auto mb-8 max-w-3xl text-center text-sm md:text-3xl font-semibold tracking-tight text-dark sm:text-5xl">
              Unlock Strategic Product Thinking
            </h2>
            <div className="bg-white w-auto grid grid-cols-1 md:flex md:flex-row justify-between m-auto items-center gap-4 md:gap-8 px-8 rounded-2xl">
              <div className="flex flex-row justify-between gap-5">
                {/* duration */}
                <div className="flex items-center space-x-4 md:py-6">
                  <div className="shrink-0">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        opacity="0.3"
                        width="42"
                        height="42"
                        rx="10"
                        fill="#E7E7E7"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-text">Duration</p>
                    <p className="text-xs text-gray-700">{courseLowestDuration.duration} Course</p>
                  </div>
                </div>
                {/* Hours */}
                <div className="flex items-center space-x-4 md:py-6">
                  <div className="shrink-0">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        opacity="0.3"
                        width="42"
                        height="42"
                        rx="10"
                        fill="#E7E7E7"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-text">Hours</p>
                    <p className="text-xs text-gray-700">
                      {lowestDuration
                        ? `${lowestDuration.duration.hours} hours ${
                            lowestDuration.duration.minutes === 0
                              ? ""
                              : `${lowestDuration.duration.minutes} mins`
                          }`
                        : "No data available"}
                    </p>
                  </div>
                </div>
                {/* mode */}
                <div className="flex items-center space-x-4 md:py-6">
                  <div className="shrink-0">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        opacity="0.3"
                        width="42"
                        height="42"
                        rx="10"
                        fill="#E7E7E7"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-text">Mode</p>
                    <p className="text-xs text-gray-700">
                      {batchClasses?.batchMode == null ||
                      batchClasses?.batchMode === ""
                        ? "!No Mode Available"
                        : batchClasses?.batchMode}
                    </p>
                  </div>
                </div>
                {/* level */}
                <div className="flex items-center space-x-4 md:py-6">
                  <div className="shrink-0">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect
                        opacity="0.3"
                        width="42"
                        height="42"
                        rx="10"
                        fill="#E7E7E7"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-text">Level</p>
                    <p className="text-xs text-gray-700">
                      {loadingData?.course?.level}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-auto pt-8">
              <button
                className="py-3 px-8 rounded-lg bg-black text-white text-sm"
                onClick={() =>{
                  window.scrollTo({ top: 64, behavior: "smooth" });
                  setGroupDrawer(true);
                }}>
                Enroll Now
              </button>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-6">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 pb-10">
            <div className="flex">
              <div className="flex flex-col md:grid md:grid-cols-2">
                <div className="md:col-span-2 flex">
                  <div className="py-6">
                    <h3 className="text-text text-3xl font-semibold">
                      Why Choose Simplitrain
                    </h3>
                    <p className="text-gray-700 text-sm font-normal">
                      We believe in learning by doing. Our courses are packed
                      with practical exercises, real-world projects, and
                      interactive workshops learn immediately.
                    </p>
                  </div>
                </div>
                {isMobile ? (
                  <div className="flex flex-row">
                    <div className=" flex justify-start items-end pt-14 bg-[#D9D9D920]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          01
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Flexible Learning
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our instructors are seasoned UX professionals with
                          extensive experience at top companies.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start items-end pt-14 bg-[#D9D9D960]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          02
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Certifications and Credentials
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our instructors are seasoned UX professionals with
                          extensive experience at top companies.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className=" flex justify-start items-end pt-14 bg-[#D9D9D920]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          01
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Flexible Learning
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our instructors are seasoned UX professionals with
                          extensive experience at top companies.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start items-end pt-14 bg-[#D9D9D960]">
                      <div className="p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          02
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Certifications and Credentials
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our instructors are seasoned UX professionals with
                          extensive experience at top companies.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className={`md:row-span-2 flex bg-gray-300 ${
                    isMobile ? "h-44" : ""
                  }`}></div>

                {isMobile ? (
                  <div className="flex flex-row">
                    <div className="flex justify-start items-end pt-14 bg-[#D9D9D920]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          03
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Expert Instructors
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our instructors are seasoned UX professionals with
                          extensive experience at top companies.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start items-end pt-14 bg-[#D9D9D960]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          04
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Comprehensive Curriculum
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our curriculum spans all crucial aspects of UX design,
                          from user research and information architecture.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-start items-end pt-14 bg-[#D9D9D920]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          03
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Expert Instructors
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our instructors are seasoned UX professionals with
                          extensive experience at top companies.
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start items-end pt-14 bg-[#D9D9D960]">
                      <div className="p-3 md:p-6">
                        <span className="text-gray-400 text-xs font-medium">
                          04
                        </span>
                        <h5 className="text-text text-sm font-medium">
                          Comprehensive Curriculum
                        </h5>
                        <p className="text-gray-700 text-sm font-normal">
                          Our curriculum spans all crucial aspects of UX design,
                          from user research and information architecture.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-[#F4F4F4] py-6">
        <Container>
          <NewsLetterCourse />
        </Container>
      </section>
      {isMobile && (
        <div className="px-5 shadow-lg bg-white fixed bottom-0 border-t border-gray-300 w-full flex flex-row justify-between py-5">
          <div className="flex flex-col">
            <p className="text-sm text-primary">
              Starts From <b>₹ 9,999</b>
            </p>
            <p className="text-sm text-primary">From 23 Sep | 3 Batches</p>
          </div>
          <Link
            className="w-fit text-base text-white bg-[#0E121D] px-4 py-2 rounded-xl flex flex-row items-center gap-2"
            to="/courses/courseid/batches">
            CHOOSE BATCH{" "}
            <svg
              width="8"
              height="13"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.25 12L6.75 6.5L1.25 1"
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
