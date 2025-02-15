import React from 'react';
import notificationCircle from "../../assets/svgs/notificationcircle.svg"

function TodayNotifications() {
    const todayNotifications = [
        {
          notification: "You have successfully enrolled in Guitar Beginner, course starts on 26th Oct 2024.",
          time: "0 min",
        },
        {
          notification: "You have successfully enrolled in Guitar Beginner, course starts on 26th Oct 2024.",
          time: "0 min",
        },
        {
          notification: "Your class Full Stack Developer on 26th Oct 2024 has been canceled, check your dashboard for updated details.",
          time: "1 Hour ago",
        }
       ]
  return (
    <div>
        <h3 className="text-sm font-semibold">Today</h3>
        <div className='flex flex-col gap-4'>
          {
            todayNotifications.map((ele,index)=>(
              <div key={index} className="flex flex-row gap-3 items-center my-2">
                <img src={notificationCircle} alt="" />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">{ele.notification}</p>
                  <p className="text-xs text-gray-500">{ele.time}</p>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default TodayNotifications
