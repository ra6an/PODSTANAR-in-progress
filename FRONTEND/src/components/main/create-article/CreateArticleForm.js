//
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { articleActions } from "../../store/redux-store";
import { MdOutlineLocationOn, MdEventAvailable } from "react-icons/md";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { BsImages } from "react-icons/bs";
import FormData from "form-data";
import { createNewArticle } from "../../store/reducers/article-slice";

import Details from "./Details";
import CreateArticleInput from "./CreateArticleInput";
import ImagesSection from "./ImagesSection";

import classes from "./CreateArticleForm.module.css";
import GeocoderBox from "../../UI/GeocoderBox";

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

const CreateArticleForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [articleCreated, setArticleCreated] = useState(false);
  const { createArticle, error } = useSelector((state) => state.article);
  const { token } = useSelector((state) => state.auth);
  const long = "dan";
  const cityList = gradovi.map((city) => {
    return (
      <option key={city.toLowerCase()} value={city.toLowerCase()}>
        {city}
      </option>
    );
  });

  const createArticleHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (images) {
      images.forEach((img) => formData.append("images", img));
    }

    Object.keys(createArticle).forEach((key) => {
      formData.append(`${key}`, createArticle[key]);
    });

    dispatch(createNewArticle(formData, token));
    if (error !== "Greska u kreiranju oglasa!") {
      dispatch(articleActions.resetCreateArticle());
      setArticleCreated(true);

      navigate("/oglasi");
    }
  };

  const setTitle = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ title: e.target.value }));
  };

  const setArea = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ area: e.target.value }));
  };

  const setStreet = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ street: e.target.value }));
  };

  const setPrice = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ price: e.target.value }));
  };

  const setDescription = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ description: e.target.value }));
  };

  const setCity = (e) => {
    e.preventDefault();
    dispatch(articleActions.setCreateArticle({ city: e.target.value }));
  };

  return (
    <form className={classes["create__article__form"]}>
      <div className={classes["create__article__form-main"]}>
        <CreateArticleInput
          style={classes["create__article"]}
          styleLabel={classes["create__article-label"]}
          styleInput={classes["create__article-input"]}
          onChange={setTitle}
          name="naslov"
          value={createArticle.title}
          type="text"
        />
        <div className={classes["create__article__form-description"]}>
          <label
            htmlFor="desctiption"
            className={classes["create__article-label"]}
          >
            Opis
          </label>
          <textarea
            spellCheck={false}
            type="text"
            name="desctiption"
            id="desctiption"
            value={createArticle.desctiption}
            onChange={setDescription}
            className={classes["create__article__form-textarea"]}
          ></textarea>
        </div>
        <CreateArticleInput
          style={classes["create__article"]}
          styleLabel={classes["create__article-label"]}
          styleInput={`${classes["create__article-input"]} ${classes["allign-text"]}`}
          name={`površina-objekta-(m²)`}
          type="number"
          value={createArticle.area}
          onChange={setArea}
        />
      </div>
      <div className={classes.separator} />
      <Details />
      <div className={classes.separator} />
      <div className={classes["create__article-location"]}>
        <div className={classes["create__article-location-title"]}>
          <MdOutlineLocationOn />
          <p>Lokacija</p>
        </div>
        <div className={classes["create__article__form-city"]}>
          <label className={classes["create__article-label"]}>Grad</label>
          <select
            className={classes["select-city"]}
            name="grad"
            id="grad"
            form="gradovi"
            value={createArticle.city}
            onChange={setCity}
          >
            {cityList}
          </select>
        </div>
        <CreateArticleInput
          style={`${classes["create__article"]} ${classes["padding-rg"]}`}
          styleLabel={classes["create__article-label"]}
          styleInput={classes["create__article-input"]}
          name="adresa"
          type="text"
          value={createArticle.street}
          onChange={setStreet}
        />
        <GeocoderBox />
      </div>
      <div className={classes.separator} />
      <div className={classes["create__article__form-price"]}>
        <div className={classes["create__article__form-price-title"]}>
          <FaMoneyBillWaveAlt />
          <p>Cijena po danu/mjesecu</p>
        </div>
        <div
          className={`${classes["create__article-days"]} ${classes["margin-lt"]}`}
        >
          <p>1/7 DANA</p>
        </div>
        <div className={classes["create__article-days"]}>
          <p>1/30 DANA</p>
        </div>
        <div className={classes["create__article-days"]}>
          <p>1 MJESECI I VIŠE</p>
        </div>
        <CreateArticleInput
          style={`${classes["create__article"]} ${classes["margin-tp-rg"]}`}
          styleLabel={classes["create__article-label"]}
          styleInput={`${classes["create__article-input"]} ${classes["allign-text"]}`}
          name={`cijena-(KM/${long === "dan" ? "d" : "m"})`}
          type="number"
          value={createArticle.price}
          onChange={setPrice}
        />
      </div>
      <div className={classes.separator} />
      <ImagesSection
        isCreated={articleCreated}
        setIsCreated={setArticleCreated}
        imgTransfer={setImages}
      />
      <div className={classes.separator} />
      <div className={classes["create__article-btn"]}>
        <button
          type="submit"
          onClick={createArticleHandler}
          className={classes["create__article-btn-create"]}
        >
          &ndash; Objavi &ndash;
        </button>
      </div>
    </form>
  );
};

export default CreateArticleForm;
