import React from "react";
import Title from "./WebComponents/Title";

const About = React.forwardRef((props, ref) => {
  return (
    <>
      <Title ref={ref} title="About" subtitle="What we do" variant="dark" />
      <div className="d-flex justify-content-between my-3">
        <p
          className="text-light"
          style={{ maxWidth: "378px", lineHeight: "1.75" }}
        >
          We will take your requirements, and find a solution that will work for
          you. Whether it’s software development, or if you have an IT need,
          <span className="text-primary h3 my-0 py-0"> ssebs</span> <br /> will
          take you there
        </p>
        <div className="big-text">Take a look at some of our work...</div>
      </div>
    </>
  );
})

export default About;
