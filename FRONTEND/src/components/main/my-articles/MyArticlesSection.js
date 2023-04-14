//
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";

import classes from "./MyArticlesSection.module.css";

const MyArticlesSection = (props) => {
  const setShowArticles = (e) => {
    e.preventDefault();

    props.setShowArticles(!props.showArticles);
  };
  return (
    <div className={`${classes["my__articles-header"]} ${props.className}`}>
      <h2 className={classes["my__articles-title"]}>
        <p>{props.title + " (" + props.numOfArticles + ")"}</p>
      </h2>
      {props.showArticles && (
        <BiArrowToTop
          onClick={setShowArticles}
          className={classes["my__articles-icon"]}
        />
      )}
      {!props.showArticles && (
        <BiArrowFromTop
          onClick={setShowArticles}
          className={classes["my__articles-icon"]}
        />
      )}
    </div>
  );
};

export default MyArticlesSection;
