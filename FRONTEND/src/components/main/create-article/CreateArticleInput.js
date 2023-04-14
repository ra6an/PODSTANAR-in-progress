//

import classes from "./CreateArticleInput.module.css";

const CreateArticleInput = (props) => {
  return (
    <div className={props.style}>
      <label htmlFor={props.name} className={props.styleLabel}>
        {props.name.split("-").join(" ")}
      </label>
      <input
        onChange={props.onChange}
        spellCheck={false}
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.name}
        className={props.styleInput}
      ></input>
    </div>
  );
};

export default CreateArticleInput;
