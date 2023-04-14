//
import MessagesContainer from "../components/main/messages/MessagesContainer";

// import { socket } from "../helper/socket-connection";

import classes from "./Messages.module.css";

const Messages = (props) => {
  return (
    <div className={classes["messages"]}>
      <MessagesContainer />
    </div>
  );
};

export default Messages;
