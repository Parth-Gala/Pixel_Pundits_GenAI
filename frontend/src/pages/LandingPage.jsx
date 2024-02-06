import React from "react";
import landingimg1 from "../assets/landingimg1.jpg";
import landingimg2 from "../assets/landingimg2.jpg";
import landingimg3 from "../assets/landingimg3.jpg";

const LandingPage = () => {
  return (
    <div>
      <div>
        <div className="mt-16 grid grid-cols-1 sml:grid-cols-2 text-center items-center ">
          <div>
            <img src={landingimg1} alt="" srcSet="" />
          </div>
          <div>
            Unlock the power of smart nutrition with our AI-driven app,
            delivering expertly crafted meal recommendations based on your
            preferences, goals, and lifestyle
          </div>
          <div className="">
            <div></div>
            <div>{/* <img src={landingimg2} alt="" srcSet="" /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
