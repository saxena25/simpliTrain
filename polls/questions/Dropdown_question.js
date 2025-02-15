import React, { useState } from "react";
import { DropDownField } from "../../../components/ui-components";

export default function DropdownQuestion({ question, index, options }) {
  const [selectedOption, setSelectedOption] = useState("");
  const Dropdown_options = [options];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="space-y-4 py-4">
        {/* Question Section */}
        <div className="flex flex-row font-semibold text-lg">
          <p className="text-text mr-2">{index}.</p>
          <p className="text-text font-medium">{question}</p>
        </div>

        {/* Dropdown Section */}
        <div className="px-4 w-[70%] h-16 text-center">
          <DropDownField
            prifix={
              <h1 className="p-2 text-gray-400 border-r-white">Choose</h1>
            }
            options={Dropdown_options}
            className="min-w-full border-2 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
