import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditPencilTwo } from "../../../components/icons";
import {
  Button,
  Drawer,
  EditableTagField,
  Spinner,
} from "../../../components/ui-components";

function Skills({ profile, skills }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  // console.log('profile', profile);
  //   console.log("profile :", profile.onboarding)
  const [userSkills, setUserSkills] = useState(
    profile?.onboarding[0]?.skills ? profile?.onboarding[0]?.skills : []
  );
  const [skillList, setSkillList] = useState(skills || []);

  const onFinish = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    console.log("userSkills: ", userSkills);
    //   let reponse = await dispatch(updateInterestedTopics({topics:userTopics}));
    // console.log("reponse", reponse);
    //   if(reponse && reponse.type === "PROFILE_SUCCESS"){
    //     setFormSubmit(false);
    //     setOpen(false);
    //   }else{
    //     setFormSubmit(false);
    //   }
  };

  const getSkillNames = () => {
    return userSkills.map((skill) => skill.skill?.name || "");
  };

  const handleSkillNameChange = (newValues) => {
    const updatedSkills = newValues.map((name, index) => ({
      ...userSkills[index],
      skill: { ...userSkills[index]?.skill, name },
    }));
    setUserSkills(updatedSkills);
  };

  const handleAddSuggestedSkill = (item) => {
    // Add the skill only if it is not already in userSkills
    if (!userSkills.some((skill) => skill.skill?.name === item.name)) {
      setUserSkills([...userSkills, { skill: { name: item.name } }]);
    }
  };

  const filteredSkillList = skillList.filter(
    (item) => !userSkills.some((skill) => skill.skill?.name === item.name)
  );

  return (
    <>
      <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">Skills</h3>
        <button
          className="border bg-white border-gray-200 px-2 py-2 rounded-full absolute right-4 top-6 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110"
          onClick={() => setOpen(true)}>
          <p className="text-base ml-2">Edit</p>
          <EditPencilTwo color="black" />
        </button>
        <div className="flex flex-row mx-6 mb-4 gap-4 flex-wrap">
          {profile?.onboarding.length > 0
            ? profile?.onboarding[0]?.skills.map((item, index) => (
                <button
                  key={index}
                  className="border border-gray-200 px-4 py-2 rounded-3xl hover:bg-gray-300 text-lg transform transition duration-300 hover:scale-110">
                  {item?.skill?.name}
                </button>
              ))
            : null}
          {/* {profile.learningGoals
            ? profile.learningGoals.map((topic, index) => (
                <button
                  key={index}
                  className="border border-gray-200 px-4 py-2 rounded-3xl hover:bg-gray-300 text-lg transform transition duration-300 hover:scale-110">
                  {topic}
                </button>
              ))
            : null} */}
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Skills">
        <div className="flex flex-col justify-between h-full">
          <div>
            <EditableTagField
              name={"topics"}
              id={"topics"}
              placeholder={"Enter Topics"}
              values={userSkills.map((skill) => skill.skill?.name || "")} //extract skill names
              onChange={handleSkillNameChange} //update skill names
            />
            <div className="flex flex-col gap-4 mt-4">
              <p className="text-base text-gray-500 font-medium">Suggested</p>
              <div className="flex flex-row flex-wrap gap-3">
                {filteredSkillList.map((item, idx) => (
                  <button
                    key={item.id}
                    className="flex flex-row gap-1 items-center border rounded-full px-3 py-1 text-sm"
                    onClick={() => handleAddSuggestedSkill(item)}>
                    <svg
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.40922 6.13464L5.40922 9.73029C5.40922 9.89107 5.35623 10.0208 5.25026 10.1195C5.14429 10.2181 5.01092 10.2674 4.85014 10.2674C4.68936 10.2674 4.55598 10.2145 4.45001 10.1085C4.34404 10.0025 4.29106 9.86915 4.29106 9.70837L4.29106 6.13464L0.695401 6.13464C0.534619 6.13464 0.403071 6.07982 0.300755 5.9702C0.19844 5.86058 0.147282 5.72537 0.147282 5.56459C0.147282 5.40381 0.200267 5.27044 0.306237 5.16447C0.412206 5.0585 0.545582 5.00551 0.706363 5.00551L4.29106 5.01647L4.29106 1.42082C4.29106 1.26004 4.34404 1.12666 4.45001 1.02069C4.55598 0.914722 4.68936 0.861737 4.85014 0.861737C5.01092 0.861737 5.14429 0.914722 5.25026 1.02069C5.35623 1.12666 5.40922 1.26004 5.40922 1.42082L5.40922 5.01647L9.00488 5.01647C9.16566 5.01647 9.29721 5.06763 9.39952 5.16995C9.50184 5.27226 9.55299 5.40381 9.55299 5.56459C9.55299 5.72537 9.50001 5.85875 9.39404 5.96472C9.28807 6.07069 9.15469 6.12367 8.99391 6.12367L5.40922 6.13464Z"
                        fill="black"
                        fill-opacity="0.5"
                      />
                    </svg>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={onFinish}
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

export default Skills;
