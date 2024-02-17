import React, { useRef } from "react";

import Section from "../WebComponents/Section";
import Contact from "./Contact";
import Project from "./Project";
import About from "./About";
import Jumbo from "../WebComponents/Jumbo";
import { Link } from "react-router-dom";

const Home = () => {
  const aboutRef = useRef();

  return (
    <>
      <Section bgColor="light">
        <Jumbo ref={aboutRef} />
      </Section>
      <Section bgColor="dark">
        <About ref={aboutRef} />
      </Section>
      <Section bgColor="dark">
        <Project limit={3} variant="dark" />
        <div className="d-flex justify-content-center">
          <Link to="/projects">
            <button className="btn btn-secondary">
              <strong>See more</strong>
            </button>
          </Link>
        </div>
      </Section>
      <Section bgColor="light">
        <Contact />
      </Section>
    </>
  );
};

export default Home;
