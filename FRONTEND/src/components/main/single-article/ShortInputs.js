//
import { useSelector, useDispatch } from "react-redux";
import { bookingActions } from "../../store/redux-store";

import classes from "./ShortInputs.module.css";

const ShortInputs = (props) => {
  const { createBooking } = useSelector((state) => state.booking);
  const dispatch = useDispatch();

  const setStartingDate = (e) => {
    e.preventDefault();
    dispatch(
      bookingActions.setCheckBookingValidity({
        value: { startingDate: e.target.value },
      })
    );
  };

  const setEndingDate = (e) => {
    e.preventDefault();
    dispatch(
      bookingActions.setCheckBookingValidity({
        value: { endingDate: e.target.value },
      })
    );
  };

  return (
    <div className={classes["short__inputs-container"]}>
      <div>
        <label htmlFor="date-from">Od</label>
        <input
          onChange={setStartingDate}
          value={createBooking.startingDate.split("T")[0]}
          type="date"
          id="date-from"
          name="date-from"
          min={Date.now()}
        />
      </div>
      <span>&mdash;</span>
      <div>
        <label htmlFor="date-to">Do</label>
        <input
          value={createBooking.endingDate.split("T")[0]}
          onChange={setEndingDate}
          type="date"
          id="date-to"
          name="date-to"
        />
      </div>
    </div>
  );
};

export default ShortInputs;
