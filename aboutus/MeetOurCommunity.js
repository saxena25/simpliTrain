import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import { AccessibilityIcon, CommunityIcon, FlexibilityIcon, PersonalGrowthIcon } from '../../components/icons';
import { CircleStackIcon } from '@heroicons/react/20/solid';
import { checkIsMobile } from '../../utils/helpers';


export default function MeetOurCommunity() {
  const isMobile = checkIsMobile();
  const features = [
    {
      name: 'Live Sessions',
      description: 'Join interactive live sessions with expert instructors for a personalised and engaging learning experience.',
      icon: <span className='block w-5 h-5 bg-gray-5 rounded-full'></span>,
    },
    {
      name: 'Multi-Mode Learning',
      description: 'Choose from a variety of learning formats, including video lectures, interactive quizzes, and live sessions, to suit your preferences.',
      icon: <span className='block w-5 h-5 bg-gray-5 rounded-full'></span>,
    },
    {
      name: 'User-Friendly Experience',
      description: 'Easily navigate through courses, modules, and lessons with our user-friendly interface.',
      icon: <span className='block w-5 h-5 bg-gray-5 rounded-full'></span>,
    },
    {
      name: 'Comprehensive Dashboard',
      description: 'Monitor your learning progress, view completed courses, and access course materials from your personalized dashboard.',
      icon: <span className='block w-5 h-5 bg-gray-5 rounded-full'></span>,
    },
  ]

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <h4 className="text-2xl md:text-3xl text-text text-center font-medium m-0">Meet Our Community</h4>
        <p className="text-base md:text-lg text-text text-center w-3/4 m-0">
        Our platform thrives on the contributions of these three key user groups..
        </p>
      </div>
      <div className="bg-white flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
        <div className='flex flex-col justify-center items-center gap-12'>
          <div className='bg-[#F0F1F4] rounded-xl md:rounded-none relative p-6 pb-28 md:pb-40'>
            <h3 className='text-xl md:text-5xl text-text font-medium mb-5'>Instructors</h3>
            <p className={`${isMobile ? "text-sm": ""}`}>Instructors are the backbone of our platform, sharing their expertise and passion with a global community of learners. Whether you're teaching live sessions, hosting group classes, or offering one-on-one mentorship, we provide the tools and support to help you grow your reach and impact.</p>
            <a className='absolute left-0 bottom-0 p-4 flex flex-row items-center md:items-start justify-center gap-2'>
              <span className='text-base md:text-md text-text'>Know more</span>
              <svg width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke="#3B4350" strokeWidth="1.5" strokeM="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 12H20.33" stroke="#3B4350" strokeWidth="1.5" strokeM="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <img className='absolute right-5 -bottom-3 md:bottom-5 w-auto h-32 md:h-48' src={require('../../assets/images/about-instructor.png')} />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-12'>
          <div className='bg-[#DFE1E6] rounded-xl md:rounded-none relative  p-6 pb-28 md:pb-40'>
            <h3 className='text-xl md:text-5xl text-text font-medium mb-5'>Learners</h3>
            <p className={`${isMobile ? "text-sm": ""}`}>Our learners are at the heart of everything we do. With access to live sessions in multiple formats—online, offline, group, or one-on-one—you can choose the learning style that fits your goals. Whether you're upskilling for your career or pursuing personal growth, we're here to guide your journey.</p>
            <a className='absolute left-0 bottom-0 p-4 flex flex-row items-center md:items-start justify-center gap-2'>
              <span className='text-base md:text-md text-text'>Know more</span>
              <svg width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke="#3B4350" strokeWidth="1.5" strokeM="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 12H20.33" stroke="#3B4350" strokeWidth="1.5" strokeM="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <img className='absolute right-5 bottom-0 md:bottom-5 w-auto h-32 md:h-48' src={require('../../assets/images/about-learner.png')} />
          </div>
          <div className='bg-[#F4F4F4] rounded-xl md:rounded-none relative  p-6 pb-28 md:pb-40'>
            <h3 className='text-xl md:text-5xl text-text font-medium mb-5'>Venue Providers</h3>
            <p className={`${isMobile ? "text-sm": ""}`}>Venue providers are essential partners, offering flexible, physical spaces for learners to attend offline classes and group sessions. By joining us, you can transform your venue into a hub for education and professional growth, connecting learners and instructors in your local community.</p>
            <a className='absolute left-0 bottom-0 p-4 flex flex-row items-center md:items-start justify-center gap-2'>
              <span className='text-md text-text'>Know more</span>
              <svg width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke="#3B4350" strokeWidth="1.5" strokeM="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 12H20.33" stroke="#3B4350" strokeWidth="1.5" strokeM="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <img className='absolute right-0 md:right-5 -bottom-1 md:bottom-5 w-auto h-32 md:h-48' src={require('../../assets/images/about-venue.png')} />
          </div>  
        </div>   
      </div>
    </div>
  );
}