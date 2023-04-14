//

import { BiCheck, BiX } from "react-icons/bi";

import classes from "./BodyBookingResponse.module.css";

const BodyBookingResponse = (props) => {
  const classNameForBody =
    props.data.status === "APPROVED" ? classes.true : classes.false;

  const status = props.data.status;
  console.log(props.data);

  const startingDateArr = props.data.startingDate.split("T")[0].split("-");
  const startingDate = `${startingDateArr[2]}-${startingDateArr[1]}-${startingDateArr[0]}`;
  const endingDateArr = props.data.endingDate.split("T")[0].split("-");
  const endingDate = `${endingDateArr[2]}-${endingDateArr[1]}-${endingDateArr[0]}`;

  return (
    <div
      className={`${classes["body__booking__response"]} ${classNameForBody}`}
    >
      <div className={classes["body__booking__response-container"]}>
        {status === "APPROVED" && (
          <BiCheck className={classes["body__booking__response-icon"]} />
        )}
        {status === "REJECTED" && (
          <BiX className={classes["body__booking__response-icon"]} />
        )}
        <div className={classes["body__booking__response-separator"]} />
        <p className={classes["body__booking__response-text"]}>{`Korisnik ${
          props.data.owner.username
        } ${status === "APPROVED" ? "je" : ""}${
          status === "REJECTED" ? "nije" : ""
        } odobrio booking.`}</p>
      </div>
      <p
        className={classes["body__booking__response-text"]}
      >{`${startingDate} - ${endingDate}`}</p>
    </div>
  );
};

export default BodyBookingResponse;
