import React, { useState } from "react";
import { useNavigate , useLoaderData } from "react-router-dom";
import { Flex, Progress } from "antd";
import { Drawer, Button } from "../../../components/ui-components";
import PollQuestions from "./PollQuestions";
import { getPollTemplateById } from "../../../redux/polls/actionCreator";
import store from "../../../redux/store";


const getPollDetails = (data) => {
  return new Promise(async(resolve, reject)=>{
    if(data){
      const responce = await store.dispatch(getPollTemplateById(data));
      if(responce && responce.type == 'POLLS_SUCCESS'){
        // console.log("Polls success" , responce)
        resolve(responce.data.data);
        // console.log("get course details :" ,responce.data);
      }else{
        resolve({}); 
        console.log("Get Poll response failed :");
      }
    }else{
      console.log("no data :");
      resolve({});
    }
  })
};

export async function pollLoader({ params }) {
  console.log('params' ,params)
  const pollDetails = await getPollDetails(params.pollId);
  return {
    pollDetails : pollDetails,
    date: new Date().toISOString(),
  };
}

export default function Poll() {
  const [open, setOpen] = useState(true);

  const PollDetailLoader = useLoaderData();
  console.log(`Loading Data of Polls` , PollDetailLoader );

  const navigate = useNavigate();

  const change_route = () => {
    navigate("result");
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={setOpen}
        title={
          <div className="h-full">
            <h6 className="text-[13px] text-left text-gray-1">POLL</h6>
            <h2 className="text-[20px] text-left font-semibold">
              {PollDetailLoader.pollDetails.title}
            </h2>
            <h6 className="text-[13px] text-left text-gray-1">
              Course : Course Title
            </h6>
          </div>
        }
      >
        <div className="flex flex-col h-full">
          <Flex vertical gap="small" className="flex flex-row justify-between">
            <Progress
              percent={40}
              strokeColor="black"
              type="line"
              className="w-[95%]"
              showInfo={false}
            />
            <div className="ml-2 text-sm">1/10</div>
          </Flex>

          <section className="flex-1 overflow-y-auto">
            <PollQuestions />
          </section>

          <footer className="flex justify-between items-center border-t border-gray-300 py-4 mt-2">
            <div>Responded 25/34 | 5 days left</div>
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
