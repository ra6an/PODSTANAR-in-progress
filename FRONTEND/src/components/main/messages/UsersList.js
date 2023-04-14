//
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserMessage from "./UserMessage";

import classes from "./UsersList.module.css";

const UsersList = (props) => {
  // const [allConversations, setAllConversations] = useState([]);
  const { messages } = useSelector((state) => state.auth);

  let allConversations;

  // useEffect(() => {
  if (messages) {
    allConversations = messages.map((conv) => (
      <UserMessage key={conv._id} data={conv} id={conv._id} />
    ));
  }
  // });

  return <div className={classes["users__list"]}>{allConversations}</div>;
};

export default UsersList;
