import React from "react";
import earth from "../../assets/svgs/earth.svg";
import Boxes from "./Boxes";
import sessions from "../../assets/svgs/sessions.svg";
import progress from "../../assets/svgs/progress.svg";
import certificate from "../../assets/svgs/certificate.svg";
import dollar from "../../assets/svgs/dollar.svg";
import { Container } from "../../components/ui-components";

function Instructor() {
  const instructorContent = [
    {
      topic: "Global Reach",
      body: "Teach learners from all over the world and grow your audience.",
    },
    {
      topic: "Flexible Learning Formats",
      body: "Offer courses in multiple formats—online, offline, group, or one-on-one.",
    },
    {
      topic: "Earn as You Teach",
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

  const instructorData = [
    {
      img: earth,
      alt: "Earth Logo",
      title: "Global Reach",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: sessions,
      alt: "Flexible Formats",
      title: "Attend Live Sessions",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: dollar,
      alt: "Assignments Logo",
      title: "Earn as You Teach",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: progress,
      alt: "Save Logo",
      title: "Easy Course Creation",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
    {
      img: certificate,
      alt: "Certificate Logo",
      title: "Engagement Tools",
      body: "Browse courses across various subjects and enroll in the ones that suit your goal and interests.",
    },
  ];
  return (
    <>
      <section className="md:py-16 lg:py-16">
        <Container>
          <div className="w-full md:max-w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-auto my-10 gap-8">
            {instructorContent.map((box, index) => (
              <Boxes key={index} box={box} index={index} />
            ))}
          </div>
        </Container>
      </section>
      <section className="md:py-16">
        <Container className={"max-w-full"}>
          <h1 className="text-2xl lg:text-5xl text-center font-bold md:text-4xl mb-5 md:mb-12">
            Benefits of Being an Instructor
          </h1>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-center gap-4 md:gap-8">
            {instructorData.map((ele, index) => (
              <div
                key={index}
                className="flex flex-row md:flex-col md:items-center md:justify-center md:text-center max-w-sm m-auto md:max-w-64 gap-3 md:gap-2 transform transition duration-300 hover:scale-110 hover: cursor-pointer  py-2 ">
                <img className="w-12" src={ele.img} alt={ele.alt} />
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
                  Join Us Today as an Instructor
                </h1>
                <p className="mt-8 text-pretty text-sm md:text-xl lg:text-xl font-medium text-gray-500 my-8">
                  Share your expertise with a global audience. Create courses,
                  engage with learners, and track their progress through an
                  intuitive instructor dashboard. Join us to inspire and educate
                  the next generation of learners.
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

export default Instructor;
