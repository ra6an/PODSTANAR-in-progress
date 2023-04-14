//
import { BiCheck, BiX } from "react-icons/bi";
import dateGen from "../../../helper/date-generator";

import classes from "./NotificationHeaderBooking.module.css";

const NotificationHeaderBooking = (props) => {
  // const responded = props.data.status === 'PENDING' ? {backgroundColor: `var(--pending)`} : {};
  const startDate = dateGen(props.data.startingDate);
  const endDate = dateGen(props.data.endingDate);
  let text;

  if (props.data.status === "PENDING") {
    text = `Korisnik ${props.data.customer.username} želi bookirati artikal.`;
  } else if (props.data.status === "APPROVED") {
    text = `Ponudu korisnika ${props.data.customer.username} ste prihvatili.`;
  } else {
    text = `Ponudu korisnika ${props.data.customer.username} ste odbili.`;
  }
  return (
    <div className={classes["notifications__header__booking"]}>
      {props.data.status === "PENDING" && (
        <div className={classes["notifications__header__pending"]}>
          <div className={classes["notifications__header__pending-dot"]}></div>
        </div>
      )}
      {props.data.status === "APPROVED" && (
        <div className={classes["notifications__header-response"]}>
          <BiCheck
            style={{ color: "var(--approved)" }}
            className={classes["notifications-icon"]}
          />
        </div>
      )}
      {props.data.status === "REJECTED" && (
        <div className={classes["notifications__header-response"]}>
          <BiX
            style={{ color: "var(--rejected)" }}
            className={classes["notifications-icon"]}
          />
        </div>
      )}
      <p className={classes["notifications__header-text"]}>{text}</p>
      <div className={classes["motifications__header-date"]}>
        {startDate} &mdash; {endDate}
      </div>
      {/* <div className={classes["notifications__header-separator"]} /> */}
    </div>
  );
};

export default NotificationHeaderBooking;
