import React from "react";
import { EditPencilTwo } from "../../../components/icons";
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button, Drawer, Spinner } from "../../../components/ui-components";

function LearningMode({ profile, learningModes }) {
  const [open, setOpen] = useState(false);
  const [learningModeData, setLearningModeData] = useState(learningModes || []);
  const [search, setSearch] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    // console.log("searched: ", e.target.value);
  };

  const filteredLearningModes =
    learningModeData?.filter((item) =>
      item?.name?.toLowerCase().includes(search)
    ) || [];

  return (
    <>
      <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-6 font-semibold">Learning Mode</h3>
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-5 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="flex flex-row mx-6 mb-4 gap-6">
          <button className="border border-gray-200 px-3 py-1 rounded-3xl hover:bg-gray-300 text-lg transform transition duration-300 hover:scale-110">
            English
          </button>
          <button className="border border-gray-200 px-4 py-1 rounded-3xl hover:bg-gray-300  text-lg transform transition duration-300 hover:scale-110">
            Hindi
          </button>
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Preferred Language">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="relative w-full">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <div className="border border-gray-400 rounded-4xl max-w-md w-full">
                <input
                  id={"head-search"}
                  type={"text"}
                  placeholder="Search language"
                  onChange={handleSearchChange}
                  // readOnly
                  className={
                    "bg-white border-none text-sm border-gray-400 rounded-4xl w-full max-w-md h-10 pl-8 text-input-text placeholder:text-input-placeholder"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {filteredLearningModes.map((item) => (
                <div key={item.id} className="flex items-center">
                  <input
                    id={item.id}
                    name="language"
                    type="checkbox"
                    value={item.id}
                    className="text-black rounded-sm"
                  />
                  <label
                    htmlFor={item.id}
                    className="ml-3 block text-base text-gray-900">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            // onClick={onFinish}
            color="primary"
            variant="solid"
            className={`my-4 m-auto text-2xl ${formSubmit ? "w-20" : "w-52"}`}
            rounded={formSubmit ? true : false}>
            {formSubmit ? <Spinner className={""} color={"white"} /> : "SAVE"}
          </Button>
        </div>
      </Drawer>
    </>
  );
}

export default LearningMode;
