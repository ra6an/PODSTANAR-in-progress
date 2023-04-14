//
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";

import classes from "./Category.module.css";

const Cat = (props) => {
  const dispatch = useDispatch();
  // const { createArticle } = useSelector((state) => state.article);

  const setCategory = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ category: e.target.id }));
  };
  return (
    <div
      onClick={setCategory}
      style={
        props.isCurrent === props.category
          ? { backgroundColor: `var(--${props.category})` }
          : {}
      }
      className={classes["category"]}
      id={props.category}
    >
      {props.name}
    </div>
  );
};

const Category = (props) => {
  const { createArticle } = useSelector((state) => state.article);

  return (
    <div className={classes["categories"]}>
      <h2>Odaberite kategoriju:</h2>
      <div className={classes["categories-container"]}>
        <Cat
          isCurrent={createArticle.category}
          category="stanovi"
          name="Stanovi"
        />
        <Cat isCurrent={createArticle.category} category="kuce" name="Kuće" />
        <Cat
          isCurrent={createArticle.category}
          category="apartmani"
          name="Apartmani"
        />
        <Cat
          isCurrent={createArticle.category}
          category="poslovni"
          name="Poslovni prostori"
        />
        <Cat
          isCurrent={createArticle.category}
          category="vikendice"
          name="Vikendice"
        />
        <Cat isCurrent={createArticle.category} category="sobe" name="Sobe" />
      </div>
    </div>
  );
};

export default Category;
