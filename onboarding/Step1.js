import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import clsx from "clsx";
import close from "../../assets/svgs/close.svg";
import { checkIsMobile } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { Button, Drawer } from "../../components/ui-components";
import { addSkills } from "../../redux/skills/actionCreator";

const tagCss =
  "text-base font-normal px-4 py-[0.3rem] rounded-full border border-text cursor-pointer";

const Step1 = ({ onBoardingData, action, SkilsList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customSkill, setCustomSkill] = useState('');
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const isMobile = checkIsMobile();

  const checkAdded = (val) => {
    let skills = [...onBoardingData.skills];
    console.log('skills.includes(val)', skills, val, skills.includes(val));
    if (skills.includes(val)) {
      return "bg-primary text-white";
    } else {
      return "bg-white text-text";
    }
  };

  const handleChange = (e) => {
    // console.log('e.target', );
    const value = e.target.value;
    setCustomSkill(value);
    // passwordRulesCheck(value);
    e.target.autofocus = true;
  };

  const addCustomSkill = async (skillValue) => {
    const responce = await dispatch(addSkills({skillName:skillValue}));
    if(responce && responce.type == 'SKILLS_SUCCESS'){
      if(responce.data && responce.data.id){
        action(responce.data.id);
        setOpen(false);
      }
    }else{
    
    }
  }

  return (
    <>
      <div className="flex flex-row flex-wrap md:items-center justify-center w-full md:p-5 gap-3 px-5">
        {SkilsList.map((skil, index) => (
          <span
            key={index}
            onClick={() => {
              action(skil.id);
            }}
            className={clsx(tagCss, checkAdded(skil.id))}>
            {skil.name}
          </span>
        ))}
        <span onClick={showDrawer} className={tagCss}>
          Other?
        </span>
      </div>

      <Drawer open={open} onClose={setOpen} title="Course Language">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="flex flex-col w-full items-start gap-4">
            <h1 className="text-2xl font-medium text-secondary">
              Did not find your category?
            </h1>
            <input
              type="text"
              placeholder="Type your category..."
              onChange={handleChange}
              className="w-full pl-5 py-3 border-none bg-input-background rounded-lg"
            />
          </div>
          <Button onClick={()=>addCustomSkill(customSkill)} className="w-full max-w-sm text-sm bg-black text-white  py-6 rounded-lg">
            ADD
          </Button>
        </div>
      </Drawer>


      {/* <Drawer
        title={
          <div
            className="flex justify-end items-center w-full border-b-0 !border-none"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              borderBottom: "none",
            }}>
            <button onClick={onClose}>
              <img src={close} alt="" />
            </button>
          </div>
        }
        // placement="bottom"
        // width={500}
        onClose={onClose}
        open={open}
        // height="60vh"
        // style={{
        //   borderTopRightRadius: "16px",
        //   borderTopLeftRadius: "16px",
        //   overflow: "hidden",
        // }}
        closable={false}>
        
      </Drawer> */}
    </>
  );
};

export default Step1;
