//
import { Link } from "react-router-dom";
import BodyHeader from "./BodyHeader";
import BodyBookingContent from "./BodyBookingContent";
import Article from "../artikli/Article";

import classes from "./BodyBooking.module.css";

const BodyBooking = (props) => {
  return (
    <div className={classes["body__booking"]}>
      <Article
        data={props.data.article}
        key={props.data.article._id}
        id={props.data.article._id}
      />
      {/* <BodyHeader data={props.data} /> */}
      <BodyBookingContent data={props.data} />
    </div>
  );
};

export default BodyBooking;
