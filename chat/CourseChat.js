import React from "react";
import { useState } from "react";
import dummyPhoto from "../../assets/svgs/dummyPhoto.svg"

function CoursesChat() {
  const [sideChatData, setSideChatData] = useState([
    {
      name: "Introduction for python",
      message: "Session scheduled tomorrow...",
      time: "20:12",
      unReaded: true,
    },
    {
      name: "UI & UX Course",
      message: "Assignment due October that 10...",
      time: "18:12",
      unReaded: true,
    },
    {
      name: "Cooking Schedule",
      message: "50% that course that completed...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Learn Web Development",
      message: "Quiz that available that now...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Hacking Course",
      message: "Payment that due that tomorrow...",
      time: "Yesterday",
      unReaded: false,
    },
  ]);

  return (
    <div className="flex flex-col overflow-y-auto">
      {sideChatData.map((item, index) => (
        <div className={`flex flex-row justify-between p-5 border-b border-b-gray-200 ${item.unReaded ? "bg-gray-100" : ""} hover:cursor-pointer`}>
          <div className="flex flex-row gap-4">
            {/* <div className="bg-gray-300 rounded-full w-12"></div> */}
            <img src={dummyPhoto} alt="Profile Photo" />
            <div>
              <p className="text-base text-secondary font-medium">
                {item.name}
              </p>
              <p className="text-sm text-primary">
                {item.message}
              </p>
            </div>
          </div>
          <p className="text-xs text-secondary">{item.time}</p>
        </div>
      ))}
    </div>
  );
}

export default CoursesChat;
