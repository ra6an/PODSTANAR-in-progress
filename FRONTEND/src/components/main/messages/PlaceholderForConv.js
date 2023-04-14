//
import { TiMessages } from "react-icons/ti";

import classes from "./PlaceholderForConv.module.css";

const PlaceholderForConv = (props) => {
  return (
    <div className={classes["placeholder__conv"]}>
      <TiMessages className={classes["placeholder-icon"]} />
    </div>
  );
};

export default PlaceholderForConv;
