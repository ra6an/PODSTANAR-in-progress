//
import CityInput from "./CityInput";
import PriceInput from "./PriceInput";
import AreaInput from "./AreaInput";
import NumberOfPeopleInput from "./NumberOfPeopleInput";
import NumberOfBedsInput from "./NumberOfBedsInput";

import classes from "./SubCategories.module.css";

const SubCategories = (props) => {
  return (
    <form className={classes["sub__category-form"]}>
      <NumberOfPeopleInput className={classes["sub__category-section"]} />
      <NumberOfBedsInput className={classes["sub__category-section"]} />
      <PriceInput className={classes["sub__category-section"]} />
      <AreaInput className={classes["sub__category-section"]} />
      <CityInput className={classes["sub__category-section"]} />
    </form>
  );
};

export default SubCategories;
