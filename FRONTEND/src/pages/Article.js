//
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../components/store/reducers/article-slice";

import ArticleBody from "../components/main/single-article/ArticleBody";
import Reviews from "../components/main/single-article/Reviews";

import classes from "./Article.module.css";

const Article = (props) => {
  const params = useParams();
  const { article } = useSelector((state) => state.article);
  const [showReviews, setShowReviews] = useState(false);
  const styleTitle = { borderColor: `var(--${article.category})` };
  const dispatch = useDispatch();

  useEffect(() => {
    if (!article.title) {
      dispatch(getArticle(params.articleId));
    }
  }, [dispatch, article, params]);

  return (
    <div className={classes["article__container"]}>
      {/* <h2 className={classes["article__title"]} style={styleTitle}>
        {article.title}
      </h2> */}
      <ArticleBody
        showReviews={{ setShow: setShowReviews, show: showReviews }}
        class={classes["article__header"]}
      />
      {showReviews && <Reviews data={article.reviews} />}
    </div>
  );
};

export default Article;
