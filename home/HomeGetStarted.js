import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import { AccessibilityIcon, CommunityIcon, FlexibilityIcon, PersonalGrowthIcon } from '../../components/icons';


export default function HomeGetStarted() {
 
  return (
    <div className='w-full h-full bg-gray-6 flex justify-center items-center rounded-3xl py-10 px-5 md:p-20'>
      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <h4 className="text-2xl md:text-3xl text-text font-medium text-center m-0">Jumpstart Your Learning 
        with Live Classes</h4>
        <p className="text-sm md:text-lg text-text text-center w-3/4 m-0">Get ahead with our interactive live classes. 
        Join now and earn certifications to boost your career.</p>
        <a className='bg-[#0E121D] text-sm md:text-base text-white rounded-lg px-5 py-3'>Get Started</a>
      </div>
    </div>
  );
}