import React from "react";
import { EditPencilTwo } from "../../../../components/icons";
import MobContainer from "../../../../components/ui-components/MobContainer";
import profile from "../../../../assets/images/profile.png";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import assessments from "../../../../assets/images/assessments.png";
import certificates from "../../../../assets/images/certificates.png";
import purchases from "../../../../assets/images/purchases.png";
import settings from "../../../../assets/images/settings.png";
import privacy from "../../../../assets/images/privacy.png";
import logout from "../../../../assets/images/logout.png";
import support from "../../../../assets/images/support.png";
import { Divider } from "antd";
import reviewLeftArrow from "../../../../assets/svgs/reviewLeftArrow.svg";
import { getProfile } from "../../../../redux/profile/actionCreator";
import store from "../../../../redux/store";
import { useSelector } from "react-redux";

const getMyProfile = () => {
  return new Promise(async(resolve, reject)=>{
    const responce = await store.dispatch(getProfile());
    if(responce && responce.type == 'PROFILE_SUCCESS'){
      resolve(responce.data);
    }else{
      resolve([]);
    }
  })
}


export async function MobProfileLoader() {
  const profile = await getMyProfile();
  
  return {
    date: new Date().toISOString(),
    profile: profile,
  };
}

const profileNavigations = [
  { name: "Profile", icon: profile, link: "/dashboard/profile" },
  { name: "Assessment", icon: assessments, link: "/dashboard/my_assessments" },
  { name: "My Purchases", icon: purchases, link: "/dashboard/purchase" },
  {
    name: "My Certificates",
    icon: certificates,
    link: "/dashboard/certificates",
  },
  { name: "Help & Support", icon: support, link: "#" },
  { name: "Settings", icon: settings, link: "/dashboard/settings" },
];

function MobProfile() {
  let loaderData = useLoaderData();
  const { myProfile } = useSelector((state)=> {
    return {
      myProfile: state.myProfile.data, 
    }
  });
  return (
    <div className="w-full relative">
      <div className="bg-[#D9D9D9] absolute h-56 w-full top-0 left-0 z-0">
        <button className=" bg-white px-2 py-2 rounded-full absolute right-4 bottom-4 flex justify-center items-center">
          <EditPencilTwo color="black" />
        </button>
        <h1 className="absolute top-6 left-5 text-3xl text-[#262626] font-normal">
          My Account
        </h1>
      </div>
      <div className="w-full mt-40 relative">
        <div className="flex flex-col justify-center gap-2 w-fit m-auto">
          <img
            src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg="
            alt=""
            className="w-32 h-32 rounded-full overflow-hidden border border-gray-500 m-auto"
          />
          <p className="text-xl font-semibold">{myProfile?.name || ""}</p>
          <select
            name=""
            className="text-base text-gray-500 font-medium rounded-full border border-gray-400 py-1  w-fit m-auto">
            <option value="influencer">Influencer</option>
            <option value="student">Student</option>
          </select>
        </div>
        <MobContainer className="w-full">
          <div className="flex flex-col gap-2 pt-2">
            {profileNavigations.map((ele, index) => (
              <Link
                to={ele.link}
                className="flex flex-row items-center text-lg text-[#2A3036] font-semibold gap-2">
                <img src={ele.icon} alt="" />
                <span>{ele.name}</span>
              </Link>
            ))}
            {/* <Divider /> */}
            <div className="w-full h-px my-2 bg-[#D9D9D9]"></div>
            <Link to="/documents" className="flex flex-row items-center text-lg text-[#2A3036] font-semibold gap-2">
              <img src={privacy} alt="" />
              <span>Privacy Policies & Agreements</span>
            </Link>
            {/* <Divider /> */}
            <div className="w-full h-px my-2 bg-[#D9D9D9]"></div>
            <Link className="flex flex-row items-center text-lg text-[#2A3036] font-semibold gap-2">
              <img src={logout} alt="" />
              <span>Log out</span>
            </Link>
          </div>
        </MobContainer>
      </div>
    </div>
  );
}

export default MobProfile;
