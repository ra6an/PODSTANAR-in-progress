//
import { useSelector } from "react-redux";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import classes from "./Message.module.css";

const Message = (props) => {
  const { user } = useSelector((state) => state.auth);

  const messageClass =
    props.data.creator === user._id
      ? classes["my-message"]
      : classes["users-message"];

  const date = props.data.createdAt.split("T")[0];

  const sentAt = `${`${date}`.split("-")[2]}-${`${date}`.split("-")[1]}-${
    `${date}`.split("-")[0]
  }`;

  return (
    <div className={messageClass}>
      <p className={classes["message-text"]}>{props.data.text}</p>
      {/* <div className={classes["separator"]} /> */}
      <div className={classes["message-footer"]}>
        <p>{sentAt}</p>
        {/*!props.seen && (
          <AiFillEyeInvisible className={classes["message-seen-icon"]} />
        )*/}
        {/* {props.seen && <AiFillEye className={classes["message-seen-icon"]} />} */}
      </div>
    </div>
  );
};

export default Message;
