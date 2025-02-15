import { notification } from "antd";
import React from "react";
// import { useLoaderData } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";

export async function notificationHeaderLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function NotificationHeader() {
  //   let data = useLoaderData();
  const isMobile = checkIsMobile();
  return (
    <div className="md:mt-8">
      <h1 className="text-4xl font-bold">Notifications</h1>
      {!isMobile && (
        <div className="flex flex-row justify-between my-5">
          <div className="flex flex-row gap-4">
            <button className="text-sm bg-black text-white px-5 py-1 rounded-2xl border-none">
              All
            </button>
            <button className="text-sm bg-white text-black px-4 py-1 rounded-2xl border border-gray-200">
              Unread
            </button>
          </div>
          <button className="text-sm text-gray-500">Clear All</button>
        </div>
      )}
    </div>
  );
}

export default NotificationHeader;
