import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CoursePanel from "../CoursePanel";
import Quiz_question from "./Quiz_question";

export async function quizPlatformLoader() {
  return {
    date: new Date().toISOString(),
  };
}

export default function QuizPlatform() {
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
          <div className="w-full flex flex-row items-start">
            <CoursePanel />
            <Quiz_question />
          </div>
        </div>
      </div>
    </>
  );
}
