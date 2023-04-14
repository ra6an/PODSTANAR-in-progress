//
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/redux-store";
import AuthInput from "../utils/AuthInput";

import { login } from "../store/reducers/auth-slice";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const dispatch = useDispatch();
  const { username, password, usernameIsValid, passwordIsValid } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(authActions.clearAuthInputs());
  }, [dispatch]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };
  const setUsername = (e) => {
    e.preventDefault();
    dispatch(authActions.setUsername({ value: e.target.value }));
    setUsernameTouched(true);
  };

  const setPassword = (e) => {
    e.preventDefault();
    dispatch(authActions.setPassword({ value: e.target.value }));
    setPasswordTouched(true);
  };
  return (
    <form className={classes["login__form"]} onSubmit={submitForm}>
      <AuthInput
        type="text"
        for="username"
        value={username}
        onChangeInput={setUsername}
        isValid={usernameTouched ? usernameIsValid : null}
      />
      <AuthInput
        type="password"
        for="password"
        value={password}
        onChangeInput={setPassword}
        isValid={passwordTouched ? passwordIsValid : null}
      />
      <button type="submit" className={classes["auth__btn"]}>
        prijavi se
      </button>
    </form>
  );
};

export default LoginForm;
