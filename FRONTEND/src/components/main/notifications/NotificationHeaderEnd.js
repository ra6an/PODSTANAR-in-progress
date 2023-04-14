//
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";

import classes from "./NotificationHeaderEnd.module.css";

const NotificationHeaderEnd = (props) => {
  const dateArray = props.data.createdAt.split("T")[0].split("-");
  const date = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  return (
    <div className={classes["notification__header-end"]}>
      {/* <div className={classes["notifications__header-separator"]} /> */}
      {/* <div className={classes["notifications__header-date"]}>
        <p>{date}</p>
      </div> */}
      <button
        onClick={props.toggleBody}
        type="button"
        className={classes["notifications__header-btn"]}
      >
        {!props.showBody && (
          <BiArrowFromTop className={classes["notifications__header-icon"]} />
        )}
        {props.showBody && (
          <BiArrowToTop className={classes["notifications__header-icon"]} />
        )}
      </button>
    </div>
  );
};

export default NotificationHeaderEnd;
