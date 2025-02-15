import { ArrowLeftIcon, ArrowRightIcon, CheckBadgeIcon, StarIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Button } from "antd";
import { checkIsMobile } from "../../utils/helpers";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const reviewsList = [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: 'July 16, 2021',
      datetime: '2021-07-16',
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: 'July 12, 2021',
      datetime: '2021-07-12',
      author: 'Hector Gibbons',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
]

const CourseReview = ({reviews, course}) => {
    const isMobile = checkIsMobile();
    const carouselRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [reviewsList, setReviewsList] = useState(reviews || []);
    const totalReviews = {
        average: course?.averageRating,
        totalCount: course?.reviewsCount,
        counts: [
          { rating: 5, count: course?.fiveRatingCount },
          { rating: 4, count: course?.fourRatingCount },
          { rating: 3, count: course?.threeRatingCount },
          { rating: 2, count: course?.twoRatingCount },
          { rating: 1, count: course?.oneRatingCount },
        ],
    }

    // console.log("reviewsList", course?.twoRatingCount);

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
        <div className="flex flex-col">
            <h5 className="text-3xl font-bold mb-3">Course Review</h5>

            <div className="flex flex-row justify-start items-stretch py-5 gap-5">
                <div className="w-full flex flex-col justify-start items-start gap-3">
                    <div className="w-full max-w-4xl flex flex-row justify-start items-stretch gap-5">
                        <div className="flex flex-col justify-center items-center w-24 gap-3">
                            <h5 className="text-7xl">{totalReviews.average === 0 ? "0" : totalReviews.average}</h5>
                            <p className="flex gap-1">
                                <StarIcon className={'text-gray-1 size-4 shrink-0'}/>
                                <StarIcon className={'text-gray-1 size-4 shrink-0'}/>
                                <StarIcon className={'text-gray-1 size-4 shrink-0'}/>
                                <StarIcon className={'text-gray-1 size-4 shrink-0'}/>
                                <StarIcon className={'text-gray-1 size-4 shrink-0'}/>
                            </p>
                        </div>
                        <div className="w-full flex">
                            <dl className="space-y-1 w-full">
                                {totalReviews.counts.map((count) => (
                                    <div key={count.rating} className="flex items-center text-sm">
                                        <dt className="flex flex-1 items-center">
                                            <p className="w-3 font-medium text-gray-900">{count.rating}</p>
                                            <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                                                
                                                <div className="relative ml-3 flex-1">
                                                    <div className="h-2.5 rounded-full border border-gray-200 bg-gray-100" />
                                                    {count.count > 0 ? (
                                                    <div
                                                        style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                                                        className="absolute inset-y-0 rounded-full border border-gray-1 bg-gray-1"
                                                    />
                                                    ) : null}
                                                </div>
                                            </div>
                                        </dt>
                                        
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <div className='flex flex-row justify-center items-end gap-5'>
                        {/* {currentSlide > 0 && ( */}
                        <div className='w-10 flex items-center'>
                            <Button type="text" onClick={goToPrev} shape="circle" icon={<ArrowLeftIcon className='size-7 text-dark' />} />
                        </div>
                        {/* )} */}
                        {/* {currentSlide < items.length - 1 && ( */}
                        <div className='w-10 flex items-center'>
                            <Button type="text" onClick={goToNext} shape="circle" icon={<ArrowRightIcon className='size-7 text-dark' />} />
                        </div>
                        {/* )} */}
                    </div>
                </div>
            </div>

            <div className="relative py-5 w-full">
                <Carousel
                    ref={carouselRef}
                    // dots
                    // arrows
                    draggable
                    // autoplay
                    // autoplaySpeed={3000}
                    slidesToShow={isMobile ? 1.5 : 3}
                    slidesToScroll={1}
                    style={{ height: '100%' }}
                    id={'reviews-slider'}
                >
                    {reviewsList.map((review, reviewIdx) => (
                        <div key={review.id} className="p-3">
                            <div className="flex flex-col gap-4 bg-gray-6 p-5 rounded-lg">
                                <div className="flex justify-start items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            aria-hidden="true"
                                            className={classNames(
                                                review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                                'size-5 shrink-0',
                                            )}
                                        />
                                    ))}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: review?.review }} className="mt-4 text-sm/6 text-gray-500" />
                                <h3 className="font-medium text-gray-900">{review?.learner?.name}</h3>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default CourseReview;
