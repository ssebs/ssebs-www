import React from "react";
import Title from "./WebComponents/Title";
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

const Contact = () => {
  return (
    <div className="container">
      <Title
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
            I’m a Systems and Software Engineer, I can take an idea and turn it
            into a tangible product. At the moment, I’m the only one at ssebs,
            but I’ll put complete focus in you when it comes time.
          </p>
          <a
            href="mailto:contact@ssebs.com"
            className="btn btn-outline-primary"
          >
            <strong>Email me</strong>
          </a>
        </div>
        <div className="">
          <img width={256} src={Me} alt="Profile" className="rounded-circle" />
        </div>
      </div>
      <div className="d-flex justify-content-around m-5">
        {<JsonToList data={tools} title="What tools do we use?" />}
        {<JsonToList data={technologies} title="What else do we know?" />}
      </div>
    </div>
  );
};

export default Contact;
