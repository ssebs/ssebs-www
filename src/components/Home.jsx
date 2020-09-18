import React from "react";

import { ReactComponent as CodeSquare } from "bootstrap-icons/icons/code-square.svg";
import { ReactComponent as RocketLogo } from "../img/RocketOnly.svg";
import Card from "./WebComponents/Card";
import Header from "./WebComponents/Header";
import Title from "./WebComponents/Title";
import Section from "./WebComponents/Section";

import { tools, technologies } from "../Util";
import Me from "../img/Sebastian.png";

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
  return (
    <>
      <Header />
      <Section bgColor="light">
        <div className="d-flex justify-content-between ml-5">
          <div className="mw-450">
            <h1 className="title">ssebs Software</h1>
            <p style={{ fontSize: "24px" }}>
              Looking for someone to just make it work? We’re general ists, and
              love to figure out all things tech.
            </p>
            <div style={{ margin: "4.5rem auto" }}></div>
            <button className="btn btn-secondary">
              <strong>See what we do</strong>
            </button>
          </div>
          <RocketLogo
            width="600"
            style={{ position: "relative", top: "-50px", right: "200px" }}
          />
        </div>
      </Section>
      <Section bgColor="dark">
        <Title title="About" subtitle="What we do" variant="dark" />
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
          title="Projects"
          subtitle="Some of our best work"
          variant="dark"
        />
        <div className="my-4 d-flex justify-content-around">
          <Card title="Project 1" icon={<CodeSquare />}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
            maxime placeat ducimus similique.
          </Card>
          <Card title="Project 2" icon={<CodeSquare />}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
            maxime placeat ducimus similique.
          </Card>
          <Card title="Project 3" icon={<CodeSquare />}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
            maxime placeat ducimus similique.
          </Card>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary">
            <strong>See more</strong>
          </button>
        </div>
      </Section>
      <Section bgColor="light">
        <Title
          title="Contact"
          subtitle="Let's work together"
          variant="light"
        ></Title>
        <div className="d-flex justify-content-between my-4">
          <div>
            {" "}
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
            <button className="btn btn-outline-primary">
              <strong>Email me</strong>
            </button>
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
              I’m located in the heart of the <span className="text-secondary">Silicon Valley</span>. Some of my hobbies include
              playing guitar, some gaming, and being a car nerd.
            </div>
          </div>
        </div>
        <div className="text-center text-light">
          Copyright &copy; 2020 <span className="text-primary">Sebastian Safari</span> | <span className="text-secondary">ssebs</span>
        </div>
      </Section>
    </>
  );
};

export default Home;
