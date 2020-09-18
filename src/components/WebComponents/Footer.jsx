import React from "react";
import Title from "./Title";

const Footer = () => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <Title
            id="footer"
            title="Around the web"
            subtitle="Other than here"
            variant="dark"
          />
          <div className="py-3 link-secondary">
            <a href="https://github.com/ssebs">github.com/ssebs</a>
            <br />
            <a href="https://linkedin.com/in/ssebs">linkedin.com/in/ssebs</a>
            <br />
            <a href="mailto:contact@ssebs.com">contact@ssebs/com</a>
            <br />
          </div>
        </div>
        <div>
          <Title
            title="More about me"
            subtitle="Location &amp; Hobbies"
            variant="dark"
          />
          <div className="py-3 mw-230 text-light">
            I’m located in the heart of the{" "}
            <span className="text-secondary">Silicon Valley</span>. Some of my
            hobbies include playing guitar, some gaming, and being a car nerd.
          </div>
        </div>
      </div>
      <div className="text-center text-light">
        Copyright &copy; 2020{" "}
        <span className="text-primary">
          <a href="https://linkedin.com/in/ssebs">Sebastian Safari</a>
        </span>{" "}
        |{" "}
        <span className="link-secondary">
          <a href="https://github.com/ssebs">ssebs</a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
