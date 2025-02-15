import React from "react";
import CertificateCard from "./CertificateCard";
import { Container } from "../../../components/ui-components";
import {checkIsMobile} from "../../../utils/helpers";
import reviewLeftArrow from "../../../assets/svgs/reviewLeftArrow.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export async function certificateLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function Certificates() {
  const isMobile = checkIsMobile();
  return (
    <div className={`${isMobile ? "bg-gray-100" : ""} w-full`}>
      <Container>
        {isMobile && (
          <div className="flex flex-row gap-4 pt-8">
            <div className="bg-white rounded-full flex justify-center items-center">
              <img src={reviewLeftArrow} alt="" className="py-2 px-3"  />
            </div>
            <div className="relative w-full">
              <input type="text" placeholder="Search" className="w-full border-none rounded-full pl-12 py-3" />
              <MagnifyingGlassIcon className="w-5 absolute top-[14px] left-4 text-[#363A49]" />
            </div>
          </div>
        )}
        <div className="flex flex-row gap-2 py-6">
          <h1 className="text-3xl font-semibold text-secondary">My Certificates</h1>
          <p className="text-3xl font-semibold text-secondary">(6)</p>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 md:justify-start lg:justify-start xl:justify-start items-start gap-8">
            {
              ['','','','','',''].map((item, index)=>(
                <div key={index}>
                  <CertificateCard />
                </div>
              ))
            }
        </div>
      </Container>
     
    </div>
  );
}

export default Certificates;
