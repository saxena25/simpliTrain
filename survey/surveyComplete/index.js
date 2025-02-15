import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Drawer  from "../../../components/ui-components/Drawer";
import  Container from '../../../components/ui-components/Container';
import Button from "../../../components/ui-components/Button";

export async function surveyResultLoader() {
  return {
    date: new Date().toISOString(),
  };
}

export default function SurveyResult() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const change_route = () => {
    navigate("/dashboard/survey");
  };
  

  return (
    <>
      <Drawer open={open} onClose={setOpen}>
        <Container className="flex flex-col justify-center items-center rounded-[26px] bg-gray-100 p-4 py-8">
          <svg
            width="59"
            height="59"
            viewBox="0 0 59 59"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="29.81"
              cy="29.185"
              r="29.185"
              fill="white"
              fill-opacity="0.5"
            />
            <path
              d="M27.0178 40.2404L24.964 36.7815L21.0727 35.9167L21.451 31.9173L18.8027 28.8907L21.451 25.8641L21.0727 21.8647L24.964 21L27.0178 17.541L30.6929 19.1084L34.3681 17.541L36.4218 21L40.3131 21.8647L39.9348 25.8641L42.5831 28.8907L39.9348 31.9173L40.3131 35.9167L36.4218 36.7815L34.3681 40.2404L30.6929 38.6731L27.0178 40.2404ZM27.9365 37.4841L30.6929 36.2951L33.5033 37.4841L35.0166 34.8899L37.9891 34.1873L37.7189 31.1607L39.7186 28.8907L37.7189 26.5667L37.9891 23.5401L35.0166 22.8916L33.4493 20.2974L30.6929 21.4864L27.8825 20.2974L26.3692 22.8916L23.3967 23.5401L23.6669 26.5667L21.6672 28.8907L23.6669 31.1607L23.3967 34.2413L26.3692 34.8899L27.9365 37.4841ZM29.5579 32.728L35.6652 26.6208L34.1519 25.0534L29.5579 29.6474L27.2339 27.3774L25.7207 28.8907L29.5579 32.728Z"
              fill="#5F6368"
            />
          </svg>

          <h1 className="text-lg font-semibold pt-4">
            Survey Successfully Completed!
          </h1>
          <p className="text-sm/6 text-gray-400 font-medium pb-4 text-center pt-2 w-[80%]">
          Thank you for participating in the survey. Your responses have been successfully submitted and recorded. We appreciate your feedback, as it helps us improve the course experience for everyone.
          </p>
        </Container>
        <div className="py-6 flex flex-col justify-center items-center">
          <h6 className="text-[13px] text-left text-gray-1 font-medium">SURVEY</h6>
          <h2 className="flex text-[20px] text-left font-semibold">
            The basics of user experience design
          </h2>
          <h6 className="text-[13px] text-left text-gray-1 font-medium">
            Course : Course Title
          </h6>
        </div>
        <div className="flex justify-center items-center">
        <Button
              onClick={change_route}
              text="Edit Survey"
              color="gray-300"
              icon = {<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.6208 3.25 16.8625 3.15C17.1042 3.05 17.3583 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.7708 5.4 20.8625 5.65C20.9542 5.9 21 6.15 21 6.4C21 6.66667 20.9542 6.92083 20.8625 7.1625C20.7708 7.40417 20.625 7.625 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" fill="#5F6368"/>
              </svg>
              }
              className="w-32 h-[40px] bg-gray-300"
            />

         
        </div>
      </Drawer>
    </>
  );
}
