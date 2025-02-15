import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";

const navigation = [
  { name: "Account", href: "/dashboard/profile", icon: HomeIcon },
  { name: "My Courses", href: "/dashboard/courses", icon: UsersIcon },
  { name: "Assessments", href: "/dashboard/my_assessments", icon: FolderIcon },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: CalendarIcon },
  {
    name: "Certificates",
    href: "/dashboard/certificates",
    icon: DocumentDuplicateIcon,
  },
  { name: "Purchases", href: "/dashboard/purchase", icon: ChartPieIcon },
];

const navigationTwo = [
  // { name: "Community", href: "/dashboard/community", icon: UsersIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
];

const DashboardSideBar = ({ isProfile }) => {
  let location = useLocation();
  const [activeRoute, setActiveRoute] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = checkIsMobile();

  useEffect(() => {
    // console.log("checkHome", location.pathname);
    if (location && location.pathname) {
      if (location.pathname == "/dashboard") {
        setActiveRoute("/dashboard/profile");
      } else {
        setActiveRoute(location.pathname);
      }
    }
  }, []);

  return (
    // transition-all duration-300 ease-in-out w-96 ${filterSidebar?'ml-0':'-ml-96'}`
    <>
      
        <div
          className={`hidden sm:flex h-full grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 py-8 transition-all duration-300 ease-in-out ${
            isProfile ? "px-3" : "px-8"
          }`}>
          <nav className="h-full flex flex-1 flex-col justify-between items-start">
            <ul role="list" className="w-full space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={clsx(
                      activeRoute == item.href
                        ? "bg-gray-4"
                        : "hover:bg-gray-4",
                      "group flex rounded-full gap-3 p-2 "
                    )}>
                    <item.icon
                      aria-hidden="true"
                      className={clsx(
                        activeRoute == item.href
                          ? "text-text"
                          : "text-gray-400 group-hover:text-text",
                        "size-6 shrink-0"
                      )}
                    />
                    {isProfile ? null : (
                      <span
                        className={clsx(
                          activeRoute == item.href ? "text-text" : "text-text",
                          "text-sm/6 font-semibold"
                        )}>
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <ul role="list" className="w-full space-y-4">
              {navigationTwo.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={clsx(
                      activeRoute == item.href
                        ? "bg-gray-4"
                        : "hover:bg-gray-4",
                      "group flex rounded-full gap-3 p-2"
                    )}>
                    <item.icon
                      aria-hidden="true"
                      className={clsx(
                        activeRoute == item.href
                          ? "text-text"
                          : "text-gray-400 group-hover:text-text",
                        "size-6 shrink-0"
                      )}
                    />
                    {isProfile ? null : (
                      <span
                        className={clsx(
                          activeRoute == item.href ? "text-text" : "text-text",
                          "text-sm/6 font-semibold"
                        )}>
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      
    </>
  );
};

export default DashboardSideBar;
