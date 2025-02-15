import { Fragment, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import InnerHeroSection from "../../components/shared-components/InnerHeroSection";
import { Container } from "../../components/ui-components";
import Commitment from "./Commitment";
import Support from "./Support";
import ExpertSupport from "./ExpertSupport";
import { checkIsMobile } from "../../utils/helpers";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import like from "../../assets/svgs/like.svg";
import notification from "../../assets/svgs/notification.svg";
import MobNotificationDrawer from "../../components/ui-components/MobNotificationDrawer";

export async function contactLoader() {
  return {
    date: new Date().toISOString(),
  };
}

export default function ContactUs() {
  const isMobile = checkIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  let data = useLoaderData();

  
  return (
    <>
      {isMobile && (
        <div className="py-8 px-5 flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2">
            {/* <Logo /> */}
            <h1 className="text-lg font-bold text-secondary">SimpliTrain</h1>
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
            <button onClick={() => navigate("/dashboard/wishlist")}>
              <img src={like} alt="" />
            </button>
            <button onClick={() => setIsDrawerOpen(true)}>
              <img src={notification} alt="" />
            </button>
          </div>
        </div>
      )}
      {
        isMobile && <MobNotificationDrawer open={isDrawerOpen} onClose={setIsDrawerOpen} />
      }
      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <Container>
          <InnerHeroSection heading={"Contact Us All Your Learning Needs!"} />
        </Container>
      </section>

      <section>
        <Container>
          <Commitment />
        </Container>
      </section>

      <section>
        <Container>
          <Support />
        </Container>
      </section>

      <section>
        <ExpertSupport />
      </section>
    </>
  );
}
