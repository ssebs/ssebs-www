import React from "react";
import Card from "./WebComponents/Card";
import { ReactComponent as CodeSquare } from "bootstrap-icons/icons/code-square.svg";
import Title from "./WebComponents/Title";

const projects = [
  {
    title: "Project 1",
    icon: <CodeSquare />,
    content:
      "Lorem ipsum dolor, sit amet consectetur dipisicing elit. Cumque maxime  placeat ducimus similique",
  },
  {
    title: "Project 2",
    icon: <CodeSquare />,
    content:
      "Lorem ipsum dolor, sit amet consectetur dipisicing elit. Cumque maxime  placeat ducimus similique",
  },
  {
    title: "Project 3",
    icon: <CodeSquare />,
    content:
      "Lorem ipsum dolor, sit amet consectetur dipisicing elit. Cumque maxime  placeat ducimus similique",
  },
  {
    title: "Project 4",
    icon: <CodeSquare />,
    content:
      "Lorem ipsum dolor, sit amet consectetur dipisicing elit. Cumque maxime  placeat ducimus similique",
  },
];

const Project = (props) => {
  const limit = props.limit;
  const variant = props.variant || "light"
  return (
    <div className="container">
      <Title title="Projects" subtitle="Some of our best work" variant={variant} />
      <div className="my-4 d-flex justify-content-around">
        {projects.map((proj, idx) => {
          if ((idx + 1) % limit === 0) {
            return null;
          }
          return (
            <Card title={proj.title} icon={proj.icon} key={idx}>
              {proj.content}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Project;
