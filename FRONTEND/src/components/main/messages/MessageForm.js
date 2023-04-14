//
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../../helper/socket-connection";
import { authActions } from "../../store/redux-store";
import { fetchMessage } from "../../store/reducers/auth-slice";

import classes from "./MessageForm.module.css";

const MessageForm = (props) => {
  const dispatch = useDispatch();
  const [msgValue, setMsgValue] = useState("");
  const { currentConversation, user, token } = useSelector(
    (state) => state.auth
  );

  const sendMessage = (e) => {
    e.preventDefault();

    if (msgValue.length > 0 && msgValue.length <= 250) {
      const currentTime = new Date(Date.now()).toISOString();
      socket.emit("message send", {
        userId: props.msgUser._id,
        creator: user._id,
        msg: msgValue,
        createdAt: currentTime,
        chatId: currentConversation._id,
      });
      const msg = {
        creator: user._id,
        text: msgValue,
        recipient: props.msgUser._id,
        createdAt: currentTime,
        seen: false,
        _id: Math.random(),
      };

      dispatch(
        authActions.pushMessages({
          data: { msg: msg, conversationId: currentConversation._id },
        })
      );
      dispatch(authActions.pushCurrentConversation({ data: msg }));
      dispatch(
        fetchMessage(
          user._id,
          {
            text: msgValue,
            recipient: props.msgUser._id,
            messagesId: currentConversation._id,
          },
          token
        )
      );
      setMsgValue("");
    }
  };

  const msgText = (e) => {
    e.preventDefault();
    setMsgValue(e.target.value);
  };
  return (
    <form onSubmit={sendMessage} className={classes["message__form"]}>
      <textarea
        value={msgValue}
        onChange={msgText}
        spellCheck={false}
      ></textarea>
      <button type="submit" id="posalji">
        Pošalji
      </button>
    </form>
  );
};

export default MessageForm;
