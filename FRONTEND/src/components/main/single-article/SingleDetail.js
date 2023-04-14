//
import { BiCheck, BiX } from "react-icons/bi";

import classes from "./SingleDetail.module.css";

const SingleDetail = (props) => {
  return (
    <li className={classes["detail-container"]}>
      <p>{props.detail.name}</p>
      {/* <div className={classes["detail-separator"]}></div> */}
      {props.detail.value ? (
        <BiCheck className={classes.true} />
      ) : (
        <BiX className={classes.false} />
      )}
      <div className={classes["detail-separator"]}></div>
    </li>
  );
};

export default SingleDetail;
