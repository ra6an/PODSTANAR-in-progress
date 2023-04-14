//
import { useSelector } from "react-redux";
import MessageForm from "./MessageForm";
import OneUserMessages from "./OneUserMessages";

import classes from "./OneUserMessagesContainer.module.css";

const OneUserMessagesContainer = (props) => {
  const { currentUserForChat } = useSelector((state) => state.auth);

  return (
    <div className={classes["one__user__messages__container"]}>
      <h2 className={classes["one__user__messages__container-user"]}>
        {currentUserForChat.username}
      </h2>
      <OneUserMessages />
      <MessageForm chatId={props?.chatId} msgUser={currentUserForChat} />
    </div>
  );
};

export default OneUserMessagesContainer;
