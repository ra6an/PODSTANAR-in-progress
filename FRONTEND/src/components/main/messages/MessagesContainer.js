//
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMessages } from "../../store/reducers/auth-slice";
import UsersMessages from "./UsersMessages";
import OneUserMessagesContainer from "./OneUserMessagesContainer";

import classes from "./MessagesContainer.module.css";
import PlaceholderForConv from "./PlaceholderForConv";

const MessagesContainer = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, user, isAuthenticated, currentConversation } = useSelector(
    (state) => state.auth
  );

  console.log(location.pathname.split("/").length);

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getAllMessages(user._id, `${JSON.stringify(token)}`));
    }
  }, [dispatch, user._id, token, isAuthenticated]);
  return (
    <div className={classes["messages__container"]}>
      <UsersMessages />
      {location.pathname.split("/").length === 3 && currentConversation && (
        <OneUserMessagesContainer />
      )}
      {location.pathname.split("/").length < 3 && <PlaceholderForConv />}
    </div>
  );
};

export default MessagesContainer;
