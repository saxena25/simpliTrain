

import React from "react";

function CourseCard() {

  return (
    <div className="w-80 p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium bg-gray-300 py-1 px-2 rounded-full">Design</span>
            <span className="text-sm font-medium bg-gray-200 py-1 px-2 rounded-full">Popular</span>
        </div>

        <div className="h-24 bg-gray-300 rounded-lg mt-4"></div>

        <h2 className="mt-4 text-xl font-semibold">
            How to becoming UX designer designer
        </h2>

        <p className="mt-2 text-gray-600">Online | Classroom | One on One | 60hrs</p>

        <div className="flex items-center mt-4">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            <div className="ml-2">
                <p className="text-sm font-medium">Rohan Joshi</p>
                <p className="text-sm text-gray-500">
                <span className="font-semibold">4.8</span> (200)
                </p>
            </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
        Next Batch: May 24 - Aug 24 | +2 More Batches
        </p>
        <p className="mt-2 text-lg font-semibold">Starts From ₹ 9,999/-</p>
    </div>
  );
}

export default CourseCard;
