import React, { useState } from "react";
import userCircle from "../../../assets/svgs/userCircle.svg";
import { EditPencilTwo } from "../../../components/icons";
import { useDispatch } from "react-redux";
import { updateProfilePhoto } from "../../../redux/profile/actionCreator";

function ProfileCard({ profile, scrollToEducation, scrollToWorkExprience, scrollToPreferences }) {
  const [image, setImage] = useState(profile.profileImage || null);
  const dispatch = useDispatch();

  const handleImageChange =  (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;
        // setImage(imageData);
        let formData = {
          profileImage: imageData,
        }

        let response = await dispatch(updateProfilePhoto(formData));
        console.log("response :", response);
        if(response && response.type === 'PROFILE_SUCCESS'){
          setImage(response.data.profileImage);
        }else{
          console.log("unable to upload image")
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileUploadInput").click();
  };

  return (
    <>
      <div className="bg-white py-5 rounded-xl flex flex-col gap-2 justify-center items-center">
        {/* <div className="relative mb-3">
          <img src={profile.profileImageFileId?profile.profileImageFileId:userCircle} alt="User Profile" />
          <button className="absolute bottom-0 right-4 flex justify-center items-center w-10 px-1 py-1 border border-gray-300 bg-white rounded-full">
            <EditPencilTwo color="black" />
          </button>
        </div> */}
        <div className="relative mb-3">
          <img
            src={image || userCircle}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover "
          />
          <button
            className="absolute bottom-0 right-4 flex justify-center items-center w-10 px-1 py-1 border border-gray-300 bg-white rounded-full"
            onClick={triggerFileInput}>
            <EditPencilTwo color="black" />
          </button>
          <input
            type="file"
            id="profileUploadInput"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <h3 className="text-lg font-bold">{profile?.name}</h3>

        <div className="flex flex-col justify-start gap-2">
          <div className="flex flex-row items-center px-8 gap-3 hover:bg-gray-100 mx-2 rounded-lg">
            <div className="bg-gray-200 w-4 h-4 rounded-md top-0 left-16"></div>
            <button className="py-1 rounded-xl text-base font-medium">
              Profile
            </button>
          </div>
          <div className="flex flex-row items-center px-8 gap-3 hover:bg-gray-100 mx-2 rounded-lg">
            <div className="bg-gray-200 w-4 h-4 rounded-md top-0 left-16"></div>
            <button
              className="py-1  rounded-xl text-base font-medium"
              onClick={scrollToPreferences}
              >
              Preferences
            </button>
          </div>
          <div className="flex flex-row items-center px-8 gap-3 hover:bg-gray-100 mx-2 rounded-lg">
            <div className="bg-gray-200 w-4 h-4 rounded-md top-0 left-16"></div>
            <button
              className="py-1  rounded-xl text-base font-medium"
              onClick={scrollToEducation}>
              Education
            </button>
          </div>
          <div className="flex flex-row items-center px-8 gap-3 hover:bg-gray-100 mx-2 rounded-lg">
            <div className="bg-gray-200 w-4 h-4 rounded-md top-0 left-16"></div>
            <button
              className="py-1 rounded-xl text-base font-medium whitespace-nowrap"
              onClick={scrollToWorkExprience}>
              Work Experience
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
