import { useLoaderData } from "react-router-dom";
import ChatSideBar from "./ChatSideBar";
import InstructorChatBox from "./InstructorChatBox";
import { useState } from "react";
import CourseChatBox from "./CourseChatBox";

export async function chatLoader(){
  return {
    date: new Date().toISOString(),
  };
}


export default function Chat() {
  const [activeTab, setActiveTab] = useState("INSTRUCTORS");

  const handleActiveState = (tabName) => {
    setActiveTab(tabName);
  }
 
  // let data = useLoaderData();
  
  return (
    <section className="flex flex-row h-[calc(100vh-64px)]">
      <ChatSideBar onActiveState={handleActiveState} />
      <InstructorChatBox />
    </section>
  );
}