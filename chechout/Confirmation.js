import React from "react";
import { Container } from "../../components/ui-components";
import greenTick from "../../assets/svgs/greenTick.svg";
import EnrollmentDetails from "./EnrollmentDetails";
import { useNavigate } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";

export async function confirmationLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function Confirmation() {
  const navigate = useNavigate();
  const isMobile = checkIsMobile();
  return (
    <section className="py-10 bg-gray-50">
      {/* Top box */}
      <Container>
        <div className="flex flex-col items-center gap-2">
          <img src={greenTick} alt="GreenTick" className="w-16 md:w-24" />
          <h1 className={`text-2xl text-secondary font-bold ${isMobile && "text-center"}`}>
            Your enrollment is{isMobile && <br />} confirmed!
          </h1>
          <p className="text-sm md:text-base text-primary ">
            We're thrilled to have you join us for this course.
          </p>
        </div>
      </Container>

      {/* middle box */}
      <Container className="py-10">
        <EnrollmentDetails />
        <div className="flex flex-row justify-center gap-4 py-12">
          <button
            className="bg-white  text-black font-medium border border-gray-500 px-6 md:px-12 py-3 rounded-xl"
            onClick={() => navigate("/")}>
            Go to Home
          </button>
          <button className="bg-[#0E121D] text-white py-3 px-5 rounded-xl">
            Go to course details
          </button>
        </div>
      </Container>

      
    </section>
  );
}

export default Confirmation;
