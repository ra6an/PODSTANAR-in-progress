//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddBox, MdMail } from "react-icons/md";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { USERS_IMAGE_URL } from "../../config";

import { authActions } from "../store/redux-store";
import { socket } from "../../helper/socket-connection";

import classes from "./HeaderLinks.module.css";

const HeaderLinks = (props) => {
  const dispatch = useDispatch();
  const { user, newMessage, newNotification } = useSelector(
    (state) => state.auth
  );
  const { bookings, myBookings } = useSelector((state) => state.booking);
  const [dropbox, setDropbox] = useState(false);
  const [newNotifyB, setNewNotifyB] = useState(false);
  const [newNotifyBR, setNewNotifyBR] = useState(false);
  const [newNotifyR, setNewNotifyR] = useState(false);
  // const [helper, setHelper] = useState([]);

  useEffect(() => {
    if (bookings.filter((booking) => booking.status === "PENDING").length > 0) {
      setNewNotifyB(true);
    } else {
      setNewNotifyB(false);
    }
  }, [bookings]);

  useEffect(() => {
    // setHelper(myBookings.filter((booking) => booking.status !== "PENDING"));
    // if (helper.filter((booking) => booking.seen === false).length > 0) {
    //   setNewNotify(true);
    // } else {
    //   setNewNotify(false);
    // }
    let helper = myBookings.filter((booking) => booking.status !== "PENDING");
    if (helper.filter((booking) => booking.seen === false).length > 0) {
      setNewNotifyBR(true);
    } else {
      setNewNotifyBR(false);
    }
  }, [myBookings]);

  if (socket) {
    socket.on("message recieve", (data) => {
      dispatch(authActions.setNewMsg({ value: true }));
    });

    socket.on("notification recieve", (data) => {
      dispatch(authActions.setNewNotification({ value: true }));
    });
  }

  const showDropbox = (e) => {
    setDropbox(true);
  };

  const hideDropbox = (e) => {
    setDropbox(false);
  };

  return (
    <div className={classes["header__links"]}>
      <Link to="/poruke" className={`${classes["header__links-messages"]}`}>
        <MdMail
          className={`${
            newMessage.length > 0
              ? classes["icon-notification"]
              : classes["header__links-icon"]
          }`}
        />
      </Link>
      <Link
        to="/notifikacije/booking"
        className={`${classes["header__links-notifications"]}`}
      >
        <IoMdNotifications
          className={`${classes["header__links-icon"]} ${
            newNotifyB || newNotifyBR ? classes.notify : ""
          }`}
        />
      </Link>
      <div
        className={classes["header__links-user"]}
        onMouseEnter={showDropbox}
        onMouseLeave={hideDropbox}
      >
        <img
          src={`${USERS_IMAGE_URL}/${user.image}`}
          alt="users profile"
          className={classes["user-image"]}
        />
        <p>{user.username}</p>
        <div
          className={`${
            dropbox ? classes["dropbox__list"] : classes["dropbox__list-hide"]
          }`}
        >
          <div className={classes["dropbox__list-separator"]} />
          <ul className={classes["dropbox__list-ul"]}>
            {/* <ul
            className={`${
              dropbox ? classes["dropbox__list"] : classes["dropbox__list-hide"]
            }`}
          > */}
            <li>
              <Link to="moj-profil" className={classes.link}>
                <p>Moj profil</p>
              </Link>
            </li>
            <li>
              <Link to="moji-oglasi" className={classes.link}>
                <p>Moji oglasi</p>
              </Link>
            </li>
            <li>
              <Link to="objavi-oglas" className={classes.link}>
                <p>Objavi Oglas</p>
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.link}>
                <p>Odjavi se</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderLinks;
