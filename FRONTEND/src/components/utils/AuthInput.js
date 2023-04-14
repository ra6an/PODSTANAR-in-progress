//

import classes from "./AuthInput.module.css";

const AuthInput = (props) => {
  let isValid;
  if (props.isValid !== null) {
    isValid = props.isValid ? classes["valid"] : classes["invalid"];
  }

  const labelName = props.for.split("-").join(" ");
  return (
    <div className={`${classes["input-div"]}`}>
      <label htmlFor={props.for}>{`${labelName}:`}</label>
      <input
        className={isValid}
        id={props.for}
        type={props.type}
        name={props.for}
        value={props.value}
        onChange={props.onChangeInput}
      />
      <p className={classes["addition-guide"]}>{props.message}</p>
    </div>
  );
};

export default AuthInput;
