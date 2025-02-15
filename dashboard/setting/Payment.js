import React, { useEffect, useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { Button, Drawer } from "../../../components/ui-components";
import visa from "../../../assets/svgs/visa.svg";
// import masterCard from "../../../assets/svgs/masterCard.svg";
import masterCard from "../../../assets/svgs/masterCard.svg";
import razorPay from "../../../assets/svgs/razorPay.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import AddCard from "./AddCard";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";
import {
  deleteCard,
  getPaymentMethods,
} from "../../../redux/settings/actionCreator";
import { useLoaderData } from "react-router-dom";
import store from "../../../redux/store";
import { notification } from "antd";

const cardData = [
  {
    cardNumber: "**** **** **** 4973",
    expiryDate: "10/25",
    cardType: visa,
  },
  {
    cardNumber: "**** **** **** 3245",
    expiryDate: "01/26",
    cardType: masterCard,
  },
  {
    cardNumber: "**** **** **** 7000",
    expiryDate: "12/36",
    cardType: razorPay,
  },
];

const getPaymentData = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getPaymentMethods());
    if (response && response.type === "SETTINGS_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const functionDeleteCard = async (id) => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(deleteCard({ id: id }));
    console.log("id from function 1: ", id);
    if (response && response.type === "SETTINGS_SUCCESS") {
      resolve(response);
    } else {
      resolve([]);
    }
  });
};

export async function paymentLoader() {
  const paymentMethods = await getPaymentData();
  console.log("payment Loader Data: ", paymentMethods);
  return {
    date: new Date().toISOString(),
    paymentMethods: paymentMethods,
  };
}

function Payment() {
  const [open, setOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isPaymentMethod, setIsPaymentMethod] = useState(true);
  const [isAddCard, setIsAddCard] = useState(false);
  const loaderData = useLoaderData();
  const isMobile = checkIsMobile();
  const [api, contextHolder] = notification.useNotification();


  const openNotificationWithIcon = (type, customMessage) => {
    api[type]({
      message: customMessage,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const methods = await getPaymentData();
      setPaymentMethods(methods);
    }
    fetchData();
  }, [isAddCard]);
  // console.log("payment methods: ", paymentMethods);

  const handleCardDelete = async (id) => {
    setIsPaymentMethod(false);
    try {
      let response = await functionDeleteCard(id);
      console.log("delete response:", response);
      if (response && response.type === "SETTINGS_SUCCESS") {
        // const updatedMethods = paymentMethods.filter((item) => item.id !== id);
        // setPaymentMethods(updatedMethods);
        setPaymentMethods((prevMethods) =>
          prevMethods.filter((item) => item.id !== id)
        );
        setIsPaymentMethod(true);
        openNotificationWithIcon("success", "Card Deleted Successfully");
      } else {
        setIsPaymentMethod(false);
        openNotificationWithIcon("error", "Card Deletion Failed");
      }
    } catch (error) {
      console.log("error Deleting Card", error);
      // setIsPaymentMethod(false);
      openNotificationWithIcon("error", "Something went wrong while deleting the card");
    }
  };

  return (
    <>
      {contextHolder}
      <div
        className="w-full flex flex-row justify-between items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        <div className="w-full flex flex-row justify-between gap-2">
          <p className="text-base text-primary">Saved Payment Methods</p>
          <img src={rightArrow} alt="" />
        </div>
      </div>

      {isMobile ? (
        <MobDrawer
          open={open}
          onClose={setOpen}
          title={`${isAddCard ? "Add Card" : "Saved Payment Methods"}`}>
          {isAddCard ? (
            <AddCard setIsAddCard={setIsAddCard} />
          ) : (
            <div className="m-auto flex flex-col items-center my-8">
              <div className="w-full grid grid-cols-1 gap-5">
                {paymentMethods.map((item, index) => (
                  <div
                    className="flex flex-row gap-2 items-center"
                    key={item.id}>
                    <div className="w-full flex flex-row gap-5 border border-gray-200 px-4 py-3 rounded-2xl">
                      <img src={masterCard} alt="" />
                      <div className="flex flex-col">
                        <p className="text-lg text-secondary font-medium">
                          {item.card_number}
                        </p>
                        <p className="text-sm text-primary">
                          Expires {item.expiry_month}/{item.expiry_year}
                        </p>
                      </div>
                    </div>

                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-gray-100">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            aria-hidden="true"
                            className="size-6"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-8 top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                        <div className="py-1">
                          <MenuItem>
                            <button
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Set as default
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Remove as default
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              href="#"
                              onClick={() => handleCardDelete(item.id)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Remove Card
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                ))}

                <button
                  className="w-[70%] m-auto mt-4 bg-white border border-dotted border-gray-300 py-4 rounded-2xl text-sm text-secondary font-medium"
                  onClick={() => setIsAddCard(true)}>
                  + Add New Card
                </button>
              </div>
            </div>
          )}
        </MobDrawer>
      ) : (
        <Drawer
          open={open}
          onClose={setOpen}
          title={isAddCard ? "" : "Saved Payment Methods"}>
          {isAddCard ? (
            <AddCard setIsAddCard={setIsAddCard} />
          ) : (
            <div className="max-w-[65%] m-auto flex flex-col items-center my-8">
              <div className="w-full grid grid-cols-1 gap-5">
                {paymentMethods.map((item, index) => (
                  <div
                    className="flex flex-row gap-2 items-center"
                    key={item.id}>
                    <div className="w-full flex flex-row gap-5 border border-gray-200 px-4 py-3 rounded-2xl">
                      <img src={visa} alt="Card Type Icon" />
                      <div className="flex flex-col">
                        <p className="text-lg text-secondary font-medium">
                          {item.card_number}
                        </p>
                        <p className="text-sm text-primary">
                          Expires {item.expiry_month}/{item.expiry_year}
                        </p>
                      </div>
                    </div>

                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-gray-100">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            aria-hidden="true"
                            className="size-6"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-8 top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                        <div className="py-1">
                          <MenuItem>
                            <button
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Set as default
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]
                              :outline-none">
                              Remove as default
                            </button>
                          </MenuItem>
                          <MenuItem>
                            <button
                              href="#"
                              onClick={() => handleCardDelete(item.id)}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Remove Card
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                ))}

                <button
                  className="w-[70%] m-auto mt-4 bg-white border border-dotted border-gray-300 py-4 rounded-2xl text-sm text-secondary font-medium"
                  onClick={() => setIsAddCard(true)}>
                  + Add New Card
                </button>
              </div>
            </div>
          )}
        </Drawer>
      )}
    </>
  );
}

export default Payment;
