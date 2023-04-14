//
import { Link } from "react-router-dom";
import { USERS_IMAGE_URL } from "../../../config";

import classes from "./BodyHeader.module.css";

const BodyHeader = (props) => {
  console.log(props.data);
  const recipient = props.data.customer
    ? props.data.customer
    : props.data.creator;
  return (
    <div className={classes["body__booking-header"]}>
      <Link to="/user/nekiId" className={classes["body__booking-user"]}>
        <div
          className={classes["body__booking-image"]}
          style={{
            backgroundImage: `url("${USERS_IMAGE_URL}${recipient.image}")`,
          }}
        />
        <p>{recipient.username}</p>
      </Link>
    </div>
  );
};

export default BodyHeader;
