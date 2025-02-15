import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "../../components/shared-components/Logo";
import { Container } from "../../components/ui-components";
import {
  CategoriesIcon,
  ChatIcon,
  ForumIcon,
  HomeIcon,
  NotificationIcon,
} from "../../components/icons";
import { Link, useLocation } from "react-router-dom";
import HeaderSearch from "../../components/shared-components/GlobalSearch";
import UserMenu from "./UserMenu";
import { checkIsMobile } from "../../utils/helpers";
// import Mob_Container from "../../components/ui-components/Mob_Container";
import { UsersIcon } from "@heroicons/react/24/outline";
import homeNewIcon from "../../assets/svgs/homeNewIcon.svg";
import { useSelector } from "react-redux";
import MobCategory from "../../screens/category/MobCategory";
import Category from "../../screens/category";
// import UserMenuLoggedOut from "./UserMenuLoggedOut";

const navigations = [
  {
    name: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    name: "Categories",
    icon: CategoriesIcon,
    link: "/categories",
  },
  {
    name: "Chat",
    icon: ChatIcon,
    link: "/chat",
  },
  // {
  //   name: "Forum",
  //   icon: ForumIcon,
  //   link: "/forums",
  // },
  {
    name: "Notification",
    icon: NotificationIcon,
    link: "/notification",
  },
];

const mobileNavigations = [
  {
    name: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    name: "Categories",
    icon: CategoriesIcon,
    link: "/categories",
  },
  {
    name: "My Courses",
    icon: UsersIcon,
    link: "/dashboard/courses",
  },
  {
    name: "Chat",
    icon: ChatIcon,
    link: "/chat",
  },
  {
    name: "Account",
    icon: HomeIcon,
    link: "/dashboard",
  },
];
// auth
const SiteHeader = () => {
  let location = useLocation();
  const isLogedin = useSelector((state) => state.auth.login);
  const logedinUser = useSelector((state) => {
    // console.log("state.auth", state);
    if (
      (Array.isArray(state.myProfile.data) &&
        state.myProfile.data.length > 0) ||
      Object.keys(state.myProfile.data).length > 0
    ) {
      return state.myProfile.data;
    } else {
      return state.auth.data;
    }
  });
  const [isHome, setIsHome] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [webNavbarVisible,setWebNavbarVisible] = useState(true);
  const isMobile = checkIsMobile();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log("logedinUser", logedinUser, isLogedin);
  useEffect(() => {
    // console.log("checkHome", location);
    if (location && location.pathname == "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    console.log("checking path: ", location, location.pathname);
    if (
      (location && location.pathname === "/chat/chatid") ||
      location.pathname === "/courses/courseid" ||
      location.pathname === "/courses/courseid/batches" ||
      location.pathname === "/courses/checkout" ||
      location.pathname === "/courses/confirmation" ||
      location.pathname === "/documents" ||
      location.pathname === "/instructor_courses/poll_template" ||
      location.pathname === "/createPoll" || location.pathname === "/rating_reviews"
    ) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
    }

    if((location && location.pathname === "/rating_reviews")){
      setWebNavbarVisible(false);
    }else{
      setWebNavbarVisible(true);
    }
  }, [location]);

  return (
    <>
      {/* <div className="hidden md:flex md:gap-x-6">
    <Categories />
    </div>
    // fixed bottom-0 left-0 right-0 
    <Search /> */}
      {isMobile ? (
        isNavbarVisible && (
          <header className="fixed bottom-0 left-0 right-0  w-full z-10 bg-header-background border-t-2 border-t-gray-3 ">
            <nav>
              <nav className="flex flex-row justify-between">
                {mobileNavigations.map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className={`flex relative flex-col justify-center min-h-16 items-center w-20  font-medium text-center text-xs text-dark hover:opacity-100 ${
                      location.pathname === link.link
                        ? "after:w-full after:absolute after:-bottom-1 after:h-1 after:border-b-2 after:border-b-dark text-dark opacity-100"
                        : "opacity-55"
                    }`}>
                    <link.icon className="w-6" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </nav>
          </header>
        )
      ) : (
        <header
        // ${webNavbarVisible ? "block" : "hidden"}
          className={`border-0 border-b border-b-gray-3 bg-header-background fixed top-0 left-0 right-0  w-full z-20`}>
          <Container style={{ width: "100%", maxWidth: "100%" }}>
            <nav className="relative z-50 flex justify-between gap-5">
              <div className="flex justify-start items-center gap-5 w-full">
                <Link to={"/"}>
                  <Logo className="h-10 w-auto" />
                </Link>
                {isHome ? null : <HeaderSearch />}
              </div>
              <div className="flex justify-between items-center gap-5 w-full">
                <div className={`flex items-start w-full justify-end`}>
                  <div className="flex flex-row justify-between items-baseline gap-0">
                    {navigations.map((navItem, index) => (
                      <Link
                        key={index}
                        to={navItem.link}
                        className={`flex relative flex-col justify-center min-h-16 items-center w-20  font-medium text-center text-xs text-dark hover:opacity-100 ${
                          location.pathname == navItem.link
                            ? "after:w-full after:absolute after:-bottom-1 after:h-1 after:border-b-2 after:border-b-dark text-dark opacity-100"
                            : "opacity-55"
                        }`}>
                        {/* {navItem.icon} */}
                        <navItem.icon
                        // className={clsx(location.pathname == navItem.link ? 'opacity-100' : 'opacity-50 hover:opacity-100')}
                        />
                        <span>{navItem.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <UserMenu
                    HomePage={isHome}
                    isLogedin={isLogedin}
                    userData={logedinUser}
                  />
                </div>
              </div>
            </nav>
          </Container>
        </header>
      )}

      {/* {isLoggedIn ? <UserMenu /> : <UserMenuLoggedOut isLoggedIn={isLoggedIn} />} */}
    </>
  );
};

export default SiteHeader;
