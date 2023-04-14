//
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ArticleStars from "./ArticleStars";
import ArticleImages from "./ArticleImages";
import ArticleUser from "./ArticleUser";
import ArticleBooking from "./ArticleBooking";
import Details from "./Details";
import Map from "../../UI/Map";

import classes from "./ArticleBody.module.css";

const ArticleBody = (props) => {
  const { article } = useSelector((state) => state.article);
  const [usersCoordinates, setUsersCoordinates] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getLatLon);

    function getLatLon(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setUsersCoordinates([longitude, latitude]);
    }
  }, []);

  if (Object.keys(article).length === 0) return <p>cekaj</p>;

  console.log(article.address.coordinates.length);

  return (
    <div className={`${classes["article__body"]}`}>
      <ArticleImages data={article} />
      <div className={classes["article__body-content"]}>
        <div className={classes["article__description"]}>
          <div>
            <h2>Detaljan opis</h2>
            <p className={classes["article__description-text"]}>
              {article.description}
            </p>
          </div>
          <Details data={article} />
          <ArticleUser data={article} />
        </div>
        <div className={classes["article__right-side"]}>
          <ArticleBooking data={article} class={classes["justify-end"]} />
        </div>
      </div>
      {article.address.coordinates.length > 0 && (
        <Map usersCoordinates={usersCoordinates} data={article} />
      )}
      <ArticleStars data={article} showReviews={props.showReviews} />
    </div>
  );
};

export default ArticleBody;
