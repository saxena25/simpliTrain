import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Button  from "../../components/ui-components/Button";
import  Drawer  from "../../components/ui-components/Drawer";
import RatingQuestion from "./questions/RatingQuestion";
import ExperienceQuestion from "./questions/ExperienceQuestion";
import LineRating from "./questions/LineRating";

export async function surveyQuestionsLoader() {
  return {
    date: new Date().toISOString(),
  };
}

export default function SurveyQuestions() {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const change_route = () => {
    navigate("/dashboard/survey_result");
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={setOpen}
        title={
          <div className="h-full">
            <h6 className="text-[13px] text-left text-gray-1 pt-6">SURVEY</h6>
            <h2 className="text-[22px] text-left font-bold">
              The basics of user experience design
            </h2>
            <h6 className="text-[13px] text-left text-gray-1">
              Course : Course Title
            </h6>
          </div>
        }
      >
        <div className="flex flex-col h-full">

          <section className="flex-1 p-4 overflow-y-auto">
            <RatingQuestion
            question={'Grade your Instructor\'s teaching skills.'}
            index={"1"}
            />
            <ExperienceQuestion 
            question={'Add your choices'}
            index={"2"}
            />
            <LineRating 
            question={'Grade your instructor\'s teaching skills.'}
            index={"3"}
            />
          </section>

          <footer className="flex justify-end items-center border-t border-gray-300 py-4 mt-2">
            <Button
              onClick={change_route}
              text="Submit"
              className="w-32 h-[40px]"
            />
          </footer>
        </div>
      </Drawer>
    </>
  );
}
