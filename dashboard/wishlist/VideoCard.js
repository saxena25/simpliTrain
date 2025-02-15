import React, { useEffect, useState } from "react";
import heart from "../../../assets/svgs/heart.svg";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../../redux/wishlist/actionCreator";
import { getWishlistData } from ".";
import { useNavigate } from "react-router-dom";



function VideoCard({wishlist}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRemoveWishlist = async(courseId) =>{
    let response = await dispatch(removeFromWishlist(courseId));
    if(response && response.type === "WISHLIST_SUCCESS"){
      console.log("Removed from wishlist");
      // window.location.reload();
      navigate(0);
    }else{
      console.log("Failed to remove from wishlist");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-4 md:my-8">
      {wishlist.map((ele, index) => (
        <div className="relative" key={ele.id}>
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-medium bg-gray-100 border border-gray-400 py-1 px-2 rounded-full absolute top-4 left-4">
              Design
            </span>
            <span className="text-[13px] font-medium bg-gray-500 text-white py-1 px-2 rounded-full absolute top-4 right-4">
              Popular
            </span>
          </div>
          <div className="h-44 w-full bg-gray-100 rounded-2xl"></div>
          <div className="flex flex-row justify-between items-center mt-4">
            <h2 className="text-base md:text-sm font-bold">{ele.wishlistedCourse.title}</h2>
            <button onClick={()=>handleRemoveWishlist(ele.courseId)}>
              <img src={heart} alt="" />
            </button>
          </div>
          <p className="mt-2 text-xs font-semibold text-gray-600">
            {/* {ele.classType} */}Mode 
          </p>

          <div className="flex flex-row items-center mt-2">
            <div className="w-8 h-8 bg-gray-4 rounded-full"></div>
            <div className="ml-2 flex flex-row gap-2">
              <p className="text-sm font-medium">{ele.name}</p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">{ele.wishlistedCourse.averageRating}</span> (
                {ele.wishlistedCourse.reviewsCount})
              </p>
            </div>
          </div>
          
          {/* next batch */}
          <div className="flex flex-row gap-2 my-2">
            
              <div
                // key={index}
                className="flex flex-col bg-input-background px-4 py-2 rounded-xl">
                <p className="text-xs md:text-sm text-secondary">S.batch 1</p>
                <p className="text-[10px] text-primary">S.May 24 - Aug 24</p>
              </div>
            
          </div>

          <p className="mt-2 text-sm font-semibold">
            <span className="text-xs text-gray-500">Starts From</span> ₹{" "}
            {/* {ele.price} */}S.999/-
          </p>
        </div>
      ))}
    </div>
  );
}

export default VideoCard;
