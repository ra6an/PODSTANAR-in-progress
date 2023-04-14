//
import AuthInput from "../../utils/AuthInput";

import classes from "./MyAccountContainer.module.css";
import UserMainDetails from "./UserMainDetails";

const MyAccountContainer = (props) => {
  return (
    <div className={classes["my__account__container"]}>
      <div className={classes["separator"]} />
      <UserMainDetails />
      <div className={classes["separator"]} />
      <div className={classes["my__account-details"]}></div>
      <div className={classes["separator"]} />
      <form className={classes["my__account-password-change"]}>
        <div className={classes["my__account-input-container"]}>
          <AuthInput for="stara-šifra" type="password" />
        </div>
        <AuthInput
          for="nova-šifra"
          type="password"
          message="Šifra mora sadržavati minimalno 8 karaktera"
        />
        <AuthInput
          for="ponovi-šifru"
          type="password"
          message="Šifra mora sadržavati minimalno 8 karaktera"
        />
        <button type="submit" className={classes["my__account-btn"]}>
          Promijeni šifru
        </button>
      </form>
      <div className={classes["separator"]} />
    </div>
  );
};

export default MyAccountContainer;
