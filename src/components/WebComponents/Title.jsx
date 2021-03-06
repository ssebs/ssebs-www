import React from "react";

const Title = React.forwardRef((props, ref) => {
  const titleClass =
    props.variant === "light" ? "p-0 m-0" : "p-0 m-0 text-white";
  const subTitleClass =
    props.variant === "light" ? "subtitle" : "subtitle text-primary";
  return (
    <div ref={ref}>
      <h2 className={titleClass}>{props.title}</h2>
      <div className={subTitleClass}>{props.subtitle}</div>
    </div>
  );
});

export default Title;
