import React from "react";
import { Container } from "../../components/ui-components";

function NewsLetterCourse() {
  return (
    <div className="flex flex-col justify-center items-center gap-1 md:gap-4 py-20 max-w-2xl m-auto ">
      <h1 className="text-2xl md:text-5xl text-secondary font-medium">Newsletter</h1>
      <p className="text-sm md:text-2xl text-primary">
        Stay informed about our latest offerings
      </p>
      <div className="w-full flex flex-row gap-1 py-5 md:py-0 md:gap-2 md:px-4">
        <input
          type="email"
          name="email"
          id="email"
          className="bg-white border-none w-full grow md:mx-6 md:py-4 rounded-md"
        />
        <button className="bg-black text-sm md:text-base text-white px-4 md:px-8 py-2 rounded-lg grow-0">
          SUBSCRIBE
        </button>
      </div>
      <p className="text-sm md:text-xl text-primary">
        Your email is safe with us, we don&#39;t spam.
      </p>
    </div>
  );
}

export default NewsLetterCourse;
