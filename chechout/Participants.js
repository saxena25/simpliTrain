import React, { useState } from "react";
import {
  Checkbox,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import downArrow from "../../assets/svgs/downArrow.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { FloatingTextField } from "../../components/ui-components";

function Participants({ primaryParticipant, participants, setParticipants, OldParticipants, batchId }) {
  // console.log('participantsListparticipantsListparticipantsListparticipantsList', OldParticipants, primaryParticipant)
  const [participantsList, setParticipantsList] = useState([{...primaryParticipant}, ...OldParticipants]);
  const [errors, setErrors] = useState({});

  const loadPhoneCode = (status) => {
    if(status == 'tel'){
      return <select id="countries" className='h-[52px] w-20 mt-[1rem] p-3 bg-input-background text-base text-input-text placeholder-transparent border-0 appearance-none  focus:outline-none focus:ring-0 focus:border-0'>
        <option value={91}>+91</option>
        {/* <option>Canada</option>
        <option>France</option>
        <option>Germany</option> */}
      </select>
    }else{
      return null;
    }

  }

  const handleChange = (e, index) => {
    setErrors({});
    console.log('e, index', e, index);
    const participantsData = [...participantsList];
    participantsData[index] = {
      ...participantsData[index],
      [e.target.name]: e.target.value  
    }
    setParticipantsList([...participantsData]);
  }

  const actiontoAddParticipants = (event, pat) => {
    // console.log('pat', pat, event);
    if(event.target.checked){
      setParticipants([
        ...participants,
        {
          fullname: pat.name,
          mobile: pat.mobile,
          email: pat.email
        }
      ]);
    }else{
      const parts = participants.filter(el=> el.email.toLowerCase() != pat.email.toLowerCase());
      if(parts.length != participants){
        setParticipants([...parts]);
      }
    }
  }

  const addNewParticipant = () => {
    const lastPart = participantsList[participantsList.length-1];
    if(lastPart.name && lastPart.mobile && lastPart.email){
      const newUser = {
        id: participantsList.length+1,
        name:'',
        mobile:'',
        email:''
      }
      setParticipantsList([
        ...participantsList,
        newUser
      ]);
    }else{
      setErrors({
        ...errors,
        [participantsList.length-1]:{
          name:lastPart.name?'':'Name is Required',
          mobile:lastPart.mobile?'':'Mobile is Required',
          email:lastPart.email?'':'Email is Required'
        }
      });
    }
    
  }

  return (
    <div className="flex flex-col gap-2 py-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col md:gap-1">
          <h1 className="text-xl md:text-2xl text-secondary font-medium">
            Add Participants
          </h1>
          <p className="text-sm text-primary ">1 Participant added</p>
        </div>
        <button onClick={()=> addNewParticipant()} className="text-base text-primary border border-gray-400 px-2 rounded-full">
          + Add Participant
        </button>
      </div>
      <div className="border bg-white border-gray-300 overflow-hidden rounded-2xl">
        {console.log('participantsList', participantsList)}
        {
          participantsList.map((participant, index)=>(
            <div key={index} className="bg-white border-b border-gray-200 last:border-b-0">
              <Disclosure as="div" defaultOpen={true} className="">

                <div className="group p-4 flex w-full justify-between items-center gap-1 text-left text-gray-900">
                  <label htmlFor={participant.id} className="flex w-full justify-start items-center gap-3 cursor-pointer">
                    <input
                      id={participant.id}
                      name="participants[]"
                      value={participant.id}
                      type="checkbox"
                      onChange={(e)=> actiontoAddParticipants(e, participant)}
                      checked={participants.find(el=> el.email == participant.email)}
                      disabled={index == 0}
                      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black forced-colors:appearance-auto"
                    />
                    <span>{participant.name} {index == 0 ?'(You)':null}</span>
                  </label>
                  <DisclosureButton className="flex items-center justify-end w-full">
                    <img
                        src={downArrow}
                        aria-hidden="true"
                        alt=""
                        className="group-data-[open]:hidden"
                      />
                      <img
                        src={upArrow}
                        aria-hidden="true"
                        alt=""
                        className="group-[&:not([data-open])]:hidden"
                      />   
                  </DisclosureButton>
                </div>
                <DisclosurePanel as="div" className="pt-1 pl-10 pr-4 pb-4 flex flex-col gap-3 md:grid md:grid-cols-2">
                  <FloatingTextField
                    label="Full Name"
                    type="text"
                    value={participant.name}
                    onChange={(e)=> handleChange(e, index)}
                    name={"name"}
                    id={"name"}
                    error={errors[index]?.name}
                    // className="w-full max-w-xs py-0"
                  />

                  <FloatingTextField
                    prifix={loadPhoneCode('tel')}
                    label="Phone Number"
                    type={'tel'}
                    value={participant.mobile}
                    onChange={(e)=> handleChange(e, index)}
                    name={"mobile"}
                    id={"mobile"}
                    error={errors[index]?.mobile}
                    // placeholder="demo@gmail.com"
                  />

                  <FloatingTextField
                    label="Email"
                    type="email"
                    value={participant.email}
                    onChange={(e)=> handleChange(e, index)}
                    name={"email"}
                    id={"email"}
                    error={errors[index]?.email}
                    // className="w-full max-w-xs"
                  />
                </DisclosurePanel>
              </Disclosure>
            </div>
          ))
        }
        {/* <div className="bg-white px-7 py-5 border-b border-gray-200">
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full justify-between items-center gap-1 text-left text-gray-900">
              <fieldset>
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
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
                        className="text-base md:text-sm font-medium text-gray-900">
                        Ashish
                      </label>{" "}
                    </div>
                  </div>
                </div>
              </fieldset>

              <span className=" flex items-center">
                <img
                  src={downArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-data-[open]:hidden"
                />
                <img
                  src={upArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-[&:not([data-open])]:hidden"
                />
              </span>
            </DisclosureButton>
            <DisclosurePanel
              as="div"
              className="my-4 px-6 flex flex-col md:grid md:grid-cols-2">
              <FloatingTextField
                label="Full Name"
                type="text"
                value="Ashish"
                // onChange={handleChange}
                name={"fullName"}
                id={"fullName"}
                className="w-full max-w-xs py-0"
              />

              <div className="bg-input-background w-full md:max-w-xs rounded-xl h-16 mb-4 md:mb-0">
                <label
                  htmlFor="phone-number"
                  className="block text-xs text-[#262626] px-3 pt-2">
                  Phone number
                </label>
                <div className="">
                  <div className="flex rounded-md bg-input-background ">
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative border-r border-r-gray-200 my-1 ">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        aria-label="Country"
                        className="col-start-1 border-none bg-input-background rounded-bl-xl row-start-1 w-full appearance-none rounded-md py-1 pl-3 pr-7 text-base text-black  sm:text-sm/6 focus:ring-0">
                        <option>(+91)</option>
                        <option>(+01)</option>
                        <option>(+10)</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-[10px] size-5 md:size-7 self-center justify-self-end text-black font-medium sm:size-4"
                      />
                    </div>
                    <input
                      value="9898992231"
                      id="phone-number"
                      name="phone-number"
                      type="number"
                      placeholder="123-456-7890"
                      className="block bg-input-background rounded-br-xl border-none min-w-0 grow py-1.5 pl-4 pr-3  text-base text-black placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <FloatingTextField
                label="Email"
                type="email"
                value="rohan.jack@gmail.com"
                // onChange={handleChange}
                name={"email"}
                id={"email"}
                className="w-full max-w-xs"
              />
            </DisclosurePanel>
          </Disclosure>
        </div>
        <div className="bg-white px-7 py-5 rounded-bl-xl rounded-br-xl border-b border-gray-200">
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full justify-between items-center gap-1 text-left text-gray-900">
              <fieldset>
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          aria-describedby="comments-description"
                          className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
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
                        className="text-base md:text-sm font-medium text-gray-900">
                        Rohan Rajore
                      </label>{" "}
                    </div>
                  </div>
                </div>
              </fieldset>

              <span className=" flex items-center">
                <img
                  src={downArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-data-[open]:hidden"
                />
                <img
                  src={upArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-[&:not([data-open])]:hidden"
                />
              </span>
            </DisclosureButton>
            <DisclosurePanel
              as="div"
              className="my-4 px-6 flex flex-col md:grid md:grid-cols-2">
              <FloatingTextField
                label="Full Name"
                type="text"
                value="Rohan Rajore"
                // onChange={handleChange}
                name={"fullName"}
                id={"fullName"}
                className="w-full max-w-xs py-0"
              />

              <div className="bg-input-background w-full md:max-w-xs rounded-xl h-16 mb-4 md:mb-0">
                <label
                  htmlFor="phone-number"
                  className="block text-xs text-[#262626] px-3 pt-2">
                  Phone number
                </label>
                <div className="">
                  <div className="flex rounded-md bg-input-background ">
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative border-r border-r-gray-200 my-1 ">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country"
                        aria-label="Country"
                        className="col-start-1 border-none bg-input-background rounded-bl-xl row-start-1 w-full appearance-none rounded-md py-1 pl-3 pr-7 text-base text-black  sm:text-sm/6 focus:ring-0">
                        <option>(+91)</option>
                        <option>(+01)</option>
                        <option>(+10)</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-[10px] size-5 md:size-7 self-center justify-self-end text-black font-medium sm:size-4"
                      />
                    </div>
                    <input
                      value="9898992231"
                      id="phone-number"
                      name="phone-number"
                      type="number"
                      placeholder="123-456-7890"
                      className="block bg-input-background rounded-br-xl border-none min-w-0 grow py-1.5 pl-4 pr-3  text-base text-black placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <FloatingTextField
                label="Email"
                type="email"
                value="rohan.jack@gmail.com"
                // onChange={handleChange}
                name={"email"}
                id={"email"}
                className="w-full max-w-xs"
              />
            </DisclosurePanel>
          </Disclosure>
        </div> */}
      </div>
    </div>
  );
}

export default Participants;
