import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import like from "../../assets/svgs/like.svg";
import notification from "../../assets/svgs/notification.svg";
import MobDrawer from "./MobDrawer";
import { useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import MobNotificationDrawer from "./MobNotificationDrawer";

function MobHeader({className}) {
    const [notificationOpen, setNotificationOpen] = useState(false);
    const navigate = useNavigate();
    const isMobile = checkIsMobile();
  return (
    <>
      <div className={`py-8 mt-2 px-5 flex flex-row justify-between ${className}`}>
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-lg font-bold text-secondary" onClick={()=>navigate("/")}>SimpliTrain</h1>
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
            <button onClick={()=>navigate("/dashboard/wishlist")}>
                <img src={like} alt="" />

            </button>
            <button onClick={()=>setNotificationOpen(true)}>
                <img src={notification} alt="" />
            </button>
        </div>
      </div>
      {/* notification drawer */}
      {isMobile && (
          <MobNotificationDrawer open={notificationOpen} onClose={setNotificationOpen} />
        )}
    </>
  );
}

export default MobHeader;
