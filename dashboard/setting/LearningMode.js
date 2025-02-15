import React, { useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { Drawer } from "../../../components/ui-components";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Button } from "../../../components/ui-components";
import { checkIsMobile } from "../../../utils/helpers";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { updateSettings } from "../../../redux/settings/actionCreator";

// const learningMode = [
//   {
//     mode: "Online",
//     checked: true,
//   },
//   {
//     mode: "Classroom",
//     checked: false,
//   },
//   {
//     mode: "One On One",
//     checked: true,
//   },
// ];

function LearningMode({userSettings}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isMobile = checkIsMobile();
  const [learningModeData, setLearningModeData] = useState({
    classroom: userSettings?.learning_modes?.classroom || false,
    one_to_one: userSettings?.learning_modes?.one_to_one || false,
    online: userSettings?.learning_modes?.online || false,
  })
  // console.log("Learning mode userSettings: ", userSettings?.learning_modes);

  const selectedModes = Object.keys(learningModeData)
  .filter((mode) => learningModeData[mode])
  .join(", ");

  const handleCheckboxChange = (mode) => {
    setLearningModeData((prev) => ({
      ...prev,
      [mode]: !prev[mode],
    }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    // console.log("Learning mode Data:", learningModeData)
    let formState = {
      learning_modes: learningModeData
    }
    let response = await dispatch(updateSettings(formState));

    if(response && response.type === "SETTINGS_SUCCESS"){
      setOpen(false);
    }
  }

  return (
    <>
      <div
        className="w-full flex flex-row justify-between items-center md:items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        {isMobile ? (
          <>
            <div>
              <p className="text-lg text-primary">Preferred Learning Mode</p>
              <p className="text-sm text-gray-500">Online & One on One</p>
            </div>
            <div>
              <img src={rightArrow} alt="" />
            </div>
          </>
        ) : (
          <>
            <p className="text-base text-primary">Preferred Learning Mode</p>
            <div className="flex flex-row justify-center gap-2">
              <p className="text-base text-primary">{selectedModes}</p>
              <img src={rightArrow} alt="" />
            </div>
          </>
        )}
      </div>

      {isMobile ? (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
          <div className="fixed inset-0" style={{ background: "#00000040" }} />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pt-[80%]">
                <DialogPanel
                  transition
                  className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-y-full sm:duration-700 rounded-tr-2xl rounded-tl-2xl overflow-hidden">
                  <div className="w-full flex h-full flex-col overflow-y-auto bg-white  py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <DialogTitle>Preferred Learning Mode</DialogTitle>

                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <form className="flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-5 px-6 py-4">
                          {Object.keys(learningModeData).map((mode, index) => (
                            <div className="flex flex-row gap-4" key={mode}>
                              <div
                                className="flex h-6 shrink-0 items-center"
                                >
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    checked={learningModeData[mode]}
                                    id={mode}
                                    name={mode}
                                    type="checkbox"
                                    aria-describedby="comments-description"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="text-sm/6">
                                <label
                                  htmlFor="comments"
                                  className="text-base font-medium text-gray-900">
                                  {mode}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="submit"
                          color="primary"
                          variant="solid"
                          className="w-28 text-sm m-auto rounded-xl">
                          SAVE
                        </Button>
                      </form>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      ) : (
        <Drawer open={open} onClose={setOpen} title="Preferred Learning Mode">
          <form className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 px-6 py-4">
              {Object.keys(learningModeData).map((mode) => (
                <div className="flex flex-row gap-4" key={mode}>
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        checked={learningModeData[mode]}
                        id={mode}
                        name={mode}
                        type="checkbox"
                        onChange={() => handleCheckboxChange(mode)}
                        aria-describedby="comments-description"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:checked]:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label
                      htmlFor="comments"
                      className="text-base font-medium text-gray-900">
                      {mode}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              color="primary"
              variant="solid"
              className="w-48 text-sm m-auto my-6 rounded-xl">
              SAVE
            </Button>
          </form>
        </Drawer>
      )}
    </>
  );
}

export default LearningMode;
