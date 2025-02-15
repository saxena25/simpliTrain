import React, { useEffect, useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import { Drawer } from "../../../components/ui-components";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";
import { useDispatch } from "react-redux";
import { updateSettings } from "../../../redux/settings/actionCreator";
import { notification, Space } from "antd";

function TimeZone({ timeZones = [], userSettings }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isMobile = checkIsMobile();
  const [AllTimeZones, setAllTimeZones] = useState(timeZones);
  const [selectedTimeZones, setSelectedTimeZones] = useState("");
  const [search, setSearch] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [timeZoneData, setTimeZoneData] = useState({
    timezone: userSettings?.timezone || {},
  });
  // console.log("timeZones userSettings Data: ", userSettings);

  const openNotificationWithIcon = (type, customMessage) => {
    api[type]({
      message: customMessage,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    console.log("searched: ", e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log("timeZone Id: ", id);
    setSelectedTimeZones(id);
  };

  const filteredTimeZones =
    AllTimeZones?.filter((timeZone) =>
      timeZone?.country?.toLowerCase().includes(search)
    ) || [];

  useEffect(() => {
    if (selectedTimeZones) {
      const updatedTimeZone = AllTimeZones.find((tz) => tz.id === selectedTimeZones);
      if (updatedTimeZone) {
        setTimeZoneData({ timezone: updatedTimeZone });
      } else {
        console.error("Updated TimeZone not found.");
        setTimeZoneData(null); // Reset `timeZoneData` if no valid time zone is found
      }
    }
  
    // if (selectedTimeZones) {
    //   const updatedTimeZone = AllTimeZones.find(
    //     (tz) => tz.id === selectedTimeZones
    //   );
    //   setTimeZoneData({ timezone: updatedTimeZone });
    // }
  }, [selectedTimeZones, AllTimeZones]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTimeZones) {
      openNotificationWithIcon("error", "Please Select a TimeZone First");
      // alert("Please Select a TimeZone First");
      return;
    }

    const formState = {
      timezoneId: selectedTimeZones,
    };

    console.log("formData timeZone: ", formState);

    let response = await dispatch(updateSettings(formState));

    if (response && response.type === "SETTINGS_SUCCESS") {
      setOpen(false);
      openNotificationWithIcon("success", "TimeZone Updated Successfully");

      const updatedTimeZone = AllTimeZones.find(
        (tz) => tz.id === selectedTimeZones
      );

      console.log("updated TimeZone: ", updatedTimeZone);
      userSettings.timezone = updatedTimeZone;
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
              <p className="text-lg text-primary">Time Zone</p>
              <p className="text-sm text-gray-500">
                {timeZoneData?.timezone?.country
                  ? `${timeZoneData.timezone.country} - GMT ${timeZoneData.timezone.gmt_offset}`
                  : "No Time Zone Selected"}
              </p>
            </div>
            <div>
              <img src={rightArrow} alt="" />
            </div>
          </>
        ) : (
          <>
            <p className="text-base text-primary">Time Zone</p>
            <div className="flex flex-row justify-center gap-2">
              <p className="text-base text-primary">
                {timeZoneData?.timezone?.country
                  ? `${timeZoneData.timezone.country} - GMT ${timeZoneData.timezone.gmt_offset}`
                  : "No Time Zone Selected"}
              </p>
              <img src={rightArrow} alt="" />
            </div>
          </>
        )}
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen} title="Time Zone">
          <form
            className="flex flex-col justify-between h-full"
            onSubmit={HandleSubmit}>
            <fieldset>
              <div className="relative w-full border border-gray-400 rounded-4xl max-w-md">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id={"head-search"}
                  type={"text"}
                  placeholder="Search Time Zone"
                  onChange={handleSearchChange}
                  // onClick={() => setOpen(true)}
                  // readOnly
                  className={
                    "bg-white border-none text-sm w-full max-w-md h-10 pl-8 text-input-text placeholder:text-input-placeholder"
                  }
                />
              </div>
              <div className="mt-6 space-y-4">
                {filteredTimeZones.map((ele, index) => (
                  <div
                    key={ele.id}
                    className="flex items-center w-full gap-6 overflow-y-auto">
                    <div className="w-full flex flex-row justify-between items-center">
                      <label
                        htmlFor={ele.id}
                        className="block text-lg font-normal text-gray-900">
                        {ele.country}
                      </label>
                      <span className="text-gray-500">
                        GMT {ele.gmt_offset}
                      </span>
                    </div>
                    <input
                      id={ele.id}
                      value={ele.country}
                      name="timeZone"
                      type="radio"
                      onChange={handleChange}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-gray-500 checked:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden mr-2"
                    />
                  </div>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              color="primary"
              variant="solid"
              className="w-48 text-sm m-auto my-6 rounded-xl">
              SAVE
            </button>
          </form>
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen} title="Time Zone">
          <form
            className="flex flex-col justify-between h-full"
            onSubmit={HandleSubmit}>
            <fieldset>
              <div className="relative w-full border border-gray-500 rounded-4xl max-w-md">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-2 top-2.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id={"head-search"}
                  type={"text"}
                  placeholder="Search Time Zone"
                  onChange={handleSearchChange}
                  // onClick={() => setOpen(true)}
                  // readOnly
                  className={
                    "bg-white border-none text-sm rounded-4xl w-full max-w-md h-10 pl-8 text-input-text placeholder:text-input-placeholder"
                  }
                />
              </div>
              <div className="mt-6 space-y-6">
                {filteredTimeZones.map((ele, index) => (
                  <div
                    key={ele.id}
                    className="flex items-center w-[70%] gap-6 overflow-y-auto">
                    <div className="w-full flex flex-row justify-between items-center">
                      <label
                        htmlFor={ele.id}
                        className="ml-3 block text-lg font-medium text-gray-900">
                        {ele?.country}
                      </label>
                      <span className="text-primary">
                        GMT {ele?.gmt_offset}
                      </span>
                    </div>
                    <input
                      id={ele.id}
                      name="timeZone"
                      type="radio"
                      value={ele.country}
                      onChange={handleChange}
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-gray-500 checked:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden mr-2"
                    />
                  </div>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              color="primary"
              variant="solid"
              className="w-48 text-sm m-auto my-6 py-4 bg-[#333333] text-white rounded-xl">
              SAVE
            </button>
          </form>
        </Drawer>
      )}
    </>
  );
}

export default TimeZone;
