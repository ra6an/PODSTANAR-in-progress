//
import { useState } from "react";
import NotificationHeader from "./NotificationHeader";
import NotificationBody from "./NotificationBody";

import classes from "./Notification.module.css";

const Notification = (props) => {
  const [showBody, setShowBody] = useState(false);
  return (
    <div className={classes["notification"]}>
      <NotificationHeader
        type={props.type}
        body={{ showBody, setShowBody }}
        data={props.data}
      />
      {showBody && <NotificationBody type={props.type} data={props.data} />}
    </div>
  );
};

export default Notification;
