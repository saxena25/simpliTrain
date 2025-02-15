const questions = [
  {
    marks: "0/2 POINTS",
    index: "1",
    correct: "Yes",
    marked: "No",
    question:
      "Is the course content delivered in a clear and understandable manner? *",
    options: [
      { key: "A.", name: "Yes", value: 85 },
      { key: "B.", name: "No", value: 15 },
    ],
  },
  {
    marks: "2/2 POINTS",
    index: "2",
    correct: "User Experience",
    marked: "User Experience",
    question: "What does UX stands for ?",
    options: [
      { key: "A.", name: "User Experience", value: 24 },
      { key: "B.", name: "User Persona", value: 25 },
      { key: "C.", name: "Working Prototype", value: 45 },
      { key: "D.", name: "None of the Above", value: 16 },
    ],
  },
  {
    marks: "1/2 POINTS",
    index: "3",
    correct: "Scenario",
    marked: "Scenario",
    question: "Which of the following are common tools used for wireframing? ",
    options: [
      { key: "A.", name: "Scenario", value: 24 },
      { key: "B.", name: "User Persona", value: 25 },
      { key: "C.", name: "Working Prototype", value: 45 },
      { key: "D.", name: "None of the Above", value: 16 },
    ],
  },
  {
    marks: "2/2 POINTS",
    index: "4",
    correct: "Scenario",
    marked: "Scenario",
    question:
      "Which of the following is a technique to represent the findings?",
    options: [
      { key: "A.", name: "Scenario", value: 24 },
      { key: "B.", name: "User Persona", value: 25 },
      { key: "C.", name: "Working Prototype", value: 45 },
      { key: "D.", name: "None of the Above", value: 16 },
    ],
  },
];

export default function Review() {
    return (
        <>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold text-center py-2 pt-10">
              Review your answers
            </h1>
            <div className="w-full py-4 flex flex-row justify-between items-center">
              <p className="text-md font-semibold text-center py-2">Introduction</p>
              <p className="text-md font-semibold text-center py-2">6 Points / 10</p>
            </div>
            <section className="w-full">
              {questions.map((question) => {
                return (
                  <div
                    key={question.index}
                    className="flex flex-row justify-between items-start p-3 py-6 mt-4 rounded-[20px] border-[1px] border-gray-300"
                  >
                    <span className="text-md font-semibold text-center py-1">
                      {question.index}.
                    </span>
                    <div className="flex flex-col justify-center items-start w-[85%]">
                      <span className="text-md font-semibold text-center py-1">
                        {question.question}
                      </span>
                      {question.options.map((option, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-row items-center mt-4 rounded-full px-2 py-1  ${
                            option.name === question.marked
                              ? "bg-gray-200"
                              : ""
                          }`}
                        >
                          <div className="pr-2">
                            {option.name === question.correct ? (
                              <svg
                                width="12"
                                height="9"
                                viewBox="0 0 12 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.3 1.4L4.25 8.45L0 4.2L1.4 2.8L4.25 5.65L9.9 0L11.3 1.4Z"
                                  fill="#379D46"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 13 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6.50094 8.08714L2.42214 12.1659L0.835938 10.5797L4.91474 6.50094L0.835938 2.42214L2.42214 0.835938L6.50094 4.91474L10.5797 0.835938L12.1659 2.42214L8.08714 6.50094L12.1659 10.5797L10.5797 12.1659L6.50094 8.08714Z"
                                  fill="#FF2626"
                                />
                              </svg>
                            )}
                          </div>
                          {/* Option Key */}
                          <div
                            className={`w-auto text-sm font-medium text-center px-3 ${
                              option.name === question.correct
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                          >
                            {option.key}
                          </div>
                          {/* Option Name */}
                          <div
                            className={`text-sm font-medium ${
                              option.name === question.correct
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                          >
                            {option.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-center py-1">
                      {question.marks}
                    </span>
                  </div>
                );
              })}
            </section>
          </div>
        </>
      );
    }