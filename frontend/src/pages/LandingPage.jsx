import React from "react";
import landingimg1 from "../assets/landingimg1.jpg";
import landingimg2 from "../assets/landingimg2.jpg";
import landingimg3 from "../assets/landingimg3.jpg";

const LandingPage = () => {
  return (
    <div>
      <div>
      
        <div className=" grid grid-cols-1 sml:grid-cols-2 text-center items-center ">
          <div>
            <img src={landingimg1} alt="" srcSet="" />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quos
            doloremque ut omnis est quis, veniam minima quaerat ullam odit
            tempore nihil, aperiam culpa. Ea voluptates labore nulla eveniet
            facilis aperiam error quae magni maxime impedit non veniam incidunt
          </div>
          <div className="">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
              quos doloremque ut omnis est quis, veniam minima quaerat ullam
              odit tempore nihil, aperiam culpa. Ea voluptates labore nulla
              eveniet facilis aperiam error quae magni maxime impedit non veniam
              incidunt
            </div>
            <div>
              <img src={landingimg2} alt="" srcSet="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
