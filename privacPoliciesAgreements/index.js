
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PoliciesAgreementsSideBar from './sidebar';

const PoliciesAgreementsLayout = () => {
    return (
        <>
            <div className="bg-gray-50 flex flex-row items-center justify-center p-20">
                <h2 className='text-text text-5xl text-center font-medium'>Privacy Policies & Agreements</h2>
            </div>
            <div className="bg-white flex flex-row items-start justify-start">
                <div className='flex w-80'>
                    <PoliciesAgreementsSideBar />
                </div>
                <div className='flex w-full'>
                    <Outlet />
                </div>  
            </div>
        </>    
    );
};

export default PoliciesAgreementsLayout;
