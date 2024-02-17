import React, { useRef } from "react";

import Section from "../WebComponents/Section";
import Contact from "./Contact";
import Project from "./Project";
import About from "./About";
import Jumbo from "../WebComponents/Jumbo";
import Button from "../WebComponents/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const aboutRef = useRef();

  return (
    <>
      <Section classNames="bg-slate-800">
        <Jumbo ref={aboutRef} />
      </Section>
      <Section classNames="bg-slate-950">
        <About ref={aboutRef} />
      </Section>
      <Section classNames="bg-slate-950">
        <Project limit={3} variant="dark" />
        <div className="flex justify-center">
          <Link to="/projects">
            <Button>
              <strong>See more</strong>
            </Button>
          </Link>
        </div>
      </Section>
      <Section classNames="bg-slate-200">
        <Contact />
      </Section>
    </>
  );
};

export default Home;
