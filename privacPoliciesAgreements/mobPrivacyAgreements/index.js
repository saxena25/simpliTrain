import React from 'react';
import reviewLeftArrow from "../../../assets/svgs/reviewLeftArrow.svg"
import { Link } from 'react-router-dom';

export async function instructorLoader(){
    return {
      date: new Date().toISOString(),
    };
  }

const data = [
    {name: "Privacy Policy", href: "/documents/privacy_policies"},
    {name: "Terms and Conditions", href: "#"},
    {name: "Instructor Agreement", href: "#"},
    {name: "Venue Provider Agreement", href: "#"},
    {name: "Payment Processing Agreement", href: "#"},
]

function MobPrivacyDashBoard() {
  return (
    <div>
      <div className='bg-[#DBDEE14D] pt-10 pb-8 px-5 flex flex-col gap-4'>
        <img src={reviewLeftArrow} className='border border-gray-300 p-2 rounded-full w-fit' alt="" onClick={()=>window.history.back()} />
        <h1 className='text-3xl text-[#000000] font-medium'>Privacy Policies & Agreements</h1>
      </div>
      <div className='px-5 pt-8 flex flex-col gap-4'>
        {data.map((item, index) => (
            <Link className='flex flex-row gap-4 items-center' to={item.href} key={index}>
                <div className='bg-[#D9D9D980] w-6 h-6 rounded-lg'></div>
                <p className='text-xl font-normal text-[#2A3036]'>{item.name}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default MobPrivacyDashBoard
