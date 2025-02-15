import React from "react";
import earth from "../../assets/svgs/earth.svg";
import Boxes from "./Boxes";
import dollar from "../../assets/svgs/dollar.svg";
import { Container } from "../../components/ui-components";

function VenueProviders() {
  const venueProvidersContent = [
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

  const venueProvidersData = [
    {
      img: dollar,
      alt: "Earth Logo",
      title: "Sign Up & Create a Profile",
      body: "Register as a venue provider and create your venue’s profile, showcasing its location, capacity.",
    },
    {
      img: dollar,
      alt: "Notes Logo",
      title: "List Your Venue",
      body: "Add your venue to our platform, specifying available dates and types of events/classes (offline sessions etc.).",
    },
    {
      img: dollar,
      alt: "Assignments Logo",
      title: "Get Bookings",
      body: "Instructors browse your venue and book it for their offline sessions or group classes.",
    },
    {
      img: dollar,
      alt: "Save Logo",
      title: "Host Classes & Earn",
      body: "Welcome instructors and learners to your space, host live classes, and get paid securely through the platform.",
    },
  ];
  return (
    <>
      <section className="md:py-16 lg:py-16">
        <Container>
          <div className="w-full md:max-w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-auto my-10 gap-8">
            {venueProvidersContent.map((box, index) => (
              <Boxes box={box} index={index} />
            ))}
          </div>
        </Container>
      </section>
      <section className="md:py-16">
        <Container className={"max-w-full"}>
          <h1 className="text-2xl lg:text-5xl text-center font-bold md:text-4xl mb-5 md:mb-12">
            Benefits of being Venue Providers
          </h1>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-center gap-4 md:gap-8">
            {venueProvidersData.map((ele, index) => (
              <div
                key={index}
                className="flex flex-row md:flex-col md:items-center md:justify-center md:text-center max-w-sm m-auto md:max-w-64 gap-3 md:gap-2 transform transition duration-300 hover:scale-110 hover: cursor-pointer  py-2">
                <img className="w-12 h-12 pt-2" src={ele.img} alt={ele.alt} />
                <div>
                  <h2 className="font-semibold text-lg lg:text-2xl leading-9 md:text-lg whitespace-nowrap ">
                    {ele.title}
                  </h2>
                  <p className="text-sm lg:text-base md:text-sm lg:mx-5">
                    {ele.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="py-0 pb-20">
            <div className="rounded-4xl py-10 md:py-40 lg:py-40 px-8  bg-gray-4">
              <div className="text-center ">
                <h1 className="text-balance text-2xl md:text-6xl lg:text-6xl font-semibold tracking-tight text-gray-900">
                  Join Us Today as a Venue Provider
                </h1>
                <p className="mt-8 text-pretty text-sm md:text-xl lg:text-xl font-medium text-gray-500 my-8">
                  Partner with us by offering your venue for in-person learning
                  experiences. Help connect instructors and learners while
                  growing your business through SimpliTrain&#39;s network
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

export default VenueProviders;
