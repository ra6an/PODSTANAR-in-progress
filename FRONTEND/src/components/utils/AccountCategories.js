//
import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import classes from "./AccountCategories.module.css";

const AccountCateories = (props) => {
  const myProfile = useRef();
  const myArticles = useRef();
  const createArticle = useRef();
  const buyCredit = useRef();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/moj-profil" &&
      myProfile.current !== undefined
    ) {
      myProfile.current.classList.add(`${classes.active}`);
    } else if (
      location.pathname === "/moji-oglasi" &&
      myArticles.current !== undefined
    ) {
      myArticles.current.classList.add(`${classes.active}`);
    } else if (
      location.pathname === "/objavi-oglas" &&
      createArticle.current !== undefined
    ) {
      createArticle.current.classList.add(`${classes.active}`);
    } else if (
      location.pathname === "/dopuni-kredit" &&
      buyCredit.current !== undefined
    ) {
      buyCredit.current.classList.add(`${classes.active}`);
    }
  }, [location]);

  return (
    <div className={classes["account__categories"]}>
      <Link
        to="/moj-profil"
        ref={myProfile}
        className={classes["account__categorie"]}
      >
        <p>Moj profil</p>
      </Link>
      <Link
        to="/moji-oglasi"
        ref={myArticles}
        className={classes["account__categorie"]}
      >
        <p>Moji oglasi</p>
      </Link>
      <Link
        to="/objavi-oglas"
        ref={createArticle}
        className={classes["account__categorie"]}
      >
        <p>Objavi oglas</p>
      </Link>
      <Link
        to="/dopuni-kredit"
        ref={buyCredit}
        className={classes["account__categorie"]}
      >
        <p>Dopuni kredit</p>
      </Link>
    </div>
  );
};

export default AccountCateories;
