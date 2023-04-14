//
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImage from "../../images/logomy.png";
import { articleActions } from "../store/redux-store";

// custom hooks
import useQueryString from "../../custom_hooks/useQueryString";

import classes from "./HeaderLogo.module.css";

const HeaderLogo = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearAll, setClearAll } = useQueryString();

  const mainPageRedirectHandler = (e) => {
    e.preventDefault();

    setClearAll(!clearAll);

    // dispatch(articleActions.setQueryStringURL({ value: null }));
    // dispatch(articleActions.resetSearchFilters());
    // dispatch(articleActions.setCurrentCategory({ value: "" }));
    // dispatch(articleActions.setCurrentArticlePage({ value: 1 }));
    // dispatch(articleActions.setSearch({ value: "" }));

    navigate("/oglasi");
  };

  return (
    <Link
      to="/"
      onClick={mainPageRedirectHandler}
      className={classes["header-logo"]}
    >
      <img
        className={classes["header-logo-img"]}
        src={logoImage}
        alt="logo podstanar"
      />
      <h2>Podstanar.ba</h2>
    </Link>
  );
};

export default HeaderLogo;
