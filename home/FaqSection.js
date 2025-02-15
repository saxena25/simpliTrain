import { Fragment, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { QuestionChat } from "../../components/icons";
import { checkIsMobile } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function FaqSection({ faqs }) {
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [allFaqsData, setAllFaqsData] = useState(faqs || []);

  return (
    <>
      <div
        className={`flex flex-row justify-between items-center gap-4 mb-6 ${
          isMobile && "relative"
        }`}>
        <h4 className="text-2xl md:text-3xl text-text font-medium md:text-center m-0">
          Frequently{isMobile && <br />} asked questions
        </h4>
        <button
          className={`flex flex-row items-start justify-center gap-2 ${
            isMobile && "absolute bottom-0 right-0"
          }`}
          onClick={() => navigate("/faq")}>
          <span className="text-md text-text">See all</span>
          <svg
            width="24"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697"
              stroke="#3B4350"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 12H20.33"
              stroke="#3B4350"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between  items-start gap-8 mb-12">
        <div className="w-full flex flex-col">
          <div className="md:mt-10 flex flex-col gap-5">
            {allFaqsData.slice(0,6).map((faq, index) => (
              <div key={index} className='p-3 border border-gray-5 rounded-md'>
                <Disclosure key={index} as="div" className="">
                  <DisclosureButton className="group flex w-full items-center md:items-start justify-between text-left text-gray-900">
                    <span className="text-sm md:text-lg font-semibold">{faq?.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-sm text-text">{faq?.answer}</p>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            
            ))}
          </div>
        </div>
        <div className={`w-80 flex ${isMobile && "m-auto"}`}>
          <div className="mt-10 flex flex-col justify-center items-center p-5 rounded-lg border gray-5 gap-5">
            <QuestionChat />
            <h5 className="text-lg text-text font-medium text-center">
              Do you have more questions?
            </h5>
            <p className="text-text text-sm text-center">
              Our friendly customer support team is here to chat and guide you
              through your learning journey.
            </p>
            <a
              className={` bg-primary text-sm w-full md:w-fit md:text-base text-white rounded-lg px-5 py-3 ${
                isMobile && "text-center"
              }`}>
              Ask Us Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
