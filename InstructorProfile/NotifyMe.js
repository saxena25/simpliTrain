import React from "react";
import bell from "../../assets/svgs/bell.svg";

function NotifyMe() {
  return (
    <div className="relative -top-20 right-0 flex flex-col gap-4">
      <div className="bg-[#F7F7F7] flex flex-col gap-4 py-3 px-3 rounded-xl">
        <div className="bg-[#EEEEEE] w-72 h-40 rounded-xl"></div>
        <div className="flex flex-row gap-2 bg-white px-4 py-2 rounded-full">
          <img
            src={bell}
            alt="notification"
            className="border border-gray-400 rounded-full px-2 py-2"
          />
          <div>
            <p className="text-sm text-secondary font-medium">Notify Me</p>
            <p className="text-primary text-xs whitespace-nowrap">
              Notify me when a new batch is scheduled
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F7F7] flex flex-col  px-4 py-5 rounded-2xl">
        <p className="text-2xl text-secondary font-medium">Have a Question?</p>
        <p className="text-xs text-primary mb-4">
          Send your questions to the instructor.
        </p>
        <textarea className="w-full h-24 bg-white rounded-xl border border-gray-300"></textarea>
      </div>
    </div>
  );
}

export default NotifyMe;
