import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

export async function assessmentLoader() {
  return {
    date: new Date().toISOString(),
  };
}
const evaluation_criteria = [
  {
    name: "1. This quiz is designed to test your understanding.",
    description: "8 / 10 Points",
    details:
      "Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    name: "2. It contains 7 modules , covering different topics.",
    description: "12 / 10 Points",
    details:
      "Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    name: "3. The quiz include mix of question types.",
    description: "24 /10 Points",
    details:
      "Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    name: "4. Each question carries points.",
    description: "10 / 10 Points",
    details:
      "Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
];

export default function Assessment() {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="bg-black bg-opacity-20 fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[96%] h-[96%] rounded-[24px] overflow-y-auto shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="fixed rounded-md bg-white text-gray-400"
          >
            <XMarkIcon
              aria-hidden="true"
              color="black"
              className="h-8 w-8 fixed top-10 left-10"
            />
          </button>
          <div className="w-full flex flex-col justify-center items-center pt-20">
            <div className="w-[60%] flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 135 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="67.5"
                    cy="67.5"
                    r="67.5"
                    fill="#D9D9D9"
                    fill-opacity="0.5"
                  />
                  <path
                    d="M71.667 73.4993C72.1864 73.4993 72.6371 73.3084 73.0191 72.9264C73.401 72.5445 73.592 72.0938 73.592 71.5744C73.592 71.0549 73.401 70.6042 73.0191 70.2223C72.6371 69.8403 72.1864 69.6493 71.667 69.6493C71.1475 69.6493 70.6969 69.8403 70.3149 70.2223C69.933 70.6042 69.742 71.0549 69.742 71.5744C69.742 72.0938 69.933 72.5445 70.3149 72.9264C70.6969 73.3084 71.1475 73.4993 71.667 73.4993ZM70.292 67.6327H73.042C73.042 66.7466 73.1337 66.0973 73.317 65.6848C73.5003 65.2723 73.9281 64.7299 74.6003 64.0577C75.517 63.141 76.1281 62.4 76.4337 61.8348C76.7392 61.2695 76.892 60.6049 76.892 59.841C76.892 58.466 76.4107 57.3431 75.4482 56.4723C74.4857 55.6014 73.2253 55.166 71.667 55.166C70.4142 55.166 69.3219 55.5174 68.3899 56.2202C67.458 56.923 66.8087 57.8549 66.442 59.016L68.917 60.0243C69.192 59.2605 69.5663 58.6875 70.0399 58.3056C70.5135 57.9237 71.0559 57.7327 71.667 57.7327C72.4003 57.7327 72.9962 57.9389 73.4545 58.3514C73.9128 58.7639 74.142 59.3216 74.142 60.0243C74.142 60.4521 74.0198 60.857 73.7753 61.2389C73.5309 61.6209 73.1031 62.1021 72.492 62.6827C71.4837 63.5688 70.8649 64.2639 70.6357 64.7681C70.4066 65.2723 70.292 66.2271 70.292 67.6327ZM60.667 78.9993C59.6587 78.9993 58.7955 78.6403 58.0774 77.9223C57.3594 77.2042 57.0003 76.341 57.0003 75.3327V53.3327C57.0003 52.3243 57.3594 51.4612 58.0774 50.7431C58.7955 50.025 59.6587 49.666 60.667 49.666H82.667C83.6753 49.666 84.5385 50.025 85.2566 50.7431C85.9746 51.4612 86.3337 52.3243 86.3337 53.3327V75.3327C86.3337 76.341 85.9746 77.2042 85.2566 77.9223C84.5385 78.6403 83.6753 78.9993 82.667 78.9993H60.667ZM60.667 75.3327H82.667V53.3327H60.667V75.3327ZM53.3337 86.3327C52.3253 86.3327 51.4621 85.9737 50.7441 85.2556C50.026 84.5375 49.667 83.6744 49.667 82.666V56.9993H53.3337V82.666H79.0003V86.3327H53.3337Z"
                    fill="#5F6368"
                  />
                </svg>
              </div>
              <h2 className="text-lg text-gray-2 font-medium py-2">
                ASSESSMENTS
              </h2>
              <h1 className="w-[50%] text-3xl font-medium text-center py-6 mb-4">
                Programming with JAVA Primary Assignment
              </h1>

              <div className="w-full grid grid-cols-1 gap-4">
                <div className="flex flex-row justify-between p-2">
                  <p className="font-medium text-primary">
                    Evaluation Criteria
                  </p>
                  <p className="font-medium px-2">Total 100 Points</p>
                </div>
                {evaluation_criteria.map((module) => {
                  return (
                    <div className="flex flex-row justify-between p-2">
                      <p className="text-primary">{module.name}</p>
                      <p className="font-medium px-2">{module.description}</p>
                    </div>
                  );
                })}
              </div>
              <div>
                <p className="font-medium text-lg mt-8 py-4">Assessment Scenario</p>
                <p className="text-primary py-4">
                  You are working with a team that is building an application to
                  manage a film archive. Your task is to create the Java backend
                  that will support the frontend UI.
                </p>
                <p className="text-primary py-4">
                  Every film in the archive is identified by a numeric ID. Each
                  film has a title and a timestamp of when it
                  was added to the archive. Each film needs to be able to report
                  its duration  in hours. The
                  calculation of a film's duration varies between types.
                  Currently, the archive contains two film categories, physical
                  and digital.
                </p>
                <p className="font-medium text-lg mt-8 py-4">Task</p>
                <p className="text-primary pyt-4">
                  Which of the following are true statements about a Java
                  DataSource? (Select all that apply)
                </p>
              </div>
            </div>
          </div>
          <footer className="flex justify-between items-center p-6 bg-white sticky bottom-0 border-t-[1px] border-gray-3004 mt-2 pl-16">
            <div>Deadline : 12th Sept 2024, 6PM</div>
            
            <div className="w-[50%] flex flex-row justify-end items-center pt-6 pr-16">
                <button className="w-max px-4 h-12 text-secondary font-medium bg-gray-300 rounded-[13px] mr-10"> Download Starter Files</button> 
                <button className="w-max px-4 h-12 text-white font-medium bg-secondary border border-gray-800 rounded-[13px]">Upload Solutions</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
