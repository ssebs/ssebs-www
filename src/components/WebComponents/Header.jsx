import React from "react";


import brand from "../../img/Variant1-256.png";
import { Link } from "react-router-dom";

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
            <Link to="/">
              <div className="navbar-brand pointer">
                <img width="128px" src={brand} alt="Logo" />
              </div>
            </Link>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/">
                  <div className="nav-link pointer">
                    Home <span className="sr-only">(current)</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item pointer">
                <Link to="/projects">
                  <div className="nav-link">Projects</div>
                </Link>
              </li>
              <li className="nav-item pointer">
                <Link to="/contact">
                  <div className="nav-link" href="/#">
                    Contact
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
