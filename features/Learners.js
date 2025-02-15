import React from "react";
import earth from "../../assets/svgs/earth.svg";
import Boxes from "./Boxes";
import sessions from "../../assets/svgs/sessions.svg";
import progress from "../../assets/svgs/progress.svg";
import certificate from "../../assets/svgs/certificate.svg";
import dollar from "../../assets/svgs/dollar.svg";
import { Container } from "../../components/ui-components";
import { checkIsMobile } from "../../utils/helpers";

function Learners() {
  const learnersContent = [
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
    {
      topic: "Flexible Learning Formats",
      body: "Choose From online, offline group classes, or one-on-one sessions based on your preferences.",
    },
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
    {
      topic: "Live interactive sessions",
      body: "Join real-time classes with experts instructors from around the World.",
    },
  ];
  const learnersData = [
    {
      img: earth,
      alt: "Earth Logo",
      title: "Explore and Enroll",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: sessions,
      alt: "Notes Logo",
      title: "Attend Live Sessions",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: dollar,
      alt: "Assignments Logo",
      title: "Complete Assignments",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: progress,
      alt: "Save Logo",
      title: "Track Your Progress",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: certificate,
      alt: "Certificate Logo",
      title: "Earn Certifications",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
  ];
  const isMobile = checkIsMobile();
  return (
    <>
      <section className="md:py-16 lg:py-16">
        <Container>
          <div className="w-full md:max-w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-auto my-10 gap-8">
            {learnersContent.map((box, index) => (
              <Boxes box={box} index={index} />
            ))}
          </div>
        </Container>
      </section>
      <section className="md:py-16">
        <Container className={'max-w-full'}>
          <h1 className="text-2xl lg:text-5xl text-center font-bold md:text-4xl mb-5 md:mb-12">
            How It Works for Learners
          </h1>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-center gap-4 md:gap-8">
            {learnersData.map((ele, index) => (
              <div
                key={index}
                className="flex flex-row md:flex-col md:items-center md:justify-center md:text-center max-w-sm m-auto md:max-w-64 gap-3 md:gap-2 transform transition duration-300 hover:scale-110 hover: cursor-pointer  py-2">
                <img className="w-12 h-12 pt-2" src={ele.img} alt={ele.alt} />
                <div>
                  <h2 className="font-semibold text-lg lg:text-2xl leading-9 md:text-lg whitespace-nowrap ">
                    {ele.title}
                  </h2>
                  <p className="text-sm lg:text-base md:text-sm lg:mx-5">{ele.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="py-0 pb-20">
            <div className="rounded-4xl py-10 md:py-40 lg:py-40 px-8  bg-gray-4 ">
              <div className="text-center ">
                <h1 className="text-balance text-2xl md:text-6xl lg:text-6xl font-semibold tracking-tight text-gray-900 ">
                  Join us Today
                </h1>
                <p className="mt-8 text-pretty text-sm md:text-xl lg:text-xl font-medium text-gray-500 my-8">
                  Sign up as a learner to access live interactive classes. Track
                  your progress, and earn certifications across a variety of
                  courses. Enhance your skills with flexible learning formats and
                  personalized learning journeys.
                </p>
                <button
                  type="button"
                  className="rounded-md bg-black px-20 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>      
    </>
  );
}

export default Learners;
