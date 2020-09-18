import React from "react";
import Card from "./WebComponents/Card";

import { ReactComponent as CodeSquare } from "bootstrap-icons/icons/code-square.svg";

const Home = () => {
  return (
    <div className="container">
      <p>ssebs.com site</p>
      <button className="btn btn-secondary">Test Button</button>

      <Card title="Proj1" icon={<CodeSquare/>}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque maxime
        placeat ducimus similique.
      </Card>
    </div>
  );
};

export default Home;
