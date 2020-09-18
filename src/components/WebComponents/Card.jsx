import React from "react";

const Card = (props) => {
  const { title, icon } = props;
  return (
    <div className="card bg-light shadow">
      <div className="card-body">
        <div className="card-title text-center">
          <strong>{title}</strong>
          <div className="d-flex justify-content-center mt-3 icon text-tertiary">
            {icon}
          </div>
        </div>
      </div>
      <div className="card-footer text-white bg-primary">{props.children}</div>
    </div>
  );
};
export default Card;
