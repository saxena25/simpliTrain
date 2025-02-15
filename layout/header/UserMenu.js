import React, { useEffect } from "react";
import menucircle from "../../assets/svgs/menucircle.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LogoutUser,
  setUserRole,
} from "../../redux/authentication/actionCreator";
import { useDispatch, useSelector } from "react-redux";
// import UserMenuLoggedOut from "./UserMenuLoggedOut";

function UserMenu({ HomePage, isLogedin, userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updatedRole = useSelector((state)=>state.auth.role)
  // console.log('userData', userData);

  const handleClick = async (role) => {
    // console.log("handleClick Role :", role);
    let response = await dispatch(setUserRole(role));
    // console.log("handleClick response: ", response);
    navigate("/auth");
  };

  // useEffect(() => {
  //   console.log("User Menu updatedRole: ", updatedRole);
  // }, [updatedRole]);

  const logoutUser = async () => {
    let reponse = await dispatch(LogoutUser());
    // console.log("userMenu logout response: ", reponse);
    if (reponse && reponse.type === "AUTH_SUCCESS") {
      // window.location.reload();
      navigate("/");
    }
  };

  const getInstructorButtonText = (user) => {
    if (user && user?.role?.includes("INSTRUCTOR")) {
      return "Switch to Instructor";
    } else {
      return "Become an Instructor";
    }
  };

  const getInstructorUrl = (user) => {
    if (user && user?.role?.includes("INSTRUCTOR")) {
      if (user?.InstructorOnboarding) {
        // alert('sasasasasa');
        return "/instructor/courses";
      } else {
        return "/instructor_onboarding";
      }
    } else {
      return "/instructor_onboarding";
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex flex-row justify-evenly items-center px-2 py-1 gap-3 rounded-4xl border border-gray-3 hover:shadow-3xl">
            <span>
              <svg
                width="35"
                height="36"
                viewBox="0 0 40 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="20"
                  cy="20.5"
                  r="20"
                  fill="#B7BCC2"
                  fillOpacity="0.5"
                />
                <rect
                  x="17.6914"
                  y="13.5234"
                  width="5.36539"
                  height="5.36539"
                  rx="2.68269"
                  stroke="#9A9797"
                  strokeWidth="1.5"
                />
                <path
                  d="M14.75 23.8516C14.75 22.6089 15.7574 21.6016 17 21.6016H23.75C24.9926 21.6016 26 22.6089 26 23.8516V25.9862H14.75V23.8516Z"
                  stroke="#9A9797"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
            <span>
              <svg
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1.5H12" stroke="black" strokeWidth="1.5" />
                <path d="M0 5.5H12" stroke="black" strokeWidth="1.5" />
                <path d="M0 9.5L12 9.5" stroke="black" strokeWidth="1.5" />
              </svg>
            </span>
          </MenuButton>
        </div>
        {isLogedin ? (
          <>
            <MenuItems
              transition
              className="absolute right-0 top-[54px] z-50 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-3xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
              <div className="px-4 py-3 flex flex-col gap-4">
                <div className="flex flex-row gap-2 justify-center">
                  <img src={menucircle} alt="" />
                  <div className="w-full">
                    <p className="text-base font-medium">
                      {userData && userData.name
                        ? userData.name
                        : "Unknown Name"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {userData && userData.email ? userData.email : ""}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Link to={getInstructorUrl(userData)}>
                    <button className="bg-black text-white w-full rounded-xl py-2 text-sm">
                      {" "}
                      {getInstructorButtonText(userData)}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="">
                <MenuItem>
                  <Link
                    to="/dashboard/profile"
                    // onClick={()=>navigate('/dashboard/profile')}
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none hover:cursor-pointer">
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/dashboard/courses"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    My Course
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/dashboard/my_assessments"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Assessments
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/dashboard/wishlist"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Wishlist
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/dashboard/certificates"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Certificates
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/dashboard/purchase"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Purchases
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Settings
                  </Link>
                </MenuItem>
              </div>
              <div className="">
                <MenuItem>
                  <Link
                    to="/faq"
                    className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Support / FAQ
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Rate us
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => logoutUser()}
                    type="submit"
                    className="block w-full px-4 py-2 text-left rounded-br-2xl rounded-bl-2xl text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Logout
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </>
        ) : (
          <MenuItems
            transition
            // right-0 z-10 mt-2
            className="absolute right-0 top-[54px] z-50 w-52 h-28 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center">
            <div className="py-1 px-2">
              <MenuItem>
                <Link
                  // to={"/auth"}
                  onClick={() => handleClick("LEARNER")}
                  className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                  Login / Signup
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to={"/auth"}
                  onClick={() => handleClick("INSTRUCTOR")}
                  className="block px-4 py-2 text-base font-medium text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                  Become Instructor
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        )}
      </Menu>
    </>
  );
}

export default UserMenu;
