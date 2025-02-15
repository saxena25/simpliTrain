import React from "react";
import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import downArrow from "../../assets/svgs/downArrow.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
import coupon from "../../assets/svgs/coupon.svg";
import greenTick from "../../assets/svgs/greenTick.svg";
import close from "../../assets/svgs/close.svg";
import { checkIsMobile } from "../../utils/helpers";

import { useNavigate } from "react-router-dom";

function PaymentBox({ batchPrice, coupons = [], appliedCoupon, setAppliedCoupon, PayNow }) {
  console.log('couponscoupons', coupons);
  const [inputKey, setInputKey] = useState('');
  // const [coupons, setCoupons] = useState([
  //   {
  //     id: 1,
  //     couponCode: "FIRST50",
  //     discount: "300",
  //     details: "Get an instant discount of ₹500 Off on courses above ₹3,000",
  //     applied: false,
  //   },
  //   {
  //     id: 2,
  //     couponCode: "SAVE500",
  //     discount: "500",
  //     details: "Get an instant discount of ₹500 Off on courses above ₹3,000",
  //     applied: false,
  //   },
  //   {
  //     id: 3,
  //     couponCode: "SAVE500",
  //     discount: "500",
  //     details: "Get an instant discount of ₹500 Off on courses above ₹3,000",
  //     applied: false,
  //   },
  //   {
  //     id: 4,
  //     couponCode: "FIRST50",
  //     discount: "500",
  //     details: "Get an instant discount of ₹500 Off on courses above ₹3,000",
  //     applied: false,
  //   },
  // ]);
  const navigate = useNavigate();
  const isMobile = checkIsMobile();
  // console.log('batchPrice', batchPrice);
  const handleCoupon = (coupon) => {
    // console.log(coupon);
    setAppliedCoupon(coupon);
    // setCoupons((prevCoupons) =>
    //   prevCoupons.map((coupon) =>
    //     coupon.id === couponId
    //       ? { ...coupon, applied: !coupon.applied }
    //       : { ...coupon, applied: false }
    //   )
    // );
  };

  const filterCoupon = (data, searchtext) => {
    let filterdata = [];
    if(data && data.length>0){

      if(filterdata.length===0){
        filterdata = data;
      }
      if(searchtext){
        filterdata = data.filter(item => {  
          const textData = searchtext.toUpperCase();
          return item.codeName.toUpperCase().indexOf(textData) > -1;
        });
      }
    }
 
    return filterdata;
  }


  return (
    <div className="w-full md:max-w-xs flex flex-col gap-6">
      {/* top box */}
      <div className="bg-white p-6 flex flex-col gap-2 md:gap-3 rounded-2xl">
        <h1 className="text-xl md:text-lg text-black font-medium">
          Price Breakup
        </h1>

        {/* price breakup */}
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Course Fee:</p>
            <p className="text-sm text-black font-semibold">₹{batchPrice?.batchFees}</p>
          </div>
          {
           batchPrice?.materialsFee?
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500 font-medium">Materials Fee:</p>
              <p className="text-sm text-black font-medium">₹{batchPrice?.materialsFee}</p>
            </div>
           :null 
          }

          
          {/* <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">EMI Plan:</p>
            <p className="text-sm text-black font-medium">₹5000 x 6</p>
          </div> */}
          {
            batchPrice?.discountedPrice?
              <div className="flex flex-row justify-between">
                <p className="text-sm text-gray-500 font-medium">Discount:</p>
                <p className="text-sm text-black font-medium">₹{batchPrice?.discountedPrice} (20% Off)</p>
              </div>
            :null
          }
          
          <div className="flex flex-row justify-between">
            <p className="text-sm text-gray-500 font-medium">Taxes:</p>
            <p className="text-sm text-black font-medium">₹{batchPrice?.tax}</p>
          </div>
        </div>

        {!isMobile && (
          <>
            {/* Divider */}
            <div className="relative my-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>

            {/* final price */}
            <div>
              <div className="flex flex-row items-center gap-4">
                <h2 className="text-2xl text-black font-medium">
                  ₹ 30,090{" "}
                  <span className="text-sm text-gray-500">20% Off</span>
                </h2>
                <p className="text-xs text-primary border border-gray-300 rounded-full px-2">
                  1 PARTICIPANT
                </p>
              </div>
              <p className="text-sm text-primary line-through">₹ 14,057</p>
              <button
                className="w-full bg-[#0E121D] text-white py-4 my-4 rounded-xl text-xs"
                onClick={() => PayNow()}>
                PAY NOW
              </button>
            </div>
          </>
        )}
      </div>

      {/* bottom box */}
      {
        coupons.length > 0?
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-lg text-black font-medium">Apply Coupon</h2>
            <div className="bg-white p-4 rounded-2xl">
              {
                appliedCoupon?
                  <div
                    key={appliedCoupon.id}
                    className="p-3 bg-green-100 text-green-700 rounded-lg font-semibold flex flex-row justify-between">
                    <div>
                      <div className="flex flex-row gap-1">
                        <img src={greenTick} alt="Success" />
                        <p className="text-sm text-black">{appliedCoupon?.codeName}</p>
                        <p className="text-sm">Applied</p>
                      </div>
                      <p className="text-xs text-primary">
                        You saved Rs.{appliedCoupon?.discount}
                      </p>
                    </div>
                    <img
                      src={close}
                      alt="Close"
                      className="bg-white px-3 py-2 rounded-full hover:cursor-pointer"
                      onClick={() => setAppliedCoupon(null)}
                    />
                  </div>
                :<div className="relative">
                  <img
                    src={coupon} // Your coupon image source
                    alt="coupon logo"
                    className="absolute top-3 left-3 w-5 h-5"
                  />
                  <input
                    type="text"
                    placeholder="Enter coupon here"
                    onChange={(e)=> setInputKey(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 py-2 hover:border-gray-300 focus:ring-2 focus:ring-gray-300 focus:border focus:border-gray-300"
                  />
                </div>
              }
              {
                appliedCoupon?
                  null
                :<div className="px-3 pt-3 rounded-xl">
                  <Disclosure as="div" className="" defaultOpen={false}>
                    <DisclosureButton className="group flex w-full items-center gap-1 text-left text-gray-900">
                      <span className="text-sm font-medium">View All Coupons</span>
                      <span className=" flex items-center">
                        <img
                          src={downArrow}
                          aria-hidden="true"
                          alt=""
                          className="group-data-[open]:hidden"
                        />
                        <img
                          src={upArrow}
                          aria-hidden="true"
                          alt=""
                          className="group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel as="dd" className="mt-2">
                      <fieldset aria-label="Plan">
                        <div className="space-y-5">
                          {filterCoupon(coupons, inputKey).map((plan) => (
                            <label
                              htmlFor={plan.id}
                              key={plan.id}
                              className="w-full relative flex items-start bg-gray-100 px-2 py-3 rounded-xl"
                              onClick={() =>
                                handleCoupon(plan)
                              }>
                              <div className="flex h-6 items-center">
                                <input
                                  defaultChecked={plan.id === "small"}
                                  id={plan.id}
                                  name="plan"
                                  type="radio"
                                  aria-describedby={`${plan.id}-description`}
                                  className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                />
                              </div>
                              <div className="ml-3">
                                <h5
                                  className="text-base font-medium text-gray-900">
                                  {plan.codeName}
                                </h5>
                                <p
                                  id={`${plan.id}-description`}
                                  className="text-sm text-gray-500">
                                  {plan.description}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              }
              
            </div>
          </div>
        :null
      }

    </div>
  );
}

export default PaymentBox;
