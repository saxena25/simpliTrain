import React from "react";
import { useState } from "react";
import visa from "../../../assets/svgs/visa.svg";
import masterCard from "../../../assets/svgs/masterCard.svg";
import { Button } from "../../../components/ui-components";
import { FloatingTextField } from "../../../components/ui-components";
import backArrow from "../../../assets/svgs/backArrow.svg";
import { checkIsMobile } from "../../../utils/helpers";
import { updatePaymentMethods } from "../../../redux/settings/actionCreator";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function AddCard({ setIsAddCard }) {
  const [formState, setFormState] = useState({
    card_number: "",
    expiryDate: "",
    cvv: "",
    cardholder_name: "",
    zipcode: "",
    card_type: "creditCard",
  });
  const dispatch = useDispatch();
  const isMobile = checkIsMobile();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, customMessage) => {
    api[type]({
      message: customMessage,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "card_number"){
      let rawValue = value.replace(/\D/g, "");

       const formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim();

      setFormState(prev => ({
        ...prev,
        [name]: rawValue
      }))
      console.log(formState);
      e.target.value = formattedValue
    }
    else if (name === "expiryDate") {
      let formattedValue = value.replace(/[^\d]/g, "");
      if (formattedValue.length >= 3) {
        formattedValue =
          formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 6);
      }
      setFormState((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState);

    const [expiry_month, expiry_year] = formState.expiryDate
      ? formState.expiryDate.split("/")
      : [null, null];

    const formdata = {
      cardholder_name: formState.cardholder_name,
      card_number: formState.card_number,
      expiry_month: expiry_month,
      expiry_year: expiry_year,
      cvv: formState.cvv,
      zipcode: formState.zipcode,
      card_type: formState.card_type,
    };

    let response = await dispatch(updatePaymentMethods(formdata));
    console.log("PaymentMethod response", response);
    if(response && response.type === "SETTINGS_SUCCESS"){
      openNotificationWithIcon("success", "Card Added Successfully");
      setTimeout(()=>{
        setIsAddCard(false);
      },100)
    }
  };

  return (
    <>
      {contextHolder}
      <div className=" w-full flex flex-col gap-4 md:my-8">
        {!isMobile && (
          <>
            <button
              className="fixed top-8 left-6"
              onClick={() => setIsAddCard(false)}>
              <img src={backArrow} alt="back Arrow" />
            </button>
            <h1 className="text-3xl font-medium">Add Card</h1>
          </>
        )}

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row gap-8">
            <div className="flex flex-row items-center">
              <input
                name="card_type"
                id="creditCard"
                type="radio"
                value={formState.card_type === "credit"}
                onChange={() =>
                  setFormState((prev) => ({ ...prev, card_type: "credit" }))
                }
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-gray-500 checked:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden mr-2"
              />
              <label htmlFor="creditCard" className="text-base text-primary">
                Credit
              </label>
            </div>
            <div className="flex flex-row items-center">
              <input
                name="card_type"
                id="debitCard"
                type="radio"
                value={formState.card_type === "debit"}
                onChange={() =>
                  setFormState((prev) => ({ ...prev, card_type: "debit" }))
                }
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-gray-500 checked:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden mr-2"
              />
              <label htmlFor="debitCard" className="text-base text-primary">
                Debit
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <img src={visa} alt="visa" className={`${isMobile ? "w-12" : ""}`} />
            <img
              src={masterCard}
              alt="masterCard"
              className={`${isMobile ? "w-10" : ""}`}
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:gap-14 justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <FloatingTextField
              label="Card Number"
              type="text"
              maxLength="19"
              value={formState.card_number.replace(/(.{4})/g, "$1 ").trim()}
              name="card_number"
              onChange={handleChange}
            />
            <div className="rounded-lg bg-input-background h-16 px-3 pt-2.5 ">
              <label
                htmlFor="expiryDate"
                className="block text-xs font-medium text-gray-500">
                Expiry
              </label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                value={formState.expiryDate}
                onChange={handleChange}
                className="block w-full border-none bg-input-background text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
            {/* <FloatingTextField
              label="Expiry"
              type="month"
              value={formState.expiryDate}
              name="expiryDate"
              onChange={handleChange}
            /> */}
            <FloatingTextField
              label="CVV"
              type="number"
              maxLength="3"
              hidden
              value={formState.cvv}
              name="cvv"
              onChange={handleChange}
            />
            <FloatingTextField
              label="Card holder's Name"
              type="text"
              value={formState.cardholder_name}
              name="cardholder_name"
              onChange={handleChange}
            />
            <FloatingTextField
              label="Zip code"
              type="number"
              value={formState.zipcode}
              name="zipcode"
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="solid"
            className="w-[50%] m-auto my-6">
            Save
          </Button>
        </form>
      </div>
    </>
  );
}

export default AddCard;
