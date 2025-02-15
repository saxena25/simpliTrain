import React from "react";
import { Flex, Progress } from "antd";

const questions = [
  {
    index: "1",
    question:
      "Is the course content delivered in a clear and understandable manner? *",
    options: [
      { key: "A.", name: "Yes", value: 85 },
      { key: "B.", name: "No", value: 15 },
    ],
    type: "TwoOption_question",
  },
  {
    index: "2",
    question:
      "Which of the following is NOT a technique to represent the findings of the requirements gathering process?",
    options: [
      { key: "A.", name: "Scenario", value: 24 },
      { key: "B.", name: "User Persona", value: 25 },
      { key: "C.", name: "Working Prototype", value: 45 },
      { key: "D.", name: "None of the Above", value: 16 },
    ],
    type: "SingleSelect_question",
  },
  {
    index: "3",
    question:
      "Which of the following is a technique to represent the findings of the requirements gathering process?",
    options: [
      { key: "A.", name: "Scenario", value: 25 },
      { key: "B.", name: "Lorem Ipsum is simply dummy", value: 30 },
      { key: "C.", name: "Lorem Ipsum", value: 25 },
      { key: "D.", name: "Others", value: 20 },
    ],
    type: "MultiSelect_question",
  },
];

export default function PollCompleted() {
  return (
    <>
      <div className="w-full">
        <Flex vertical gap="small" className="flex flex-col py-2">
          {questions.map((question) => {
            const maxPercent = Math.max(
              ...question.options.map((opt) => opt.value)
            );

            return (
              <div
                key={question.index}
                className="flex flex-col justify-center space-y-4 rounded-lg border-2 p-4 border-gray-100 shadow-sm"
              >
                <div className="flex flex-row font-semibold text-lg">
                  <p className="text-text mr-2">{question.index}.</p>
                  <div>

                  <p className="text-text font-medium">{question.question}</p>
                <div className="flex flex-col justify-start py-4">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-start space-y-2 w-full mb-4"
                    >
                      <div className="flex flex-row justify-items-start w-full">
                        <div className={`w-auto text-sm font-medium text-center pr-2  ${
                            option.value === maxPercent
                              ? "text-black"
                              : "text-gray-400"
                          }`}>
                          {option.key}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            option.value === maxPercent
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        >
                          {option.name}
                      <Progress
                        percent={option.value}
                        size={[200, 12]}
                        trailColor="white"
                        // strokeLinecap="butt"
                        strokeColor={
                          option.value === maxPercent ? "black" : "#d1d5db"
                        }
                        showInfo={true}
                        className="w-full py-1"
                      />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                  </div>
                </div>

              </div>
            );
          })}
        </Flex>
      </div>
    </>
  );
}
