import React from "react";
import Card from "./WebComponents/Card";

import { ReactComponent as CodeSquare } from "bootstrap-icons/icons/code-square.svg";
import Header from "./WebComponents/Header";
import Title from "./WebComponents/Title";
import Section from "./WebComponents/Section";

const Home = () => {
  return (
    <>
      <Header />
        <Section bgColor="light">
          <p>ssebs.com site</p>
          <button className="btn btn-secondary">Test Button</button>
          <br />
          <Card title="Proj1" icon={<CodeSquare />}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
            maxime placeat ducimus similique.
          </Card>
        </Section>
        <Section bgColor="dark">
          <Title title="About" subtitle="What we do" variant="lgiht" />
        </Section>
    </>
  );
};

export default Home;
