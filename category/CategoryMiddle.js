import React, { useEffect, useState } from "react";
import { getSubCategoryData } from "./index";
import { use } from "react";

// const navigation = [
//   { name: "Web Development", href: "#", count: "(100)", current: false },
//   { name: "Data Science", href: "#", count: "(120)", current: false },
//   { name: "Mobile Development", href: "#", count: "(12)", current: false },
//   { name: "Programming Language", href: "#", count: "(210)", current: false },
//   { name: "Database Design", href: "#", count: "(121)", current: false },
//   { name: "Software Engineering", href: "#", count: "(145)", current: false },
//   { name: "Software Development", href: "#", count: "(550)", current: false },
//   { name: "No-code Development", href: "#", count: "(65)", current: false },
//   { name: "Game Development", href: "#", count: "(90)", current: false },
//   { name: "Software Testing", href: "#", count: "(101)", current: false },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CategoryMiddle({ categoryId, categoryName, subCategoryCount }) {
  const [subCategoryData, setSubCategoryData] = useState([]);

  const handleData = async () => {
    const subCategoryList = await getSubCategoryData(categoryId);
    // console.log("fetched Subcategories :", subCategoryList)
    const subCategoryArray = Array.isArray(subCategoryList)
      ? subCategoryList
      : Object.values(subCategoryList);

    setSubCategoryData(subCategoryArray);

    // if (subCategoryArray.length > 0) {
    //   setSubCategoryData(subCategoryArray);
    // }
  };
  useEffect(() => {
    handleData();
    // console.log("uef: ", subCategoryData);
  }, [categoryId]);

  return (
    <>
      <nav
        aria-label="Sidebar"
        className="w-[70%] h-[70vh] flex flex-col px-6 py-8 gap-4 overflow-y-auto custom-scroll border-r-[1px]">
        <h2 className="text-base font-semibold mx-2">
          {categoryName} ({subCategoryCount})
        </h2>
        <ul role="list" className="grid grid-cols-2 w-full">
          {subCategoryData.length > 0 ? (
            subCategoryData.map((item, index) => (
              <li key={item.id || `${index}`}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-200 text-primary fold-bold text-lg"
                      : "text-gray-4 hover:font-bold",
                    "group flex rounded-md p-2 text-base text-gray-500 whitespace-nowrap hover:cursor-pointer"
                  )}>
                  {item.name}
                  
                  {item.courseCount > 0 && (
                    <span
                      aria-hidden="true"
                      className="gap-x-1 w-9 min-w-max whitespace-nowrap rounded-full px-1 py-0.5 text-center text-sm font-medium text-gray-600">
                      ({item.courseCount})
                    </span>
                  )}
                </a>
              </li>
            ))
          ) : (
            <li className="col-span-2">
              <p>!No SubCategories Found</p>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default CategoryMiddle;
