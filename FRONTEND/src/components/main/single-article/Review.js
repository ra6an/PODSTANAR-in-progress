//
import { Link } from "react-router-dom";
import starGenerator from "../../../helper/star-generator";

import classes from "./Review.module.css";

const Review = (props) => {
  const stars = starGenerator(props.data.rating, classes["review-icon-star"]);
  const date = `${props.data.createdAt.split("T")[0].split("-")[2]}-
    ${props.data.createdAt.split("T")[0].split("-")[1]}-${
    props.data.createdAt.split("T")[0].split("-")[0]
  }`;
  return (
    <div className={classes["review"]}>
      <div className={classes["review__user"]}>
        <Link to={`/user/raban`} className={classes["review__username"]}>
          {props.data.creator.username}
        </Link>
      </div>
      <p className={classes["review__text"]}>{props.data.review}</p>
      <div className={classes["review__footer"]}>
        <p>{date}</p>
        <div>{stars}</div>
      </div>
    </div>
  );
};

export default Review;
