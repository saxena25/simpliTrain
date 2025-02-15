import React, { useState } from "react";

export default function TextQuestion({ question, index }) {
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
    <div>
      <div className="space-y-4 py-4">
        {/* Question Section */}
        <div className="flex flex-row font-semibold text-lg">
          <p className="text-text mr-2">{index}.</p>
          <p className="text-text font-medium">{question}</p>
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
