import React, { useState } from "react";
import { Button } from "../../../components/ui-components";
import TwoOptionQuestion from "./questions/TwoOptionQuestion";
import SingleSelectQuestion from "./questions/SingleSelectQuestion";
import MultiSelectQuestion from "./questions/MultiSelectQuestion";
import DropdownQuestion from "./questions/DropdownQuestion";
import TextQuestion from "./questions/TextQuestion";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    marks: "2 POINTS",
    question:
      "Is the course content delivered in a clear and understandable manner? *",
    options: ["Yes", "No"],
    type: "TwoOptionQuestion",
  },
  {
    marks: "2 POINTS",
    question:
      "What does UX stands for ?",
    options: [
      "User Experience",
      "User Persona",
      "User Prototype",
      "None of the Above",
    ],
    type: "SingleSelectQuestion",
  },
  {
    marks: "2 POINTS",
    question:
      "Which of the following are common tools used for wireframing? ",
    options: [
      "Scenario",
      "Lorem Ipsum is simply dummy",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing and typesetting industry",
      "Others",
    ],
    type: "MultiSelectQuestion",
  },
  {
    marks: "2 POINTS",
    question:
      "Which of the following is a technique to represent the findings of the requirements gathering process?",
    options: ["Scenario", "Lorem Ipsum is dummy", "Lorem  text", "Others"],
    type: "DropdownQuestion",
  },
  {
    marks: "2 POINTS",
    question:
      "Which of the following is a technique to represent the findings of the requirements gathering process?",
    type: "TextQuestion",
  },
];

export default function Quiz_question() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/dashboard/quiz/quiz_result')
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const { type, question, marks, options } = currentQuestion;

    switch (type) {
      case "TwoOptionQuestion":
        return (
          <TwoOptionQuestion
            className="h-full"
            question={question}
            Marks={marks}
            options={options}
          />
        );
      case "SingleSelectQuestion":
        return (
          <SingleSelectQuestion
            className="h-full"
            question={question}
            Marks={marks}
            options={options}
          />
        );
      case "MultiSelectQuestion":
        return (
          <MultiSelectQuestion
            className="h-full"
            question={question}
            Marks={marks}
            options={options}
          />
        );
        case "DropdownQuestion":
        return (
          <DropdownQuestion
            className="h-full"
            question={question}
            Marks={marks}
            options={options}
          />
        );
        case "TextQuestion":
        return (
          <TextQuestion
            className="h-full"
            question={question}
            Marks={marks}
          />
        );
      default:
        return <p>Invalid question type</p>;
    }
  };

  return (
    <div className="flex flex-col h-screen w-[75%] pl-4 pr-2 gap-y-5">
      <div className="flex grow flex-col items-center justify-center overflow-y-auto py-6">
        <header className="flex flex-col justify-start w-full py-6 px-10 h-[20%] border-b-[1px] border-gray-300 ">
          <p className="text-[18px] text-left font-medium">Introduction</p>
          <p className="text-[14px] text-left text-gray-1 font-medium">
            QUESTION {currentQuestionIndex + 1} OF {questions.length}
          </p>
        </header>
        <section className="flex-grow h-[75%] w-[90%]">
          {renderQuestion()}
        </section>
      </div>
      <footer className="flex justify-between items-center p-6 bg-white sticky bottom-0 border-t-[1px] border-gray-300">
        <Button
          onClick={prevQuestion}
          className="py-2 h-[50px] w-32 bg-gray-200 rounded-[15px] text-[18px] text-center"
          text="< Prev"
          color="white"
          disabled={currentQuestionIndex === 0}
        />
        <Button
          onClick={nextQuestion}
          className="py-2 h-[50px] w-32 rounded-[15px] text-[18px] text-center"
          text={currentQuestionIndex < questions.length - 1 ? "Next >" : "Finish"}
        />
      </footer>
    </div>
  );
}
