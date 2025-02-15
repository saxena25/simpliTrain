import React, { useEffect, useState } from "react";

const Prerequisites = ({ course }) => {
    const [prerequisites, setPrerequisites] = useState([]);


    useEffect(()=>{
        if(course && course.targetPrerequisites){
            const data = course.targetPrerequisites.sort(function(a, b){return a.order - b.order});
            setPrerequisites([...data]);
        };
    },[]);


  return (
    <div className="flex flex-col md:px-6">
        <h5 className="text-lg font-bold mb-5">Prerequisites (What You’ll Need Before Starting)</h5>
        <div className="grid grid-cols-1 gap-6">
            {
                prerequisites.map((item, index)=>(
                    <div key={index} className="flex flex-row gap-2 justify-start items-start">
                        <div className="flex w-3"><span className="text-lg text-text font-medium">{index+1}.</span></div>
                        <div className="flex flex-col w-full">
                            <h5 className="text-base md:text-lg text-text font-medium">{item.title}</h5>
                            <p className="text-sm text-text">{item.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  );
};

export default Prerequisites;
