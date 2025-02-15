import React from 'react';
import notificationCircle from "../../assets/svgs/notificationcircle.svg"

function YesterdayNotifications() {
  const yesterdayNotifications = [
    {
      notification: "A new lesson for Guitar Beginner is now available, start learning today!",
      time: "2 days"
    },
   {
     notification: "You have 6 days left to complete UX Designer, keep up the good work!",
     time: "1 Week"
   },
   {
     notification: "A new lesson for Guitar Beginner is now available, start learning today!",
     time: "1 Week"
   },
   {
     notification: "A new lesson for Guitar Beginner is now available, start learning today!",
     time: "1 Week"
   },
  ]

  return (
    <div>
      <h3 className="text-sm font-semibold">Yesterday</h3>
      <div className='flex flex-col gap-4'>
        {
          yesterdayNotifications.map((ele,index)=>(
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

export default YesterdayNotifications
