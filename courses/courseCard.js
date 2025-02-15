
import { checkIsMobile } from "../../utils/helpers";
import React from "react";

function CourseCard({type , data}) {
    const isMobile = checkIsMobile();
  return (
    <div className={`relative`}>
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-medium bg-gray-200 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
            Design
            </span>
            <span className="text-[10px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
                {
                    type === 1?
                    'Last 2 Seats left for batch 1'
                    :type === 2?
                    'Batches are filling faster'
                    :type === 3?
                    'Last day to register for Batch 1'
                    :type === 4?
                    ''
                    :'Popular'
                }
            </span>
        </div>
        {data?.image ? 
        <img className={`h-44 bg-gray-200 rounded-3xl `} src={data?.image} alt="ins"/>
        :<div className="h-44 bg-gray-200 rounded-3xl"></div>
        }
        <h2 className="mt-4 text-base md:text-sm font-bold">
            {data?.title || "How to becoming UX designer designer"}
        </h2>
        <p className="mt-2 text-xs font-semibold text-gray-600">
            {data?.mode == 'online' ? 'Online |' : 'Online |'}  {data?.mode == 'classroom' ? 'Classroom |' : "Classroom |"}  {data?.mode == 'one_on_one' ? 'One on One |' : "One on One |"} {data?.duration || '60hrs'}
        </p>
        <div className="flex flex-row items-center mt-2">
            <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
            <div className="ml-2 flex flex-row gap-2">
            <p className="text-sm font-medium">{data?.instructor_name || 'Rohan Joshi'}</p>
            <p className="text-sm text-gray-500">
                <span className="font-semibold">{data?.averageRating || "4.8"}</span> ({data?.reviewsCount || '200'})
            </p>
            </div>
        </div>
        <p className="mt-2 text-sm font-semibold">
            <span className="text-xs text-gray-500">Starts From</span> ₹ {data?.discountedPrice}/-
        </p>
    </div>
  );
}

export default CourseCard;
