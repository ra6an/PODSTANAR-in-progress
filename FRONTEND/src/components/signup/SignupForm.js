//
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/redux-store";
import AuthInput from "../utils/AuthInput";

import { signup } from "../store/reducers/auth-slice";

import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassTouched, setConfirmPassTouched] = useState(false);
  const {
    username,
    email,
    password,
    confirmPassword,
    usernameIsValid,
    emailIsValid,
    passwordIsValid,
    confirmPasswordIsValid,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.clearAuthInputs());
  }, [dispatch]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(
      signup({ username, email, password, passwordConfirm: confirmPassword })
    );
  };

  const setUsername = (e) => {
    e.preventDefault();
    dispatch(authActions.setUsername({ value: e.target.value }));
    setUsernameTouched(true);
  };

  const setEmail = (e) => {
    e.preventDefault();
    dispatch(authActions.setEmail({ value: e.target.value }));
    setEmailTouched(true);
  };

  const setPassword = (e) => {
    e.preventDefault();
    dispatch(authActions.setPassword({ value: e.target.value }));
    setPasswordTouched(true);
  };

  const setConfirmPassword = (e) => {
    e.preventDefault();
    dispatch(authActions.setConfirmPassword({ value: e.target.value }));
    setConfirmPassTouched(true);
  };

  return (
    <form onSubmit={submitForm} className={classes["signup__form"]}>
      <AuthInput
        type="text"
        for="username"
        value={username}
        onChangeInput={setUsername}
        isValid={usernameTouched ? usernameIsValid : null}
      />
      <AuthInput
        type="email"
        for="email"
        value={email}
        onChangeInput={setEmail}
        isValid={emailTouched ? emailIsValid : null}
      />
      <AuthInput
        type="password"
        for="password"
        value={password}
        onChangeInput={setPassword}
        isValid={passwordTouched ? passwordIsValid : null}
      />
      <AuthInput
        type="password"
        for="password-confirm"
        value={confirmPassword}
        onChangeInput={setConfirmPassword}
        isValid={confirmPassTouched ? confirmPasswordIsValid : null}
      />
      <button type="submit" className={classes["auth__btn"]}>
        registruj se
      </button>
    </form>
  );
};

// type="text"
//         for="username"
//         value={username}
//         onChangeInput={setUsername}
//         isValid={usernameTouched ? usernameIsValid : null}

export default SignupForm;
