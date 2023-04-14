//
import { useState, useEffect } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import Buttons from "./Buttons";
import BodyBookingRes from "./BodyBookingRes";
import dateGen from "../../../helper/date-generator";
import { USERS_IMAGE_URL } from "../../../config";

import classes from "./BodyBookingContent.module.css";
import { Link } from "react-router-dom";

const BodyBookingContent = (props) => {
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (props.data.status === "PENDING") {
      setAnswered(false);
    } else {
      setAnswered(true);
    }
  }, [props.data.status]);

  const startingDate = dateGen(props.data.startingDate);
  const endingDate = dateGen(props.data.endingDate);
  return (
    <div className={classes["body__booking__content"]}>
      <Link
        to={`/korisnik/${props.data.customer._id}`}
        className={classes["body__booking__user"]}
      >
        <img
          src={`${USERS_IMAGE_URL}${props.data.customer.image}`}
          className={classes["user-image"]}
          alt="user profile"
        />
        <p>{props.data.customer.username}</p>
      </Link>
      <div className={classes["body__booking__user-cont"]}>
        <p
          className={classes["body__booking-message"]}
        >{`' ${props.data.message} '`}</p>
      </div>
      <div className={classes["body__booking-date-and-people"]}>
        <div className={classes["body__booking-people"]}>
          <BsFillPeopleFill className={classes["body__booking-icon"]} />
          <p className={classes["body__booking-people-num"]}>
            {`${props.data.people}`}
          </p>
        </div>
        <div className={classes["body__booking-date"]}>
          <MdEventAvailable className={classes["body__booking-icon"]} />
          <p>
            {startingDate} &mdash; {endingDate}
          </p>
        </div>
        <div className={classes["body__booking-price"]}>
          <p>
            <span>{props.data.price}</span>
            {` KM`}
          </p>
        </div>
      </div>
      {/* <div className={classes["body__booking-separator"]} /> */}
      {!answered && <Buttons data={props.data} />}
      {answered && <BodyBookingRes data={props.data} status={true} />}
    </div>
  );
};

export default BodyBookingContent;
