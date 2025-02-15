import React from "react";
import verified from "../../assets/svgs/verified.svg";
import heart from "../../assets/svgs/heart.svg";
import inBox from "../../assets/svgs/inBox.svg";

import InstructorBio from "./InstructorBio";
import ExpertIn from "./ExpertIn";
import TeachingLanguage from "./TeachingLanguage";
import SocialLinks from "./SocialLinks";
import InstructorEducation from "./InstructorEducation";
import InstructorExperience from "./InstructorExperience";
import Reviews from "./Reviews";
import MyCourses from "./MyCourses";
import NewsLetter from "./NewsLetter";

function InstructorInfo({profile}) {
  return (
    <div className="w-full mr-10 flex flex-col justify-between">
      <div className="mr-4 mb-8 mt-32 flex flex-row justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-1 items-center">
              <h1 className="text-2xl font-medium text-secondary">
                {profile?.name}
              </h1>
              <img src={verified} alt="verified tick" />
            </div>
            <p className="text-sm text-primary">
              {profile?.WorkExperiences[0].job_title}, at {profile?.WorkExperiences[0].company_name}
            </p>
          </div>
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-lg text-secondary font-medium">{profile?.courseCount}</p>
              <p className="text-xs text-primary">Courses</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-secondary font-medium">{profile?.students}</p>
              <p className="text-xs text-primary">Students</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-secondary font-medium">{profile?.instructor_onboarding.experienceInYears}</p>
              <p className="text-xs text-primary">Experiences</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-secondary font-medium">4.8 (188)</p>
              <p className="text-xs text-primary">Rating</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-row justify-between">
            <img src={heart} alt="heart" />
            <img src={inBox} alt="" />
          </div>
          <button className="text-sm bg-black text-white px-8 py-2 rounded-xl">
            BOOK A SESSION
          </button>
        </div>
      </div>

      <InstructorBio profile = {profile}/>

      <ExpertIn profile={profile} />

      <TeachingLanguage profile = {profile}/>

      <SocialLinks profile={profile} />

      {/* <MyCourses />

      <InstructorEducation />

      <InstructorExperience /> */}


    </div>
  );
}

export default InstructorInfo;
