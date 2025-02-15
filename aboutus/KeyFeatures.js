import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import { AccessibilityIcon, CommunityIcon, FlexibilityIcon, PersonalGrowthIcon } from '../../components/icons';
import { CircleStackIcon } from '@heroicons/react/20/solid';
import { checkIsMobile } from '../../utils/helpers';


export default function KeyFeatures() {
  const isMobile = checkIsMobile();
  const features = [
    {
      name: 'Live Sessions',
      description: 'Join interactive live sessions with expert instructors for a personalised and engaging learning experience.',
      icon: <span className='block w-5 h-5 bg-[#DFE1E6] rounded-full'></span>,
    },
    {
      name: 'Multi-Mode Learning',
      description: 'Choose from a variety of learning formats, including video lectures, interactive quizzes, and live sessions, to suit your preferences.',
      icon: <span className='block w-5 h-5 bg-[#363A49] rounded-full'></span>,
    },
    {
      name: 'User-Friendly Experience',
      description: 'Easily navigate through courses, modules, and lessons with our user-friendly interface.',
      icon: <span className='block w-5 h-5 bg-[#8B929F] rounded-full'></span>,
    },
    {
      name: 'Comprehensive Dashboard',
      description: 'Monitor your learning progress, view completed courses, and access course materials from your personalized dashboard.',
      icon: <span className='block w-5 h-5 bg-[#DADADA] rounded-full'></span>,
    },
  ]

  return (
    <div className='flex flex-col md:flex-row justify-between items-stretch'>
      <div className="flex flex-col justify-center items-start gap-4 mb-6">
        <h4 className="text-3xl text-text font-medium m-0">Key features{isMobile && <br/>} of the platform</h4>
        <p className="text-sm md:text-lg text-text max-w-xs md:w-2/4 m-0">
          Explore our key features and see why we're the leading platform for online learning.
        </p>
        <button className='bg-[#2A3140] text-white rounded-lg px-5 py-3'>Explore Features</button>
      </div>
      <div className="bg-white flex flex-col justify-center items-center gap-8 px-10 py-10 md:py-20">
        {
          features.map((feature) => (
            <div key={feature.name} className="flex flex-row justify-start items-start gap-4">
              <div className='pt-1.5'>
                {feature.icon}  
              </div>
              <div>
                <h3 className='text-text text-lg font-medium'>{feature.name}</h3>
                <p className='text-text text-sm'>{feature.description}</p>
              </div>
            </div>
          )) 
        }   
      </div>
    </div>
  );
}