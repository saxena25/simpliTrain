import React from "react";
import { useRef, useState } from "react";
import { Container } from "../../components/ui-components";
import { Carousel, Button } from "antd";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import star from "../../assets/svgs/star.svg";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import reviewRightArrow from "../../assets/svgs/reviewRightArrow.svg";




function SimilarInstructor({profile}) {
  const items = profile?.similarInstructor.map((item) => (
    {
      name: item.name,
      position:  item.position || "Deputy Manager | Hotstar",
      rating: item.rating || "4.8 (230)",
    }
  ))


  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrev = () => {
    carouselRef.current.prev();
    setCurrentSlide(currentSlide - 1);
  };

  const goToNext = () => {
    carouselRef.current.next();
    setCurrentSlide(currentSlide + 1);
  };
  return (
    <section className="w-full">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-4xl font-medium">Similar Instructors</h1>
        <div className="flex flex-row gap-2">
          {/* {currentSlide > 0 && ( */}
          <div className=" -left-10 top-0 w-10 h-full flex items-center">
          <img src={reviewLeftArrow} alt="Left Arrow" onClick={goToPrev} className={`hover:cursor-pointer`} />
          </div>
          {/* )} */}
          {/* {currentSlide < items.length - 1 && ( */}
          <div className=" -right-12 top-0 w-10 h-full flex items-center">
          <img src={reviewRightArrow} alt="Right Arrow" onClick={goToNext} className={`hover:cursor-pointer`} />
          </div>
          {/* )} */}
        </div>
      </div>

    
        <div className="w-full m-auto">
          <Carousel
            ref={carouselRef}
            // dots
            // arrows
            draggable
            // autoplay
            // autoplaySpeed={3000}
            slidesToShow={4}
            slidesToScroll={1}
            style={{ height: "100%" }}
            id={"review-slider"}>
            {items.map((item, index) => (
              <div className="p-3 max-w-md">
                <div className="max-w-full flex flex-col justify-center items-start gap-1 rounded-2xl ">
                  <div className="bg-gray-100 w-full h-72 lg:w-56 lg:h-64"></div>

                  <h5 className="text-lg text-secondary font-medium">
                    {item.name}
                  </h5>
                  <p className="text-base text-primary whitespace-nowrap">{item.position}</p>
                  <div className="flex flex-row gap-1">
                    <img src={star} alt="" />
                    <p className="text-sm text-primary">{item.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      
    </section>
  );
}

export default SimilarInstructor;
