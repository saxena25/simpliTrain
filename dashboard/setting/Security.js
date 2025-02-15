import React, { useState } from 'react'
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { checkIsMobile } from '../../../utils/helpers';

function Security() {
    const [open,setOpen] = useState(false);
    const isMobile = checkIsMobile();
             
  return (
    <>
        <div
        className="w-full flex flex-row justify-between items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        <div className="w-full flex flex-row justify-between gap-2">
          <p className="text-base text-primary">Security and Privacy</p>
          <img src={rightArrow} alt="" />
        </div>
      </div>
    </>
  )
}

export default Security;