import { useState , useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CoursePanel from "../CoursePanel";
import WaitingResults from "./WaitingResults";
import Result from "./Result";

export async function quizResultLoader() {
    return {
      date: new Date().toISOString(),
    };
  }

export default function QuizResult () {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(false);
  const [show , setShow] = useState(false)

  useEffect(() => {
    if (show) {
      setWaiting(true);
    }
  }, []);

  const onClose = () => {
    navigate("/dashboard");
  };

    return(
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
          <div className="w-full  flex flex-row items-start">
           
            <CoursePanel />
        
            { waiting ?
            <div className="w-[80%] h-screen flex flex-col grow justify-start items-center px-6 py-12">
            <WaitingResults />
            </div>
             : 

            <div className="w-[80%] h-full flex flex-col grow justify-start items-center px-6 py-12">
            <Result />
            </div>
           }
          </div>
        </div>
      </div>
    </>
    );

}