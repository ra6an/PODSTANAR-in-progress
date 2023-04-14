//
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";

import classes from "./CityInput.module.css";

const gradovi = [
  "Izaberi grad",
  "Banja Luka",
  "Bihać",
  "Bijeljina",
  "Bosanska Krupa",
  "Cazin",
  "Čapljina",
  "Derventa",
  "Doboj",
  "Goražde",
  "Gračanica",
  "Gradačac",
  "Gradiška",
  "Istočno Sarajevo",
  "Konjic",
  "Livno",
  "Lukavac",
  "Ljubuški",
  "Mostar",
  "Orašje",
  "Prijedor",
  "Sarajevo",
  "Srebrenik",
  "Stolac",
  "Široki Brijeg",
  "Trebinje",
  "Tuzla",
  "Visoko",
  "Zavidovići",
  "Zenica",
  "Zvornik",
  "Živinice",
];

const CityInput = (props) => {
  const dispatch = useDispatch();
  const { searchFilters } = useSelector((state) => state.article);

  const cityList = gradovi.map((city) => {
    return (
      <option
        key={city.toLowerCase()}
        value={city.toLowerCase().split(" ").join("-")}
      >
        {city}
      </option>
    );
  });

  const selectCity = (e) => {
    e.preventDefault();
    dispatch(articleActions.setSearchFilters({ city: e.target.value }));
  };

  return (
    <div className={props.className}>
      <label htmlFor="grad">Grad</label>
      <div className={classes["separator"]} />
      <select
        onChange={selectCity}
        className={classes["select-category"]}
        name="grad"
        id="grad"
        form="gradovi"
        value={searchFilters.city}
      >
        {cityList}
      </select>
    </div>
  );
};

export default CityInput;
