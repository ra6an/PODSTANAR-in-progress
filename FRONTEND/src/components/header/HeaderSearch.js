//
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../store/reducers/article-slice";
import { articleActions } from "../store/redux-store";
import queryStrCreator from "../../helper/query-str-creator";
import { FaSearch } from "react-icons/fa";

import classes from "./HeaderSearch.module.css";

const HeaderSearch = (props) => {
  const dispatch = useDispatch();
  const { currentArticlePage, searchFilters, currentCategory, search } =
    useSelector((state) => state.article);

  const searchArticles = (e) => {
    e.preventDefault();
    const queryStr = queryStrCreator(1, searchFilters, currentCategory, search);
    dispatch(getAllArticles({ urlExt: queryStr }));
    dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
  };

  const setSearch = (e) => {
    e.preventDefault();
    dispatch(articleActions.setSearch({ value: e.target.value }));
  };

  return (
    <div className={props.className}>
      <form onSubmit={searchArticles} className={classes["header__search"]}>
        <div className={classes.separator}></div>
        <input type="search" onChange={setSearch}></input>
        <div className={classes.separator}></div>
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default HeaderSearch;
