import { Flex, Progress } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const modules = [
  { name: "Introduction", description: "8 / 8 Questions", status: "Completed" },
  {
    name: "User Research",
    description: "12 / `12 Questions",
    status: "Completed",
  },
  {
    name: "Wire Framing",
    description: "0 / 8 Questions",
    status: "inCompleted",
  },
  {
    name: "Interaction Design",
    description: "0 / 18 Questions",
    status: "inCompleted",
  },
  {
    name: "Visual Design",
    description: "0 / 6 Questions",
    status: "inCompleted",
  },
  { name: "Testing", description: "0 / 10 Questions", status: "inCompleted" },
  { name: "Others", description: "0 / 12 Questions", status: "inCompleted" },
];

export default function CoursePanel() {

  let location = useLocation();

  const [showTime, setShowTime] = useState(true);

  useEffect(() => {
    if (
      (location && location.pathname != "/dashboard/quiz/quiz_platform")) {
      setShowTime(false);
    }
  }, []);
  return (
    <>
      <div className="flex h-max w-[25%] rounded-[24px] pl-4 pr-2 grow flex-col gap-y-5 overflow-y-auto bg-[#F4F4F4]">
        <div className="h-[90%] flex grow flex-col gap-y-5 overflow-y-auto py-6">
          <section className={`${showTime ? `flex` : `invisible` } flex justify-end w-full`} >
            <div className="font-medium flex flex-row items-start px-2 justify-start h-8 w-36 text-center rounded-full text-white bg-secondary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-1 mt-1 mr-2"
              >
                <path
                  d="M9 3V1H15V3H9ZM11 14H13V8H11V14ZM12 22C10.7667 22 9.60417 21.7625 8.5125 21.2875C7.42083 20.8125 6.46667 20.1667 5.65 19.35C4.83333 18.5333 4.1875 17.5792 3.7125 16.4875C3.2375 15.3958 3 14.2333 3 13C3 11.7667 3.2375 10.6042 3.7125 9.5125C4.1875 8.42083 4.83333 7.46667 5.65 6.65C6.46667 5.83333 7.42083 5.1875 8.5125 4.7125C9.60417 4.2375 10.7667 4 12 4C13.0333 4 14.025 4.16667 14.975 4.5C15.925 4.83333 16.8167 5.31667 17.65 5.95L19.05 4.55L20.45 5.95L19.05 7.35C19.6833 8.18333 20.1667 9.075 20.5 10.025C20.8333 10.975 21 11.9667 21 13C21 14.2333 20.7625 15.3958 20.2875 16.4875C19.8125 17.5792 19.1667 18.5333 18.35 19.35C17.5333 20.1667 16.5792 20.8125 15.4875 21.2875C14.3958 21.7625 13.2333 22 12 22ZM12 20C13.9333 20 15.5833 19.3167 16.95 17.95C18.3167 16.5833 19 14.9333 19 13C19 11.0667 18.3167 9.41667 16.95 8.05C15.5833 6.68333 13.9333 6 12 6C10.0667 6 8.41667 6.68333 7.05 8.05C5.68333 9.41667 5 11.0667 5 13C5 14.9333 5.68333 16.5833 7.05 17.95C8.41667 19.3167 10.0667 20 12 20Z"
                  fill="white"
                />
              </svg>
              <p className="font-medium mt-1 "> 50:45 mins </p>
            </div>
          </section>
          <div className="">
            <h6 className="text-[13px] text-left text-gray-1 font-medium">
              QUIZ
            </h6>
            <h2 className="flex text-[20px] text-left font-medium">
              UX for Beginners
            </h2>
            <h6 className="text-[13px] text-left text-gray-1 font-medium">
              Course : Course Title
            </h6>
          </div>
          <div className="flex flex-col">
            <Flex
              vertical
              gap="small"
              className="flex flex-row justify-between"
            >
              <Progress
                percent={0}
                strokeColor="black"
                type="line"
                className="w-[90%]"
              />
            </Flex>
          </div>
        </div>
        <section>
          <h5 className="text-[15px] text-left text-gray-1 font-medium">
            7 MODULES
          </h5>
          <div>
            {modules.map((module) => {
                return(
              <div className="flex flex-row justify-between items-center px-4 py-4 border-y-[1px] border-gray-200">
                {module.status === "inCompleted" ? (
                  <svg
                    width="21" height="21" viewBox="0 0 21 21" fill="none"xmlns="http://www.w3.org/2000/svg" className="w-[20%] mb-2">
                    <circle
                      cx="10.5" cy="10.5" r="9.5" stroke="#A5A5A5" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[20%] mb-2">
                    <circle cx="10.5" cy="10.5" r="9.5" fill="#424242" stroke="#424242" strokeWidth="2"/>
                    <path
                      d="M6 10.5L9 13.5L15.5 7.5"
                      stroke="white"
                      strokeWidth="2"/>
                  </svg>
                )}
                <div className="flex flex-col justify-start w-[60%]">
                 <p className="text-[18px] text-left font-semibold">{module.name}</p>
                 <p className="text-[15px] text-left text-gray-1 font-medium">{module.description}</p>
                </div>
                <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.75117e-08 1.32812L6.5 7.82812L13 1.32812L11.8463 0.174375L6.5 5.52062L1.15375 0.174374L7.75117e-08 1.32812Z" fill="#373737" fill-opacity="0.7"/>
                </svg>
              </div>
            )})}
          </div>
        </section>
        <footer className="relative bottom-0 flex items-center">
            <div className="font-medium py-4">Responded 25/34</div>
        </footer>
      </div>
    </>
  );
}
