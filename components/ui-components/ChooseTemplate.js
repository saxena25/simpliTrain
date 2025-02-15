import { CloseButton } from "@headlessui/react";
import React from "react";
import Container from "./Container";

function ChooseTemplate({ title, body }) {
  return (
    <div className="h-screen">
      {/* header */}
      <div className="bg-white fixed top-0 flex flex-row justify-between w-full h-16 border items-center px-8">
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-2xl text-black font-medium">S</h1>
          <div className="w-[2px] bg-gray-400 h-5"></div>
          <h1 className="text-base text-black font-semibold">Create {title}</h1>
        </div>
        <button className="">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.00177 9.70208L2.5351 15.1687C2.29066 15.4132 2.01288 15.5299 1.70177 15.5187C1.39066 15.5076 1.11288 15.3799 0.868433 15.1354C0.623989 14.891 0.501766 14.6076 0.501766 14.2854C0.501766 13.9632 0.623989 13.6799 0.868433 13.4354L6.30177 8.00208L0.8351 2.53542C0.590655 2.29097 0.473989 2.00764 0.4851 1.68542C0.496211 1.36319 0.623989 1.07986 0.868433 0.835417C1.11288 0.590972 1.39621 0.46875 1.71843 0.46875C2.04066 0.46875 2.32399 0.590972 2.56843 0.835417L8.00177 6.30208L13.4684 0.835417C13.7129 0.590972 13.9962 0.46875 14.3184 0.46875C14.6407 0.46875 14.924 0.590972 15.1684 0.835417C15.4129 1.07986 15.5351 1.36319 15.5351 1.68542C15.5351 2.00764 15.4129 2.29097 15.1684 2.53542L9.70177 8.00208L15.1684 13.4687C15.4129 13.7132 15.5351 13.991 15.5351 14.3021C15.5351 14.6132 15.4129 14.891 15.1684 15.1354C14.924 15.3799 14.6407 15.5021 14.3184 15.5021C13.9962 15.5021 13.7129 15.3799 13.4684 15.1354L8.00177 9.70208Z"
              fill="#060607"
            />
          </svg>
        </button>
      </div>

      {/* body */}
      <Container className="flex">
        <div className="w-full h-[98vh] flex flex-col justify-center items-center gap-10">
          <h1 className="text-xl text-[#181E2A] font-medium">{body}</h1>
          <div className="flex flex-row gap-4">
            {/* choose template */}
            <button className="border rounded-2xl flex flex-col gap-5 justify-center items-center w-64 h-52">
              <div className="bg-gray-100 rounded-xl h-16 w-16"></div>
              <h2 className="text-lg text-gray-500 font-medium">
                Choose {title} template
              </h2>
            </button>

            {/* start from scratch */}
            <button className="border rounded-xl flex flex-col gap-5 justify-center items-center w-64 h-52">
              <div className="bg-gray-100 rounded-xl h-16 w-16"></div>
              <h2 className="text-lg text-gray-500 font-medium">
                Start from Scratch?
              </h2>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ChooseTemplate;
