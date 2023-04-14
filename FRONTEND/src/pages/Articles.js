//
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Categories from "../components/main/filters/Categories";
import SubCategories from "../components/main/filters/SubCategories";
import SubCategoriesTwo from "../components/main/filters/SubCategoriesTwo";
import Filters from "../components/main/filters/Filters";
import ArticlesContainer from "../components/main/artikli/ArticlesContainer";
import Loading from "../components/UI/Loading";
import { getAllArticles } from "../components/store/reducers/article-slice";

// custom hooks
import useQueryString from "../custom_hooks/useQueryString";

import classes from "./Articles.module.css";

// let firstInit = true;

const Articles = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const { allArticles, queryStringURL, currentArticlePage, searchFilters } =
    useSelector((state) => state.article);
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    // setFillQuery,
    setRecievedQuery,
    // fetchAllArticles,
    // fetchFilteredArticles,
  } = useQueryString();

  // console.log(searchFilters);
  useEffect(() => {
    console.log("da");
    if (!location.search) {
      dispatch(getAllArticles());
      // fetchAllArticles();
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    console.log("da");
    // console.log(location.search);
    if (location.search) {
      setRecievedQuery(location.search);
      // fetchFilteredArticles();
    }
    // }, [dispatch, location.search]);
  }, [dispatch, location.search, setRecievedQuery]);

  // useEffect(() => {
  // if (queryStringURL) {
  //   location.search = `${queryStringURL}`;
  //   dispatch(getAllArticles({ urlExt: queryStringURL }));
  // }
  // }, [dispatch, queryStringURL]);

  const loading = allArticles.length === 0;
  return (
    <Fragment>
      <div className={classes["articles-container"]}>
        <Categories />
        <div className={classes["articles-filters"]}>
          <Filters show={showOptions} showOptions={setShowOptions} />
          {showOptions && <SubCategories />}
          {showOptions && <SubCategoriesTwo showOptions={setShowOptions} />}
          {/* {!showOptions && <Filters showOptions={setShowOptions} />} */}
        </div>
        {loading && (
          <div className={classes["loading"]}>
            <Loading />
          </div>
        )}
        {!loading && <ArticlesContainer />}
      </div>
    </Fragment>
  );
};

export default Articles;
