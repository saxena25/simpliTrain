import { Fragment, useState } from 'react'
import { useLoaderData } from "react-router-dom";
import InnerHeroSection from '../../components/shared-components/InnerHeroSection';
import { Container } from '../../components/ui-components';
import OurMission from './OurMission';
import StatusSection from './StatusSection';
import KeyFeatures from './KeyFeatures';
import MeetOurCommunity from './MeetOurCommunity';
import FaqSection from './FaqSection';
import LearningGetStarted from './LearningGetStarted';
import { checkIsMobile } from '../../utils/helpers';
import MobHeader from '../../components/ui-components/MobHeader';

export async function aboutLoader(){
  return {
    date: new Date().toISOString(),
  };
}


export default function AboutUs() {
  const isMobile = checkIsMobile();
  let data = useLoaderData();
  return (
    <>
      {isMobile && (
        <MobHeader />
      )}

      {/* Hero Section */}
      <section className={`bg-gray-100 py-20 ${isMobile ? "mx-5" : ""}`}>
        <Container>
          <InnerHeroSection preHeading={'About Us'} heading={'Empowering Learning, Anytime, Anywhere.'} textInfo={'Join our community of learners and instructors, where education is limitless and interactive.'} buttonText={'Explore Courses'} buttonLink={'/courses'} />
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <Container>
          <OurMission />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <StatusSection />
        </Container>
      </section>
      <section className="bg-gray-6 py-16">
        <Container>
          <KeyFeatures />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <MeetOurCommunity />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <FaqSection />
        </Container>
      </section>
      <section className="md:py-16">
        <Container>
          <LearningGetStarted />
        </Container>
      </section>
    </>
  );
}