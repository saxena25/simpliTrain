import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import InstructorBenefits from './InstructorBenefits';
import FaqSection from './FaqSection';
import HowitWorks from './HowitWorks';
import TeachingGetStarted from './TeachingGetStarted';
import SuccessStories from './SuccessStories';
import ToolsHelpYouSucceed from './ToolsHelpYouSucceed';
import { checkIsMobile } from '../../utils/helpers';
import MobHeader from '../../components/ui-components/MobHeader';


export async function instructorLoader(){
  return {
    date: new Date().toISOString(),
  };
}


export default function Instructor() {
  const isMobile = checkIsMobile();
  let data = useLoaderData();
  return (
    <>
    {
      isMobile && (
        <MobHeader />
      )
    }
      {/* Hero Section */}
      <section className="bg-gray-100 mx-5 md:mx-0 py-20">
        <Container>
          <InnerHeroSection preHeading={'Instructor'} heading={'Teach, Inspire, & Grow\n with SimpliTrain'} textInfo={'Join our global community of instructors and make an impact through live, interactive courses.'} buttonText={'Become an instructor'} buttonLink={'/become_instructor'} />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <InstructorBenefits />
        </Container>
      </section>
      <section className="md:py-16">
        <Container>
          <HowitWorks />
        </Container>
      </section>
      <section className="bg-gray-6 py-16">
        {/* <Container> */}
          <ToolsHelpYouSucceed />
        {/* </Container> */}
      </section> 
      <section className="py-16">
        <Container>
          <SuccessStories />
        </Container>
      </section>      
      <section className="md:py-16">
        <Container>
          <FaqSection />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <TeachingGetStarted />
        </Container>
      </section>
    </>
  );
}