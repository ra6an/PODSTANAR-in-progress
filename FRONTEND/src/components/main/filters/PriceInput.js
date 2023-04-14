//
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { Box, Slider } from "@mui/material";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import classes from "./PriceInput.module.css";

// SLIDER COMPONENTS
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
    backgroundColor: "var(--color-blue)",
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));

const AirbnbThumbComponent = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
};

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const PriceInput = (props) => {
  const dispatch = useDispatch();
  const { searchFilters } = useSelector((state) => state.article);
  const [sliderValue, setSliderValue] = useState([1, 1000]);

  useEffect(() => {
    setSliderValue([searchFilters.minPrice, searchFilters.maxPrice]);
  }, [searchFilters.minPrice, searchFilters.maxPrice]);

  const setLowPrice = (e) => {
    e.preventDefault();
    dispatch(articleActions.setSearchFilters({ minPrice: +e.target.value }));
  };

  const setHighPrice = (e) => {
    e.preventDefault();
    dispatch(articleActions.setSearchFilters({ maxPrice: +e.target.value }));
  };

  useEffect(() => {
    const test = setTimeout(() => {
      dispatch(articleActions.setSearchFilters({ minPrice: +sliderValue[0] }));
      dispatch(articleActions.setSearchFilters({ maxPrice: +sliderValue[1] }));
    }, 1 * 50);
    return () => {
      clearTimeout(test);
    };
  }, [sliderValue, dispatch]);

  useEffect(() => {
    setSliderValue([+searchFilters.minPrice, +searchFilters.maxPrice]);
  }, [searchFilters.minPrice, searchFilters.maxPrice]);

  const handleChange = (event, newValue) => {
    setSliderValue([+event.target.value[0], +event.target.value[1]]);
  };

  return (
    <div className={props.className}>
      <p>
        Cijena&ensp;
        <span>(KM)</span>
      </p>
      <Box className={classes.slider}>
        <AirbnbSlider
          components={{ Thumb: AirbnbThumbComponent }}
          defaultValue={[1, 1000]}
          value={sliderValue}
          onChange={handleChange}
          min={1}
          max={1000}
        />
      </Box>
      <div className={classes["sub__category-price-and-area"]}>
        <div>
          <input
            onChange={setLowPrice}
            type="number"
            name="cijena-min"
            id="cijena-min"
            value={searchFilters.minPrice}
          ></input>
        </div>
        <span>&mdash;</span>
        <div>
          <input
            onChange={setHighPrice}
            type="number"
            name="cijena-max"
            id="cijena-max"
            value={searchFilters.maxPrice}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default PriceInput;
