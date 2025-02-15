import React from "react";
import { CheckBoxOutline } from "../../components/icons";

const CourseIncludes = ({ course, batch }) => {
  console.log("batches from Includes: ", batch);
  const courseCurriculum = course?.courseCurriculum || [];

  // calculating Total Live Sessions
  const { oneOnOneBatches = [], groupBatches = [] } = batch || {};
  const totalLiveSessions =
    (oneOnOneBatches?.flatMap((batch) => batch.batchClasses || []).length ||
      0) +
    (groupBatches?.flatMap((batch) => batch.batchClasses || []).length || 0);

  // Calculating Total Assignments
  const totalAssessments = courseCurriculum?.reduce((acc, curriculum) => {
    return acc + (curriculum?.assessments ? curriculum?.assessments.length : 0);
  }, 0);

  // calculating Total Topics
  const totalTopics = courseCurriculum?.reduce((acc, topic)=>{
    return acc + (topic?.topics ? topic?.topics.length : 0);
  },0)

  // calculating total Polls
  const totalPolls = courseCurriculum?.reduce((acc, poll)=>{
    return acc + (poll?.polls ? poll?.polls.length : 0);
  },0);

  // console.log("total Polls: ", totalPolls);
  // console.log("totalTopics: ", totalTopics);
  // console.log("totalAssessments: ", totalAssessments);
  // console.log("Live Sessions :", totalLiveSessions);
  return (
    <div className="flex flex-col md:px-6">
      <h5 className="text-lg font-bold mb-5">Course Includes</h5>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">
            {totalLiveSessions > 0
              ? `${totalLiveSessions} live Sessions`
              : "No live Sessions Available"}
          </span>
        </div>
        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">{totalAssessments > 0 ? `${totalAssessments} Assignments` : "No Assignments Available"}</span>
        </div>
        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">
            Course Certificate
          </span>
        </div>
        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">Community</span>
        </div>
        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">
            Chat With Instructor
          </span>
        </div>
        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">{totalPolls > 0 ? `${totalPolls} Polls` : "No Polls Available"}</span>
        </div>

        <div className="flex flex-row gap-3 justify-start items-center">
          <CheckBoxOutline
            color={"#1B1B28"}
            className={"size-5 border-2 border-dark rounded-"}
          />
          <span className="text-base text-text font-medium">{totalTopics > 0 ? `${totalTopics} Topics` : "No Topics Available"}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseIncludes;
