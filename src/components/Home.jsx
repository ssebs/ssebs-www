import React from "react";
import Card from "./WebComponents/Card";

import { ReactComponent as CodeSquare } from "bootstrap-icons/icons/code-square.svg";
import { ReactComponent as RocketLogo } from "../img/RocketOnly.svg";
import Header from "./WebComponents/Header";
import Title from "./WebComponents/Title";
import Section from "./WebComponents/Section";

const Home = () => {
  return (
    <>
      <Header />
      <Section bgColor="light">
        {/* <div className="container"> */}
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
        {/* </div> */}
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
      </Section>
    </>
  );
};

export default Home;
