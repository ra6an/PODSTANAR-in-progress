//
import { useDispatch, useSelector } from "react-redux";
import { respondToBooking } from "../../store/reducers/booking-slice";
import { socket } from "../../../helper/socket-connection";

import classes from "./Buttons.module.css";

const Buttons = (props) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const acceptBooking = (e) => {
    e.preventDefault();
    dispatch(respondToBooking(props.data._id, { response: "APPROVED" }, token));
    socket.emit("notification send", {
      userId: props.data.customer._id,
      type: "booking-response",
    });
  };

  const rejectBooking = (e) => {
    e.preventDefault();
    dispatch(respondToBooking(props.data._id, { response: "REJECTED" }, token));
    socket.emit("notification send", {
      userId: props.data.customer._id,
      type: "booking-response",
    });
  };

  return (
    <div className={classes["body__booking-btns"]}>
      <button
        onClick={rejectBooking}
        type="button"
        className={`${classes["body__booking-btn"]} ${classes["reject"]}`}
      >
        Odbij
      </button>
      <button
        onClick={acceptBooking}
        type="button"
        className={`${classes["body__booking-btn"]} ${classes["accept"]}`}
      >
        Prihvati
      </button>
    </div>
  );
};

export default Buttons;
