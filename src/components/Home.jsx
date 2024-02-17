import React, { useRef } from "react";
// import { LinkContainer } from "react-router-bootstrap";

import Section from "./WebComponents/Section";
import Footer from "./WebComponents/Footer";
import Contact from "./Contact";
import Project from "./Project";
import About from "./About";
import Jumbo from "./Jumbo";

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
          {/* <LinkContainer to="/projects">
            <button className="btn btn-secondary">
              <strong>See more</strong>
            </button>
          </LinkContainer> */}
        </div>
      </Section>
      <Section bgColor="light">
        <Contact />
      </Section>
    </>
  );
};

export default Home;
