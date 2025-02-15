import React, { useEffect, useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { Drawer } from "../../../components/ui-components";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";
import { useDispatch } from "react-redux";
import { updateSettings } from "../../../redux/settings/actionCreator";
import { notification, Space } from "antd";

function Language({ languages = [], userSettings = {languages: []} }) {
  const [open, setOpen] = useState(false);
  const isMobile = checkIsMobile();
  const dispatch = useDispatch();
  const [AllLanguages, setAllLanguages] = useState(languages);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [limitMessage, setLimitMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [languagesData, setLanguagesData] = useState({
    language: userSettings?.languages?.map((language) => language.name) || [],
  });
  // console.log("languages userSettings Data: ", userSettings);
  const openNotificationWithIcon = (type, customMessage) => {
    api[type]({
      message: customMessage,
    });
  };

  // console.log("From Languages fc:", languages);
  // console.log("AllLanguages", AllLanguages);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    console.log("searched: ", e.target.value);
  };

  const handleSelectedLanguages = (event) => {
    const languageId = event.target.value;
    if (event.target.checked) {
      if (selectedLanguages.length < 3) {
        setSelectedLanguages((prev) => [...prev, languageId]);
        setLimitMessage(false);
      } else {
        setLimitMessage(true);
      }
    } else {
      setLimitMessage(false);
      setSelectedLanguages((prev) =>
        prev.filter((id) => id !== languageId)
      );
    }
  };

  const filteredLanguage = AllLanguages?.filter((language) =>
    language.name?.toLowerCase().includes(search)
  ) || [];

  const onFinish = async (e) => {
    e.preventDefault();
    if (selectedLanguages.length === 0) {
      // alert("Please select at least one language")
      openNotificationWithIcon("error", "Please Select At least One Language");
      return;
    }

    const formState = {
      languageIds: selectedLanguages,
    };

    console.log("FormData onSubmit: ", formState);

    let response = await dispatch(updateSettings(formState));

    if (response && response.type === "SETTINGS_SUCCESS") {
      setOpen(false);
      openNotificationWithIcon("success", "Language Updated Successfully");

      const updatedLanguages = AllLanguages.filter((language)=>selectedLanguages.includes(language.id));

      setLanguagesData({language: updatedLanguages.map((lang) => lang.name)});

      userSettings.languages = updatedLanguages;
    }
  };

  return (
    <>
      {contextHolder}
      <div
        className="w-full flex flex-row justify-between items-center md:items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        {isMobile ? (
          <>
            <div>
              <p className="text-lg text-primary">Language Preference</p>
              <p className="text-sm text-gray-500 flex flex-row gap-1">
                {/* {userSettings?.languages.map((languages) => (
                  <p className="text-base text-primary">{languages.name}</p>
                ))} */}
              </p>
            </div>
            <div>
              <img src={rightArrow} alt="" />
            </div>
          </>
        ) : (
          <>
            <p className="text-base text-primary">Language Preference</p>
            <div className="flex flex-row justify-center gap-2">
              <div className="text-base text-primary flex flex-row gap-1">
                {/* {userSettings?.languages.map((lang,index) => (
                  <p className="text-base text-primary" key={index}>{lang.name}</p>
                ))} */}
                {languagesData.language?.map((languages, index) => (
                  <p className="text-base text-primary" key={index}>{languages}</p>
                ))}
              </div>
              <img src={rightArrow} alt="" />
            </div>
          </>
        )}
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen} title="Language Preference">
          <div className="flex flex-col justify-between h-full">
            <fieldset>
              <div className="relative w-full">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id={"head-search"}
                  type={"text"}
                  placeholder="Search language"
                  // onClick={() => setOpen(true)}
                  // readOnly
                  className={
                    "bg-white border text-sm border-gray-400 rounded-4xl w-full max-w-md h-10 pl-8 text-input-text placeholder:text-input-placeholder"
                  }
                />
              </div>
              <div className="mt-6 space-y-5">
                {filteredLanguage.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      id={item.id}
                      name="language"
                      value={item.name}
                      type="checkbox"
                      onChange={handleSelectedLanguages}
                      checked={selectedLanguages.includes(item.name)}
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <label
                      htmlFor={item.id}
                      className="ml-3 block text-lg font-medium text-gray-900">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              color="primary"
              variant="solid"
              className="w-48 text-sm m-auto my-6 rounded-xl">
              ADD
            </button>
          </div>
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen} title="Language Preference">
          <form
            onSubmit={onFinish}
            className="flex flex-col justify-between h-full w-full">
            <fieldset>
              <p
                className={`${
                  limitMessage ? "text-red-500" : "text-gray-500"
                } text-xs mb-1`}>
                {limitMessage
                  ? "! You can select maximum 3 languages"
                  : "Max 3 selected Languages*"}
              </p>
              <div className="relative border border-gray-400 max-w-md w-full rounded-4xl">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id={"head-search"}
                  type={"text"}
                  placeholder="Search language"
                  onChange={handleSearchChange}
                  // readOnly
                  className={
                    "bg-white border-none text-sm  rounded-4xl w-full max-w-md h-10 pl-8 text-input-text placeholder:text-input-placeholder"
                  }
                />
              </div>
              <div className="mt-6 space-y-6">
                {filteredLanguage.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      id={item.id}
                      name="language"
                      value={item.id}
                      type="checkbox"
                      onChange={handleSelectedLanguages}
                      checked={selectedLanguages.includes(item.id)}
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <label
                      htmlFor={item.id}
                      className="ml-3 block text-lg font-medium text-gray-900">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              color="primary"
              variant="solid"
              className="w-48 text-sm m-auto my-6 py-4 rounded-xl bg-[#333333] text-white">
              ADD
            </button>
          </form>
        </Drawer>
      )}
    </>
  );
}

export default Language;
