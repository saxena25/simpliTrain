import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowDownTrayIcon, EllipsisVerticalIcon, ShareIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

function CertificateCard() {
  return (
    <div className="w-full">
      <div className="bg-[#fafafa] flex flex-col justify-between rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-end items-center p-4">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="text-gray-800 text-sm font-semibold py-2 px-4 rounded-full">
              <EllipsisVerticalIcon className="size-5" />
            </MenuButton>
            <MenuItems
              transition
              // right-0 z-10 mt-2 
              className="absolute right-6 md:right-0 lg:right-0 xl:right-0 top-6 md:top-[44px] lg:top-[44px] xl:top-[44px] w-56 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center">
              <div className="pb-3 md:pb-0 lg:pb-0 md:py-1  px-2">
                <MenuItem className="mt-3 md:mb-3 lg:mb-3 xl:mb-3">
                   <h6 className="text-sm text-text font-medium px-4 py-2">Booking ID : SA090023</h6>
                </MenuItem>
                <MenuItem>
                  <a className="flex flex-row justify-start items-center px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"><ShareIcon className="size-5 mr-3" /> Share</a>
                </MenuItem>
                <MenuItem>
                  <a className="flex flex-row justify-start items-center px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"><ShareIcon className="size-5 mr-3" /> Copy Link</a>
                </MenuItem>
                <MenuItem>
                  <a className="flex flex-row justify-start items-center px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"><ShareIcon className="size-5 mr-3" /> Share via Email</a>
                </MenuItem>
                <MenuItem>
                  <a className="flex flex-row justify-start items-center px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"><ShareIcon className="size-5 mr-3" /> Course Details</a>
                </MenuItem>
                <MenuItem>
                  <a className="flex flex-row justify-start items-center px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"><ShareIcon className="size-5 mr-3" /> Change Request</a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div className="flex justify-center items-center py-4 px-6">
          <img
            className="w-3/4 object-cover"
            src={require('../../../assets/images/certificate.png')}
            alt="Certificate"
          />
        </div>
        <div className="flex justify-between items-center p-4">
          <button className="text-gray-900 text-sm font-semibold py-2 px-4"> 
            Design
          </button>
        </div>
      </div>
      <div className="py-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">How to becoming UX designer</h3>
        <p className="text-gray-600 text-sm mb-2">Certificate Earned · 23 Mar 24</p>
        <div className="flex justify-start items-center py-2 gap-3">
          <button className="bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-lg">View Certificate</button>
          <button className="bg-transparent text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg border border-gray-400"><ArrowDownTrayIcon className="size-5" /></button>
        </div>
      </div>
     
    </div>
  );
}

export default CertificateCard;
