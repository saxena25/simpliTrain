import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import { AccessibilityIcon, CommunityIcon, FlexibilityIcon, PersonalGrowthIcon } from '../../components/icons';
import { checkIsMobile } from '../../utils/helpers';


export default function HowitWorks() {
  const isMobile = checkIsMobile();
  return (
    <>
      <div className={`flex flex-col md:flex-row justify-between items-start gap-12 mb-12 `}>
        <div className="flex md:w-1/2 flex-col">
          <div  className="md:w-3/4 flex flex-col justify-start gap-3">
            <h2 className="text-base md:text-2xl text-text font-medium">How It Works</h2>
            <h5 className="text-2xl md:text-3xl text-text font-medium">Our platform makes learning &   teaching simple and engaging. Here’s how it works</h5>
            <a className='w-fit md:w-44 bg-[#2A3140] text-white text-base md:text-sm rounded-lg px-5 py-3'>Become An Instructor</a>
          </div>
        </div>
        <div className={`flex w-full md:w-1/2 flex-col md:pt-12 ${isMobile ? "" : ""} `}>
          <div className='py-3 border-t border-t-text border-b border-b-text'>
            <h4 className='text-lg md:text-xl text-text font-medium pr-4'>Sign Up and Create Your Profile</h4>
            <p className='text-base md:text-lg'>Join the platform, set up your profile, and showcase your expertise.</p>
          </div>
          <div className='py-3 border-b border-b-text'>
            <h4 className='text-lg md:text-xl text-text font-medium'>Create and Publish Your Course</h4>
            <p className='text-base md:text-lg'>Use our easy-to-navigate tools to design, structure, and publish your course content.</p>
          </div>
          <div className='py-3 border-b border-b-text'>
            <h4 className='text-lg md:text-xl text-text font-medium'>Teach in Real Time</h4>
            <p className='text-base md:text-lg'>Offer live sessions, engage with learners, and provide personalised support.</p>
          </div>
          <div className='py-3 border-b border-b-text'>
            <h4 className='text-lg md:text-xl text-text font-medium'>Track Your Progress and Earnings</h4>
            <p className='text-base md:text-lg'>Use your dashboard to track learner engagement, feedback, and your earnings.</p>
          </div>
        </div>
      </div>
    </>
  );
}