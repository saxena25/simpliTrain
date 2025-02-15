import React from "react";
import star from "../../assets/svgs/star.svg";
import location from "../../assets/svgs/location.svg";
import rightArrow from "../../assets/svgs/rightArrow.svg";
import download from "../../assets/svgs/download.svg";
import share from "../../assets/svgs/share.svg";
import userCircle from "../../assets/svgs/userCircle.svg";

function EnrollmentDetails() {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 m-auto">
      {/* Course Details */}
      <div className="bg-white flex flex-col gap-2 p-6 rounded-xl">
        {/* Course Name */}
        <div className="flex flex-col gap-1">
          <h1 className="text-lg md:text-xl text-secondary font-medium">
            How to becoming UX designer
          </h1>
          <p className="text-xs md:text-sm text-primary">
            Batch 1&nbsp; | &nbsp;Online&nbsp; | &nbsp;One on One&nbsp; |
            &nbsp;May 24 - Aug 24
          </p>
        </div>
        {/* Instructor Details */}
        <div className="flex flex-row gap-2 md:gap-4 items-center">
          <img src={userCircle} alt="Instructor Profile" className="w-8  md:w-12" />
          <div className="">
            <h3 className="text-sm text-secondary font-medium">Rohan Joshi</h3>
            <p className="text-xs text-primary">Product Designer, at <b>HCL Pvt.Ltd</b></p>
          </div>
        </div>

        {/* divider */}
        <div className="relative py-2">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>

        {/* download buttons */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-row items-center gap-2">
            <img
              src={download}
              alt="Download"
              className="bg-input-background p-2 md:p-3 rounded-full"
            />
            <button className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap">
              Download Course Details
            </button>
          </div>
          <div className="flex flex-row items-center gap-2">
            <img
              src={download}
              alt="Download"
              className="bg-input-background p-2 md:p-3 rounded-full"
            />
            <button className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap">
              Download Course Resources
            </button>
          </div>
        </div>
      </div>

      {/* Venue Details */}
      <div className="px-6 bg-white rounded-xl flex flex-col gap-2 py-6">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg text-secondary font-medium">Venue Details</h2>
          <div className="flex flex-row items-center">
            <img src={star} alt="" />
            <p>
              4.8 <span>(60)</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base text-secondary font-medium">White House</h3>
          <p className="text-xs text-primary font-medium">
            2680 Sq Ft 250 Person Max Capacity
          </p>
          <p className="text-xs text-primary w-full max-w-md">
            This large space with dramatic views can be decorated any way you be
            wish. With an adjacent buffet area, and creative menus with the
            hotel&#39;s upbeat service, it&#39;s the perfect venue.
          </p>
        </div>
        <div className="flex flex-row justify-between items-center bg-input-background rounded-full w-full max-w-sm py-1 px-2 gap-2 hover:cursor-pointer">
          <div className="flex flex-row gap-2">
            <img src={location} alt="" />
            <p className="text-xs text-primary">Koramangala, Bangalore</p>
          </div>
          <img
            src={rightArrow}
            alt=""
            className="rounded-full bg-white px-3 py-2"
          />
        </div>
      </div>

      {/* Transition Summary */}
      <div className="bg-white p-6 rounded-xl flex flex-col gap-3">
        <h3 className="text-lg text-secondary font-medium">
          Transition Summary
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Booking ID</p>
            <p className="text-sm text-secondary font-medium">762e86e65e</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Payment date</p>
            <p className="text-sm text-secondary font-medium">
              27 - OCT - 2024
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Transition ID</p>
            <p className="text-sm text-secondary font-medium">123456</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Amount</p>
            <p className="text-sm text-secondary font-medium">₹4,500</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Payment Status</p>
            <p className="text-sm text-secondary font-medium">Paid</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Payment Type</p>
            <p className="text-sm text-secondary font-medium">Fully Paid</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Payment Mode</p>
            <p className="text-sm text-secondary font-medium">Razor pay</p>
          </div>
        </div>

        {/* divider */}
        <div className="relative py-2">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>

        {/* download buttons */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-0 flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            <img
              src={download}
              alt="Download"
              className="bg-input-background p-2 md:p-3 rounded-full"
            />
            <button className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap">
              Download Receipt
            </button>
          </div>
          <div className="flex flex-row items-center gap-2">
            <img
              src={download}
              alt="Download"
              className="bg-input-background p-2 md:p-3 rounded-full"
            />
            <button className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap">
              Print Receipt
            </button>
          </div>
          <div className="flex flex-row items-center gap-2">
            <img
              src={download}
              alt="Download"
              className="bg-input-background p-2 md:p-3 rounded-full"
            />
            <button className="text-xs md:text-sm text-secondary font-medium whitespace-nowrap">
              Share Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentDetails;
