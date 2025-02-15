import React from "react";
import { useLoaderData } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";

export async function aboutLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function HeroSection() {
  let data = useLoaderData();
  const isMobile = checkIsMobile();

  return (
    <div className="relative isolate sm:py-0 lg:pb-20 md:px-8 md:mb-6">
      <div className="mx-auto max-w-[98%] lg:min-h-7xl px-4 py-10 lg:py-40 bg-gray-4 ">
        <div className="mx-auto max-w-2xl text-center ">
          <h2 className="text-base lg:text-2xl font-semibold text-gray-700 md:text-xl">
            Features
          </h2>
          <h1 className="text-balance text-2xl lg:text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl md:text-5xl">
            Our Core Features
          </h1>
          <p className={`${isMobile ? "w-full max-w-sm m-auto": ""} mt-4 px-4 text-sm text-pretty lg:text-xl font-medium text-gray-500 sm:text-xl/8 md:mt-6`}>
            Our platform is designed to provide learners, instructors, and value
            providers with a seamless and flexible experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
