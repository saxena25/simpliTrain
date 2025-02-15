import React from "react";
import { Container } from "../../components/ui-components";

function NewsLetter() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-44 max-w-xl m-auto ">
      <h1 className="text-5xl text-secondary font-medium">Newsletter</h1>
      <p className="text-2xl text-primary">
        Stay informed about our latest offerings
      </p>
      <div className="w-full flex flex-row gap-2 px-4">
        <input
          type="email"
          name="email"
          id="email"
          className="bg-white border-none w-full grow mx-6 py-4 rounded-md"
        />
        <button className="bg-black text-white px-8 py-2 rounded-lg grow-0">
          SUBSCRIBE
        </button>
      </div>
      <p className="text-xl text-primary">
        Your email is safe with us, we don&#39;t spam.
      </p>
    </div>
  );
}

export default NewsLetter;
