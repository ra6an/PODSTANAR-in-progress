//
import { useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticles, getArticle } from "../../store/reducers/article-slice";
// import { articleActions } from "../../store/redux-store";
import Article from "./Article";
import Paginnation from "../../UI/Paginnation";

import classes from "./ArticlesContainer.module.css";

const ArticlesContainer = (props) => {
  // const location = useLocation();
  const dispatch = useDispatch();
  // const [renderArticles, setRenderArticles] = useState({});
  const { allArticles, currentCategory, currentArticlePage, numOfPages } =
    useSelector((state) => state.article);

  // useEffect(() => {
  //   if (!queryStringURL) dispatch(getAllArticles());
  // }, [dispatch, queryStringURL]);

  // useEffect(() => {
  //   if (queryStringURL) {
  //     location.search = `${queryStringURL}`;
  //     dispatch(getAllArticles({ urlExt: queryStringURL }));
  //   }
  // }, [dispatch, queryStringURL, location]);

  let styleContainer = {};

  if (currentCategory === "") {
    styleContainer = { borderColor: `var(--light-2)` };
  } else {
    styleContainer = { borderColor: `var(--${currentCategory})` };
  }

  const getArticleData = (e) => {
    e.preventDefault();
    if (e.target.closest("a")) {
      dispatch(getArticle(e.target.closest("a").id));
    }
  };

  // setRenderArticles(
  //   allArticles.map((article) => (
  //     <Article key={article._id} id={article._id} data={article} />
  //   ))
  // );
  const articles = allArticles.map((article) => (
    <Article key={article._id} id={article._id} data={article} />
  ));

  return (
    <Fragment>
      <div
        onClick={getArticleData}
        style={styleContainer}
        className={classes["articles-container"]}
      >
        {/* {renderArticles} */}
        {articles}
      </div>
      <div className={classes["articles-paginnator"]}>
        <Paginnation
          type="articles"
          currentPage={currentArticlePage}
          // currentPage={40}
          numOfPages={numOfPages}
          // numOfPages={40}
        />
      </div>
    </Fragment>
  );
};

export default ArticlesContainer;
