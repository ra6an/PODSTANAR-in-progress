//
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { authActions } from "../../store/redux-store";
import Message from "./Message";

import classes from "./OneUserMessages.module.css";

const OneUserMessages = (props) => {
  const dispatch = useDispatch();
  const container = useRef();
  const params = useParams();
  // const [currConv, setCurrConv] = useState();
  const [renderMessages, setRenderMessages] = useState();
  const [firstInit, setFirstInit] = useState(true);
  const { currentConversation, messages, newMessage } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (firstInit) {
      setFirstInit(false);
      container.current.scrollTop = container.current.scrollHeight;
    }
    if (messages) console.log(container.current.scrollHeight);
    container.current.scrollTop = container.current.scrollHeight;
  }, [firstInit, messages, newMessage]);

  useEffect(() => {
    if (
      newMessage.length > 0 &&
      newMessage.some((msg) => msg === currentConversation._id)
    ) {
      console.log("tu smo", newMessage);
      dispatch(authActions.setSeenMessages({ value: currentConversation._id }));
    }
  }, [newMessage, dispatch, currentConversation, params]);

  useEffect(() => {
    if (!currentConversation && params.conversationId && messages.length > 0) {
      const dataConv = messages.filter(
        (conv) => conv._id === params.conversationId
      )[0];
      dispatch(authActions.setCurrentConversation({ data: dataConv }));
    }
  }, [dispatch, params.conversationId, messages, currentConversation]);

  useEffect(() => {
    if (currentConversation?.messages) {
      setRenderMessages(
        currentConversation.messages.map((msg) => (
          <Message key={msg._id || Math.random()} data={msg} />
        ))
      );
    }
  }, [currentConversation]);

  return (
    <div ref={container} className={classes["one__user__messages"]}>
      {renderMessages}
      {/* <div className={classes["background-icon-container"]}>
        <TiMessages className={classes["background-icon"]} />
      </div> */}
    </div>
  );
};

export default OneUserMessages;
