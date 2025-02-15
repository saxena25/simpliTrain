// import { useLoaderData } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
// import earth from "../../assets/svgs/earth.svg";
import { Container } from "../../components/ui-components";
import HeroSection from "./HeroSection";
import Learners from "./Learners";
import Instructor from "./Instructor";
import VenueProviders from "./VenueProviders";
import { checkIsMobile } from "../../utils/helpers";
import { Logo } from "../../components/shared-components/Logo";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import like from "../../assets/svgs/like.svg"
import notification from "../../assets/svgs/notification.svg"
import MobHeader from "../../components/ui-components/MobHeader";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function featuresLoader() {
  return {
    date: new Date().toISOString(),
  };
}

export default function Features() {
  // let data = useLoaderData();
  const isMobile = checkIsMobile();
  const tabsData = [
    { name: "Learners", href: "#", current: true },
    { name: "Instructors", href: "#", current: false },
    { name: "Venue Providers", href: "#", current: false },
  ];

  // console.log(learnersData.map((ele)=>ele.title));

  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.name === tabName
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
  };

  return (
    <>
      {isMobile && (
        <MobHeader />
      )}
      {/* Hero Section */}
      <section className="max-w-[100%] mt-2">
        <Container className="max-w-[100%] lg:px-0">
          <HeroSection />
        </Container>
      </section>

      {/* Tabs Section */}
      <section className="sticky top-0 z-50 bg-white">
        <div className="">
          <div className="border-b border-gray-200">
            <nav
              aria-label="Tabs"
              className="-mb-px flex space-x-8 justify-center">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick(tab.name);
                  }}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-base md:text-lg lg:text-lg font-medium"
                  )}>
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>
      {activeTab === "Learners" ? (
        <Learners />
      ) : activeTab === "Instructors" ? (
        <Instructor />
      ) : (
        activeTab === "Venue Providers" && <VenueProviders />
      )}
    </>
  );
}
