//
import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getBookings } from "../../store/reducers/booking-slice";

import Notification from "./Notification";

import classes from "./NotificationsContainer.module.css";

const NotificationsContainer = (props) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { bookings, myBookings } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const [render, setRender] = useState([]);
  // const [newBookingResponse, setNewBookingResponse] = useState([]);
  // const [seenBookingResponse, setSeenBookingResponse] = useState([]);
  const [cat, setCat] = useState("booking");

  useEffect(() => {
    setCat(location.pathname.split("/")[2]);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.split("/")[2] === "booking") {
      setRender(
        bookings.map((b) => (
          <Notification type={"booking"} data={b} key={b._id} id={b._id} />
        ))
      );
    }
  }, [bookings, location.pathname]);

  useEffect(() => {
    if (location.pathname.split("/")[2] === "booking-odgovori") {
      let helper = myBookings.filter((b) => b.status !== "PENDING");
      let helperUnseen = helper.filter((b) => b.seen === false);
      // setNewBookingResponse(helperUnseen);
      let helperSeen = helper.filter((b) => b.seen === true);
      // setSeenBookingResponse(helperSeen);
      let helperForRender = [...helperUnseen, ...helperSeen];

      setRender(
        helperForRender.map((b) => (
          <Notification
            type={"booking-response"}
            data={b}
            key={b._id}
            id={b._id}
          />
        ))
      );
    }
  }, [myBookings, location.pathname]);

  useEffect(() => {
    if (
      user.reviews &&
      user.reviews.length > 0 &&
      location.pathname.split("/")[2] === "utisci"
    ) {
      setRender(
        user.reviews.map((b) => (
          <Notification type={"review"} data={b} key={b._id} id={b._id} />
        ))
      );
    }
  }, [location.pathname, user.reviews]);

  return (
    <div className={classes["notifications__container"]}>
      <div className={classes["notifications__category"]}>
        <Link
          className={`${classes["notifications__cat"]} ${
            cat === "booking" ? classes.active : ""
          }`}
          to="/notifikacije/booking"
        >
          <p>Booking</p>
        </Link>
        <Link
          className={`${classes["notifications__cat"]} ${
            cat === "booking-odgovori" ? classes.active : ""
          }`}
          to="/notifikacije/booking-odgovori"
          id={"booking-odgovori"}
        >
          <p>Booking odgovori</p>
        </Link>
        <Link
          className={`${classes["notifications__cat"]} ${
            cat === "utisci" ? classes.active : ""
          }`}
          to="/notifikacije/utisci"
          id={"utisci"}
        >
          <p>utisci</p>
        </Link>
      </div>
      {render}
    </div>
  );
};

export default NotificationsContainer;
