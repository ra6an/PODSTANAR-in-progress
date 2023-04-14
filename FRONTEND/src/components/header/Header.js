//
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import HeaderLogo from "./HeaderLogo";
import HeaderLinks from "./HeaderLinks";
import AuthHeader from "./AuthHeader";
import HeaderSearch from "./HeaderSearch";
import HeaderBottom from "./HeaderBottom";

import classes from "./Header.module.css";

const Header = (props) => {
  // const location = useLocation();
  // const [showSearch, setShowSearch] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (location.pathname === "/" && location.pathname.split("/").length <= 3) {
  //     setShowSearch(true);
  //   } else if (
  //     location.pathname.split("/")[1] === "artikli" &&
  //     location.pathname.split("/").length <= 3
  //   ) {
  //     setShowSearch(true);
  //   } else {
  //     setShowSearch(false);
  //   }
  // }, [location.pathname]);
  return (
    <div className={classes.header}>
      <div className={classes["header-container"]}>
        <HeaderLogo />
        {isAuthenticated && <HeaderLinks />}
        {!isAuthenticated && <AuthHeader />}
      </div>
      {/* <div className={classes.split}></div> */}
      {/* {showSearch && <HeaderSearch className={classes["header-search"]} />} */}
      {/* {!showSearch && <HeaderBottom className={classes["header-bottom"]} />} */}
    </div>
  );
};

export default Header;
