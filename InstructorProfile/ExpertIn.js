import React from 'react'

function ExpertIn({profile}) {
  return (
    <div className="border border-gray-200 rounded-xl my-4 relative">
        <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">
          Interested Topics
        </h3>

        <div className="flex flex-row mx-6 mb-4 gap-4 flex-wrap">
          {profile?.onboarding[0].skills.map((item, index) => (
            <button className="border border-gray-200 px-4 py-2 rounded-3xl hover:bg-gray-300 text-lg transform transition duration-300 hover:scale-110">
              {item.skill.name}
            </button>
          ))}
          
        </div>
      </div>
  )
}

export default ExpertIn
