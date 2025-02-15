import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Rate } from "antd";
import { Slider } from "antd";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import upArrow from "../../assets/svgs/upArrow.svg";
import downArrow from "../../assets/svgs/downArrow.svg";
import { getCourses, getSubCategoryById } from "../../redux/courses/actionCreator";
import store from "../../redux/store";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";

const marks = {
  0: "0",
  25: "250",
  50: "500",
  75: "750",

  100: {
    style: {
      color: "gray",
    },
    label: <strong>1000</strong>,
  },
};

const subCategoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getSubCategoryById({ id: id }));
    if (response && response.type === "COURSES_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const FilterSideBar = ({
  languages,
  categories,
  filters,
  setFilters,
  onClose,
}) => {
  const dispatch = useDispatch();
  const loaderData = useLoaderData();
  const [showMore, setShowMore] = useState(false);
  const [instructorShow, setInstructorShow] = useState(false);
  const [companies, setCompanies] = useState([
    "Adobe",
    "HCL",
    "BOSCH",
    "Appolo",
    "Decathlon",
    "Google",
    "Apple",
    "Facebook",
    "Samsung",
  ]);
  const [courseShow, setCourseShow] = useState(false);
  const [courseCategory, setCourseCategory] = useState([
    "All",
    "IT & Computers",
    "Health & Wellness",
    "Skill development",
    "Business",
    "Personal development",
    "Design",
    "Marketing",
    "lifestyle",
    "Health & Fitness",
    "Music",
    "Teaching & Academics",
  ]);
  const [subCategory, setSubCategory] = useState([
    { id: 1, name: "IT & Computers" },
    { id: 2, name: "IT & SOFTWARE" },
    { id: 3, name: "IT & HARDWARE" },
    { id: 4, name: "IT & NETWORKING" },
    { id: 5, name: "IT & NETWORKING" },
    { id: 6, name: "IT & WEB" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Track selected subcategory
  const [displayedSubCategory, setDisplayedSubCategory] = useState([]); // Store fetched subcategories
  const [subCategoryShow, setSubCategoryShow] = useState(false);

  const handleCategorySelect = async (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setDisplayedSubCategory([]);
    } else {
      setSelectedCategory(categoryId);
      setFilters((prev) => ({ ...prev, categoryID: categoryId }));
      const response = await subCategoryById(categoryId);
      setDisplayedSubCategory(response);
      // console.log("categoryId: ", selectedCategory);
    }
  };

  const handleSubCategorySelect = (subCategoryId) => {
    setSelectedSubCategory((prev) =>
      prev === subCategoryId ? null : subCategoryId
    );
    setFilters((prev) => ({ ...prev, subCategoryID: subCategoryId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperCaseValue = value.toUpperCase();
    console.log("filter changed: ", name, upperCaseValue);
    // If the filter is courseLevel, set it directly
    if (name === "courseLevel") {
      setFilters((prev) => ({ ...prev, courseLevel: upperCaseValue }));
    } else {
      // For other filters, update normally
      setFilters((prev) => ({ ...prev, [name]: upperCaseValue }));
    }
  };

  return (
    <div className="w-full bg-white md:border-r md:border-r-gray-5">
      {/* sideBar Header */}
      <div className="hidden md:flex py-4 px-5 justify-between items-center border-b border-b-gray-5 mb-4 sticky top-16 bg-white z-10">
        <h2 className="text-sm uppercase text-gray-600 font-medium">Filter</h2>
        <button
          onClick={() => {
            onClose(false);
            setFilters({})
          }}
          className="w-8 h-8">
          <XMarkIcon className="size-5" />
        </button>
      </div>
      <div className="flex flex-col gap-8 overflow-y-auto custom-scroll scroll-smooth h-[calc(100vh-150px)]">
        {/* Ratings Section */}
        <div className="px-5 border-b pb-5">
          <h3 className="text-sm font-medium mb-5">Ratings</h3>
          <ul className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="rating"
                  id={`rating-${i}`}
                  onChange={handleChange}
                  className="w-4 h-4 text-black border-2 hover:border-black"
                />
                <Rate
                  allowHalf
                  defaultValue={5 - i}
                  className="text-black"
                  disabled
                />
                <label htmlFor={`rating-${i}`} className="text-sm">
                  {5 - i}.0 & up
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Slider */}
        <div className="px-5 border-b pb-5">
          <h3 className="text-sm font-medium mb-5">Price</h3>
          {/* <input type="range" min="0" max="100" className="w-full accent-blue-500" /> */}
          <Slider
            marks={marks}
            step={null}
            defaultValue={50}
            styles={{
              track: {
                background: "transparent",
              },
              tracks: {
                background: "#585E6D",
                color: "#585E6D",
              },
            }}
          />
        </div>

        {/* Course Level */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Course Level</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {["ALL", "BEGINNER", "INTERMEDIATE", "ADVANCED"].map(
                (level, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="courseLevel"
                      id={level}
                      value={level}
                      checked={filters.courseLevel === level}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#363A49]"
                    />
                    <label
                      htmlFor={`level-${idx}`}
                      className="text-base text-[#363A49] font-medium">
                      {level}
                    </label>
                  </li>
                )
              )}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Duration */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Duration of the Course</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {["Hours", "Days", "Weeks", "Months"].map((duration, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`duration-${idx}`}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={`duration-${idx}`}
                    className="text-base text-[#363A49] font-medium">
                    {duration}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Discount */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Discount</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {[
                "50% or more",
                "40% or more",
                "30% or more",
                "20% or more",
                "10% or more",
              ].map((duration, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`duration-${idx}`}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={`duration-${idx}`}
                    className="text-base text-[#363A49] font-medium">
                    {duration}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Instructor Type */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Instructor Type</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {["Celebrity Instructor", "Simplitrain Certified Instructor"].map(
                (duration, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`duration-${idx}`}
                      className="w-4 h-4 text-[#363A49]"
                    />
                    <label
                      htmlFor={`duration-${idx}`}
                      className="text-sm text-[#363A49] font-medium ">
                      {duration}
                    </label>
                  </li>
                )
              )}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Instructor Company */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Instructor Company</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {companies.map((duration, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`duration-${idx}`}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={`duration-${idx}`}
                    className="text-sm text-[#363A49] font-medium ">
                    {duration}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Language Type */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Language Type</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {languages.map((lang) => (
                <li key={lang.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={lang.name}
                    value={lang.id}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={lang.name}
                    className="text-base text-[#363A49] font-medium">
                    {lang.name}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Date */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Date</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {["Today", "Tomorrow", "Custom"].map((duration, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`duration-${idx}`}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={`duration-${idx}`}
                    className="text-base text-[#363A49] font-medium">
                    {duration}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Distance */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Distance</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {["All", "0 - 5km", "5 - 10km", "10 - 40km", "40+ km"].map(
                (duration, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`duration-${idx}`}
                      className="w-4 h-4 text-[#363A49]"
                    />
                    <label
                      htmlFor={`duration-${idx}`}
                      className="text-base text-[#363A49] font-medium">
                      {duration}
                    </label>
                  </li>
                )
              )}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Course Category */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Course Category</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {categories.map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    checked={selectedCategory === item.id}
                    onChange={() => handleCategorySelect(item.id)}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm text-[#363A49] font-medium ">
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>

        {/* Sub Category */}
        <Disclosure as="div" className="pb-5 border-b px-5">
          <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
            <span className="text-sm font-medium">Sub Category</span>
            <span className="ml-6 flex h-7 items-center">
              <img
                src={downArrow}
                alt=""
                className="size-4 group-data-[open]:hidden"
              />
              <img
                src={upArrow}
                alt=""
                className="size-4 group-[&:not([data-open])]:hidden"
              />
            </span>
          </DisclosureButton>
          <DisclosurePanel as="dd" className="mt-2 pr-12">
            <ul className="space-y-2">
              {displayedSubCategory.map((item, idx) => (
                <li key={item.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={selectedSubCategory === item.id}
                    onChange={() => handleSubCategorySelect(item.id)}
                    className="w-4 h-4 text-[#363A49]"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm text-[#363A49] font-medium ">
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
};

export default FilterSideBar;
