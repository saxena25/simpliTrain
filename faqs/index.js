import { Fragment, useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Button, Card, Carousel, Col, Pagination, Row } from "antd";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Container, DropDownField } from "../../components/ui-components";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  MenuButton,
  MenuItem,
  MenuItems,
  Menu,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import InnerHeroSection from "../../components/shared-components/InnerHeroSection";
import {
  FaqAccountProfileManagement,
  FaqInstructors,
  FaqLearners,
  FaqPaymentsBilling,
  FaqQuestions,
} from "../../components/icons";
import { checkIsMobile } from "../../utils/helpers";
import like from "../../assets/svgs/like.svg";
import notification from "../../assets/svgs/notification.svg";
import {
  getFaqBySearch,
  getFaqCategories,
  getFaqsById,
  getFaqsByPagination,
} from "../../redux/faqs/actionCreator";
import store from "../../redux/store";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

const getFaqCategoriesList = () => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(getFaqCategories());
    if (responce && responce.type == "FAQS_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getFaqListById = (categoryId, page) => {
  return new Promise(async (resolve, reject) => {
    const responce = await store.dispatch(
      getFaqsByPagination({ id: categoryId, page: page })
    );
    if (responce && responce.type == "FAQS_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getFaqSearch = (letter) => {
  return new Promise(async (resolve, reject) => {
    console.log("getFaqSearch", letter);

    const responce = await store.dispatch(getFaqBySearch({ search: letter }));
    if (responce && responce.type == "FAQS_SUCCESS") {
      resolve(responce.data);
    } else {
      resolve([]);
    }
  });
};

const getFaqPagination = (categoryId, page) => {
  return new Promise(async (resolve, reject) => {
    // console.log("getFaqSearch", categoryId, page);

    const response = await store.dispatch(
      getFaqsByPagination({ id: categoryId, page: page })
    );
    if (response && response.type === "FAQS_SUCCESS") {
      resolve(response);
      // console.log(response.pagination);
    } else {
      resolve([]);
    }
  });
};

export async function faqLoader() {
  const faqCategories = await getFaqCategoriesList();
  const defaultCategoryId =
    faqCategories.length > 0 ? faqCategories[0].id : null;
  const faqListById = defaultCategoryId
    ? await getFaqListById(defaultCategoryId)
    : [];
  return {
    date: new Date().toISOString(),
    faqCategories: faqCategories,
    faqListById: faqListById,
  };
}

export default function FaqPage() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  let loaderData = useLoaderData();
  const isMobile = checkIsMobile();
  const [selectedId, setSelectedId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [currentSearchValue, setCurrentSearchValue] = useState("");
  const [faqList, setFaqList] = useState([]);
  const [page, setPage] = useState(1);
  const [faqCategories, setFaqCategories] = useState(
    loaderData.faqCategories || []
  );
  const [hasMoreFaqs, setHasMoreFaqs] = useState(true);
  const totalPages = 5;
  // console.log("current Page", page);

  const handlePagination = async (newPage) => {
    try {
      const fetchedFaq = await getFaqPagination(selectedId, newPage);
      // console.log("faqs :", fetchedFaq);
      setFaqList(fetchedFaq.data);
      setHasMoreFaqs(fetchedFaq.data.length > 0);
    } catch (error) {
      // console.error("Error fetching FAQs:", error);
      setHasMoreFaqs(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIsActive(value.length > 0);
    console.log("searched", value);
    setCurrentSearchValue(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (value.length === 0) {
      setFaqList([]);
      return;
    }

    const timer = setTimeout(async () => {
      if (value.length > 0) {
        try {
          const data = await getFaqSearch(value);
          if (value === currentSearchValue) {
            setFaqList(data);
          }
        } catch (error) {
          console.log("Error Fetching Faq search Results", error);
          setFaqList([]);
        }
      } else {
        setFaqList([]);
      }
    }, 500);

    setDebounceTimer(timer);
  };

  const handleCategoryClick = async (categoryId) => {
    const newPage = 1;
    setPage(newPage);
    setSelectedId(categoryId);
    const fetchedFaq = await getFaqListById(categoryId, newPage);
    setFaqList(fetchedFaq);
    console.log(fetchedFaq);
  };

  const onSlideChange = (iin) => {
    // console.log("iin", iin);
  };

  const getIcon = (icon) => {
    switch (icon) {
      case "ForVenueProvider":
        return (
          <FaqPaymentsBilling
            color={`${selectedId ? "#FFFFFF" : "#00000090"}`}
          />
        );
        break;
      case "ForInstructors":
        <FaqLearners color={`${selectedId ? "#FFFFFF" : "#00000090"}`} />;
        break;
      case "ForLearners":
        return (
          <FaqLearners color={`${selectedId ? "#FFFFFF" : "#00000090"}`} />
        );
        break;
      case "GeneralPlatform":
        return (
          <FaqQuestions color={`${selectedId ? "#FFFFFF" : "#00000090"}`} />
        );
        break;
      case "PaymentsBilling":
        return (
          <FaqPaymentsBilling
            color={`${selectedId ? "#FFFFFF" : "#00000090"}`}
          />
        );
        break;
      case "AccountProfile":
        return (
          <FaqAccountProfileManagement
            color={`${selectedId ? "#FFFFFF" : "#00000090"}`}
          />
        );
        break;
      default:
        break;
    }
  };

  const goToPrev = () => {
    carouselRef.current.prev();
    // console.log(currentSlide);
    setCurrentSlide(currentSlide - 1);
    // console.log(currentSlide-1);
  };

  const goToNext = () => {
    carouselRef.current.next();
    // console.log(currentSlide);
    setCurrentSlide(currentSlide + 1);
    // if((currentSlide+1) >= items.length){
    //   carouselRef.current.slickGoTo(0);
    // }

    // console.log(currentSlide+1);
  };

  useEffect(() => {
    if (loaderData.faqListById) setFaqList(loaderData.faqListById);
  }, [loaderData]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 md:py-20">
        <Container className={`${isMobile && "py-5"}`}>
          <div className="text-center w-full md:max-w-lg m-auto">
            {isMobile && (
              <div className="pt-5 pb-10 flex flex-row justify-between">
                <div className="flex flex-row items-center gap-2">
                  {/* <Logo /> */}
                  <h1 className="text-lg font-bold text-secondary">
                    SimpliTrain
                  </h1>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-2xl bg-white px-3 py-1 text-sm font-semibold text-secondary  border">
                        Categories
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="-mr-1 size-5 text-secondary"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                      <div className="py-1 px-2">
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm whitespace-nowrap text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Learners
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm whitespace-nowrap text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Instructors
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm whitespace-nowrap text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                            Venue Providers
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <img src={like} alt="" />
                  <img src={notification} alt="" />
                </div>
              </div>
            )}
            <h1
              className="text-3xl md:text-5xl font-bold text-text mb-4"
              style={
                isMobile ? { lineHeight: "40px" } : { lineHeight: "60px" }
              }>
              Frequently Asked
              <br />
              Questions
            </h1>
            <div className="relative w-full">
              <input
                id={"faq-search"}
                type={"text"}
                placeholder="Ask a questions..."
                className={
                  "bg-white border-0 text-sm rounded-xl w-full h-10 pr-8 text-input-text placeholder:text-input-placeholder"
                }
                onChange={handleInputChange}
              />
              <MagnifyingGlassIcon
                className="pointer-events-none absolute right-1 top-1 h-8 w-8 py-2 px-2 rounded-xl text-white bg-black"
                aria-hidden="true"
              />
            </div>
            {/* <DropDownField options={[{key:1, value:'Option1'},{key:2, value:'Option2'},{key:3, value:'Option3'}]} label="Email ID / Phone Number" name={"username"} id={"username"} placeholder="demo@gmail.com" error={''} /> */}
          </div>
        </Container>
      </section>
      <section
        className={`${
          isActive ? "hidden" : "block"
        } py-10  overflow-hidden px-5`}>
        <Container>
          <div className="relative w-full m-auto">
            <Carousel
              ref={carouselRef}
              // dots
              // arrows
              draggable
              // autoplay
              // autoplaySpeed={3000}
              slidesToShow={isMobile ? 2 : 5}
              slidesToScroll={1}
              style={{ height: "100%" }}
              // infinite={true}
              id={"faqs-slider"}>
              {faqCategories.map((item, index) => (
                <div
                  className={`p-3 hover:cursor-pointer`}
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}>
                  <div
                    className={`${
                      selectedId === item.id ? "bg-black" : "bg-white"
                    } flex flex-col justify-center items-start gap-6 p-6 h-48  shadow-lg`}>
                    {getIcon(item.icon)}
                    <h5
                      className={`${
                        selectedId === item.id ? "text-white" : "text-black"
                      }`}>
                      {item.name}
                    </h5>
                  </div>
                </div>
              ))}
            </Carousel>
            {isMobile ? (
              ""
            ) : (
              <div className="">
                {/* {currentSlide > 0 && ( */}
                <div className="absolute -left-10 top-0 w-10 h-full flex items-center">
                  <Button
                    type="primary"
                    className="bg-primary transition-transform duration-300 hover:scale-110"
                    onClick={goToPrev}
                    shape="none"
                    style={{
                      backgroundColor: "transparent",
                      color: "gray",
                      border: "none",
                    }}
                    icon={<ChevronLeftIcon className="size-8" />}
                  />
                </div>
                {/* )} */}
                {/* {currentSlide < items.length - 1 && ( */}
                <div className="absolute -right-12 top-0 w-10 h-full flex items-center">
                  <Button
                    type="primary"
                    className="bg-primary transition-transform duration-300 hover:scale-110"
                    onClick={goToNext}
                    shape="none"
                    style={{
                      backgroundColor: "transparent",
                      color: "gray",
                      border: "none",
                    }}
                    icon={<ChevronRightIcon className="size-8 text-white" />}
                  />
                </div>
                {/* )} */}
              </div>
            )}
          </div>
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <div className="w-full flex flex-col">
            <h4 className="text-text text-xl font-medium mb-5">
              General Platform Questions
            </h4>
            <div className="mt-10 flex flex-col gap-5">
              {faqList.map((faq, index) => (
                <div
                  key={index}
                  className="p-3 border-b-2 border-b-gray-5 rounded-none">
                  <Disclosure key={index} as="div" className="">
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-sm md:text-lg font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon
                          aria-hidden="true"
                          className="size-6 group-data-[open]:hidden"
                        />
                        <MinusSmallIcon
                          aria-hidden="true"
                          className="size-6 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-sm text-text">{faq.answer}</p>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              ))}
            </div>
            <nav className="flex items-center gap-1 mt-4 py-2 w-fit mx-auto border rounded-full">
              <div className={`${page === 1 && "hidden"} flex ml-2`}>
                <button
                  onClick={() => {
                    const newPage = page - 1;
                    setPage(newPage);
                    handlePagination(newPage);
                  }}
                  disabled={page === 1}
                  className={`${
                    page === 1 ? "hidden cursor-not-allowed" : ""
                  } inline-flex items-center border-t-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`}>
                  <ArrowLongLeftIcon
                    aria-hidden="true"
                    className="size-5 text-gray-400 h-fit"
                  />
                </button>
              </div>
              <div className="md:-mt-px flex">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setPage(pageNum);
                        handlePagination(pageNum);
                      }}
                      aria-current={page === pageNum ? "page" : undefined}
                      className={`inline-flex items-center border-transparent px-4 text-sm font-medium ${
                        page === pageNum
                          ? "text-gray-900 font-semibold"
                          : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}>
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <div className="flex mr-2">
                <button
                  onClick={() => {
                    const newPage = page + 1;
                    setPage(newPage);
                    handlePagination(newPage);
                  }}
                  disabled={!hasMoreFaqs}
                  className={`inline-flex items-center border-t-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
                    !hasMoreFaqs ? "cursor-not-allowed opacity-50" : ""
                  }`}>
                  <ArrowLongRightIcon
                    aria-hidden="true"
                    className="size-5 text-gray-400"
                  />
                </button>
              </div>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
