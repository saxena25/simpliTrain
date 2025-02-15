import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { checkIsMobile } from "../../utils/helpers";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Modal, Space } from "antd";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/profile/actionCreator";
import store from "../../redux/store";
import { addToWishlist } from "../../redux/courses/actionCreator";
import PopOverNotification from "../../components/shared-components/PopOverNotification";

const getMyProfile = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getProfile());
    if (response && response.type === "PROFILE_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export const courseInfoLoader = async () => {
  const profile = await getMyProfile();
  return {
    profile: profile,
  };
};

const CourseInfo = ({ course, batch, isLoggedIn }) => {
  const isMobile = checkIsMobile();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const myProfile = useSelector((state) => state.myProfile.data);
  const loggedInUser = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false); // for popover notification
  const baseUrl = process.env.REACT_APP_IMG_UR;
  const fullUrl = `${baseUrl}courses/${course?.id}`;
  const copyUrlRef = useRef();
  const [popOverData, setPopOverData] = useState({ title: "", subTitle: "" });
  const oneOnOneBatches = batch?.oneOnOneBatches || [];
  const groupBatches = batch?.groupBatches || [];
  const [batchClasses, setBatchClasses] = useState(
    groupBatches?.[0]?.batchClasses || oneOnOneBatches?.[0]?.batchClasses || []
  );

  // console.log("CourseInfo User Data: ", loggedInUser);
  // console.log("User Id: ", loggedInUser?.id);
  // console.log("Course ID: ", course?.id);

  const handleWishlist = async () => {
    const formState = {
      userId: loggedInUser?.id,
      courseId: course?.id,
    };
    console.log("FormState: ", formState);
    try {
      let response = await dispatch(addToWishlist(formState));
      if (response && response.type === "COURSES_SUCCESS") {
        setPopOverData({
          title: "Course Added Successfully!",
          subTitle: `Course Name: ${course?.title}`,
        });
        setOpen(true);
        console.log("Course Added to Wishlist");
      } else {
        console.log("Failed to Wishlist try block");
      }
    } catch (error) {
      console.log("Wishlist Error Catch Block", Error);
    }
  };

  // console.log("course Info: ", course);

  function socialSharingButtons(social) {
    let button = "";
    switch (social) {
      case "facebook":
        button = `http://www.facebook.com/share.php?u=${encodeURIComponent(
          fullUrl
        )}`;
        break;
      case "twitter":
        button = `https://twitter.com/share?url=${encodeURIComponent(fullUrl)}`;
        break;
      case "whatsapp":
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          button = `whatsapp://send?text=${encodeURIComponent(fullUrl)}`;
        } else {
          button = `https://web.whatsapp.com/send?text=${encodeURIComponent(
            fullUrl
          )}`;
        }
        break;
      case "linkedin":
        button = `http://www.linkedin.com/shareArticle?mini=true&amp;url=${encodeURIComponent(
          fullUrl
        )}`;
        break;
      default:
        break;
    }
    return button;
  }

  const handleCopy = () => {
    copyUrlRef.current?.select();
    window.navigator.clipboard.writeText(fullUrl);
    setPopOverData({
      title: "Link Copied Successfully!",
      subtitle: "Anyone with a link can now view this file.",
    });
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  function handleShare(social) {
    const url = socialSharingButtons(social);
    setPopOverData({
      title: "Link Copied Successfully!",
      subtitle: "Anyone with a link can now view this file.",
    });
    setShow(true);
    setTimeout(() => {
      window.open(url, "_blank");
      setShow(false);
    }, 1000);
  }

  // Function to calculate duration in hours and minutes
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

  // console.log(
  //   "lowest duration: ",
  //   lowestDuration?.duration || "No valid durations found."
  // );

  return (
    <>
      <div className="flex flex-col px-6 gap-5 pt-10 md:pt-0">
        <p className="hidden md:flex flex-row justify-start items-center gap-1 pl-5">
          <Link to={"/"} className="text-xs text-text font-medium">
            Home
          </Link>{" "}
          <ChevronRightIcon className="size-3" />{" "}
          <Link to={"/courses"} className="text-xs text-text font-medium">
            {course?.category?.name}
          </Link>{" "}
          <ChevronRightIcon className="size-3" />{" "}
          <span className="text-xs text-[#00000040] font-medium">
            {course?.title}
          </span>
        </p>
        <div className="flex flex-row justify-between items-start gap-4 -ml-5">
          {!isMobile && (
            <div
              className="w-10 hover:cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}>
              <ArrowLeftIcon className="size-6 mt-1.5" />
            </div>
          )}

          <div className="flex flex-col gap-6 justify-start items-start">
            <div className="flex flex-col md:flex-row w-full justify-between items-start">
              {isMobile && (
                <p className="text-xs text-white bg-[#464646] px-2 rounded-xl">
                  {course?.level}
                </p>
              )}
              <div>
                <h3 className="text-2xl text-text font-bold">
                  {course?.title}{" "}
                  <span className="text-xs text-white bg-[#464646] px-2 rounded-xl">
                    {course?.level}
                  </span>
                </h3>
                <p className="text-primary">{course?.sub_title}</p>
              </div>
              <div className="hidden md:flex flex-row justify-between items-center gap-4">
                {isLoggedIn && (
                  <button className="p-2" onClick={handleWishlist}>
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
                )}
                <button className="p-2" onClick={() => setOpen(!open)}>
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
            <div className="flex">
              <div className="mr-2 md:mr-4 shrink-0">
                <svg
                  width={isMobile ? "40" : "52"}
                  height={isMobile ? "40" : "52"}
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
                <h4 className="text-sm md:text-lg font-bold">
                  {course?.instructor?.name}
                </h4>
                <p className="md:mt-1 text-xs text-primary">
                  {course?.instructor?.WorkExperiences.map(
                    (item) =>
                      item.isCurrent &&
                      `${item.job_title}, at ${item.company_name}`
                  )}
                  {/* Product Designer, at HCL Pvt.Ltd{course?.instructor?.WorkExperiences[0]?.company_name} */}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 m-auto md:m-0 md:flex md:flex-row items-baseline justify-start gap-6">
              {/* level */}
              <div className="flex gap-1 md:gap-3 items-center">
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
                      fill="#C6C6C6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Level</p>
                  <p className="truncate text-sm text-gray-500">
                    {course?.level}
                  </p>
                </div>
              </div>
              {/* total Hours */}
              <div className="flex gap-1 md:gap-3 items-center">
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
                      fill="#C6C6C6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Total Hours
                  </p>
                  <p className="truncate text-sm text-gray-500">
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
              {/* Mode */}
              <div className="flex gap-1 md:gap-3 items-center">
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
                      fill="#C6C6C6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Mode</p>
                  <p className="truncate text-sm text-gray-500">
                    {batchClasses?.batchMode == null ||
                    batchClasses?.batchMode === ""
                      ? "!No Mode Available"
                      : batchClasses?.batchMode}
                  </p>
                </div>
              </div>
              {/* language */}
              <div className="flex gap-1 md:gap-3 items-center">
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
                      fill="#C6C6C6"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Language</p>
                  <p className="truncate text-sm text-gray-500">
                    {course?.instructor?.languages.length === 0
                      ? "No Language"
                      : course?.instructor?.languages
                          .map((item) => item.name)
                          .join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-2 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
              <div className="flex flex-row items-center justify-between">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900">
                  Social Share
                </DialogTitle>
                <div className="right-0 top-0 hidden sm:block">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </div>
              {/* body */}
              <div className="">
                <p className="text-sm text-gray-500 font-medium mt-2">
                  Share this link via
                </p>
                <div className="flex flex-row justify-center gap-2">
                  {/* whatsapp button */}
                  <button
                    className="group"
                    onClick={() => {
                      handleShare("whatsapp");
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      className="fill-current group-hover:text-green-500 transition-colors duration-300">
                      <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z"></path>
                    </svg>
                  </button>
                  {/* facebook button */}
                  <button
                    className="group"
                    onClick={() => {
                      handleShare("facebook");
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      className="fill-current group-hover:text-blue-400 transition-colors duration-300">
                      <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 25.832031 46 A 1.0001 1.0001 0 0 0 26.158203 46 L 31.832031 46 A 1.0001 1.0001 0 0 0 32.158203 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 33 44 L 33 30 L 36.820312 30 L 38.220703 23 L 33 23 L 33 21 C 33 20.442508 33.05305 20.398929 33.240234 20.277344 C 33.427419 20.155758 34.005822 20 35 20 L 38 20 L 38 14.369141 L 37.429688 14.097656 C 37.429688 14.097656 35.132647 13 32 13 C 29.75 13 27.901588 13.896453 26.71875 15.375 C 25.535912 16.853547 25 18.833333 25 21 L 25 23 L 22 23 L 22 30 L 25 30 L 25 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 32 15 C 34.079062 15 35.38736 15.458455 36 15.701172 L 36 18 L 35 18 C 33.849178 18 32.926956 18.0952 32.150391 18.599609 C 31.373826 19.104024 31 20.061492 31 21 L 31 25 L 35.779297 25 L 35.179688 28 L 31 28 L 31 44 L 27 44 L 27 28 L 24 28 L 24 25 L 27 25 L 27 21 C 27 19.166667 27.464088 17.646453 28.28125 16.625 C 29.098412 15.603547 30.25 15 32 15 z"></path>
                    </svg>
                  </button>
                  {/* linkedin button */}
                  <button
                    className="group"
                    onClick={() => {
                      handleShare("linkedin");
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="50"
                      height="50"
                      viewBox="0 0 50 50"
                      className="fill-current group-hover:text-blue-700 transition-colors duration-300">
                      <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"></path>
                    </svg>
                  </button>
                </div>
                <div className="w-full flex flex-col gap-2 mt-4">
                  <div className="w-full rounded-lg">
                    <input
                      className="text-white bg-gray-500 w-full py-2.5 border-none rounded-lg"
                      type="text"
                      placeholder="COPY URL..."
                      value={fullUrl}
                      ref={copyUrlRef}
                      readOnly
                    />
                  </div>
                  <button
                    className="border py-2 bg-gray-200 rounded-lg font-medium"
                    onClick={handleCopy}>
                    Copy
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* popover notification */}
      <PopOverNotification
        show={show}
        setShow={setShow}
        title={popOverData.title}
        subtitle={popOverData.subTitle}
      />
    </>
  );
};

export default CourseInfo;
