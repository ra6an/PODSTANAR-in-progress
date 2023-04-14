//
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { respondToBooking } from "../../store/reducers/booking-slice";
import NotificationHeaderBooking from "./NotificationHeaderBooking";
import NotificationHeaderBookingResponse from "./NotificationHeaderBookingResponse";
import NotificationHeaderReview from "./NotificationHeaderReview";
import NotificationHeaderEnd from "./NotificationHeaderEnd";

import classes from "./NotificationHeader.module.css";

const NotificationHeader = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [classSeen, setClassSeen] = useState("");

  const toggleBody = (e) => {
    e.preventDefault();
    if (location.pathname.split("/")[2] === "booking-odgovori") {
      if (!props.showBody && !props.data.seen) {
        dispatch(respondToBooking(props.data._id, { seen: true }, token));
        setClassSeen(classes.seen);
      }
    }
    props.body.setShowBody(!props.body.showBody);
  };

  const headerType = (() => {
    if (props.type === "booking") {
      return <NotificationHeaderBooking data={props.data} />;
    } else if (props.type === "booking-response") {
      return <NotificationHeaderBookingResponse data={props.data} />;
    } else if (props.type === "review") {
      return <NotificationHeaderReview data={props.data} />;
    }
  })();

  // const classNameForHeader = props.body.showBody ? classes.show : "";

  // let classNameForHeaderStatus;

  // if (location.pathname.split("/")[2] === "booking") {
  //   classNameForHeaderStatus =
  //     props.data.status === "PENDING" && props.data.seen === false
  //       ? classes["notifications__header"]
  //       : classes["notifications__header-seen"];
  // } else if (location.pathname.split("/")[2] === "booking-odgovori") {
  //   classNameForHeaderStatus =
  //     props.data.status !== "PENDING" && props.data.seen === false
  //       ? classes["notifications__header"]
  //       : classes["notifications__header-seen"];
  // }

  return (
    <div
      className={`${classes["notifications__header"]}`}
      style={
        props.data.status === "PENDING"
          ? {}
          : { backgroundColor: "var(--gray-8)" }
      }
      // className={`${classNameForHeaderStatus} ${classSeen} ${classNameForHeader}`}
    >
      {headerType}
      {/* <div className={classes["notifications__header-article"]}>
        <Link
          to={`/artikli/${props.data.article.slug}/${props.data.article._id}`}
          className={classes["notifications__header-link"]}
        >
          {props.data.article.title}
        </Link>
      </div> */}
      <NotificationHeaderEnd
        data={props.data}
        type={props.type}
        showBody={props.body.showBody}
        toggleBody={toggleBody}
      />
    </div>
  );
};

export default NotificationHeader;
