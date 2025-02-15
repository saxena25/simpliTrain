import React from 'react'

function InstructorEducation({profile}) {
    const educationData = [
        {
          img: "",
          university: "Imperial College London",
          degree: "Diploma In Computer Science",
          year: "2015-2018",
        },
        {
          img: "",
          university: "IGNOU University",
          degree: "Bachelors degree in Engineering and Technology, graduated on march 2020",
          year: "2015-2018",
        },
      ];
  return (
    <div className="relative w-full max-w-5xl">
        <h3 className=" font-bold text-xl">Education</h3>

        <div className="bg-white py-6 rounded-xl">
          <div className="flex flex-col gap-4">
            {profile?.Educations.map((item, index) => (
              <div
                className="border border-gray-200 rounded-xl px-4 py-4 flex flex-row gap-4 relative"
                key={index}>
                <div className="bg-gray-100 rounded-xl w-24 h-24"></div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-xl font-medium mb-2 text-secondary">
                    {item.collegeName}
                  </h4>
                  <p className="text-primary text-base">
                   {item.degree.name} in {item.fieldOfStudy}
                  </p>
                  <p className="text-gray-500 text-sm">{item.startDate.slice(0, 4)} - {item.endDate.slice(0,4)} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default InstructorEducation
