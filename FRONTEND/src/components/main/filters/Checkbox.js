//
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { BsCheckCircleFill, BsCheckCircle } from "react-icons/bs";
import { AiFillCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";

import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
  const dispatch = useDispatch();
  const { searchFilters } = useSelector((state) => state.article);

  const lowercaseFor = props.for.toLowerCase();

  const setCheckbox = (e) => {
    e.preventDefault();

    const objectForDispatch = {};
    objectForDispatch[`${e.target.id}`] = !searchFilters[props.forDb];

    dispatch(articleActions.setSearchFilters(objectForDispatch));
  };

  const setCreateArticleCheckbox = (e) => {
    e.preventDefault();
    const objectForDispatch = {};
    objectForDispatch[`${e.target.id}`] = !searchFilters[props.forDb];

    dispatch(articleActions.setCreateArticle(objectForDispatch));
  };

  return (
    <div
      className={props.className}
      id={props.forDb}
      onClick={props.type === "filter" ? setCheckbox : setCreateArticleCheckbox}
    >
      <p id={props.forDb} className={classes.label} htmlFor={lowercaseFor}>
        {props.for}
      </p>
      {!searchFilters[props.forDb] && (
        <AiOutlineCheckSquare
          id={props.forDb}
          className={classes["chk__box-false"]}
        />
      )}
      {searchFilters[props.forDb] && (
        <AiFillCheckSquare
          id={props.forDb}
          className={classes["chk__box-true"]}
        />
      )}
      {/* <input
        className={classes.input}
        type="checkbox"
        name={lowercaseFor}
        id={lowercaseFor}
        onChange={setCheckbox}
      /> */}
    </div>
  );
};

export default Checkbox;
