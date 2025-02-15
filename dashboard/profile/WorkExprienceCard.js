import React from 'react'
import moment from 'moment';
import { EditPencilTwo } from '../../../components/icons';

function WorkExprienceCard({ item, editAction }) {
  return (
    <div className="md:border border-gray-200 rounded-full md:rounded-xl md:px-4 md:py-4 flex flex-row gap-4 relative" >
      <button onClick={() => editAction(item) } className="border bg-white border-gray-200 md:px-2 md:py-2 py-px rounded-full absolute  right-0 top-0 md:right-4 md:top-6 w-22 flex gap-2 justify-center items-center transform transition duration-300 hover:scale-110">
        <p className="text-base ml-2">Edit</p>
        <EditPencilTwo color="black" />
      </button>
      <div className="bg-gray-100 rounded-full md:rounded-xl w-14 h-14 md:w-24 md:h-24"></div>
      <div className="flex flex-col justify-center">
        <h4 className="text-base md:text-xl font-medium md:mb-2">
          <b>{item.job_title}</b>
        </h4>
        <p className="text-gray-500 font-medium text-sm">
          {item.company_name}
        </p>
        <p className="text-gray-500 text-sm">{moment(new Date(item.start_date)).format('YYYY')}-{moment(new Date(item.end_date)).format('YYYY')}</p>
      </div>
    </div>
  );

  // company_name: "sasas"
  // createdAt: "2025-01-04T09:09:23.649Z"
  // employment_type: "68ceee63-46a5-4b20-a618-cf707d32a40d"
  // end_date: "2014-01-10"
  // id: "a8045e58-d2d0-4406-a861-2b6fbe799c39"
  // industry: "6e0d8c42-ebaa-49ca-bd7f-a6c2d80a7eb9"
  // job_title: "sasa"
  // location: "Indore"
  // start_date: "2012-01-01"


}

export default WorkExprienceCard
