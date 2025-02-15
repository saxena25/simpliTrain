import React from "react";
import { useRef, useState } from "react";
import { Container } from "../../components/ui-components";
import { Carousel, Button } from "antd";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import star from "../../assets/svgs/star.svg";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import reviewRightArrow from "../../assets/svgs/reviewRightArrow.svg";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { checkIsMobile } from "../../utils/helpers";

function SimilarInstructor({ data }) {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = checkIsMobile();
  const [topInstructor, setTopInstructor] = useState(data || []);

  // console.log("Top Instructor: ", data);

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
        <h1 className="text-2xl md:text-4xl font-medium">
          Meet our top Instructor
        </h1>
        <div className="flex flex-row gap-2">
          <button className="w-20 flex flex-row justify-between items-center">
            <span className="text-lg font-medium text-text">See All</span>
            <ArrowRightIcon className="size-5" />
          </button>
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
          slidesToShow={isMobile ? 1 : 4}
          slidesToScroll={1}
          style={{ height: "100%" }}
          id={"review-slider"}>
          {topInstructor.slice(0, 4).map((item, index) => (
            <div className="p-5" key={index}>
              <div className="flex flex-col justify-center items-start gap-1 rounded-2xl ">
                <div className="bg-gray-100 md:w-full">
                  {item?.profileImage === null || item?.profileImage === "" ? (
                    <p className="bg-gray-50 h-64 w-72"></p>
                  ) : (
                    <img
                      src={item?.profileImage}
                      alt="Profile"
                      className={`md:w-full  ${isMobile && "w-60 h-64"}`}
                    />
                  )}
                </div>
                <h5 className="text-lg text-secondary font-medium">
                  {item?.name}
                </h5>
               
                {item?.workExperience?.some((ele) => ele.isCurrent) ? (
                  item?.workExperience
                    .filter((ele) => ele.isCurrent)
                    .map((ele, index) => (
                      <p key={index}>
                        {ele.job_title} | {ele.company_name}
                      </p>
                    ))
                ) : (
                  <p>Not Working</p>
                )}
                <div className="flex flex-row gap-1">
                  <img src={star} alt="" />
                  <p className="text-sm text-primary">
                    {item?.rating?.averageRating} (
                    {item?.rating?.totalRatingCount})
                  </p>
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
