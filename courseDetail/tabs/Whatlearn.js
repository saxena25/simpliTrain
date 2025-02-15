import React, {useEffect , useState } from "react";
import { checkIsMobile } from "../../../utils/helpers";

const WhatLearn = ({course}) => {
    const isMobile = checkIsMobile();
    const [targetKeyTakeaways, setKeyTakeaways] = useState([]);


    useEffect(()=>{
        if(course && course.targetKeyTakeaways){
            const data = course?.targetKeyTakeaways.sort(function(a, b){return a.order - b.order});
            setKeyTakeaways([...data]);
        };
        // console.log("targetKeyTakeaways", course?.targetKeyTakeaways);
    },[]);

  return (
    <div className="flex flex-col">
        <h5 className="text-2xl md:text-3xl text-text font-bold mb-5 md:mb-10">What You’ll Learn</h5>
        <div className="grid grid-cols-1 gap-4 md:gap-6">
            {
                targetKeyTakeaways.map((item, index)=>(
                <div key={index} className={`flex flex-row gap-3 justify-start ${isMobile ? "items-center": "items-start"}`}>
                    <div className="flex w-16">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="60" height="60" rx="16" fill="#F7F7F7"/>
                        </svg>
                    </div>
                    <div className="flex flex-col w-full">
                        <h5 className="text-lg text-text font-medium">{item.title}</h5>
                        <p className="text-sm text-text">{item.description}</p>
                    </div>
                </div>
                ))
            }
        </div>
      </div>
  );
};

export default WhatLearn;
