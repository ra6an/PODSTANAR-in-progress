//
import starGenerator from "../../../helper/star-generator";

import classes from "./BodyReviewContent.module.css";

const BodyReviewContent = (props) => {
  const stars = starGenerator(
    props.data.rating,
    classes["body__review__content-icon"]
  );
  return (
    <div className={classes["body__review__content"]}>
      <p className={classes["body__review__content-review"]}>
        {props.data.review}
      </p>
      <div className={classes["body__review__content-separator"]} />
      <div className={classes["body__review__content-stars"]}>{stars}</div>
    </div>
  );
};

export default BodyReviewContent;
