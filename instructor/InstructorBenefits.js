import { Fragment, useState } from 'react'
import { EarnTeach, EasyCourseCreation, EngagementTools, FlexibleFormats, GlobalReach } from '../../components/icons';
import { checkIsMobile } from '../../utils/helpers';

export default function InstructorBenefits() {
  const incentives = [
    {
      name: 'Global Reach',
      icon: <GlobalReach className='size-6 text-gray-3' />,
      description: "Teach learners from all over the world and grow your audience.",
    },
    {
      name: 'Flexible Formats',
      icon: <FlexibleFormats className='size-6 text-gray-3' />,
      description: "Offer courses in multiple formats—online, offline, group, or one-on-one.",
    },
    {
      name: 'Earn as You Teach',
      icon: <EarnTeach className='size-6 text-gray-3' />,
      description: "Transparent earnings with flexible payment options.",
    },
    {
      name: 'Easy Course Creation',
      icon: <EasyCourseCreation className='size-6 text-gray-3' />,
      description: "Simple tools to create, manage, and publish your courses.",
    },
    {
      name: 'Engagement Tools',
      icon: <EngagementTools className='size-6 text-gray-3' />,
      description: "Live interactions, feedback options, and course analytics to help improve your teaching.",
    }
  ]
  const isMobile = checkIsMobile();
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 mb-6">
        <h4 className="text-2xl md:text-3xl text-text font-semibold md:font-medium text-center m-0">Benefits of{isMobile && <br/>} Being an Instructor</h4>
      </div>
      <div className="items-baseline grid grid-cols-2 md:grid-cols-5">
        {incentives.map((incentive) => (
          <div key={incentive.name} className="flex flex-col justify-center items-center p-5 gap-3">
            <div className="bg-gray-5 rounded-full p-1.5">
              {incentive.icon}
            </div>
            <div className={`${isMobile ? "flex flex-col gap-1" : ""}`}>
              <h3 className={`text-base md:text-lg font-medium text-center text-text whitespace-nowrap md:whitespace-normal`}>{incentive.name}</h3>
              <p className="text-sm md:text-xs text-text text-center">{incentive.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}