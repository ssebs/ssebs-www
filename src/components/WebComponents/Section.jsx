import React from "react";

const Section = ({ classNames, children }) => {

  return (
    <section className={`py-4 w-full ${classNames}`}>
      <div className="container">{children}</div>
    </section>
  );
};

export default Section;
