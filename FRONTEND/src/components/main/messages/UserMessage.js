//
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/redux-store";

import classes from "./UserMessage.module.css";

import { USERS_IMAGE_URL } from "../../../config";

const UserMessage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const messageUser =
    props.data.userOne._id === user._id
      ? props.data.userTwo
      : props.data.userOne;

  const messages = props.data.messages;

  const setCurrentChat = (e) => {
    e.preventDefault();
    dispatch(authActions.setCurrentUserForChat({ value: messageUser }));
    dispatch(authActions.setCurrentConversation({ data: props.data }));
    // dispatch(authActions.setCurrentChatId({ value: props.id }));

    navigate(`/poruke/${props.id}`);
  };

  return (
    <Link
      to={`/poruke/${props.id}`}
      onClick={setCurrentChat}
      id={props.id}
      className={`${classes["user__message"]} ${
        params.conversationId === props.id ? classes.active : ""
      }`}
    >
      <div
        className={classes["user__message-img"]}
        style={
          messageUser?.image && {
            backgroundImage: `url("${USERS_IMAGE_URL}${messageUser.image}")`,
          }
        }
      ></div>
      <div className={classes["msg-status"]}></div>
      <div className={classes["user__message-body"]}>
        <p className={classes["user__message-nickname"]}>
          {messageUser.username}
        </p>
        <p className={classes["user__message-message"]}>
          {messages[messages.length - 1].text}
        </p>
      </div>
    </Link>
  );
};

export default UserMessage;
