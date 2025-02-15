import { Carousel } from 'antd';
import { Fragment, useEffect, useRef, useState } from 'react'
import { QuoteIcon } from '../../components/icons';
import { checkIsMobile } from '../../utils/helpers';

const testimonials = [
  {
    id: 1,
    quote: "Tailwind CSS makes building UI components effortless and beautiful!",
    name: "Jane Doe",
    role: "Frontend Developer",
  },
  {
    id: 2,
    quote: "The flexibility of Tailwind is unmatched. Highly recommended!",
    name: "John Smith",
    role: "UI/UX Designer",
  },
  {
    id: 3,
    quote: "I love how Tailwind speeds up my development process.",
    name: "Emily Johnson",
    role: "Fullstack Developer",
  },
];

export default function SuccessStories() {
  const carouselRef = useRef(null);
  const isMobile = checkIsMobile();
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex flex-col justify-center items-center gap-4 mb-12">
        <h4 className="text-2xl md:text-3xl text-text text-center font-bold md:font-medium m-0">Success Stories</h4>
      </div>
      <div className="w-full max-w-4xl m-auto mb-24 md:mb-36 ">
        <Carousel
          ref={carouselRef}
          dots
          draggable
          autoplay
          autoplaySpeed={3000}
          slidesToShow={1}
          slidesToScroll={1}
          style={{height:'100%'}}
          id={'testimonial-slider'}
        >
          {testimonials.map((item,  index) => (
            <div>
              <div className="relative pt-10 flex flex-col md:flex-row justify-between items-center">
                <div className='absolute top-4 md:top-2 z-10 left-5 md:left-14'><QuoteIcon /></div>
                <div className=" flex justify-center items-center bg-gray-6 px-5 py-8 md:p-12 md:pr-32 pb-40 md:pb-40 rounded-sm">
                  <p className="text-gray-800 text-sm md:text-lg leading-relaxed">
                    Teaching on this platform has been a game-changer for me. The
                    flexibility to offer both online and offline sessions has allowed me
                    to reach learners from around the world while still connecting with
                    local students in person. The intuitive tools made it easy to create
                    and manage my courses, and the real-time interaction with learners
                    keeps every class engaging. Plus, the support from the platform has
                    helped me grow my audience and enhance my teaching methods. It's been
                    incredibly rewarding to see my students thrive!
                  </p>
                </div>
                <div className='flex justify-start items-center h-full'>
                  <div className="flex flex-col justify-start items-center gap-5 w-40 md:w-48 -mt-24 md:mt-0 md:-ml-16">
                    <img
                      src={require('../../assets/images/testimonial1.jpg')}
                      alt="Author"
                      className="w-full h-auto object-cover shadow-md filter"
                    />
                    <div className={`${isMobile ? "text-center" : ""}`}>
                      <h4 className="text-lg md:text-base text-text font-semibold">Anamika Schedeva</h4>
                      <p className="text-text text-sm whitespace-nowrap">Instructor of Digital Marketing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}