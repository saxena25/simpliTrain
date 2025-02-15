import React, { useState } from "react";
import { DropDownField } from "../../../../components/ui-components";

export default function DropdownQuestion({ question, Marks, options }) {
  const [selectedOption, setSelectedOption] = useState("");
  const Dropdown_options = [options];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="space-y-4 py-4">
        <div className="flex flex-row justify-between font-semibold w-full text-lg py-6">
        <p className="text-3xl font-medium pr-2">{question}</p>
          <div className="text-sm font-medium  w-[15%] text-center">
            <p className="border-[2px] border-gray-300 px-2 py-1 w-24 h-8 rounded-full">{Marks}</p>
            </div>
        </div>
        <div className="px-4 w-[70%] h-16 text-center">
          <DropDownField
            placeholder="Choose your answer"
            options={[
              { key: 1, value: "Male" },
              { key: 2, value: "Female" },
              { key: 3, value: "Other" },
            ]}
            className="min-w-full border-2 border-gray-300 text-center flex items-center"
          />
        </div>
      </div>
    </div>
  );
}
