import React, { useState } from "react";

export default function TextQuestion({ question, Marks }) {
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div>
      <div className="space-y-4 py-4">
        {/* Question Section */}
        <div className="flex flex-row justify-between font-semibold w-full text-lg py-6">
        <p className="text-3xl font-medium pr-2">{question}</p>
          <div className="text-sm font-medium  w-[15%] text-center">
            <p className="border-[2px] border-gray-300 px-2 py-1 w-24 h-8 rounded-full">{Marks}</p>
            </div>
        </div>

        {/* Text Area Section */}
        <div className="px-4">
          <textarea
            value={answer}
            onChange={handleChange}
            rows="2"
            maxLength="600" // Approximate limit of 100 words
            placeholder="Type your answer here..."
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-500 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            Please limit your answer to 100 words.
          </p>
        </div>
      </div>
    </div>
  );
}
