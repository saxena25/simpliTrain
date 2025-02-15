import React, { useState } from 'react';

export default function ExperienceQuestion({ question ,index }) {
  const [responses, setResponses] = useState({});

  const handleChange = (row, level) => {
    setResponses((prev) => ({ ...prev, [row]: level }));
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-row font-semibold text-lg">
          <p className="text-lg mr-2">{index}.</p>
          <p className="text-lg font-medium"> {question}</p>
        </div>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 text-center items-center px-1">
        <span></span>
        {['Not Satisfied', 'Average', 'Satisfied', 'Delighted', 'Exceptional'].map(
          (level, index) => (
            <span key={index} className="text-sm font-medium text-gray-600">
              {level}
            </span>
          )
        )}
        {['teaching skills', 'Instructor’s skills', 'Training materials'].map(
          (label, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <span className="text-sm font-medium text-gray-400 text-left">{label}</span>
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} className="cursor-pointer py-3">
                  <input
                    type="radio"
                    name={`row-${rowIndex}`}
                    value={level}
                    checked={responses[rowIndex] === level}
                    onChange={() => handleChange(rowIndex, level)}
                    className="hidden"
                  />
                  <span
                    className={`inline-block w-5 h-5 border rounded-full before:absolute before:inset-1 before:rounded-lg before:bg-white checked:border-black checked:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden ${
                      responses[rowIndex] === level
                        ? 'bg-black border-black'
                        : 'bg-white border-gray-400'
                    }`}
                  ></span>
                </label>
              ))}
            </React.Fragment>
          )
        )}
      </div>
    </div>
  );
}
