//

import classes from "./NotificationHeaderReview.module.css"; //

const NotificationHeaderReview = (props) => {
  return (
    <div className={classes["notifications__header__review"]}>
      <div className={classes["notifications__header__review-mark"]} />
      <p className={classes["notifications__header-typeof"]}>
        <p>UTISAK</p>
      </p>
      <div className={classes["notifications__header-separator"]} />
    </div>
  );
};

export default NotificationHeaderReview;
