//

import classes from "./NotificationHeaderBookingResponse.module.css"; //

const NotificationHeaderBookingResponse = (props) => {
  return (
    <div className={classes["notifications__header__booking__response"]}>
      <div
        className={classes["notifications__header__booking__response-mark"]}
      />
      <p className={classes["notifications__header-typeof"]}>
        <p>BOOKING</p>
        <p>ODGOVOR</p>
      </p>
      <div className={classes["notifications__header-separator"]} />
    </div>
  );
};

export default NotificationHeaderBookingResponse;
