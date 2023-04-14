//
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Routes, Route, Link } from "react-router-dom";
import classes from "./Auth.module.css";

import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignupForm";

const Auth = (props) => {
  const location = useLocation();
  const [loginClass, setLoginClass] = useState(classes["auth__choice-active"]);
  const [signupClass, setSignupClass] = useState(
    classes["auth__choice-inactive"]
  );

  useEffect(() => {
    if (location.pathname.split("/")[2] === "prijava") {
      setLoginClass(classes["auth__choice-active"]);
      setSignupClass(classes["auth__choice-inactive"]);
    } else if (location.pathname.split("/")[2] === "registruj-se") {
      setSignupClass(classes["auth__choice-active"]);
      setLoginClass(classes["auth__choice-inactive"]);
    }
  }, [location.pathname]);

  return (
    <div className={classes.auth}>
      <div className={classes["auth__choice"]}>
        <Link to="/auth/prijava" className={loginClass}>
          <p>Prijava</p>
        </Link>
        <Link to="/auth/registruj-se" className={signupClass}>
          <p>Registruj se</p>
        </Link>
      </div>
      <Routes>
        <Route path="/prijava" element={<LoginForm />} />
        <Route path="/registruj-se" element={<SignupForm />} />
      </Routes>
    </div>
  );
};

export default Auth;
