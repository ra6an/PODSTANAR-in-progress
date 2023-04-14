//
import CreateArticleForm from "./CreateArticleForm";
import Category from "./Category";

import classes from "./CreateArticleContainer.module.css";

const CreateArticleContainer = (props) => {
  return (
    <div className={classes["create__article__container"]}>
      <Category />
      <CreateArticleForm />
    </div>
  );
};

export default CreateArticleContainer;
