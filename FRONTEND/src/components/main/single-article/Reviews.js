//
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import classes from "./Reviews.module.css";

const Reviews = (props) => {
  const [firstInit, setFirstInit] = useState(true);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsForRender, setReviewsForRender] = useState([]);

  useEffect(() => {
    if (firstInit && props.data.length < 6) setReviewsForRender(props.data);
    if (firstInit && props.data.length > 6)
      setReviewsForRender(props.data.slice(0, 6));
    setFirstInit(false);
  }, [props.data, firstInit]);

  const reviewsLength = props.data.length;
  // console.log(Math.ceil(reviewsLength / 6));
  console.log(reviewsPage);
  console.log(props.data);
  console.log(reviewsForRender);
  const moveBackward = (e) => {
    e.preventDefault();
    if (reviewsPage > 0) {
      setReviewsPage(reviewsPage - 1);
      setReviewsForRender(
        props.data.slice((reviewsPage - 1) * 6, reviewsPage * 6)
      );
    }
  };

  const moveForward = (e) => {
    e.preventDefault();
    if (reviewsPage < Math.ceil(reviewsLength / 6) - 1) {
      setReviewsPage(reviewsPage + 1);
      setReviewsForRender(
        props.data.slice((reviewsPage + 1) * 6, (reviewsPage + 2) * 6)
      );
    }
  };

  // console.log(reviewsPage);

  // const reviews = props.data.map((review) => (
  //   <Review key={review._id} id={review._id} data={review} />
  // ));
  const reviews = reviewsForRender.map((review) => (
    <Review key={review._id} id={review._id} data={review} />
  ));
  return (
    <div className={classes.reviews}>
      <button
        type="button"
        className={classes["reviews-btn"]}
        onClick={moveBackward}
      >
        <BsFillArrowLeftCircleFill className={classes["reviews-icons"]} />
      </button>
      {/* <h2 className={classes["reviews__title"]}>&mdash;UTISCI&mdash;</h2> */}
      <ul className={classes["reviews__list"]}>{reviews}</ul>
      <button
        type="button"
        className={classes["reviews-btn"]}
        onClick={moveForward}
      >
        <BsFillArrowRightCircleFill className={classes["reviews-icons"]} />
      </button>
    </div>
  );
};

export default Reviews;
