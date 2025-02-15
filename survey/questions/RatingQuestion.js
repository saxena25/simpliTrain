import React, { useState } from 'react';

export default function RatingQuestion({ question , index }) {
  const [selected, setSelected] = useState(0); // State to store selected rating

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row font-semibold text-lg">
          <p className="text-lg mr-2">{index}.</p>
          <p className="text-lg font-medium"> {question}</p>
        </div>
      <div className="flex gap-2 px-4 pb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={star}
              checked={selected === star}
              onChange={() => setSelected(star)}
              className="hidden"
            />
            <span
              className={`text-3xl ${
                selected >= star ? 'text-primary' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
