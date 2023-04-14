import React from "react";

import classes from "./Loading.module.css";

const Loading = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <div className={classes.logoone} />
        <div className={classes.logotwo} />
        <div className={classes.logothree} />
        <div className={classes.logofour} />
      </div>
    </div>
  );
};

export default Loading;
