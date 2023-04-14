//
import UsersList from "./UsersList";

import classes from "./UsersMessages.module.css";

const UsersMessages = (props) => {
  return (
    <div className={classes["users__messages"]}>
      <h2 className={classes["users__messages-header"]}>Poruke</h2>
      <UsersList />
    </div>
  );
};

export default UsersMessages;
