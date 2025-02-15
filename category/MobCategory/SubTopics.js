import {  ArrowLeftIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import courseCard from "../courses/courseCard";
import CategoryVideo from "../CategoryVideo";
import { getSubCategoryData } from "../index";

export async function SubTopicsLoader() {
  return {
    date: new Date().toISOString(),
  };
}

const subtopic = [
  { name: "Web Development", number: "111" },
  { name: "Data Science", number: "101" },
  { name: "Mobile Development", number: "121" },
  { name: "Programming Languages", number: "543" },
  { name: "Database Design", number: "120" },
  { name: "Software Engineering", number: "222" },
  { name: "Software Development", number: "323" },
  { name: "No-Code Development", number: "51" },
  { name: "Game Development", number: "432" },
  { name: "Software Testing", number: "1028" },
];

function SubTopics() {
  const {categoryid} = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  // console.log("Id Mobile",categoryid)
  const [subCategoryData, setSubCategoryData] = useState([]);

  const handleData = async () =>{
    const subCategoryList = await getSubCategoryData(categoryid);
        // console.log("handle Data middle", subCategoryList);
    
        const subCategoryArray = Array.isArray(subCategoryList)
          ? subCategoryList
          : Object.values(subCategoryList);
    
        // console.log(subCategoryArray.length);
        if (subCategoryArray.length > 0) {
          // console.log("hello");
          setSubCategoryData(subCategoryArray);
          // console.log("above useEffect", subCategoryArray);
        }
    
  }

  useEffect(()=>{
    handleData()
  },[categoryid])


  return (
    <div className="py-5">
      <ArrowLeftIcon
        className="w-10 mx-5 bg-[#F8F7F7] p-2 rounded-full"
        onClick={() => window.history.back()}
      />
    <h3 className="mx-5 my-3 text-sm text-black font-medium">{categoryName} (120)</h3>
      <div className="flex flex-col gap-2 px-5">
        {subCategoryData.map((item, index) => (
          <Link key={index} className="text-base font-medium text-gray-500">
            {item.name} (007)
          </Link>
        ))}
      </div>
      <div className="h-[2px] bg-gray-200 rounded-full my-5 mx-5"></div>
      <div>
        {["", "", "", ""].map((item, index) => (
            <CategoryVideo key={index} />
        ))}
        
      </div>
    </div>
  );
}

export default SubTopics;
