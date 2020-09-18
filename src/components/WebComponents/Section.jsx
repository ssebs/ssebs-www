import React from "react";

const Section = (props) => {
  const bgColor = props.bgColor;

  return (
    <section className={`py-4 w-100 bg-${bgColor}`}>
      <div className="container">{props.children}</div>
    </section>
  );
};

export default Section;
