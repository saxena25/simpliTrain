import React from 'react';
import notificationCircle from "../../assets/svgs/notificationcircle.svg"

function LastWeekNotification() {
    const lastWeekNotifications = [
        {
          notification: "Your assignment for UX Designer has been graded, check your feedback and grade now.",
          time: "2 Week"
        },
        {
          notification: "Your assignment for UX Designer has been graded, check your feedback and grade now.",
          time: "2 Week"
        },
       ]

  return (
    <div>
        <h3 className="text-sm font-semibold">Last Week</h3>
        <div className='flex flex-col gap-4'>
          {
            lastWeekNotifications.map((ele,index)=>(
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

export default LastWeekNotification
