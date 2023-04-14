//
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { getAllArticles } from "../../store/reducers/article-slice";
import queryStrCreator from "../../../helper/query-str-creator";

// custom hooks
import useQueryString from "../../../custom_hooks/useQueryString";

import classes from "./Categorie.module.css";

const Categorie = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentArticlePage, currentCategory, searchFilters, search } =
    useSelector((state) => state.article);
  const { setQuery, setFillQuery } = useQueryString();
  let styleActive = {};
  const isActive = currentCategory === props.category;

  // console.log(location);

  if (isActive) {
    styleActive = {
      backgroundColor: `var(--${props.category})`,
      // borderLeft: `0.2rem solid var(--white)`,
      borderColor: `var(--white)`,
      // borderColor: `var(--${props.category})`,
      color: `var(--white)`,
    };
  } else if (currentCategory !== "" && !isActive) {
    styleActive = {
      // borderColor: `var(--white)`,
    };
    // styleActive = { borderColor: `var(--${currentCategory})` };
  }

  const setCategory = (e) => {
    e.preventDefault();
    if (currentCategory !== props.category) {
      const queryStr = queryStrCreator(
        1,
        searchFilters,
        props.category,
        search
      );
      console.log(queryStr, "❤");
      navigate(`${queryStr}`);
      dispatch(articleActions.setQueryStringURL({ value: queryStr }));
      dispatch(articleActions.setCurrentCategory({ value: props.category }));
      dispatch(getAllArticles({ urlExt: queryStr }));
      dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
    } else if (currentCategory === props.category) {
      const queryStr = `${queryStrCreator(1, searchFilters, "", search)}`;
      console.log(queryStr, "🐶");
      navigate(`${queryStr}`);
      dispatch(articleActions.setQueryStringURL({ value: queryStr }));
      dispatch(articleActions.setCurrentCategory({ value: "" }));
      dispatch(getAllArticles({ urlExt: queryStr }));
      dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
    }
    // if (currentCategory !== props.category) {
    //   const filters = queryStrCreator(searchFilters);
    //   const queryStr = `${filters}${
    //     filters.length === 1
    //       ? `category=${props.category}`
    //       : `&category=${props.category}`
    //   }`;
    //   dispatch(articleActions.setCurrentCategory({ value: props.category }));
    //   dispatch(getAllArticles({ urlExt: queryStr }));
    // } else if (currentCategory === props.category) {
    //   const queryStr = `${queryStrCreator(searchFilters)}`;
    //   dispatch(articleActions.setCurrentCategory({ value: "" }));
    //   dispatch(getAllArticles({ urlExt: queryStr }));
    // }
  };

  return (
    <div
      onClick={setCategory}
      className={`${classes["categories"]}`}
      style={styleActive}
    >
      <h3 className={classes["categories-text"]}>{props.content}</h3>
    </div>
  );
};

export default Categorie;
