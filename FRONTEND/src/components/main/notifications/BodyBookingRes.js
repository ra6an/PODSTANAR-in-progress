//
import { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

import classes from "./BodyBookingRes.module.css";

const BodyBookingRes = (props) => {
  console.log(props.data.status);
  console.log(props.data.status === "REJECTED");
  const classForContainer =
    props.data.status === "APPROVED" ? classes.true : classes.false;
  return (
    <div className={`${classes["body__booking__res"]} ${classForContainer}`}>
      <p className={classes["body__booking__res-text"]}>
        {props.data.status === "APPROVED"
          ? "Ovu ponudu ste prihvatili."
          : "Ovu ponudu ste odbili."}
      </p>
      {props.data.status === "REJECTED" && (
        <BiX className={classes["body__booking__res-icon"]} />
      )}
      {props.data.status === "APPROVED" && (
        <BiCheck className={classes["body__booking__res-icon"]} />
      )}
    </div>
  );
};

export default BodyBookingRes;
