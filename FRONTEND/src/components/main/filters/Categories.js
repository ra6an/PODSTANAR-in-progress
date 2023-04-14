//
import { useSelector } from "react-redux";
import Categorie from "./Categorie";
import classes from "./Categories.module.css";

const Categories = (props) => {
  const { currentCategory } = useSelector((state) => state.article);
  const isActive = false;
  const isActiveTrue = true;
  return (
    <div className={classes["categories-container"]}>
      <Categorie isActive={isActive} category="stanovi" content="stanovi" />
      <Categorie isActive={isActiveTrue} category="kuce" content="kuće" />
      <Categorie isActive={isActive} category="apartmani" content="apartmani" />
      <Categorie
        isActive={isActive}
        category="poslovni"
        content="poslovni prostori"
      />
      <Categorie isActive={isActive} category="vikendice" content="vikendice" />
      <Categorie isActive={isActive} category="sobe" content="sobe" />
    </div>
  );
};

export default Categories;
