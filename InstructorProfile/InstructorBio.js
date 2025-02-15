import React from "react";

function InstructorBio({profile}) {
  return (
    <div className="w-full border border-gray-200 rounded-xl my-4 relative">
      <h3 className="text-xl mx-6 mt-6 mb-8 font-semibold">Bio</h3>

      <p className="px-4 mb-6 text-lg text-gray-600">
        {profile?.onboarding[0].bio}
      </p>
    </div>
  );
}

export default InstructorBio;
