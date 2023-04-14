//
import { useSelector } from "react-redux";
import { MdOutlineLocationOn, MdEventAvailable } from "react-icons/md";
import { FaMoneyBillWaveAlt, FaCoins } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import starGenerator from "../../../helper/star-generator";

import classes from "./ArticleBody.module.css";

const ArticleBody = (props) => {
  const { currentCategory } = useSelector((state) => state.article);

  const stars = starGenerator(
    props.data.rating,
    classes["article__icon-rating"]
  );

  // const styleHeader =
  //   props.data.status === "premium"
  //     ? {
  //         backgroundImage: `linear-gradient(to top right, var(--${props.data.category}), var(--white))`,
  //       }
  //     : {};

  const status = props.data.status;

  const city = props.data.city
    .split("-")
    .map(
      (word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)}`
    )
    .join(" ");

  return (
    <div className={classes["article__body"]}>
      {/* <div style={styleHeader} className={classes["article__header"]}>
        <h2>{props.data.title}</h2>
      </div> */}
      {/* {!currentCategory && (
        <div
          className={`${classes[`${props.data.category}`]} ${
            classes[`article__category`]
          }`}
        />
      )} */}
      <div className={classes["article__stars"]}>
        {stars}
        {/* <span
          className={classes["article__stars-number"]}
        >{`(${props.data.reviews.length})`}</span> */}
      </div>
      <div className={classes["article__footer"]}>
        <div
          className={`${classes["article__footer-segment"]} ${classes["location"]}`}
        >
          <MdOutlineLocationOn className={classes["article__icon"]} />
          <span className={classes["article-city"]}>{`${city} / `}</span>
          <span className={classes["article-street"]}>{props.data.street}</span>
        </div>
        {/* <div
          className={`${classes["article__footer-segment"]} ${classes["days"]}`}
        >
          <MdEventAvailable className={classes["article__icon"]} />
          <span>1-7 Dana</span>
        </div> */}
        <div className={classes["article__footer-price-segment"]}>
          <div className={`${classes["article__footer-segment"]}`}>
            <FaCoins className={classes["article__icon-coins"]} />
            <span className={classes["price"]}>{`${props.data.price}`}</span>
            <span className={classes["price-currency"]}>{`KM/${
              props.data.kratkorocno ? "dan" : "mjesec"
            }`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleBody;
