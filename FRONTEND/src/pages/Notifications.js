//
import NotificationsContainer from "../components/main/notifications/NotificationsContainer";

import classes from "./Notifications.module.css";

const Notifications = (props) => {
  return (
    <div className={classes["notifications"]}>
      {/* <h2 className={classes["notifications-title"]}>
        &mdash;Notifikacije&mdash;
      </h2> */}
      <NotificationsContainer />
    </div>
  );
};

export default Notifications;
