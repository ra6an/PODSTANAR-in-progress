//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { getAllArticles } from "../../store/reducers/article-slice";
import Article from "../artikli/Article";
import MyArticlesSection from "../my-articles/MyArticlesSection";

import classes from "./MyArticlesContainer.module.css";

const MyArticlesContainer = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myArticles } = useSelector((state) => state.article);
  const [premiumArticles, setPremiumArticles] = useState([]);
  // const [promotedArticles, setPromotedArticles] = useState([]);
  const [standardArticles, setStandardArticles] = useState([]);
  const [showStandardArticles, setShowStandardArticles] = useState(false);
  // const [showPromotedArticles, setShowPromotedArticles] = useState(false);
  const [showPremiumArticles, setShowPremiumArticles] = useState(false);

  useEffect(() => {
    if (user._id)
      dispatch(
        getAllArticles({ myArticles: true, urlExt: `?owner=${user._id}` })
      );
  }, [dispatch, user._id]);

  useEffect(() => {
    if (myArticles.length > 0) {
      setPremiumArticles(myArticles.filter((a) => a.status === "premium"));
      setStandardArticles(myArticles.filter((a) => a.status === "standard"));
    }
  }, [myArticles]);

  const renderStandardArticles =
    standardArticles.length > 0 &&
    standardArticles.map((a) => <Article key={a._id} id={a._id} data={a} />);

  const renderPremiumArticles =
    premiumArticles.length > 0 &&
    premiumArticles.map((a) => <Article key={a._id} id={a._id} data={a} />);

  return (
    <div className={classes["my__articles-container"]}>
      <div className={classes["my__articles-section"]}>
        <MyArticlesSection
          title="Premium oglasi"
          setShowArticles={setShowPremiumArticles}
          showArticles={showPremiumArticles}
          className={classes["header"]}
          numOfArticles={premiumArticles.length}
        />
        {premiumArticles && (
          <div className={classes["my__articles-list"]}>
            {renderPremiumArticles}
          </div>
        )}
      </div>
      {/*<div className={classes["my__articles-section"]}>
        <MyArticlesSection
          title="Promovisani oglasi"
          setShowArticles={setShowPromotedArticles}
          showArticles={showPromotedArticles}
        />
        {promotedArticles && (
          <div className={classes["my__articles-list"]}>
            {ovdje ce ici promovisani artikli}
          </div>
        )}
        </div>*/}
      <div className={classes["my__articles-section"]}>
        <MyArticlesSection
          title="Standardni oglasi"
          setShowArticles={setShowStandardArticles}
          showArticles={showStandardArticles}
          numOfArticles={standardArticles.length}
        />
        {showStandardArticles && (
          <div className={classes["my__articles-list"]}>
            {renderStandardArticles}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticlesContainer;
