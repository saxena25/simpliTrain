import React from "react";
import { useState } from "react";
import rightArrow from "../../../assets/svgs/rightArrow.svg";
import {
  Button,
  Drawer,
  DropDownField,
} from "../../../components/ui-components";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { checkIsMobile } from "../../../utils/helpers";
import MobDrawer from "../../../components/ui-components/MobDrawer";
import { useDispatch } from "react-redux";
import { updateSettings } from "../../../redux/settings/actionCreator";
import { message } from "antd";

const notificationData = [
  { title: "Push Notification", checked: true },
  { title: "Receive Email" },
  { title: "Course Updates", checked: true },
  { title: "Assignments" },
  { title: "Messages" },
  { title: "Announcements" },
  { title: "Promotions" },
  { title: "News & Platform Updates" },
];


function SettingNotification({ userSettings }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isMobile = checkIsMobile();
  const [enabled, setEnabled] = useState(false);
  const [State, setState] = useState({
    course_update: {
      course_dates_times:
        userSettings?.notification?.course_update?.course_dates_times || false,
      course_cancellations:
        userSettings?.notification?.course_update?.course_cancellations ||
        false,
      new_batch_announcements:
        userSettings?.notification?.course_update?.new_batch_announcements ||
        false,
    },
    assignment_tasks: {
      instructor_feedback:
        userSettings?.notification?.assignment_tasks?.instructor_feedback ||
        false,
      submission_deadlines:
        userSettings?.notification?.assignment_tasks?.submission_deadlines ||
        false,
    },
    messages: {
      forum_replies:
        userSettings?.notification?.messages?.forum_replies || false,
      messages_instructors_peers:
        userSettings?.notification?.messages?.messages_instructors_peers || false,
    },
    offers_promotions:{
      discount_promotional_offers: userSettings?.notification?.offers_promotions?.discount_promotional_offers || false,
    },
    email_sms_push:{
      do_not_disturb: userSettings?.notification?.email_sms_push?.do_not_disturb || false,
      sms_notification: userSettings?.notification?.email_sms_push?.sms_notification || false,
      push_notification: userSettings?.notification?.email_sms_push?.push_notification || false,
      email_notification: userSettings?.notification?.email_sms_push?.email_notification || false,
    }
  });

  
  // console.log("Settings Notifications: ", userSettings.notification);

  const handleChange = async (group, fieldName, newValue) => {
    setState((prevState) => {
      const updatedGroup = {
        ...prevState[group],
        [fieldName]: newValue,
      };
      const updatedState ={
        ...prevState,
        [group]: updatedGroup
      }
      handleUpdate(group,updatedGroup);
      return updatedState;
    });
  };

  const handleUpdate = async (group, updatedGroup) => {
    let formState = {
      notification: {
        ...State,
        [group]: updatedGroup,
      },
    };

    try {
      let response = await dispatch(updateSettings(formState));
    } catch (error) {
      console.log("Error Updating Notifications", error);
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-row justify-between items-start transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer mt-4 md:mt-8 border-b pb-4 md:border-none md:pb-0"
        onClick={() => setOpen(true)}>
        <div className="w-full flex flex-row justify-between gap-2">
          <p className="text-base text-primary">Notifications</p>
          <img src={rightArrow} alt="" />
        </div>
      </div>

      {isMobile ? (
        <MobDrawer open={open} onClose={setOpen} title="Notifications">
          <form
            action=""
            className="w-full flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4">
              {notificationData.map((item, index) => (
                <div className="flex flex-row justify-between gap-4 border-b pb-4">
                  <p className="text-lg text-primary">{item.title}</p>
                  <Switch
                    checked={item.checked}
                    onChange={(checked) =>
                      setState({
                        ...State,
                        upcomingCourseDates: checked,
                      })
                    }
                    className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                    />
                  </Switch>
                </div>
              ))}
            </div>
          </form>
        </MobDrawer>
      ) : (
        <Drawer open={open} onClose={setOpen} title="Notifications">
          <form
            action=""
            className="w-full flex flex-col justify-between h-full">
            <div className="flex flex-col gap-4 max-w-full">
              {/* Course Updates */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-6 font-semibold text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-base">
                    Courses Updates
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="relative right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="flex flex-col gap-4 px-4 py-4">
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Upcoming course dates and times
                        </p>
                        <Switch
                          checked={State.course_update.course_dates_times}
                          onChange={(newValue) =>
                            handleChange("course_update","course_dates_times", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Cancellations or rescheduling
                        </p>
                        <Switch
                          checked={State.course_update.course_cancellations}
                          onChange={(newValue) =>
                            handleChange("course_update","course_cancellations", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          New batch announcements
                        </p>
                        <Switch
                          checked={State.course_update.new_batch_announcements}
                          onChange={(newValue) =>
                            handleChange("course_update","new_batch_announcements", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              {/* Assignment / Task Notifications */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-6 font-semibold text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-base">
                    Assignment / Task Notifications
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="relative right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="py-1 flex flex-col gap-4 px-4 py-4">
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Submission Deadlines
                        </p>
                        <Switch
                          checked={State.assignment_tasks.submission_deadlines}
                          onChange={(newValue) =>
                            handleChange("assignment_tasks","submission_deadlines", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Instructor feedback
                        </p>
                        <Switch
                          checked={State.assignment_tasks.instructor_feedback}
                          onChange={(newValue) =>
                            handleChange("assignment_tasks","instructor_feedback", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              {/* Messages */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-6 font-semibold text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-base">
                    Messages
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="relative right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="py-1 flex flex-col gap-4 px-4 py-4">
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Messages from instructors or peers
                        </p>
                        <Switch
                          checked={State.messages.messages_instructors_peers}
                          onChange={(newValue) =>
                            handleChange("messages","messages_instructors_peers", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Replies to forums or discussions
                        </p>
                        <Switch
                          checked={State.messages.forum_replies}
                          onChange={(newValue) =>
                            handleChange("messages","forum_replies", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              {/* Offers & Promotions */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-6 font-semibold text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-base">
                    Offers & Promotions
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="relative right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="py-1 flex flex-col gap-4 px-4 py-4">
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Upcoming course dates and times
                        </p>
                        <Switch
                          checked={State.offers_promotions.discount_promotional_offers}
                          onChange={(newValue) =>
                            handleChange("offers_promotions","discount_promotional_offers", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              {/* Email, SMS & Push Notifications */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-between gap-x-1.5 rounded-xl bg-white px-3 py-6 font-semibold text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-base">
                    Email, SMS & Push Notifications
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 size-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="relative right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="py-1 flex flex-col gap-4 px-4 py-4">
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                        Email Notification
                        </p>
                        <Switch
                          checked={State.email_sms_push.email_notification}
                          onChange={(newValue) =>
                            handleChange("email_sms_push","email_notification", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                        SMS Notification
                        </p>
                        <Switch
                          checked={State.email_sms_push.sms_notification}
                          onChange={(newValue) =>
                            handleChange("email_sms_push","sms_notification", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                        Push notifications
                        </p>
                        <Switch
                          checked={State.email_sms_push.push_notification}
                          onChange={(newValue) =>
                            handleChange("email_sms_push","push_notification", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className="max-w-96 flex flex-row justify-between gap-4">
                        <p className="text-sm text-primary">
                          Do Not Disturb
                        </p>
                        <Switch
                          checked={State.email_sms_push.do_not_disturb}
                          onChange={(newValue) =>
                            handleChange("email_sms_push","do_not_disturb", newValue)
                          }
                          className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none  data-[checked]:bg-black">
                          <span className="sr-only">Use setting</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
                          />
                        </Switch>
                      </div>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </form>
        </Drawer>
      )}
    </>
  );
}

export default SettingNotification;
