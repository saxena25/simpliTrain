import React from "react";

const VenueDetail = () => {
  return (
    <div className="flex flex-col">
        <h5 className="text-lg font-bold mb-5">Whome this Course for?</h5>
        <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-row gap-3 justify-start items-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" rx="2" fill="black" fill-opacity="0.2"/>
                </svg>
                <p className="text-sm text-text">Aspiring UX Designers</p>
            </div>
            <div className="flex flex-row gap-3 justify-start items-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" rx="2" fill="black" fill-opacity="0.2"/>
                </svg>
                <p className="text-sm text-text">Product Managers and Developers</p>
            </div>
            <div className="flex flex-row gap-3 justify-start items-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="10" rx="2" fill="black" fill-opacity="0.2"/>
                </svg>
                <p className="text-sm text-text">Individuals looking to start a career in UX design</p>
            </div>
        </div>
      </div>
  );
};

export default VenueDetail;
