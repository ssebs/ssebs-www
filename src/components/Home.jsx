import React, { useRef } from "react";

import { ReactComponent as RocketLogo } from "../img/RocketOnly.svg";
import Title from "./WebComponents/Title";
import Section from "./WebComponents/Section";

import Project from "./Project";
import { LinkContainer } from "react-router-bootstrap";
import Footer from "./WebComponents/Footer";
import Contact from "./Contact";

const Home = () => {
  const aboutRef = useRef();

  return (
    <>
      <Section bgColor="light">
        <div className="d-flex justify-content-between ml-5">
          <div className="mw-450">
            <h1 className="title">ssebs Software</h1>
            <p style={{ fontSize: "24px" }}>
              Looking for someone to just make it work? We’re general ists, and
              love to figure out all things tech.
            </p>
            <div style={{ margin: "4.5rem auto" }}></div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                aboutRef.current.scrollIntoView();
              }}
            >
              <strong>See what we do</strong>
            </button>
          </div>
          <RocketLogo
            width="600"
            style={{ position: "relative", top: "-50px", right: "100px" }}
          />
        </div>
      </Section>
      <Section bgColor="dark">
        <Title
          ref={aboutRef}
          title="About"
          subtitle="What we do"
          variant="dark"
        />
        <div className="d-flex justify-content-between my-3">
          <p
            className="text-light"
            style={{ maxWidth: "378px", lineHeight: "1.75" }}
          >
            We will take your requirements, and find a solution that will work
            for you. Whether it’s software development, or if you have an IT
            need,
            <span className="text-primary h3 my-0 py-0">
              {" "}
              ssebs
            </span> <br /> will take you there
          </p>
          <div className="big-text">Take a look at some of our work...</div>
        </div>
      </Section>
      <Section bgColor="dark">
        <Project limit={3} variant="dark"/>
        <div className="d-flex justify-content-center">
          <LinkContainer to="/projects">
            <button className="btn btn-secondary">
              <strong>See more</strong>
            </button>
          </LinkContainer>
        </div>
      </Section>
      <Section bgColor="light">
        <Contact/>
      </Section>
      <Section bgColor="dark">
        <Footer />
      </Section>
    </>
  );
};

export default Home;
