import React from "react";


import brand from "../../img/Variant1-256.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* TODO: https://tailwindui.com/components/application-ui/navigation/navbars */}
      <nav className="">
        <div className="">
          <button
            className=""
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggle"
            aria-controls="navbarToggle"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=""></span>
          </button>
          <div className="" id="navbarToggle">
            <Link to="/">
              <div className=" pointer">
                <img width="128px" src={brand} alt="Logo" />
              </div>
            </Link>
            <ul className=" ml-auto mt-2 mt-lg-0">
              <li className="">
                <Link to="/">
                  <div className=" pointer">
                    Home <span className="sr-only">(current)</span>
                  </div>
                </Link>
              </li>
              <li className=" pointer">
                <Link to="/projects">
                  <div className="">Projects</div>
                </Link>
              </li>
              <li className=" pointer">
                <Link to="/contact">
                  <div className="" href="/#">
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
