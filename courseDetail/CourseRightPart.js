import {
  ArrowRightIcon,
  ChevronRightIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Drawer } from "../../components/ui-components";
import CourseDrawer from "./CourseDrawer";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { active } from "sortablejs";
import { sendQuestion } from "../../redux/courses/actionCreator";
import OneDrawer from "./OneDrawer";

const CourseRightPart = ({ course, batch, userDetails, groupDrawer, setGroupDrawer }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("group");
  const isLogedin = useSelector((state) => state.auth.login);
  const [open, setOpen] = useState(false);
  
  const [oneOnOneDrawer, setOneOnOneDrawer] = useState(false);
  const [oneOnOneBatches, setOneOnOneBatches] = useState(
    batch?.oneOnOneBatches || []
  );
  const [groupBatchesData, setGroupBatchesData] = useState(
    batch?.groupBatches || []
  );
  const [selectedBatch, setSelectedBatch] = useState(null);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [formState, setFormState] = useState({
    userId: userDetails?.id,
    courseId: course?.id,
    question: question,
  });

  // console.log("index checking: ", oneOnOneBatches?.batchCurriculumDetails)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formState = {
      userId: userDetails?.id,
      courseId: course?.id,
      question: question,
    };
    let response = await dispatch(sendQuestion(formState));
    if (response && response.type === "COURSES_SUCCESS") {
      setQuestion("");
      console.log("question Sended successfully");
    } else {
      console.log("Failed to send question");
    }
    // console.log("question: ", question);
  };
  // console.log("Batch", batch);

  const noBatchesAvailable =
    (activeTab === "group" && groupBatchesData.length === 0) ||
    (activeTab !== "group" && oneOnOneBatches.length === 0);

    useEffect(() => {
      if (groupBatchesData.length > 0) {
        setSelectedBatch(groupBatchesData[0].id);
      }
    }, [groupBatchesData]); 

      // console.log("Selected batch Id: ", selectedBatch);
  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-3xl overflow-hidden mb-5">
        <div className="bg-[#F7F7F7] p-3 flex flex-col gap-4">
          <div className="aspect-w-16 aspect-h-9 bg-[#EEEEEE] rounded-xl gap-3"></div>
          {groupBatchesData.length > 0 && oneOnOneBatches.length > 0 && (
            <div className="flex flex-row flex-nowrap justify-between items-center p-2 rounded-lg border border-[#D9D9D9]">
              <button
                onClick={() => setActiveTab("group")}
                className={`w-full font-semibold px-4 py-2 rounded-lg ${
                  activeTab == "group"
                    ? "bg-gray-300 text-black"
                    : "bg-transparent text-gray-500"
                } ${groupBatchesData.length > 0 ? "block" : "hidden"} `}>
                Group Course
              </button>
              <button
                onClick={() => setActiveTab("one_on_one")}
                className={`w-full font-semibold px-4 py-2 rounded-lg ${
                  activeTab == "one_on_one"
                    ? "bg-gray-300 text-black"
                    : "bg-transparent text-gray-500"
                } ${oneOnOneBatches.length > 0 ? "block" : "hidden"}`}>
                One on One
              </button>
            </div>
          )}
          {activeTab === "group" && (
            <h2 className="text-sm text-gray-500 font-semibold mt-2">
              {groupBatchesData?.length > 0
                ? `${groupBatchesData.length} Batches Available`
                : "No Batches Available"}
            </h2>
          )}
        </div>

        {/* Batch Selection */}
        <div>
          {activeTab == "group" ? (
            <form className="bg-white flex flex-col pt-4">
              {groupBatchesData.map((item, index) => (
                <label
                  onClick={() => setSelectedBatch(item.id)}
                  htmlFor={item.id}
                  key={item.id}
                  className="rounded-lg flex gap-2 items-start mb-4">
                  <div className="pl-4">
                    <input
                      type="radio"
                      name="batch"
                      id={item.id}
                      checked={selectedBatch === item.id}
                      className="text-black checked:bg-black"
                    />
                  </div>
                  <div className="pr-4 pb-4 w-full flex-1 border-b border-b-gray-300">
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-start items-start gap-1">
                        <h3 className="text-lg font-medium flex gap-2 items-center">
                          Batch {index + 1}{" "}
                          <span className="text-xs text-gray-400 px-2 border border-gray-400 rounded-full uppercase">
                            ONLINE
                          </span>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {moment(item.startDate).format("DD MMM YY")} -{" "}
                          {moment(item.endDate).format("DD MMM YY")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.total_enrolled !== 0 &&
                            `${item.total_enrolled} Enrolled |`}{" "}
                          {item.remaningSeatas} seats left
                        </p>
                      </div>
                      <div className="flex flex-col justify-start items-end">
                        <p className="text-lg flex font-semibold">
                          ₹ {item.discountedPrice}
                        </p>
                        <p className="text-green-600 text-sm">
                          {((item.actualPrice - item.discountedPrice) /
                            item.actualPrice) *
                            100}
                          % Off
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center py-2">
                      <a
                        onClick={() => setGroupDrawer(true)}
                        className="text-text text-sm font-medium flex items-center cursor-pointer">
                        View full schedules{" "}
                        <ChevronRightIcon className="size-4" />
                      </a>
                      {/* <a
                        href="#"
                        className="text-gray-400 text-sm font-medium cursor-pointer">
                        Installment Available
                      </a> */}
                    </div>
                  </div>
                </label>
              ))}

              {/* location UI
                  <div className="p-2 bg-[#F2F2F2] flex flex-row justify-between items-center rounded-full">
                    <p className="flex items-center gap-1">
                      <MapPinIcon className="size-5" />
                      Koramangala, Bangalore
                    </p>
                    <button className="w-8 h-8 bg-white flex justify-center items-center rounded-full">
                      <ChevronRightIcon className="size-5" />
                    </button>
                  </div>
               */}
            </form>
          ) : (
            <div className="bg-white flex flex-col">
              <div className="p-4 rounded-lg flex gap-2 items-start mb-4">
                <div className="w-full flex-1">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <h3 className="text-lg font-medium flex gap-2 items-center">
                        One on One{" "}
                        <span className="text-xs text-gray-400 px-2 border border-gray-400 rounded-full uppercase">
                          ONLINE
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600">1 Day Course</p>
                      <p className="text-sm text-gray-600">
                        {oneOnOneBatches[0]?.durationPerClasss === null
                          ? "Duration not available"
                          : `${oneOnOneBatches[0]?.durationPerClasss} min per class`}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-end">
                      <p className="text-lg flex font-semibold">
                        ₹ {oneOnOneBatches[0]?.discountedPrice}
                      </p>
                      <p className="text-green-600 text-sm">
                        {((oneOnOneBatches[0]?.actualPrice -
                          oneOnOneBatches[0]?.discountedPrice) /
                          oneOnOneBatches[0]?.actualPrice) *
                          100}
                        % Off
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center py-2">
                    <a
                      onClick={() => setOneOnOneDrawer(true)}
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
          {noBatchesAvailable && (
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
          )}
          {/* installment in batches */}
          {/* <div className="flex gap-3 items-center px-4">
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
              <p className="truncate text-sm text-gray-500">
                {"Starts at 3900/month"} <a className="underline">Know more</a>
              </p>
            </div>
          </div> */}
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

          <button
            className={`w-full bg-black text-white py-3 rounded-lg font-semibold ${
              activeTab === "group" ? "text-lg" : "text-base"
            } ${noBatchesAvailable ? "hidden" : "block"}`}
            onClick={() => {
              if (isLogedin) {
                navigate("/checkout", {
                  state: { batchId: selectedBatch },
                });
              } else {
                navigate("/auth");
              }
            }}>
            {activeTab === "group" ? "ENROLL" : "SELECT SCHEDULE"}
          </button>
        </div>
      </div>
      {/* Question Section */}
      <div className="bg-[#F7F7F7] p-4 rounded-lg shadow-3xl">
        <h3 className="text-3xl text-text font-medium mb-2">
          Have a Question?
        </h3>
        <p className="text-xs text-gray-50">
          Send your questions to the instructor
        </p>
        <form className="relative rounded-md  border border-[#00000040]">
          <textarea
            placeholder="Send your questions to the instructor"
            onChange={handleChange}
            value={question}
            className="w-full min-h-36 relative p-3 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"></textarea>
          <button className="absolute right-3 bottom-3" onClick={handleSubmit}>
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
                fillOpacity="0.1"
              />
              <path
                d="M17.625 30.5V16.5L34.25 23.5L17.625 30.5ZM19.375 27.875L29.7438 23.5L19.375 19.125V22.1875L24.625 23.5L19.375 24.8125V27.875Z"
                fill="#A0A0A0"
              />
            </svg>
          </button>
        </form>
      </div>

      {activeTab === "group" ? (
        <CourseDrawer
          open={groupDrawer}
          onClose={setGroupDrawer}
          batch={groupBatchesData}
        />
      ) : (
        <OneDrawer
          open={oneOnOneDrawer}
          onClose={setOneOnOneDrawer}
          batch={oneOnOneBatches}
        />
      )}
      {/* <CourseDrawer open={open} onClose={setOpen} batch={batch} /> */}
    </>
  );
};

export default CourseRightPart;
