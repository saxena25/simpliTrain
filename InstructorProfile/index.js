import React from "react";
import {
  Button,
  Container,
  EditableTagField,
} from "../../components/ui-components";
import bell from "../../assets/svgs/bell.svg";
import verified from "../../assets/svgs/verified.svg";
import heart from "../../assets/svgs/heart.svg";
import inBox from "../../assets/svgs/inBox.svg";
import InstructorInfo from "./InstructorInfo";
import NotifyMe from "./NotifyMe";
import Reviews from "./Reviews";
import SimilarInstructor from "./SimilarInstructor";
import NewsLetter from "./NewsLetter";
import MyCourses from "./MyCourses";
import ExpertIn from "./ExpertIn";
import TeachingLanguage from "./TeachingLanguage";
import InstructorEducation from "./InstructorEducation";
import InstructorExperience from "./InstructorExperience";
import { getInstructorProfileById , getSimilarInstructorById , getInstructorCoursesById , getInstructorReviewById } from "../../redux/instructor_profile/actionCreator";
import { useLoaderData, useNavigate } from "react-router-dom";
import store from "../../redux/store";


const getInstructorDetails = (profile) => {
  return new Promise(async(resolve, reject)=>{
    if(profile){
      const responce = await store.dispatch(getInstructorProfileById({profile:profile}));
      if(responce && responce.type == 'PROFILE_SUCCESS'){
        resolve(responce.data);
      }else{
        resolve({});
      }
    }else{
      resolve({});
    }
  })
}

const getSimilarInstructor = (profile) => {
  return new Promise(async(resolve, reject)=>{
    if(profile){
      const responce = await store.dispatch(getSimilarInstructorById({profile:profile}));
      if(responce && responce.type == 'PROFILE_SUCCESS'){
        resolve(responce.data);
      }else{
        resolve({});
      }
    }else{
      resolve({});
    }
  })
}

const getInstructorCourses = (profile) => {
  return new Promise(async(resolve, reject)=>{
    if(profile){
      const responce = await store.dispatch(getInstructorCoursesById({profile:profile}));
      if(responce && responce.type == 'PROFILE_SUCCESS'){
        resolve(responce.data);
      }else{
        resolve({});
      }
    }else{
      resolve({});
    }
  })
}

const getInstructorReviews = (profile) => {
  return new Promise(async(resolve, reject)=>{
    if(profile){
      const responce = await store.dispatch(getInstructorReviewById({profile:profile}));
      if(responce && responce.type == 'PROFILE_SUCCESS'){
        resolve(responce.data);
      }else{
        resolve({});
      }
    }else{
      resolve({});
    }
  })
}

export async function InstructorProfileLoader({params}) {
  const instructorProfileData = await getInstructorDetails( params);
  const similarInstructor = await getSimilarInstructor(params);
  const instructorCourses = await getInstructorCourses(params);
  const instructorReviews = await getInstructorReviews(params);
  return {
    instructorProfileData : instructorProfileData,
    similarInstructor : similarInstructor,
    instructorCourses : instructorCourses,
    instructorReviews : instructorReviews,
    date: new Date().toISOString(),
  };
}

function InstructorProfile() {
  const ProfileData = useLoaderData();
  console.log('ProfileData', ProfileData);
  return (
    <div className="w-full">
      <div className="bg-[#F0F0F0] h-[30vh] w-full top-0 left-0 z-0"></div>

      <section className="pl-10">
        <Container className="mb-8">
          <div className="flex flex-row justify-between relative">
            <div className="w-44 h-44 absolute -top-20 bg-[#E5E5E5] rounded-full"></div>
            {/* left box */}
            <InstructorInfo profile = {ProfileData.instructorProfileData} />

            {/* right box */}
            <NotifyMe />
          </div>
        </Container>
        <Container className="mb-8">
          <MyCourses profile = {ProfileData} />
        </Container>
        <Container className="mb-8">
          <InstructorEducation profile = {ProfileData.instructorProfileData} />
        </Container>
        <Container className="mb-8">
          <InstructorExperience profile = {ProfileData.instructorProfileData} />
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <Reviews profile = {ProfileData.instructorReviews} />
        </Container>
      </section>
      <section className="py-10">
        <Container>
          <SimilarInstructor profile={ProfileData}/>
        </Container>
      </section>
      <section className="bg-[#F4F4F4] py-10">
        <Container>
          <NewsLetter />
        </Container>
      </section>
    </div>
  );
}

export default InstructorProfile;
