import React, { useEffect, useRef, useState } from "react";
// import { EditPencil } from "../../../components/icons";
import { EditPencilTwo } from "../../../components/icons";
// import userCircle from "../../../assets/svgs/userCircle.svg";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import Bio from "./Bio";
import Language from "./Language";
import Topics from "./Topics";
import SocialMedia from "./SocialMedia";
import ProfileCard from "./ProfileCard";
import Education from "./Education";
import WorkExperience from "./WorkExprience";
import { Container } from "../../../components/ui-components";
import { checkIsMobile } from "../../../utils/helpers";
import MobProfile from "./mobileProfile";
import { getProfile } from "../../../redux/profile/actionCreator";
import { useLoaderData } from "react-router-dom";
import store from "../../../redux/store";
import {
  getCountries,
  getDegrees,
  getEmploymentType,
  getGoals,
  getIndustries,
  getLanguages,
  getLearningMode,
  getSkills,
} from "../../../redux/master_data/actionCreator";
import { useSelector } from "react-redux";
import { getEducations } from "../../../redux/educations/actionCreator";
import { getWorkExprience } from "../../../redux/work_exprience/actionCreator";
import Skills from "./Skills";
import LearningMode from "./LearningMode";
import Goals from "./Goals";

const getMyProfile = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getProfile());
    if (response && response.type == "PROFILE_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getEducationList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getEducations());
    if (response && response.type == "EDUCATIONS_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getWorkExprienceList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getWorkExprience());
    if (response && response.type == "WORK_EXPRIENCE_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const getDegreesList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getDegrees());
    if (response && response.type == "MASTER_DATA_SUCCESS") {
      const dd = response.data.map((item) => {
        return {
          key: item.id,
          value: item.name,
        };
      });
      resolve(dd);
    } else {
      resolve([]);
    }
  });
};

const getEmploymentTypeList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getEmploymentType());
    if (response && response.type == "MASTER_DATA_SUCCESS") {
      const dd = response.data.map((item) => {
        return {
          key: item.id,
          value: item.name,
        };
      });
      resolve(dd);
    } else {
      resolve([]);
    }
  });
};

const getIndustriesList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getIndustries());
    if (response && response.type == "MASTER_DATA_SUCCESS") {
      const dd = response.data.map((item) => {
        return {
          key: item.id,
          value: item.name,
        };
      });
      resolve(dd);
    } else {
      resolve([]);
    }
  });
};

const getCountriesList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getCountries());
    if (response && response.type == "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const skillList = () => {
  return new Promise(async (resolve, reject) => {
    const response = await store.dispatch(getSkills());
    if (response && response.type === "MASTER_DATA_SUCCESS") {
      resolve(response.data);
    } else {
      resolve([]);
    }
  });
};

const languageList = () =>{
  return new Promise(async (resolve, reject)=>{
    const response = await store.dispatch(getLanguages());
    if(response && response.type === "MASTER_DATA_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([])
    }
  })
}

const learningMode = () =>{
  return new Promise (async(resolve, reject)=>{
    const response = await store.dispatch(getLearningMode());
    if(response && response.type === "MASTER_DATA_SUCCESS"){
      resolve(response.data);
    } else{
      resolve([])
    }
  })
}

const goalsData = ()=>{
  return new Promise (async(resolve, reject)=>{
    const response = await store.dispatch(getGoals());
    if(response && response.type === "MASTER_DATA_SUCCESS"){
      resolve(response.data);
    }else{
      resolve([]);
    }
  })
}

export async function myProfileLoader() {
  const profile = await getMyProfile();
  const countries = await getCountriesList();
  const degrees = await getDegreesList();
  const educations = await getEducationList();
  const workExpriences = await getWorkExprienceList();
  const industries = await getIndustriesList();
  const employmentTypes = await getEmploymentTypeList();
  const skills = await skillList();
  const languages = await languageList();
  const learningModes = await learningMode();
  const goals = await goalsData();

  return {
    date: new Date().toISOString(),
    profile: profile,
    countries: countries,
    degrees: degrees,
    educations: educations,
    workExpriences: workExpriences,
    industries: industries,
    employmentTypes: employmentTypes,
    skills: skills,
    languages: languages,
    learningModes: learningModes,
    goals: goals
  };
}

// getProfile
const MyProfile = () => {
  const isMobile = checkIsMobile();
  let loaderData = useLoaderData();
  let educationRef = useRef();
  let workExprienceRef = useRef();
  const preferencesRef = useRef();
  const { myProfile, workExpriences, educations } = useSelector((state) => {
    return {
      myProfile: state.myProfile.data,
      workExpriences: state.workExprience.data,
      educations: state.educations.data,
    };
  });
  const [image, setImage] = useState(myProfile?.bannerImage || null);
  // console.log("from MyProfile Component: ", myProfile)
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({top: 70, behavior: "smooth" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;
        setImage(imageData);
        let formData = {
          bannerImage: imageData,
        };

        // let response = await dispatch(updateProfilePhoto(formData));
        // console.log("response :", response);
        // if(response && response.type === 'PROFILE_SUCCESS'){
        //   setImage(response.data.profileImage);
        // }else{
        //   console.log("unable to upload image")
        // }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileUploadInput").click();
  };

  return (
    <>
      {isMobile ? (
        <MobProfile />
      ) : (
        <div className="w-full bg-gray-6 relative">
          <div className="bg-[#D9D9D9] absolute h-60 w-full top-0 left-0 z-0">
            <img src={image} alt="Banner" />
            <button className="border border-gray-400 px-2 py-2 rounded-full absolute right-8 top-4 w-14 flex justify-center items-center">
              <EditPencilTwo color="black" />
            </button>
          </div>
          {/* Profile Section */}
          <div className="w-full mt-36 relative">
            <Container>
              <div className="flex flex-row justify-start items-start gap-6">
                <div className="flex w-64 pt-12 sticky top-12">
                  {/* Profile Card */}
                  <ProfileCard
                    profile={myProfile}
                    scrollToEducation={() => scrollToSection(educationRef)}
                    scrollToWorkExprience={() =>
                      scrollToSection(workExprienceRef)
                    }
                    scrollToPreferences={() =>
                      scrollToSection(preferencesRef)
                    }
                  />
                </div>
                <div className="flex flex-col w-full mb-8">
                  <h3 className="font-semibold h-12 text-lg">Profile</h3>
                  <div className="profile-info-card bg-white px-4 py-4 rounded-xl">
                    {/* personal Information */}
                    <PersonalInfo
                      profile={myProfile}
                      countries={loaderData.countries}
                    />

                    {/* Contact Information */}
                    <ContactInfo profile={myProfile} />

                    {/* Bio */}
                    <Bio profile={myProfile} />

                    {/* skills */}
                    <Skills profile={myProfile} skills={loaderData.skills} />
                    {/* <Topics profile={myProfile} /> */}

                    {/* Social Media */}
                    <SocialMedia profile={myProfile} />
                  </div>

                  {/* Preferences */}
                  <div className="flex flex-col w-full my-6" ref={preferencesRef}>
                    <h3 className="font-semibold h-12 text-lg">Preferences</h3>
                    <div className="profile-info-card bg-white px-4 py-4 rounded-xl">
                      {/* Preferred Language */}
                      <Language profile={myProfile} languages={loaderData.languages} />

                      {/* topics */}
                      <Topics profile={myProfile} />

                      {/* learning Mode */}
                      <LearningMode profile={myProfile} learningModes={loaderData.learningModes} />

                      {/* goals */}
                      <Goals profile={myProfile} goals={loaderData.goals} />
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="my-5" ref={educationRef}>
                    <Education
                      educations={educations}
                      degrees={loaderData.degrees}
                    />
                  </div>
                  {/* Work Experience Section */}
                  <div className="my-5" ref={workExprienceRef}>
                    <WorkExperience
                      workExpriences={workExpriences}
                      industries={loaderData.industries}
                      employmentTypes={loaderData.employmentTypes}
                    />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfile;
