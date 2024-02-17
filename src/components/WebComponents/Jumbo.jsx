import React from "react";
import { ReactComponent as RocketLogo } from "../../img/RocketOnly.svg";
import Button from "./Button"

const Jumbo = React.forwardRef((props, ref) => {
  return (
    <div className="flex justify-between ml-5">
      <div className="max-w-screen-sm">
        <h1 className="text-5xl">ssebs Software</h1>
        <p className="text-2xl">
          Looking for someone to just, "make it work"? We're generalists, and love
          to figure out all things tech.
        </p>
        <div className="h-6"></div>
        <Button
          variant="dark-outline"
          onClick={() => {
            window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" })
          }}
        >
          <strong>See what we do</strong>
        </Button>
      </div>
      <RocketLogo
        width="600"
        id="logo"
      // style={{ position: "relative", top: "-50px", right: "100px" }}
      />
    </div >
  );
});

export default Jumbo;
