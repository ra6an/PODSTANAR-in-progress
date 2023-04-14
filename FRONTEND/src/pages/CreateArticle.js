//
import CreateArticleContainer from "../components/main/create-article/CreateArticleContainer";
import AccountCateories from "../components/utils/AccountCategories";

import classes from "./CreateArticle.module.css";

const CreateArticle = (props) => {
  return (
    <div className={classes["create__article"]}>
      <div className={classes["create__article-cat-container"]}>
        <AccountCateories />
      </div>
      {/* <h2 className={classes["create__article-title"]}>
        &mdash;Objavi oglas&mdash;
      </h2> */}
      <CreateArticleContainer />
    </div>
  );
};

export default CreateArticle;
