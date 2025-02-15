import React from "react";
import moment from 'moment';
import { EditPencilTwo } from "../../../components/icons";
import { checkIsMobile } from "../../../utils/helpers";

function EducationCard({ item, editAction}) {
  const isMobile = checkIsMobile();
  return (
    <div className="md:border border-gray-200 rounded-xl md:px-4 md:py-4 flex flex-row gap-4 relative">
      <button onClick={()=> editAction(item)} className="border bg-white border-gray-200 md:px-2 md:py-2 py-px rounded-full absolute right-0 md:right-4 md:top-6 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110">
        <p className="text-base ml-2">Edit</p>
        <EditPencilTwo color="black" />
      </button>
      <div className="bg-gray-100 rounded-full md:rounded-xl w-14 h-14 md:w-24 md:h-24"></div>
      <div className="flex flex-col justify-center">
        <h4 className="text-base md:text-xl font-medium md:mb-2">
          {item.collegeName}
        </h4>
        <p className="text-gray-500 font-medium text-sm">{item.degree}</p>
        <p className="text-gray-500 text-sm">{moment(new Date(item.startDate)).format('YYYY')}-{moment(new Date(item.endDate)).format('YYYY')}</p>
      </div>
    </div>
  );
}

export default EducationCard;
