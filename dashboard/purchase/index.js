import React from "react";
import { useState } from "react";
import MyPurchase from "./MyPurchase";
import PaymentHistory from "./PaymentHistory";
import Installments from "./Installments";
import { checkIsMobile } from "../../../utils/helpers";
import { getPurchaseHistory } from "../../../redux/purchase/actionCreator";
import store from "../../../redux/store";
import { useLoaderData } from "react-router-dom";

const getPurchase = () =>{
  return new Promise (async(resolve,reject)=>{
    let response = await store.dispatch(getPurchaseHistory());
    if(response && response.type === "PURCHASE_SUCCESS"){
      resolve(response.data)
    }else{
      resolve([])
    }
  })
}

export async function purchaseLoader() {
  const paymentHistory = await getPurchase();
  return {
    date: new Date().toISOString(),
    paymentHistory: paymentHistory
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Purchase() {
  const loaderData = useLoaderData();
  const [paymentHistoryData, setPaymentHistoryData] = useState(loaderData.paymentHistory || []);
  const tabsData = [
    { name: "Active Installments", href: "#", current: true },
    { name: "Payment History", href: "#", current: false },
  ];
  const isMobile = checkIsMobile();
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
    <div className={`${isMobile ? "bg-gray-100" : "bg-white"} flex flex-col w-full`}>
      
        <div className={`w-full m-auto ${isMobile ? "p-5" : "px-14 py-6"} `}>
          <MyPurchase data={paymentHistoryData} />
        </div>
      

      {/* slide tabs  */}
      {/* <div className="border-b border-gray-200">
        <nav aria-label="Tabs" className={`-mb-px flex space-x-8  ${isMobile ? "justify-center" : "ml-14"}`}>
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
                "whitespace-nowrap border-b-2 px-1 py-4 text-base md:text-lg lg:text-lg xl:text-lg font-medium"
              )}>
              {tab.name}
            </a>
          ))}
        </nav>
      </div> */}

      {/* {activeTab === "Active Installments"
        ? <Installments />
        : activeTab === "Payment History" && <PaymentHistory />} */}
    </div>
  );
}

export default Purchase;
