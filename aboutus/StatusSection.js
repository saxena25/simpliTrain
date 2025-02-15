import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import { AccessibilityIcon, CommunityIcon, FlexibilityIcon, PersonalGrowthIcon } from '../../components/icons';


export default function StatusSection() {
 
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <h4 className="text-lg md:text-3xl text-text font-medium text-center m-0">Real Storied, Incredible Journeys</h4>
        <p className="text-base md:text-lg text-text text-center w-3/4 m-0">
          Our platform is home to thousands of courses, dedicated learners, expert instructors, and diverse venues. Each number reflects a unique journey of growth, learning, and success.
        </p>
      </div>
      <div className="flex flex-row justify-evenly md:justify-center items-center md:gap-8">
          <div className='flex flex-col justify-center items-center md:p-4'>
            <h5 className={`'text-text font-bold text-xl md:text-5xl `}>3000 +</h5>
            <span className='text-text font-medium md:font-normal text-sm  md:-ml-10'>{'Courses'}</span>
          </div>
          <div className='flex flex-col justify-center items-center md:p-4'>
            <h5 className={`'text-text font-bold text-xl md:text-5xl `}>750+</h5>
            <span className='text-text font-medium md:font-normal text-sm md:-ml-10'>{'Learners'}</span>
          </div>
          <div className='flex flex-col justify-center items-center md:p-4'>
            <h5 className={`'text-text font-bold text-xl md:text-5xl `}>220 +</h5>
            <span className='text-text font-medium md:font-normal text-sm md:-ml-10'>{'Instructors'}</span>
          </div>
          <div className='flex flex-col justify-center items-center md:p-4'>
            <h5 className={`'text-text font-bold text-xl md:text-5xl`}>400 +</h5>
            <span className='text-text font-medium md:font-normal text-sm md:-ml-10'>{'Venues'}</span>
          </div>
      </div>
    </>
  );
}