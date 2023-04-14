//
import AccountCategories from "../components/utils/AccountCategories";
import MyArticlesContainer from "../components/main/my-articles/MyArticlesContainer";

import classes from "./MyArticles.module.css";

const MyArticles = (props) => {
  return (
    <div className={classes["my__articles-container"]}>
      <AccountCategories />
      <MyArticlesContainer />
    </div>
  );
};

export default MyArticles;
