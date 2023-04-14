//
import { BsFilterSquare, BsFilter } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io";
import classes from "./Filters.module.css";

const Filters = (props) => {
  const showFilters = (e) => {
    e.preventDefault();
    props.showOptions(!props.show);
  };
  return (
    <div
      className={`${classes["filters-container"]} ${
        props.show ? classes.active : ""
      }`}
    >
      <p>dodatne opcije pretraživanja</p>
      <BsFilter
        className={`${classes["filters-icon"]} ${
          props.show ? classes["icon-active"] : ""
        }`}
        onClick={showFilters}
      />
    </div>
  );
};

export default Filters;
