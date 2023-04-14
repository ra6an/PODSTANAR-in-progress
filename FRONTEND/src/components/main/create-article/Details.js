//
import CheckBox from "../filters/Checkbox";

import classes from "./Details.module.css";

const Details = (props) => {
  return (
    <div className={classes["create__article__form-details"]}>
      <p className={classes["create__article__form-details-title"]}>
        Dodatne opcije:
      </p>
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="balkon"
        for="Balkon"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="internet"
        for="Internet"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="garaza"
        for="Garaža"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="kablovska"
        for="Kablovska"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="renoviran"
        for="Renoviran"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="novogradnja"
        for="Novogradnja"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="bazen"
        for="Bazen"
      />
      <CheckBox
        type="create-article"
        className={classes["create__article-checkbox"]}
        forDb="klima"
        for="Klima"
      />
    </div>
  );
};

export default Details;
