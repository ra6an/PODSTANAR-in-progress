import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { getAllArticles } from "../store/reducers/article-slice";
import { articleActions } from "../store/redux-store";
import queryStrCreator from "../../helper/query-str-creator";
import PaginnationBtn from "./PaginnationBtn";

// custom hooks
import useQueryString from "../../custom_hooks/useQueryString";

import classes from "./Paginnation.module.css";

const Paginnation = (props) => {
  const [queryString, setQueryString] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchFilters, search, currentCategory, queryStringURL } =
    useSelector((state) => state.article);
  const { setFillQuery, queryStr } = useQueryString();
  const currentPage = props.currentPage;
  const numOfPages = props.numOfPages;
  // const [currentPage, setCurrentPage] = useState(props.currentPage);
  // const [numOfPages, setNumOfPages] = useState(props.numOfPages);

  // setCurrentPage(props.currentPage);
  // setNumOfPages(props.numOfPages);

  // useEffect(() => {
  //   navigate(queryStr);
  // }, [queryStr, navigate]);

  const pageHandler = (e) => {
    console.log("sto ovo se pali");
    setFillQuery({
      page: e.target.id,
      searchFilters: searchFilters,
      currCategory: currentCategory,
      search: search,
    });

    const queryStr = queryStrCreator(
      e.target.id,
      searchFilters,
      currentCategory,
      search
    );

    navigate(`${queryStr}`);
  };

  const firstPageHandler = (e) => {
    if (props.numOfPages) {
      const queryStr = queryStrCreator(
        1,
        searchFilters,
        currentCategory,
        search
      );
      dispatch(getAllArticles({ urlExt: queryStr }));
      dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
    } else if (props.numOfMyPages) {
    }
  };

  const lastPageHandler = (e) => {
    if (props.numOfPages) {
      const queryStr = queryStrCreator(
        numOfPages,
        searchFilters,
        currentCategory,
        search
      );

      navigate(`${queryStr}`);
      dispatch(articleActions.setQueryStringURL({ value: queryStr }));
      dispatch(getAllArticles({ urlExt: queryStr }));
      dispatch(
        articleActions.setCurrentArticlePage({ value: props.numOfPages })
      );
    } else if (props.type === "myPosts") {
    }
  };

  // console.log(props);

  return (
    <div className={classes["paginnation-container"]}>
      <ul className={classes.paginnator}>
        <li
          id="1"
          key="left-arrow"
          className={classes["margin__left"]}
          onClick={firstPageHandler}
        >
          <AiOutlineDoubleLeft className={classes["paggintor-icon"]} />
        </li>

        {/* TEST ODAVDE */}

        {/*
        {currentPage === 6 && numOfPages <= 9 && (
          <PaginnationBtn curPage={currentPage - 4} onClick={pageHandler} />
        )}
        {(currentPage === 6 || currentPage === 5) && numOfPages <= 9 && (
          <PaginnationBtn curPage={currentPage - 4} onClick={pageHandler} />
        )}
        {(currentPage === 6 || currentPage === 5 || currentPage === 4) &&
          numOfPages <= 9 && (
            <PaginnationBtn curPage={currentPage - 3} onClick={pageHandler} />
          )}
        {(currentPage === 6 ||
          currentPage === 5 ||
          currentPage === 4 ||
          currentPage === 3) &&
          numOfPages <= 9 && (
            <PaginnationBtn curPage={currentPage - 2} onClick={pageHandler} />
          )}
        {(currentPage === 2 ||
          currentPage === 3 ||
          currentPage === 4 ||
          currentPage === 5 ||
          currentPage === 6) &&
          numOfPages <= 9 && (
            <PaginnationBtn curPage={currentPage - 1} onClick={pageHandler} />
          )}
          */}

        {/* TEST DOVDE */}

        {currentPage >= 5 && (numOfPages >= 9 || currentPage <= 9) && (
          <PaginnationBtn curPage={currentPage - 4} onClick={pageHandler} />
        )}
        {currentPage >= 4 && (numOfPages >= 9 || currentPage <= 9) && (
          <PaginnationBtn curPage={currentPage - 3} onClick={pageHandler} />
        )}
        {currentPage >= 3 && (numOfPages >= 9 || currentPage <= 9) && (
          <PaginnationBtn curPage={currentPage - 2} onClick={pageHandler} />
        )}
        {currentPage >= 2 && (numOfPages >= 9 || currentPage <= 9) && (
          <PaginnationBtn curPage={currentPage - 1} onClick={pageHandler} />
        )}

        <PaginnationBtn
          curPage={currentPage}
          onClick={pageHandler}
          className={classes.active}
        />

        {numOfPages >= currentPage + 1 && numOfPages >= 2 && (
          <PaginnationBtn curPage={currentPage + 1} onClick={pageHandler} />
        )}
        {numOfPages >= currentPage + 2 && numOfPages >= 3 && (
          <PaginnationBtn curPage={currentPage + 2} onClick={pageHandler} />
        )}
        {numOfPages >= currentPage + 3 && numOfPages >= 4 && (
          <PaginnationBtn curPage={currentPage + 3} onClick={pageHandler} />
        )}
        {numOfPages >= currentPage + 4 && numOfPages >= 5 && (
          <PaginnationBtn curPage={currentPage + 4} onClick={pageHandler} />
        )}
        {currentPage <= 4 && numOfPages >= 7 && (
          <PaginnationBtn curPage={currentPage + 5} onClick={pageHandler} />
        )}
        {currentPage <= 3 && numOfPages >= 8 && (
          <PaginnationBtn curPage={currentPage + 6} onClick={pageHandler} />
        )}
        {currentPage <= 2 && numOfPages >= 9 && (
          <PaginnationBtn curPage={currentPage + 7} onClick={pageHandler} />
        )}
        {currentPage <= 1 && numOfPages >= 10 && (
          <PaginnationBtn curPage={currentPage + 8} onClick={pageHandler} />
        )}

        {currentPage === 1 && numOfPages <= 9 && numOfPages >= 6 && (
          <PaginnationBtn curPage={numOfPages} onClick={pageHandler} />
        )}
        <li
          id={numOfPages}
          key="right-arrow"
          className={classes["margin__right"]}
          onClick={lastPageHandler}
        >
          <AiOutlineDoubleRight className={classes["paggintor-icon"]} />
        </li>
      </ul>
      {/* <div className={classes.paginnation}>
        {currentPage} / {numOfPages}
      </div> */}
    </div>
  );
};

export default Paginnation;
