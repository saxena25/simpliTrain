import React from "react";
import { useState } from "react";
import { checkIsMobile } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";

function InstructorsChat() {
  const [sideChatData, setSideChatData] = useState([
    {
      name: "Melvin John",
      message: "Session scheduled tomorrow...",
      time: "20:12",
      unReaded: true,
    },
    {
      name: "Satyam",
      message: "Assignment due October that 10...",
      time: "18:12",
      unReaded: false,
    },
    {
      name: "Rohan Joshi",
      message: "50% that course that completed...",
      time: "Yesterday",
      unReaded: true,
    },
    {
      name: "Ashish",
      message: "Quiz that available that now...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Hrithik Saxena",
      message: "Payment that due that tomorrow...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Ashish",
      message: "Quiz that available that now...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Hrithik Saxena",
      message: "Payment that due that tomorrow...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Ashish",
      message: "Quiz that available that now...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Hrithik Saxena",
      message: "Payment that due that tomorrow...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Ashish",
      message: "Quiz that available that now...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Hrithik Saxena",
      message: "Payment that due that tomorrow...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Ashish",
      message: "Quiz that available that now...",
      time: "Yesterday",
      unReaded: false,
    },
    {
      name: "Hrithik Saxena",
      message: "Payment that due that tomorrow...",
      time: "Yesterday",
      unReaded: false,
    },
  ]);
  const isMobile = checkIsMobile();
  const navigate = useNavigate();

  const handleChatChange = (name) => {
    console.log(name);
  };

  return (
    <div className="flex flex-col">
      {sideChatData.map((item, index) =>
        isMobile ? (
          <Link to={"/chat/chatid"}>
            <div
              className={`flex flex-row justify-between py-5 px-2 md:p-5 border-b border-b-gray-200 ${
                item.unReaded ? "bg-gray-100" : ""
              } hover:cursor-pointer`}
              onClick={() => handleChatChange(item.name)}>
              <div className="flex flex-row gap-4">
                <div className="bg-gray-300 rounded-full w-12"></div>
                <div>
                  <p className="text-base text-secondary font-medium whitespace-nowrap">
                    {item.name}
                  </p>
                  <p className="text-sm text-primary whitespace-nowrap">
                    {item.message}
                  </p>
                </div>
              </div>
              <p className="text-xs text-secondary">{item.time}</p>
            </div>
          </Link>
        ) : (
          <div
            className={`flex flex-row justify-between py-5 px-2 md:p-5 border-b border-b-gray-200 ${
              item.unReaded ? "bg-gray-100" : ""
            } hover:cursor-pointer`}
            onClick={() => handleChatChange(item.name)}>
            <div className="flex flex-row gap-4">
              <div className="bg-gray-300 rounded-full w-12"></div>
              <div>
                <p className="text-base text-secondary font-medium whitespace-nowrap">
                  {item.name}
                </p>
                <p className="text-sm text-primary whitespace-nowrap">
                  {item.message}
                </p>
              </div>
            </div>
            <p className="text-xs text-secondary">{item.time}</p>
          </div>
        )
      )}
    </div>
  );
}

export default InstructorsChat;
