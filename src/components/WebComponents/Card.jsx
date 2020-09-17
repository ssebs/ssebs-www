import React from "react";

const Card = (props) => {
  const { title, icon } = props;
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{icon}</div>
      <div className="card-text">{props.children}</div>
    </div>
  );
};
export default Card;
