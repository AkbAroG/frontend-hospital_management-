import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Values from "../components/Values";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | AWSM Care Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
      <Values />
    </>
  );
};

export default AboutUs;
