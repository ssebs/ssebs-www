import React, { useRef } from "react";

import { ReactComponent as RocketLogo } from "../img/RocketOnly.svg";
import Title from "./WebComponents/Title";
import Section from "./WebComponents/Section";

import { tools, technologies } from "../Util";
import Me from "../img/Sebastian.png";
import Project from "./Project";
import { LinkContainer } from "react-router-bootstrap";

const JsonToList = (props) => {
  const { data, title } = props;

  return (
    <ul>
      <h4>{title}</h4>
      {data.map((item) => {
        return (
          <li key={item.name}>
            {item.name}
            <ul>
              {item.etc.map((i) => {
                return <li key={i}>{i}</li>;
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

const Home = () => {
  const aboutRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

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
        <Title
          ref={projectsRef}
          title="Projects"
          subtitle="Some of our best work"
          variant="dark"
        />
        <Project limit={3} />
        <div className="d-flex justify-content-center">
          <LinkContainer to="/projects">
            <button className="btn btn-secondary">
              <strong>See more</strong>
            </button>
          </LinkContainer>
        </div>
      </Section>
      <Section bgColor="light">
        <Title
          ref={contactRef}
          title="Contact"
          subtitle="Let's work together"
          variant="light"
        ></Title>
        <div className="d-flex justify-content-between my-4">
          <div>
            <h3>
              My name is <span className="text-primary">Sebastian Safari</span>
            </h3>
            <p
              className="text-dark pl-1"
              style={{ maxWidth: "378px", lineHeight: "1.75" }}
            >
              I’m a Systems and Software Engineer, I can take an idea and turn
              it into a tangible product. At the moment, I’m the only one at
              ssebs, but I’ll put complete focus in you when it comes time.
            </p>
            <a
              href="mailto:contact@ssebs.com"
              className="btn btn-outline-primary"
            >
              <strong>Email me</strong>
            </a>
          </div>
          <div className="">
            <img
              width={256}
              src={Me}
              alt="Profile"
              className="rounded-circle"
            />
          </div>
        </div>
        <div className="d-flex justify-content-around m-5">
          {<JsonToList data={tools} title="What tools do we use?" />}
          {<JsonToList data={technologies} title="What else do we know?" />}
        </div>
      </Section>
      <Section bgColor="dark">
        <div className="d-flex justify-content-between">
          <div>
            <Title
              id="footer"
              title="Around the web"
              subtitle="Other than here"
              variant="dark"
            />
            <div className="py-3 text-secondary">
              <a href="https://github.com/ssebs">github.com/ssebs</a>
              <br />
              <a href="https://linkedin.com/in/ssebs">
                https://linkedin.com/in/ssebs
              </a>
              <br />
              <a href="mailto:contact@ssebs.com">contact@ssebs/com</a>
              <br />
            </div>
          </div>
          <div>
            <Title
              title="More about me"
              subtitle="Location &amp; Hobbies"
              variant="dark"
            />
            <div className="py-3 mw-230 text-light">
              I’m located in the heart of the{" "}
              <span className="text-secondary">Silicon Valley</span>. Some of my
              hobbies include playing guitar, some gaming, and being a car nerd.
            </div>
          </div>
        </div>
        <div className="text-center text-light">
          Copyright &copy; 2020{" "}
          <span className="text-primary">Sebastian Safari</span> |{" "}
          <span className="text-secondary">ssebs</span>
        </div>
      </Section>
    </>
  );
};

export default Home;
