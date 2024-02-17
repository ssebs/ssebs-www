import React from "react";

const Card = (props) => {
  const { title, icon } = props;
  return (
    <div className="card bg-light shadow border-dark mb-4" {...props}>
      <div className="card-body">
        <div className="card-title text-center">
          <strong>{title}</strong>
          <div className="flex justify-content-center mt-3 icon text-tertiary">
            {icon}
          </div>
        </div>
      </div>
      <div className="card-footer text-white bg-primary h-250">
        {props.children}
      </div>
    </div>
  );
};
export default Card;
