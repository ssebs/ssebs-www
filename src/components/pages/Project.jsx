import React from "react";
import Card from "../WebComponents/Card";
import Title from "../WebComponents/Title";

import { ReactComponent as IcnCode } from "bootstrap-icons/icons/code-square.svg";
import { ReactComponent as IcnUpload } from "bootstrap-icons/icons/upload.svg";
import { ReactComponent as IcnDB } from "bootstrap-icons/icons/server.svg";
import { ReactComponent as IcnPeople } from "bootstrap-icons/icons/people.svg";
import { ReactComponent as IcnSheet } from "bootstrap-icons/icons/table.svg";
import { ReactComponent as IcnTerm } from "bootstrap-icons/icons/terminal.svg";
import { ReactComponent as IcnGame } from "bootstrap-icons/icons/controller.svg";


const projects = [
  {
    title: "Simpleshare",
    icon: <IcnUpload />,
    link: "https://github.com/ssebs/simpleshare",
    content:
      "A local file sharing utility written in Python. Uses multicast UDP to share the list of files, and TCP to transfer the files themselves.",
  },
  {
    title: "PeopleDB Py React",
    icon: <IcnPeople />,
    link: "https://github.com/ssebs/Peopledb-py-react",
    content:
      "This is a react/flask full stack web application to control / modify users in a database.",
  },
  {
    title: "pydb",
    icon: <IcnDB />,
    link: "https://github.com/ssebs/pydb",
    content:
      "Python based DB / REST api. Just supply a db.json file, and you're good to go.",
  },
  {
    title: "csveditor",
    icon: <IcnSheet />,
    link: "https://github.com/ssebs/csveditor",
    content: "A lightweight GUI csv editor",
  },
  {
    title: "nccsv",
    icon: <IcnTerm />,
    link: "https://github.com/ssebs/nccsv",
    content: "Ncurses CSV Editor written in Python.",
  },
  {
    title: "PerishablePunchers",
    icon: <IcnGame />,
    link: "https://github.com/ssebs/PerishablePunchers",
    content: "PerishablePunchers is a Mortal Kombat like Game written in Java.",
  },
  {
    title: "ssebsEngine",
    icon: <IcnCode />,
    link: "https://github.com/ssebs/ssebsEngine",
    content: "Java/LWJGL2 2D Game Engine.",
  },
];

const Project = (props) => {
  const limit = props.limit;
  const variant = props.variant || "light";
  return (
    <div className="container">
      <Title
        title="Projects"
        subtitle="Some of our best work"
        variant={variant}
      />
      <div className="my-4 flex justify-content-around flex-wrap">
        {projects.slice(0, limit).map((proj, idx) => {
          return (
            <Card
              title={proj.title}
              icon={proj.icon}
              onClick={() => window.open(proj.link, "_blank")}
              key={idx}
            >
              {proj.content}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default Project;
