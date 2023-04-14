//
import BodyBooking from "./BodyBooking";
import BodyBookingResponse from "./BodyBookingResponse";
import BodyReview from "./BodyReview";

import classes from "./NotificationBody.module.css";

const NotificationBody = (props) => {
  const bodyType = (() => {
    if (props.type === "booking") {
      return <BodyBooking data={props.data} />;
    } else if (props.type === "booking-response") {
      return <BodyBookingResponse data={props.data} status={true} />;
    } else if (props.type === "review") {
      return <BodyReview data={props.data} />;
    }
  })();

  return <div className={classes["notifications__body"]}>{bodyType}</div>;
};

export default NotificationBody;
