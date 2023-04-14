//
import { ARTICLES_IMAGE_URL } from "../../../config";

import classes from "./ArticleHeader.module.css";

const ArticleHeader = (props) => {
  return (
    // <div
    //   className={`${classes["article__container-img-container"]} ${
    //     props.status === "premium" ? classes.premium : ""
    //   }`}
    // >
    <div
      className={classes["article__container-img"]}
      style={{
        backgroundImage: `url("${ARTICLES_IMAGE_URL}/${props.data.images[0]}")`,
      }}
    ></div>
    // </div>
  );
};

export default ArticleHeader;
