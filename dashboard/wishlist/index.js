import React from "react";
import VideoCard from "./VideoCard";
import { checkIsMobile } from "../../../utils/helpers";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import reviewLeftArrow  from "../../../assets/svgs/reviewLeftArrow.svg";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getWishlist } from "../../../redux/wishlist/actionCreator";
import store from "../../../redux/store";

export const getWishlistData = () =>{
  return new Promise(async(resolve, reject)=>{
    const response = await store.dispatch(getWishlist());
    if(response && response.type === "WISHLIST_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([])
    }
  })
}

export async function wishlistLoader() {
  const wishlistData = await getWishlistData();
  return {
    date: new Date().toISOString(),
    wishlistData: wishlistData
  };
}

function Wishlist() {
  const isMobile = checkIsMobile();
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const [allWishlist, setAllWishlist] = React.useState(loaderData.wishlistData || []);
  // console.log("User Wishlist: ", loaderData.wishlistData);
  return (
    <div className="max-w-full w-full m-auto px-4 md:py-6">
      {isMobile && (
        <div className="flex flex-row gap-4 py-8">
          <button className="bg-gray-100 rounded-full flex justify-center items-center" onClick={()=>navigate("/")}>
            <img src={reviewLeftArrow} alt="" className="py-2 px-3" />
          </button>
          <div className="relative w-full ">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none rounded-full pl-12 py-3 bg-gray-100"
            />
            <MagnifyingGlassIcon className="w-5 absolute top-[14px] left-4 text-[#363A49]" />
          </div>
        </div>
      )}
      <div className="flex flex-row gap-2">
        <h1 className="text-3xl font-semibold text-secondary">WishList</h1>
        <p className="text-3xl font-semibold text-secondary">({allWishlist.length})</p>
      </div>
      <div>
        <VideoCard wishlist={allWishlist} />
      </div>
    </div>
  );
}

export default Wishlist;
