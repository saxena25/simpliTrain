import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link } from "react-router-dom";

const WhySimplitrain = () => {

    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-start items-start gap-2 md:gap-4 mb-6 max-w-xl">
                <h5 className="text-2xl md:text-3xl font-bold ">Why Choose Simplitrain?</h5>
                <p>Empower Your Future with Simplitrain: Learn In-Demand Skills, Get Certified, Advance Your Career</p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-10 py-2 md:py-6'>
                {
                    ['','','','',''].map((item, index)=>(
                        <div key={index} className={'relative bg-white py-2 md:py-6'}
                        >
                            <div>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="20" cy="20" r="20" fill="#DFE1E6"/>
                                </svg>
                            </div>
                            <div className="mt-3">
                                <h3 className="text-base md:text-2xl font-semibold text-gray-900">Learn In-Demand Skills</h3>
                                <p className="mt-2 text-sm md:text-lg text-gray-500">We offer a wide range of courses in various fields, focusing on the latest industry trends and most sought-after skills by employers.</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WhySimplitrain;
