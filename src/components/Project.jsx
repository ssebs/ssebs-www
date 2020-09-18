import React from "react";
import Card from "./WebComponents/Card";
import { ReactComponent as CodeSquare } from "bootstrap-icons/icons/code-square.svg";

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
  return (
    <div className="my-4 d-flex justify-content-around">
      {projects.map((proj, idx) => {
        if ((idx + 1) % limit === 0) {
          return null;
        }
        return (
          <Card title={proj.title} icon={proj.icon}>
            {proj.content}
          </Card>
        );
      })}
    </div>
  );
};
export default Project;
