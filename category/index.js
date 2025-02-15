import React, { useEffect, useState } from "react";
import CategoryMiddle from "./CategoryMiddle";
import CategoryVideo from "./CategoryVideo";
import { Container } from "../../components/ui-components";
import store from "../../redux/store";
import {
  getCategory,
  getSubCategoryById,
} from "../../redux/category/actionCreator";
import { Link, useLoaderData } from "react-router-dom";
import { getPopularCourses } from "../../redux/home/actionCreator";
import CourseItemCard from "../../components/shared-components/CourseItemCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getCategoryList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getCategory());
    // console.log("responceresponceresponce", responce);
    if (response && response.type == "CATEGORY_SUCCESS") {
      resolve(response.data);
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
    const response = await store.dispatch(getPopularCourses());
    if (response && response.type == "HOME_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

export async function categoryLoader() {
  const categoryData = await getCategoryList();
  const popularCourses = await getPopularCourseList();
  // console.log("Category Loader Output:", { category });
  return {
    date: new Date().toISOString(),
    popularCourses: popularCourses,
    categoryData: categoryData,
  };
}

const Category = () => {
  let loadingData = useLoaderData();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [popularCourses, setPopularCourses] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryCount, setSubCategoryCount] = useState(null);
  // console.log("loader Data", loadingData);
  // console.log("subCategoryCount", categories[0]?.subCategoryCount);

  // console.log("categoriesData :", categories);

  const handleCategoryClick = async (categoryId, categoryName, subCategoryCount) => {
    // console.log(categoryId, categoryName);
    setActiveCategory(categoryId);
    setSelectedCategoryId(categoryId);
    setCategoryName(categoryName);
    setSubCategoryCount(subCategoryCount)
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
      setSubCategoryCount(categoryList[0].subCategoryCount || 0);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].id);
      setSubCategoryCount(categories[0].subCategoryCount || 0);
    }
  }, [categories]);

  useEffect(() => {
    getCats();
    // window.scrollTo({ top: 64, behavior: "smooth" });
  }, []);

  return (
    <>
      <section className="py-10 border-b border-b-gray-5">
        <Container className="max-w-full">
          <h2 className="text-2xl text-text font-bold pl-5">
            Explore All Categories
          </h2>
        </Container>
      </section>
      <section className="border-b border-b-gray-5">
        <Container className="max-w-full">
          <div className="flex flex-row">
            <div className="w-[70%] flex ">
              <div className="w-full flex flex-row">
                <nav
                  aria-label="Sidebar"
                  className="w-[30%] h-[70vh] flex flex-col border-r-[1px] py-8 px-3 gap-4 overflow-y-auto custom-scroll">
                  <h2 className="text-base font-semibold mx-2">
                    Browse by category
                  </h2>
                  <ul role="list" className="space-y-1">
                    {categories.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            activeCategory === item.id
                              ? "bg-gray-200 text-primary font-bold text-lg"
                              : "text-gray-3 hover:bg-gray-200 hover:text-primary hover:font-bold",
                            "group flex flex-row items-center rounded-md p-2 pl-3 text-sm hover:cursor-pointer text-gray-400 whitespace-nowrap"
                          )}
                          onClick={() =>
                            handleCategoryClick(item?.id, item?.name, item?.subCategoryCount)
                          }>
                          {item.name}
                          {item?.subCategoryCount > 0 && (
                            <span
                              aria-hidden="true"
                              className=" w-9 min-w-max whitespace-nowrap rounded-full px-2 py-1 text-center text-sm font-medium text-gray-600">
                              ({item?.subCategoryCount})
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <CategoryMiddle
                  categoryId={selectedCategoryId}
                  categoryName={categoryName}
                  subCategoryCount={subCategoryCount}
                />
              </div>
            </div>
            <div className="w-[30%] h-[70vh] flex flex-col p-6 overflow-y-auto">
              <CategoryVideo data={categories} categoryId={selectedCategoryId} />
              {/* <CategoryVideo  key={index} /> */}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Category;
