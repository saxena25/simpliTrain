import { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from "antd";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { checkIsMobile } from '../../utils/helpers';

const items = [
  {
    id: '01',
    title: "Teach in Real Time",
    description: "Host real-time courses and interact directly with your learners.",
  },
  {
    id: '02',
    title: "Course Management",
    description: "Intuitive interface for publishing, editing, and organising your content.",
  },
  {
    id: '03',
    title: "Analytics & Feedback",
    description: "Track student progress, gather feedback, and improve your courses.",
  },
  {
    id: '04',
    title: "Teach in Real Time",
    description: "Host real-time courses and interact directly with your learners.",
  },
  {
    id: '05',
    title: "Course Management",
    description: "Intuitive interface for publishing, editing, and organising your content.",
  },
  {
    id: '06',
    title: "Analytics & Feedback",
    description: "Track student progress, gather feedback, and improve your courses.",
  },
  {
    id: '07',
    title: "Teach in Real Time",
    description: "Host real-time courses and interact directly with your learners.",
  },
  {
    id: '08',
    title: "Course Management",
    description: "Intuitive interface for publishing, editing, and organising your content.",
  },
  {
    id: '09',
    title: "Analytics & Feedback",
    description: "Track student progress, gather feedback, and improve your courses.",
  },
];

export default function ToolsHelpYouSucceed() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = checkIsMobile();
  // const handleBeforeChange = (from, to) => {
  //   setCurrentSlide(to);
  // };
  const onSlideChange = (iin) => {
    console.log('iin', iin);
  }

  const goToPrev = () => {
    carouselRef.current.prev();
    // console.log(currentSlide);
    setCurrentSlide(currentSlide-1);
    // console.log(currentSlide-1);
  };

  const goToNext = () => {
    carouselRef.current.next();
    // console.log(currentSlide);
    setCurrentSlide(currentSlide+1);
    // if((currentSlide+1) >= items.length){
    //   carouselRef.current.slickGoTo(0);
    // }

    // console.log(currentSlide+1);
  };

  return (
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-3">
        <div className='flex flex-col justify-start items-start gap-5 px-5 md:p-8'>
          <h4 className="text-2xl md:text-6xl text-text text-left font-bold md:font-medium">Tools to Help You{isMobile && <br/>} Succeed</h4>
          <button className='bg-[#2A3140]  text-white rounded-lg px-5 py-3'>Explore Features</button>
        </div>
      </div>
      <div className="relative col-span-9">
        <Carousel
          ref={carouselRef}
          // afterChange={handleBeforeChange}
          // dots
          // arrows
          onSwipe={onSlideChange}
          draggable
          // autoplay
          // autoplaySpeed={3000}
          slidesToShow={isMobile ? 1.5 : 3}
          slidesToScroll={isMobile ? 1.5 : 1}
          style={{height:'100%'}}
          id='Carousel-Item-slider'
          // nextArrow = {<Button type="primary" shape="circle" icon={<ChevronRightIcon />} />}
          // prevArrow = {<Button type="primary" shape="circle" icon={<ChevronLeftIcon />} />}
        >
          {items.map((item,  index) => (
            <div className='p-2 h-full w-full'>
              <div className="h-full flex flex-col items-start justify-evenly p-6 bg-white shadow-lg">
                {/* Large number */}
                <div className="text-gray-4 text-8xl font-bold">
                  {item.id}
                </div>
                <div>
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-text mb-2">
                    {item.title}
                  </h3>
            
                  {/* Description */}
                  <p className="text-sm md:text-base text-text opacity-80">
                    {item.description}
                  </p>
                </div>
              
              </div>
            </div>
          ))}
        </Carousel>
        <div className='hidden md:flex'>
          {currentSlide > 0 && (
           <div className='absolute left-5 top-0 w-10 h-full flex items-center'>
              <Button type="primary" className='bg-primary' onClick={goToPrev} shape="circle" icon={<ChevronLeftIcon className='size-7 text-white' />} />
            </div>
          )}
          {currentSlide < items.length - 1 && (
            <div className='absolute right-5 top-0 w-10 h-full flex items-center'>
              <Button type="primary" className='bg-primary' onClick={goToNext} shape="circle" icon={<ChevronRightIcon className='size-7 text-white' />} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}