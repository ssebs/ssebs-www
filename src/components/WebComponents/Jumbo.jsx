import React from "react";
import { ReactComponent as RocketLogo } from "../../img/RocketOnly.svg";

const Jumbo = React.forwardRef((props, ref) => {
  return (
    <div className="d-flex justify-content-between ml-5">
      <div className="mw-450">
        <h1 className="title">ssebs Software</h1>
        <p style={{ fontSize: "24px" }}>
          Looking for someone to just make it work? We’re general ists, and love
          to figure out all things tech.
        </p>
        <div style={{ margin: "4.5rem auto" }}></div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            ref.current.scrollIntoView();
          }}
        >
          <strong>See what we do</strong>
        </button>
      </div>
      <RocketLogo
        width="600"
        id="logo"
      // style={{ position: "relative", top: "-50px", right: "100px" }}
      />
    </div>
  );
});

export default Jumbo;
