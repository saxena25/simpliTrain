import React from "react";

function InstructorExperience({profile}) {
  const workExprienceData = [
    {
      img: "",
      position: "Software Engineer",
      company: "Amazon",
      year: "2015-2018",
    },
  ];
  return (
    <div className="relative mt-8 w-full max-w-5xl">
      <h3 className="font-bold text-lg">Experience</h3>

      <div className="bg-white py-6 rounded-xl">
        <div className="flex flex-col gap-4">
          {profile?.WorkExperiences.map((item, index) => (
            <div
              className="border border-gray-200 rounded-xl px-4 py-4 flex flex-row gap-4 relative"
              key={index}>
              <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
              <div className="flex flex-col justify-center">
                <h4 className="text-xl font-medium mb-2 text-secondary">
                  <b>{item.job_title}</b>
                </h4>
                <p className="text-primary text-base">
                  {item.company_name}
                </p>
                <p className="text-gray-500 text-sm">{item.start_date?.slice(0 , 4)} - {item.end_date?.slice(0 , 4)} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstructorExperience;
