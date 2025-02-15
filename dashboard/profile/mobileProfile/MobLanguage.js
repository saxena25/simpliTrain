import React from "react";
import { useState } from "react";
import { EditPencilTwo } from "../../../../components/icons";
import MobDrawer from "../../../../components/ui-components/MobDrawer";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function MobLanguage() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState([
    {name: "English", checked: true},
    {name: "Hindi", checked: false},
    {name: "Tamil", checked: false},
    {name: "Telugu", checked: false},
    {name: "Bengali", checked: false},
    {name: "Kanada", checked: false},
    {name: "Arabic", checked: false},
  ]);
  return (
    <>
      <div className="bg-white rounded-xl relative">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">
          Preferred Language
        </h3>
        <button
          className="border  border-gray-300 px-1 py-1 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="flex flex-row mx-6 mb-6 gap-6">
          <p className="text-base text-secondary font-medium">English, Hindi</p>
        </div>
      </div>

      <MobDrawer
        open={open}
        onClose={setOpen}
        title="Preferred Language">
        <fieldset>
          <div className="relative w-full">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id={"head-search"}
              type={"text"}
              placeholder="Search for a language"
              // onClick={() => setOpen(true)}
              // readOnly
              className={
                "bg-white border text-sm border-gray-400 rounded-4xl w-full  h-10 pl-8 text-input-text placeholder:text-input-placeholder"
              }
            />
          </div>
          <div className="mt-6 space-y-6">
              {
                language.map((item,index)=>(
                  <div key={index} className="border-b flex flex-row items-center justify-between gap-2 py-3">
                    <label htmlFor={item.name} className="text-base text-secondary">{item.name}</label>
                    <input type="checkbox" checked={item.checked} name={item.name} className="text-black outline-gray-400" />
                  </div>
                ))
              }
          </div>
        </fieldset>
      </MobDrawer>
    </>
  );
}

export default MobLanguage;
