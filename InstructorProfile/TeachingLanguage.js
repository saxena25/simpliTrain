import React from "react";

function TeachingLanguage({profile}) {
  return (
    <div className="border border-gray-200 rounded-xl my-4 relative">
      <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">
        Teaching Language
      </h3>
      <div className="flex flex-row mx-6 mb-4 gap-6">
        {
          profile?.languages.map((item, index) => (
            <button key={index} className="border border-gray-200 px-3 py-1 rounded-3xl hover:bg-gray-300 text-lg transform transition duration-300 hover:scale-110">
              {item.name}
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default TeachingLanguage;
