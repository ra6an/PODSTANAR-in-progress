//
import BodyHeader from "./BodyHeader";
import BodyReviewContent from "./BodyReviewContent";

import classes from "./BodyReview.module.css";

const BodyReview = (props) => {
  return (
    <div className={classes["body__review"]}>
      <BodyHeader data={props.data} />
      <BodyReviewContent data={props.data} />
    </div>
  );
};

export default BodyReview;
