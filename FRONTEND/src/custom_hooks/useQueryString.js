import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articleActions } from "../components/store/redux-store";
import { getAllArticles } from "../components/store/reducers/article-slice";

// custom modules
import queryStrCreator from "../helper/query-str-creator";

const useQueryString = () => {
  // console.log("da");
  const [recievedQuery, setRecievedQuery] = useState("");
  const [queryStr, setQueryStr] = useState("");
  // const [clearAll, setClearAll] = useState(null);
  const [clearAll, setClearAll] = useState(true);
  const [fillQuery, setFillQuery] = useState({
    page: 1,
    searchFilters: {},
    currCategory: "",
    search: "",
  });
  // const [fillQuery, setFillQuery] = useState(null);
  const dispatch = useDispatch();
  // const { searchFilters } = useSelector((state) => state.article);

  // GENERISEMO QUERY STRING SA FILTERIMA
  // const generateQueryStr = queryStrCreator(
  //   fillQuery.page,
  //   fillQuery.searchFilters,
  //   fillQuery.currCategory,
  //   fillQuery.search
  // );

  // setQueryStr(`${generateQueryStr}`);

  // useEffect(() => {
  //   setGuard(true);
  // }, [clearAll, fillQuery]);

  // console.log(clearAll, fillQuery, recievedQuery);

  useEffect(() => {
    // console.log("query string");
    if (recievedQuery.length > 1) {
      const destructuredQuery = recievedQuery
        .slice(1, recievedQuery.length)
        .split("&");

      destructuredQuery.forEach((filter) => {
        if (filter.split("=")[0].includes("city") && !filter.includes("false"))
          dispatch(
            articleActions.setSearchFilters({ city: filter.split("=")[1] })
          );
        if (filter.split("=")[0].includes("city") && filter.includes("false"))
          dispatch(articleActions.setSearchFilters({ city: false }));
        if (filter.split("=")[0].includes("price[gte]"))
          dispatch(
            articleActions.setSearchFilters({ minPrice: +filter.split("=")[1] })
          );
        if (filter.split("=")[0].includes("price[lte]"))
          dispatch(
            articleActions.setSearchFilters({ maxPrice: +filter.split("=")[1] })
          );
        if (filter.split("=")[0].includes("area[gte]"))
          dispatch(
            articleActions.setSearchFilters({ minArea: +filter.split("=")[1] })
          );
        if (filter.split("=")[0].includes("area[lte]"))
          dispatch(
            articleActions.setSearchFilters({ maxArea: +filter.split("=")[1] })
          );
        if (filter.split("=")[0].includes("people"))
          dispatch(
            articleActions.setSearchFilters({ people: +filter.split("=")[1] })
          );
        if (filter.split("=")[0].includes("bed"))
          dispatch(
            articleActions.setSearchFilters({ bed: +filter.split("=")[1] })
          );
        if (
          (filter.split("=")[0].includes("true") || filter.includes("false")) &&
          !filter.split("=")[0].includes("city")
        ) {
          const key = filter.split("=")[0];
          const obj = {};
          obj[key] = filter.split("=")[1];
          dispatch(articleActions.setSearchFilters(obj));
        }
        if (filter.split("=")[0].includes("category"))
          dispatch(
            articleActions.setCurrentCategory({ value: filter.split("=")[1] })
          );
      });
    }
  }, [recievedQuery, dispatch]);

  useEffect(() => {
    // //////////////////////////////////////////
    // console.log(Object.keys(fillQuery.searchFilters).length);
    // if (Object.keys(fillQuery.searchFilters).length !== 0) {
    // console.log(fillQuery);

    // //////////////////////////////////////////

    const generateQueryStr = queryStrCreator(
      fillQuery.page,
      fillQuery.searchFilters,
      fillQuery.currCategory,
      fillQuery.search
    );

    setQueryStr(`${generateQueryStr}`);

    dispatch(
      articleActions.setCurrentCategory({ value: fillQuery.currCategory })
    );
    dispatch(articleActions.setCurrentArticlePage({ value: fillQuery.page }));
    dispatch(articleActions.setQueryStringURL({ value: `${queryStr}` }));
    dispatch(getAllArticles({ urlExt: queryStr }));
    // }
  }, [fillQuery, dispatch, queryStr]);

  useEffect(() => {
    dispatch(articleActions.setQueryStringURL({ value: null }));
    dispatch(articleActions.resetSearchFilters());
    dispatch(articleActions.setCurrentCategory({ value: "" }));
    dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
    dispatch(articleActions.setSearch({ value: "" }));
    dispatch(getAllArticles());

    setQueryStr("");
  }, [dispatch, clearAll]);

  return {
    clearAll,
    setClearAll,
    setFillQuery,
    queryStr,
    setRecievedQuery,
    // fetchAllArticles,
    // fetchFilteredArticles,
  };
};

export default useQueryString;
