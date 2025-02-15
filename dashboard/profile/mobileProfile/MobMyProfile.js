import React from "react";
import MobPersonalInfo from "./MobPersonalInfo";
import MobContainer from "../../../../components/ui-components/MobContainer";
import MobContactInfo from "./MobContactInfo";
import MobBio from "./MobBio";
import MobLanguage from "./MobLanguage";
import MobTopics from "./MobTopics";
import MobSocial from "./MobSocial";
import MobEducation from "./MobEducation";
import MobExperince from "./MobExperince";
import { useLoaderData, useNavigate } from "react-router-dom";
import reviewLeftArrow from "../../../../assets/svgs/reviewLeftArrow.svg";
import { getProfile } from "../../../../redux/profile/actionCreator";
import store from "../../../../redux/store";
import { getEducations } from "../../../../redux/educations/actionCreator";
import { getWorkExprience } from "../../../../redux/work_exprience/actionCreator";
import { getCountries, getDegrees, getEmploymentType, getIndustries } from "../../../../redux/master_data/actionCreator";
import { useSelector } from "react-redux";

const getMyProfile = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getProfile());
    if(responce && responce.type == 'PROFILE_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const getEducationList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getEducations());
    if(responce && responce.type == 'EDUCATIONS_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const getWorkExprienceList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getWorkExprience());
    if(responce && responce.type == 'WORK_EXPRIENCE_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

const getDegreesList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getDegrees());
    if(responce && responce.type == 'MASTER_DATA_SUCCESS'){
      const dd = responce.data.map((item)=>{
        return {
          key: item.id,
          value: item.name
        }
      });
      resolve(dd);
    }else{
      resolve([]);
    }
  })
}

const getEmploymentTypeList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getEmploymentType());
    if(responce && responce.type == 'MASTER_DATA_SUCCESS'){
      const dd = responce.data.map((item)=>{
        return {
          key: item.id,
          value: item.name
        }
      });
      resolve(dd);
    }else{
      resolve([]);
    }
  })
}

const getIndustriesList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getIndustries());
    if(responce && responce.type == 'MASTER_DATA_SUCCESS'){
      const dd = responce.data.map((item)=>{
        return {
          key: item.id,
          value: item.name
        }
      });
      resolve(dd);
    }else{
      resolve([]);
    }
  })
}

const getCountriesList = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getCountries());
    if(responce && responce.type == 'MASTER_DATA_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}

export async function MobMyProfileLoader() {
  const profile = await getMyProfile();
  const countries = await getCountriesList();
  const degrees = await getDegreesList();
  const educations = await getEducationList();
  const workExpriences = await getWorkExprienceList();
  const industries = await getIndustriesList();
  const employmentTypes = await getEmploymentTypeList();
  
  return {
    date: new Date().toISOString(),
    profile: profile,
    countries:countries,
    degrees:degrees,
    educations:educations,
    workExpriences:workExpriences,
    industries:industries,
    employmentTypes:employmentTypes
  };
}

function MobMyProfile() {
  const navigate = useNavigate();
  let loaderData = useLoaderData();
  const { myProfile, workExpriences, educations } = useSelector((state)=> {
    return {
      myProfile: state.myProfile.data,
      workExpriences: state.workExprience.data,
      educations: state.educations.data 
    }
  });

  return (
    <MobContainer className="bg-gray-100 py-16 flex flex-col gap-4">
      <div className="absolute top-4 border left-4 bg-white rounded-full p-2" onClick={()=>navigate("/dashboard")}>
          <img src={reviewLeftArrow} alt="" />
        </div>
      <h1 className="text-3xl font-semibold text-[#262626] py-4">Profile</h1>
      <MobPersonalInfo profile={myProfile} countries={loaderData.countries} />
      <MobContactInfo profile={myProfile} />
      <MobBio profile={myProfile} />
      {/* <MobLanguage /> */}
      <MobTopics profile={myProfile} />
      <MobSocial profile={myProfile} />
      <MobEducation educations={educations} degrees={loaderData.degrees} />
      <MobExperince workExpriences={workExpriences} industries={loaderData.industries} employmentTypes={loaderData.employmentTypes} />
    </MobContainer>
  );
}

export default MobMyProfile;
