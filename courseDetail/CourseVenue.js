import { StarIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { checkIsMobile } from "../../utils/helpers";

const CourseVenueTab = () => {
    const isMobile = checkIsMobile();
    return (
        <>
            <h3 className="text-2xl text-text font-semibold mb-4">Course Venue</h3>
            <div className="flex flex-col justify-start items-start gap-5">
                <div className="flex flex-col md:flex-row gap-4 justify-start items-start">
                    <div className="flex w-full h-80 md:h-full">
                        <div className="grid grid-cols-2 w-full gap-2">
                            <div className="col-span-2 md:row-span-2 bg-[#F8F8F8] flex rounded-lg"></div>
                            <div className="bg-[#F8F8F8] flex rounded-lg"></div>
                            <div className="bg-[#F8F8F8] flex rounded-lg"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:gap-4">
                        <h3 className="text-lg text-text font-semibold">White House</h3>
                        <div className="flex flex-row items-center gap-[4px] md:gap-3">
                            <div className="flex gap-2 justify-start items-center bg-gray-6 rounded-full py-1 px-3">
                                <StarIcon className="size-4" />
                                <h1 className="text-sm font-bold">4.8</h1>
                                <p className="text-sm text-gray-500">(60)</p>
                            </div>
                            <div className="flex md:gap-2 justify-start items-center">
                                <p className="text-sm md:text-lg font-semibold">2680 Sq Ft</p>
                                <p className="text-sm md:text-lg font-semibold">250 Person Max Capacity</p>
                            </div>
                        </div>
                        <p className="text-sm md:text-base">This large space with dramatic views can be decorated any way you be wish. With an adjacent buffet area, and creative menus with the hotel’s upbeat service, it’s the perfect venue.</p>
                        <div className="w-full flex flex-row justify-between items-center gap-3 border border-gray-400 rounded-xl p-2 md:p-4">
                            <div>
                                <MapPinIcon className="size-6" />
                            </div>
                            <div className="w-full text-left">
                                <p className="text-xs md:text-base">No.67/1B, 4th Cross, Shanthala Nagar, Lavelle Road, Bangalore - 560001</p>
                            </div>
                            <div>
                                <ChevronRightIcon className="size-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-lg text-text font-medium mb-4">Amenities</h4>
                    <div className="flex flex-row flex-wrap gap-2 md:gap-3 justify-start items-start">
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Free Wi-Fi</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">On-site parking</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Restrooms</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Air conditioning</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Projectors</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Microphones</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Lighting</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Tables & Chairs</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Dining Area</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Security Services</a>
                        <a className="text-sm md:text-base bg-white border border-gray-400 text-gray-600 py-1 px-3 rounded-full">Technical Support Staff</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseVenueTab;
