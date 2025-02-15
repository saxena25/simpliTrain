import React from 'react'

function Boxes({box,index}) {
  return (
    <>
        <div
            key={index}
            className="max-w-lg bg-gray-100 px-4 py-6 md:px-6 md:py-8 transform transition duration-300 hover:scale-110 hover:cursor-pointer">
            <h2 className="text-base lg:text-xl font-bold md:text-lg">{box.topic}</h2>
            <p className="text-sm text-gray-600 py-2 md:text-md lg:text-md md:font-semibold">
              {box.body}
            </p>
          </div>
    </>
  )
}

export default Boxes
