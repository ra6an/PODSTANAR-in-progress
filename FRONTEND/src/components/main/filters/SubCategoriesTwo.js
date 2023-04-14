//
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticles } from "../../store/reducers/article-slice";
import { articleActions } from "../../store/redux-store";
import { BiSearchAlt } from "react-icons/bi";
import Checkbox from "./Checkbox";
import queryStrCreator from "../../../helper/query-str-creator";

import classes from "./SubCategoriesTwo.module.css";

const SubCategoriesTwo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchFilters, currentCategory, search } = useSelector(
    (state) => state.article
  );

  const showFilters = (e) => {
    e.preventDefault();
    props.showOptions(false);
  };

  const searchFilteredArticle = (e) => {
    e.preventDefault();
    const queryStr = `${queryStrCreator(
      1,
      searchFilters,
      currentCategory,
      search
    )}`;

    navigate(`${queryStr}`);
    dispatch(articleActions.setQueryStringURL({ value: queryStr }));

    dispatch(getAllArticles({ urlExt: `${queryStr}` }));
    dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
  };

  return (
    <div className={classes["sub__category-two"]}>
      <p className={classes["sub__category-two-header"]}>filteri</p>
      <form>
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="novogradnja"
          for="Novogradnja"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="namjesten"
          for="Namješten"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="kablovska"
          for="Kablovska TV"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="internet"
          for="Internet"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="bazen"
          for="Bazen"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="klima"
          for="Klima"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="garaza"
          for="Garaža"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="balkon"
          for="Balkon"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="kratkorocno"
          for="Kratkoročno"
        />
        <Checkbox
          type="filter"
          className={classes["sub__two-checkbox"]}
          forDb="dugorocno"
          for="Dugoročno"
        />
      </form>
      <div className={classes["sub__two-btn"]}>
        {/* <button type="submit" onClick={showFilters}>
          natrag
        </button> */}
        <button
          onClick={searchFilteredArticle}
          className={classes["search-button"]}
          type="submit"
        >
          <p>pretraži</p>
          <BiSearchAlt className={classes["search-icon"]} />
        </button>
      </div>
    </div>
  );
};

export default SubCategoriesTwo;
