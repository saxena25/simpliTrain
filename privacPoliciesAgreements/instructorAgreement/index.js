
import React, { useEffect, useState } from 'react';
export async function instructorAgreementLoader(){
    return {
      date: new Date().toISOString(),
    };
}


const InstructorAgreement = () => {

  return (
    <>
      <div className="w-full p-10">
        <h1 className="text-2xl font-bold text-gray-800">Instructor Agreement</h1>
        <div className="grid grid-cols-2 gap-4 py-10">
          {/* Left Column */}
          <div>
            <ul className="space-y-3">
              <li>
                1. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#general">General</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                3. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#information">Information we collect</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                5. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#retention">Data Retention</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                7. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#usage">How do we use the information we collect?</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                9. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#usage2">How do we use the information we collect from you? (continued)</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                11. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#usage3">How do we use the information we collect from you? (continued)</a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <ul className="space-y-3">
              <li className="text-gray-700 hover:text-blue-600 transition">
                2. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#password">Confidentiality of your password</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                4. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#privacy-policy">Changes to our Privacy Policy</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                6. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#links">Links to other websites and social media</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                8. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#links2">Links to other websites and social media (continued)</a>
              </li>
              <li className="text-gray-700 hover:text-blue-600 transition">
                10. <a className='text-gray-700 hover:text-blue-600 transition underline' href="#articles">Related Articles</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6">
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">1. General</h2>
            <p className="text-gray-600">
              SimpliLearn SAS is committed to protecting your privacy. This notice
              sets out the basis on which any personal data we collect from you,
              or that you provide to us, will be processed by us.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default InstructorAgreement;
