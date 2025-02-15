import React, { useState } from "react";
import { Container } from "../../components/ui-components";
import NotificationHeader from "./NotificationHeader";
import TodayNotifications from "./TodayNotifications";
import YesterdayNotifications from "./YesterdayNotifications";
import LastWeekNotification from "./LastWeekNotification";
import { checkIsMobile } from "../../utils/helpers";
import {
  clearNotification,
  getNotification,
  getUnReadNotification,
} from "../../redux/notification/actionCreator";
import { useLoaderData } from "react-router-dom";
import store from "../../redux/store";
import moment from "moment";
import notificationCircle from "../../assets/svgs/notificationcircle.svg";
import { useDispatch } from "react-redux";
import { Button, message, Space } from "antd";

const getNotifications = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getNotification());
    console.log("response 2: ", response.data);

    if (response && response.type == "NOTIFICATION_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export async function notificationPageLoader() {
  const notifications = await getNotifications();
  // console.log("loaderData 3: ", notifications);
  return {
    date: new Date().toISOString(),
    notifications: notifications,
  };
}

function NotificationPage() {
  const isMobile = checkIsMobile();
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const [isUnReaded, setIsUnReaded] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const allNotifications = Object.values(loaderData.notifications).flat();

  const unReadNotifications = allNotifications.filter((ele) => !ele.isRead);

  const popover = ( type, content ) => {
    console.log("type: ",type, "content: ", content);
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const getNotificationsByDate = (data) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    const todayNotifications = [];
    const yesterdayNotifications = [];
    const olderNotifications = [];

    Object.values(data).forEach((notifications) => {
      notifications.forEach((notification) => {
        const groupedDate = moment(notification.groupedDate).startOf("day");
        if (groupedDate.isSame(today, "day")) {
          todayNotifications.push(notification);
        } else if (groupedDate.isSame(yesterday, "day")) {
          yesterdayNotifications.push(notification);
        } else if (groupedDate.isBefore(yesterday, "day")) {
          olderNotifications.push(notification);
        }
      });
    });

    return {
      todayNotifications,
      yesterdayNotifications,
      olderNotifications,
    };
  };

  const { todayNotifications, yesterdayNotifications, olderNotifications } =
    getNotificationsByDate(loaderData.notifications);

  const formatNotificationTime = (timestamp) => {
    return moment(timestamp).calendar();
  };

  const handleClearNotification = async () => {
    const response = await dispatch(clearNotification());
    if (response && response.type === "NOTIFICATION_SUCCESS") {
      popover("success", "Notifications cleared");
      console.log("Notifications cleared");
    } else {
      popover("error", "Unable to Clear notifications");
      // console.log("Error clearing notifications");
    }
  };



  // console.log("Today's Notifications:", todayNotifications);
  // console.log("Yesterday's Notifications:", yesterdayNotifications);
  // console.log("Older Notifications:", olderNotifications);

  return (
    <>
      {contextHolder}
      {!isMobile && (
        <section className={`md:py-4 md:max-w-4xl md:mx-auto`}>
          <Container className={"max-w-3xl w-full"}>
            <div className="md:mt-8">
              <h1 className="text-4xl font-bold">Notifications</h1>
              {!isMobile && (
                <div className="flex flex-row justify-between my-5">
                  <div className="flex flex-row gap-4">
                    <button
                      className={`${
                        isUnReaded
                          ? "bg-white text-black border"
                          : "bg-black text-white"
                      } text-sm   px-5 py-1 rounded-2xl`}
                      onClick={() => setIsUnReaded(false)}>
                      All
                    </button>
                    <button
                      className={`${
                        isUnReaded
                          ? "bg-black text-white"
                          : "bg-white text-black border"
                      } text-sm   px-5 py-1 rounded-2xl `}
                      onClick={() => setIsUnReaded(true)}>
                      Unread
                    </button>
                  </div>
                  <button
                    className="text-sm text-gray-500"
                    onClick={handleClearNotification}>
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className=" md:max-w-4xl md:mx-auto">
        <Container className={"max-w-3xl w-full"}>
          <div className={`${isUnReaded ? "hidden" : "flex"} flex-col gap-6`}>
            {/* today notification */}
            {todayNotifications.filter((ele) => ele.isRead).length <=
            0 ? null : (
              <div>
                <h3 className="text-sm font-semibold mb-4">Today</h3>
                <div className="flex flex-col gap-4">
                  {todayNotifications
                    .filter((ele) => ele.isRead) // Filter only read notifications
                    .map((ele, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center">
                        <img src={notificationCircle} alt="" />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-500">{ele.message}</p>
                          <p className="text-xs text-gray-500">
                            {formatNotificationTime(ele.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* yesterday notification */}
            {yesterdayNotifications.filter((ele) => ele.isRead).length <=
            0 ? null : (
              <div>
                <h3 className="text-sm font-semibold mb-4">YesterDay</h3>
                <div className="flex flex-col gap-4">
                  {yesterdayNotifications
                    .filter((ele) => ele.isRead) // Filter only read notifications
                    .map((ele, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center">
                        <img src={notificationCircle} alt="" />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-500">{ele.message}</p>
                          <p className="text-xs text-gray-500">
                            {formatNotificationTime(ele.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Notifications History */}
            {olderNotifications.filter((ele) => ele.isRead).length <=
            0 ? null : (
              <div>
                <h3 className="text-sm font-semibold mb-4">This Month</h3>
                <div className="flex flex-col gap-4">
                  {olderNotifications
                    .filter((ele) => ele.isRead) // Filter only read notifications
                    .map((ele, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center">
                        <img src={notificationCircle} alt="" />
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-500">{ele.message}</p>
                          <p className="text-xs text-gray-500">
                            {formatNotificationTime(ele.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* unReaded Notifications */}
          <div className={`${isUnReaded ? "flex" : "hidden"} flex-col gap-6`}>
            {unReadNotifications.length <= 0 ? (
              <p>No Unread Notifications</p>
            ) : (
              <div>
                <h3 className="text-sm font-semibold mb-4">
                  Unread Notifications
                </h3>
                <div className="flex flex-col gap-4">
                  {unReadNotifications.map((ele, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-3 items-center">
                      <img src={notificationCircle} alt="" />
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-500">{ele.message}</p>
                        <p className="text-xs text-gray-500">
                          {formatNotificationTime(ele.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

export default NotificationPage;
