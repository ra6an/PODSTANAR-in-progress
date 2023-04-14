//
import { Link } from "react-router-dom";

import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";

import classesPremium from "./Article.module.css";
import classesStandard from "./ArticleStandard.module.css";

const Article = (props) => {
  const status = props.data.status;
  let styleArticle;
  if (status === "premium") styleArticle = classesPremium["article__container"];
  if (status === "standard")
    styleArticle = classesStandard["article__container"];

  return (
    <Link
      to={`/oglasi/${props.data.category}/${props.id}`}
      className={styleArticle}
      id={props.id}
      key={props.id}
      onClick={props.onClick}
    >
      <ArticleHeader status={props.data.status} data={props.data} />
      <ArticleBody data={props.data} />
    </Link>
  );
};

export default Article;
