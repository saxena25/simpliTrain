import React from "react";
import { checkIsMobile } from "../../utils/helpers";

const data = [
  {
    title: "Efficiency",
    body: "We ensure that your leaning exprience is seamless, with quick access to support and resources.",
  },
  {
    title: "Reliability",
    body: "Depend on us for consistent, high-quality learning content and support, whenever you need it.",
  },
  {
    title: "Support",
    body: "Our dedicated team is available to guide you every step of the way, ensuring you achieve your learning.",
  },
];

function Commitment() {
  const isMobile = checkIsMobile();
  return (
    <>
      <div className="md:text-center my-10 md:my-16 flex flex-col gap-12">
        <h1 className="text-3xl font-semibold text-center">Our Commitments to You</h1>
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {data.map((ele,index)=>(
              <div className="flex flex-row gap-4 items-center">
                <div className="bg-gray-100 w-14 h-14 rounded-xl shrink-0"></div>
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold text-secondary">{ele.title}</h2>
                  <p className="text-sm text-primary">{ele.body}</p>
                </div>
              </div>
            ))}
          </div>
        ): (
          <div className="flex flex-row justify-center gap-10">
          {data.map((ele, index) => (
            <div key={index} className="bg-[#F7F7F7] w-72 h-56 px-6 flex flex-col gap-2 justify-center items-center rounded-2xl">
              <p className="text-lg font-semibold text-[#282938]">
                {ele.title}
              </p>
              <p className="text-sm text-[#000000]">{ele.body}</p>
            </div>
          ))}
        </div>
        )}
        
      </div>
    </>
  );
}

export default Commitment;
