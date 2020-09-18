import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import brand from "../../img/Variant1-256.png";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggle"
            aria-controls="navbarToggle"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggle">
            <LinkContainer to="/">
              <div className="navbar-brand pointer">
                <img width="128px" src={brand} alt="Logo" />
              </div>
            </LinkContainer>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <LinkContainer to="/">
                  <div className="nav-link pointer">
                    Home <span className="sr-only">(current)</span>
                  </div>
                </LinkContainer>
              </li>
              <li className="nav-item pointer">
                <LinkContainer to="/projects">
                  <div className="nav-link">Projects</div>
                </LinkContainer>
              </li>
              <li className="nav-item pointer">
                <LinkContainer to="/contact">
                  <div className="nav-link" href="/#">
                    Contact
                  </div>
                </LinkContainer>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
