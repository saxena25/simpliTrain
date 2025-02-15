import TwoOption_question from "../questions/TwoOption_question";
import SingleSelect_question from "../questions/SingleSelect_question";
import Dropdown_question from "../questions/Dropdown_question";
import MultiSelect_question from "../questions/MultiSelect_question";
import Text_question from "../questions/Text_question";
import MultiSelect_textarea_question from "../questions/MultiSelect_textarea_question";

export default function PollQuestions() {
  const questions = [
    {
      index: "1",
      question:
        "Is the course content delivered in a clear and understandable manner? *",
      options: ["Yes", "No"],
      type: "TwoOption_question",
    },
    {
      index: "2",
      question:
        "Which of the following is NOT a technique to represent the findings of the requirements gathering process?",
      options: [
        "Scenario",
        "User Persona",
        "Working Prototype",
        "None of the Above",
      ],
      type: "SingleSelect_question",
    },
    {
      index: "3",
      question:
        "Which of the following is a technique to represent the findings of the requirements gathering process?",
      options: [
        "Scenario",
        "Lorem Ipsum is simply dummy",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing and typesetting industry",
        "Others",
      ],
      type: "MultiSelect_question",
    },
    {
      index: "4",
      question:
        "Which of the following is a technique to represent the findings of the requirements gathering process?",
      options: ["Scenario", "Lorem Ipsum is dummy", "Lorem  text", "Others"],
      type: "Dropdown_question",
    },
    {
      index: "5",
      question:
        "Which of the following is a technique to represent the findings of the requirements gathering process?",
      options: ["Scenario", "Scenario", "Scenario", "Others(Please Specify)"],
      type: "MultiSelect_textarea_question",
    },
    {
      index: "6",
      question:
        "Which of the following is a technique to represent the findings of the requirements gathering process?",
      type: "Text_question",
    },
  ];

  return (
    <>
      <div className="w-full">
        {questions.map((question) => {
          switch (question.type) {
            case "TwoOption_question":
              return (
                <TwoOption_question
                  key={question.index}
                  question={question.question}
                  index={question.index}
                  options={question.options}
                />
              );
            case "SingleSelect_question":
              return (
                <SingleSelect_question
                  key={question.index}
                  question={question.question}
                  index={question.index}
                  options={question.options}
                />
              );
            case "MultiSelect_question":
              return (
                <MultiSelect_question
                  key={question.index}
                  question={question.question}
                  index={question.index}
                  options={question.options}
                />
              );
            case "Dropdown_question":
              return (
                <Dropdown_question
                  key={question.index}
                  question={question.question}
                  index={question.index}
                  options={question.options}
                />
              );
            case "MultiSelect_textarea_question":
              return (
                <MultiSelect_textarea_question
                  key={question.index}
                  question={question.question}
                  index={question.index}
                  options={question.options}
                />
              );
            case "Text_question":
              return (
                <Text_question
                  key={question.index}
                  question={question.question}
                  index={question.index}
                />
              );
            default:
              return (
                <div key={question.index} className="text-gray-500">
                  Unknown question type: {question.type}
                </div>
              );
          }
        })}
      </div>
    </>
  );
}
