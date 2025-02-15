import React, { useState } from 'react';

export default function LineRating({ question , index }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex flex-row font-semibold text-lg py-4">
          <p className="text-lg mr-2">{index}.</p>
          <p className="text-lg font-medium"> {question}</p>
        </div>
      <div className="flex">
        {[...Array(10)].map((_, index) => (
          <label
            key={index}
            className={`cursor-pointer flex-1 border-[1px] border-gray-400 ${
              selected === index + 1 ? 'bg-black text-white' : 'bg-white text-black'
            } ${
              index === 0
                ? 'rounded-l-full'
                : index === 9
                ? 'rounded-r-full'
                : 'border-l-0'
            }`}
          >
            <input
              type="radio"
              name="line-rating"
              value={index + 1}
              checked={selected === index + 1}
              onChange={() => setSelected(index + 1)}
              className="hidden"
            />
            <span className="w-full h-12 flex items-center justify-center">
              {index + 1}
            </span>
          </label>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-800">
        <span>Not at all likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  );
}
