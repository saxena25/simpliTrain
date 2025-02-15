import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import { AccessibilityIcon, CommunityIcon, FlexibilityIcon, PersonalGrowthIcon } from '../../components/icons';
import { checkIsMobile } from '../../utils/helpers';
import accessibility from '../../assets/svgs/accessibility.svg';


export default function OurMission() {
 const isMobile = checkIsMobile ();
  return (
    <>
      <div className={`flex flex-row gap-6 md:gap-12 mb-12 ${isMobile ? "justify-center" : ""}`}>
        <div className="flex ">
          <h2 className={`text-2xl text-text font-medium  ${isMobile ? "whitespace-nowrap": ""}`}>Our Mission</h2>
        </div>
        <div className={`flex flex-col ${isMobile ? "w-52" : ""}`}>
          <h4 className="text-lg md:text-3xl text-text font-medium mb-3">Empowering Learners, Shaping Futures</h4>
          <p className={`text-sm md:text-lg text-text mb-6 md:w-2/4`}>
            Our mission is to bridge the gap between quality education and accessibility by offering flexible, interactive
            courses.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <div className="relative p-4 md:p-6 pb-24 md:pb-36 bg-[#363A49]">
          <h3 className="font-bold text-xl text-white mb-2">{'Accessibility'}</h3>
          <p className="text-sm text-white">
            {`Our platform ensures that learning is available to everyone, anytime and anywhere, with flexible formats to suit different needs.`}
          </p>
          <span className='absolute bottom-5 left-4 md:left-5 '>
            <AccessibilityIcon />
          </span>
          
        </div>
        <div className="relative p-4 md:p-6 pb-24 md:pb-36 bg-[#363A49]">
          <h3 className="font-bold text-xl text-white mb-2">{'Flexibility'}</h3>
          <p className="text-sm text-white">
            {`Choose how and when you learn, whether through online, offline, group, or one-on-one sessions, tailored to your schedule.`}
          </p>
          <span className='absolute bottom-5 left-4 md:left-5'>
            <FlexibilityIcon />
          </span>
        </div>
        <div className="relative p-4 md:p-6 pb-24 md:pb-36 bg-[#363A49]">
          <h3 className="font-bold text-xl text-white mb-2">{'Community'}</h3>
          <p className="text-sm text-white">
            {`Join a vibrant network of learners and instructors who collaborate, share insights, and grow together.`}
          </p>
          <span className='absolute bottom-5 left-4 md:left-5'>
            <CommunityIcon />
          </span>
        </div>
        <div className="relative p-4 md:p-6 pb-24 md:pb-36 bg-[#363A49]">
          <h3 className="font-bold text-xl text-white mb-2">{'Personal Growth'}</h3>
          <p className="text-sm text-white">
            {`Empower yourself by gaining new skills, advancing your career, and achieving your personal learning goals.`}
          </p>
          <span className='absolute bottom-5 left-4 md:left-5'>
            <PersonalGrowthIcon />
          </span>
        </div>
      </div>
    </>
  );
}