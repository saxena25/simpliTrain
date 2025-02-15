import { useSelector } from "react-redux";
import { redirect, useLocation } from "react-router-dom";
import { getItem } from "./localStorageControl";

export const isAuthenticated = async () => {
  const token = getItem("simplitrain_token", true);
  if (token) throw redirect("/");
  return null;
};

export const getImageUrl = (path) => {
  const URL = process.env.REACT_APP_IMG_URL;
  return URL+path;
}


export const handleProtected = () => {
    const token = getItem("simplitrain_token", true);
    if (token){
      return true;
    }else{
      return false;
    };
};

export const sortObjArray = (array, key) =>{
  const sortedData = array.sort(function(a,b){
    // here a , b is whole object, you can access its property

    // it will return the difference to sort function and then 
    // sort compare that difference is equal to 0 or smaller than 0 or 
    // greater than 0. on the basis of that it will give sorted number list
      return a[key] - b[key];
    });
  return sortedData;
}

export const handleInstructorProtected = () => {
  // return true;
  const token = getItem("simplitrain_token", true);
  const user = getItem("simplitrain_user");
  // console.log('user ssaaasassas', user, token);
  if (token){
    if(user && user.role.includes('INSTRUCTOR')){
      return true;
    }else{
      return false;
    }
  }else{
    return false;
  };
};

export const percentage = (part, total) => {
  return (Number(part)/Number(total))*100;
}

export const generateTimeList = (interval = 15) => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
          let period = hour < 12 ? "AM" : "PM";
          let formattedHour = hour % 12 || 12; // Convert 0 to 12 for AM
          let formattedMinute = String(minute).padStart(2, '0');
          times.push(`${formattedHour}:${formattedMinute} ${period}`);
      }
  }
  return times;
}

export const generateDurationList = (startTime, interval = 15) => {
  const times = [];
  let [time, period] = startTime.split(" ");
  let [hour, minute] = time.split(":").map(Number);

  // Convert to 24-hour format for easier calculations
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  let totalMinutes = hour * 60 + minute;
  let startMinutes = totalMinutes;

  while (totalMinutes < 1440) { // 1440 minutes in a day (24 hours)
      let newHour = Math.floor(totalMinutes / 60) % 12 || 12;
      let newMinute = String(totalMinutes % 60).padStart(2, '0');
      let newPeriod = totalMinutes >= 720 ? "PM" : "AM"; // 720 minutes = 12 PM
      
      let duration = totalMinutes - startMinutes;
      let durationHour = Math.floor(duration / 60);
      let durationMinute = duration % 60;
      let durationText = `${durationMinute} mins`;
      if(durationHour>0){
        if(durationMinute>0){
          durationText = `${durationHour}.${durationMinute}hours`;
        }else{
          durationText = `${durationHour}hours`;
        }
        
      }
      
      times.push({ time: `${newHour}:${newMinute} ${newPeriod}`, duration: durationText });
      totalMinutes += interval;
  }
  const ddd = times.shift();
  return times;
}


export const redirectAfterLogin = (obj) => {

  console.log('obj', obj, obj.role.includes('INSTRUCTOR'));

  if(obj.role.includes('INSTRUCTOR')){
    if(obj.InstructorOnboarding){
      return '/instructor/courses';
    }else{
      return '/instructor_onboarding';
    }
  }else if(obj.hasOwnProperty('onBoarding')){
    if(obj.onBoarding){
      return '/dashboard';
    } else{
      return '/onboarding'; 
    }
  }else{
    return '/'; 
  }
};

export const checkIsMobile = () =>{
  const width = window.innerWidth;
  if(width < 768){
    return true;
  }else{
    return false
  }
}


export const sum = (a, b) => a + b;



