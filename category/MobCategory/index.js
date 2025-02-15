import { ArrowRightIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategory,
  getSubCategoryById,
} from "../../../redux/category/actionCreator";
import store from "../../../redux/store";
import { getPopularCourses } from "../../../redux/home/actionCreator";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getCategoryList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getCategory());
    // console.log("responceresponceresponce", responce);
    if (responce && responce.type == "CATEGORY_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

export const getSubCategoryData = async (userID) => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getSubCategoryById({ id: userID }));
    if (response && response.type === "CATEGORY_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export const getPopularCourseList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getPopularCourses());
    if (responce && responce.type == "HOME_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

export async function MobCategoryLoader() {
  const category = await getCategoryList();
  const popularCourses = await getPopularCourseList();
  console.log("Category Loader Output:", { category });
  return {
    date: new Date().toISOString(),
    popularCourses: popularCourses,
    // category: category,
  };
}

function MobCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [popularCourses, setPopularCourses] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  // console.log("loader Data", loaderData);

  const handleCategoryClick = async (categoryId, categoryName) => {
    // console.log(categoryId, categoryName);
    setSelectedCategoryId(categoryId);
    setCategoryName(categoryName);
  };

  const getCats = async () => {
    const popularCourseList = await getPopularCourseList();
    if (Array.isArray(popularCourseList)) {
      // console.log('popularCourseList', popularCourseList);
      setPopularCourses([...popularCourseList]);
    }

    const categoryList = await getCategoryList();
    // console.log("categoryList", categoryList);
    if (categoryList.length > 0) {
      setCategories(categoryList);

      setSelectedCategoryId(categoryList[0].id);
      setCategoryName(categoryList[0].name);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl text-secondary font-medium mb-4">
        All Categories
      </h1>
      <h3 className="text-sm text-[#121212] font-semibold mb-3">
        Browse by category
      </h3>
      <div className="flex flex-col gap-4">
        <ul role="list" className="space-y-2">
          {categories.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-200 text-primary font-bold text-lg"
                    : "text-gray-3 hover:bg-gray-200 hover:text-primary hover:font-bold",
                  "group flex flex-row items-center rounded-md py-2   text-lg text-gray-400 whitespace-nowrap border-b"
                )}
                onClick={() => handleCategoryClick(item.id, item.name)}>
                {item.name}

                <span
                  aria-hidden="true"
                  className=" w-9 min-w-max whitespace-nowrap rounded-full px-2 py-1 text-center text-sm font-medium text-gray-600">
                  (120)
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobCategory;
