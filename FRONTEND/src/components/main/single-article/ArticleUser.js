//
import { MdMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { USERS_IMAGE_URL } from "../../../config";

import classes from "./ArticleUser.module.css";

const ArticleUser = (props) => {
  return (
    <div className={classes["article__user"]}>
      <div className={classes["article__user-header"]}>
        <div
          className={classes["article__user-img"]}
          style={{
            backgroundImage: `url('${USERS_IMAGE_URL}/${props.data.owner.image}')`,
          }}
        ></div>
        <Link to="/korisnik/696969" className={classes["article__user-name"]}>
          <p>{props.data.owner.username}</p>
        </Link>
        <div className={classes["article__user-separator"]} />
        <span>{props.data.owner.phone}</span>
      </div>
      <Link to="/poruke/696969" className={classes["article__user-icon-cont"]}>
        <MdMail className={classes["article__user-icon"]} />
      </Link>
    </div>
  );
};

export default ArticleUser;
