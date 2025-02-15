import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Container } from "../../../components/ui-components";
import Language from "./Language";
import TimeZone from "./TimeZone";
import LearningMode from "./LearningMode";
import SettingNotification from "./SettingNotification";
import Reminder from "./Reminder";
import Payment from "./Payment";
import Password from "./Password";
import Security from "./Security";
import DeleteAC from "./DeleteAC";
import { checkIsMobile } from "../../../utils/helpers";
import reviewLeftArrow from "../../../assets/svgs/reviewLeftArrow.svg";
import {
  getLanguages,
  getTimezones,
} from "../../../redux/master_data/actionCreator";
import store from "../../../redux/store";
import { getUserSettings } from "../../../redux/settings/actionCreator";
import { useSelector } from "react-redux";
import { getProfile } from "../../../redux/profile/actionCreator";
// import DashboardLayout from '../dashboard';

const getMyProfile = () => {
  return new Promise(async(resolve, reject)=>{
    const response = await store.dispatch(getProfile());
    if(response && response.type === 'PROFILE_SUCCESS'){
      resolve(response.data);
    }else{
      resolve([]);
    }
  })
}

const getSettingsData = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getUserSettings());
    // console.log("setting 1: ",response.data);
    if (response && response.type === "SETTINGS_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getLanguagesSettings = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getLanguages());
    // console.log("Language 1: ",response.data);
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getTimeZoneSettings = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getTimezones());
    // console.log("TimeZone 1: ",response.data);
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

// Pending
const getLearningModesSettings = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getUserSettings());
    // console.log("Learning Modes 1: ",response.data);
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

// Notifications pending
const getNotificationsSettings = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getUserSettings());
    // console.log("Notifications 1: ",response.data);
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

// reminders pending
const getReminderSettings = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getUserSettings());
    // console.log("Reminders 1: ",response.data);
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

//

export async function settingLoader() {
  const languages = await getLanguagesSettings();
  const settings = await getSettingsData();
  const timeZones = await getTimeZoneSettings();
  const learningModes = await getLearningModesSettings();
  const notifications = await getNotificationsSettings();
  const reminders = await getReminderSettings();
  const profile = await getMyProfile();
  // console.log("loader Data 2: ", learningModes);
  return {
    date: new Date().toISOString(),
    languages: languages,
    setting: settings,
    timeZones: timeZones,
    learningModes: learningModes,
    notifications: notifications,
    reminders: reminders,
    profile: profile,
  };
}

function Setting() {
  const data = useLoaderData();
  const isMobile = checkIsMobile();
  const navigate = useNavigate();
  const [allLanguages, setAllLanguages] = useState(data.languages);
  const [timeZones, setTimeZones] = useState(data.timeZones);


  const myProfile = useSelector((state) => state.myProfile.data);
  const userSettings = useSelector((state)=> state.userSettings.data);
  // console.log("Setting Root Reducer Data: ",userSettings)

  return (
    <section className="py-6 w-full">
      <Container>
        {isMobile && (
          <button onClick={() => navigate("/dashboard")} className="pb-5">
            <img
              src={reviewLeftArrow}
              alt=""
              className="py-2 px-2 bg-gray-100 rounded-full"
            />
          </button>
        )}
        <h1 className="text-3xl md:text-2xl font-semibold text-secondary">
          Settings
        </h1>
        <div className="w-full max-w-xl flex flex-col  md:gap-4">
          <Language languages={allLanguages} userSettings={userSettings} />
          <TimeZone timeZones={timeZones} userSettings={userSettings} />
          <LearningMode userSettings={userSettings} />
          <SettingNotification userSettings={userSettings} />
          <Reminder userSettings={userSettings} />
          <Payment />
          <Password myProfile={myProfile} />
          <DeleteAC />
          {/* <Security /> */}
        </div>
      </Container>
    </section>
  );
}

export default Setting;
