import { useState } from "react";

export default function Testimonial({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Array.isArray(data) || data.length === 0) {
    console.error(
      "Expected data to be an array with elements, but received:",
      data
    );
    return <p>No testimonial data available.</p>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const currentTestimonial = data[currentIndex];

  return (
    <div className="w-full ">
      <div className="w-full flex-col justify-center items-center">
        <h3 className="text-center text-2xl md:text-3xl font-semibold mb-16">
          Stories that inspire
        </h3>

        <div className="w-full flex justify-center items-center">
          <button className="px-4 py-2 w-[5%]" onClick={handlePrevious}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                <path
                  d="M16.0003 29.3346C23.3641 29.3346 29.3337 23.3651 29.3337 16.0013C29.3337 8.63751 23.3641 2.66797 16.0003 2.66797C8.63653 2.66797 2.66699 8.63751 2.66699 16.0013C2.66699 23.3651 8.63653 29.3346 16.0003 29.3346Z"
                  stroke="#292D32"
                  strokeWidth="1.76436"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.6826 20.7063L12.9893 15.9996L17.6826 11.293"
                  stroke="#292D32"
                  strokeWidth="1.76436"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
          <div className="w-[90%] flex justify-center items-center">
            {data.map((s, index) => (
              // <img src= {s.image} alt="testimonial" className="w-10 h-10 rounded-full mx-4" />
              <span
                key={index}
                className={`rounded-full bg-gray-200 mx-6 ${
                  index == currentIndex
                    ? "border border-gray-600 w-16 h-16"
                    : "w-14 h-14 "
                }`}
              />
            ))}
          </div>
          <button className="px-4 py-2 w-[5%]" onClick={handleNext}>
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.763 29.3346C24.1268 29.3346 30.0964 23.3651 30.0964 16.0013C30.0964 8.63751 24.1268 2.66797 16.763 2.66797C9.39922 2.66797 3.42969 8.63751 3.42969 16.0013C3.42969 23.3651 9.39922 29.3346 16.763 29.3346Z"
                stroke="#292D32"
                strokeWidth="1.76436"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.0859 20.7063L19.7793 15.9996L15.0859 11.293"
                stroke="#292D32"
                strokeWidth="1.76436"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center pt-20">
          <p className="w-[45%] text-left text-5xl p-2 h-4 mr-4">“</p>
          <div className="w-[40%]">
            <h2 className="font-normal text-2xl text-primary">
              {currentTestimonial.message}
            </h2>
            <div className="w-full flex flex-row justify-start items-center mt-3">
              <p className="font-normal text-sm text-gray-400 pr-1">
                {currentTestimonial.username},
              </p>
              <p className="font-normal text-sm text-gray-400">
                {currentTestimonial.designation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
