import React from "react";
import { useRef, useState } from "react";
import { Container } from "../../components/ui-components";
import { Carousel, Button } from "antd";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import star from "../../assets/svgs/star.svg";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import reviewRightArrow from "../../assets/svgs/reviewRightArrow.svg";


function Reviews({profile}) {

  const items = Array.isArray(profile) 
  ? profile.map((item) => ({
      rating: item.rating,
      review: item.review,
      name: item.name,
    })) 
  : [];


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
    <section className=" w-full">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-4xl font-medium">Learners reviews</h1>
        <div className="flex flex-row gap-2">
          {/* {currentSlide > 0 && ( */}
          <div className=" -left-10 top-0 w-10 h-full flex items-center">
            
            <img src={reviewLeftArrow} alt="Left Arrow" onClick={goToPrev} className={`hover:cursor-pointer`} />
          </div>
          
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
            slidesToShow={3}
            slidesToScroll={1}
            style={{ height: "100%" }}
            id={"review-slider"}>
            {items?.map((item, index) => (
              <div className="p-3  max-w-md">
                <div className="max-w-full flex flex-col justify-center items-start gap-6 p-6 bg-gray-50 rounded-2xl shadow-lg">
                  <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-2">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <img key={i} src={star} alt="Star" />
                      ))}
                    </div>
                  </div>
                  {item.icon}
                  <h5 className="xl:text-base lg:text-sm text-primary">{item.review}</h5>
                  <p className="text-secondary font-medium">{item?.name || "Allen"}</p>
                </div>
              </div>
            ))}
        
          </Carousel>
        </div>
      
    </section>
  );
}

export default Reviews;
