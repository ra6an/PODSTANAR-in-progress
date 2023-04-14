//
import { Link } from "react-router-dom";
import classes from "./AuthHeader.module.css";

const AuthHeader = (props) => {
  return (
    <div className={classes["auth__header"]}>
      <Link className={classes["auth__header-prijava"]} to="/auth/prijava">
        Prijava
      </Link>
      <Link
        className={classes["auth__header-registracija"]}
        to="auth/registruj-se"
      >
        Registruj se
      </Link>
    </div>
  );
};

export default AuthHeader;
