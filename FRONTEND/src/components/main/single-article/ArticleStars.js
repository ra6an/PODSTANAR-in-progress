//
import { useSelector } from "react-redux";
import { BiArrowFromTop, BiArrowToTop } from "react-icons/bi";
import starGenerator from "../../../helper/star-generator";

import classes from "./ArticleStars.module.css";

const ArticleStars = (props) => {
  const { article } = useSelector((state) => state.article);
  const showHideReviews = (e) => {
    e.preventDefault();
    props.showReviews.setShow(!props.showReviews.show);
  };

  const stars = starGenerator(
    article.rating,
    classes["article__stars-icon-star"]
  );
  return (
    <div className={classes["article__stars"]}>
      <h2 className={classes["article__stars-title"]}>ocjena</h2>
      <div className={classes["article__stars-footer"]}>
        <div className={classes["article__stars-rating"]}>
          {stars}
          {/* <ImStarFull className={classes["article__stars-icon-star"]} />
          <ImStarFull className={classes["article__stars-icon-star"]} />
          <ImStarFull className={classes["article__stars-icon-star"]} />
          <ImStarHalf className={classes["article__stars-icon-star"]} />
          <ImStarEmpty className={classes["article__stars-icon-star"]} /> */}
          <span>{`(${article.reviews.length})`}</span>
        </div>
        <div
          className={classes["article__stars-btn"]}
          onClick={showHideReviews}
        >
          Pogledaj utiske
          {!props.showReviews.show && (
            <BiArrowFromTop className={classes["article__stars-btn-icon"]} />
          )}
          {props.showReviews.show && (
            <BiArrowToTop className={classes["article__stars-btn-icon"]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleStars;
