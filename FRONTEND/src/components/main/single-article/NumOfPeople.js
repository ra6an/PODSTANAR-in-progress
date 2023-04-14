import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { Box, Slider } from "@mui/material";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import classes from "./NumOfPeople.module.css";

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
      // boxShadow: "0 0 0 8px var(--color-blue)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      // backgroundColor: "var(--color-blue-light)",
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
    // color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
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

const NumberOfPeopleInput = (props) => {
  const dispatch = useDispatch();
  const { searchFilters } = useSelector((state) => state.article);
  const [sliderValue, setSliderValue] = useState(1);

  const setNumOfPeople = (e) => {
    dispatch(articleActions.setSearchFilters({ people: e.target.value }));
  };

  // SLIDER
  useEffect(() => {
    const test = setTimeout(() => {
      dispatch(articleActions.setSearchFilters({ people: +sliderValue }));
    }, 1 * 50);
    return () => {
      clearTimeout(test);
    };
  }, [sliderValue, dispatch]);

  useEffect(() => {
    setSliderValue(+searchFilters.people);
  }, [searchFilters.people]);

  const handleChange = (event, newValue) => {
    setSliderValue(+event.target.value);
  };
  return (
    <div className={props.className}>
      <p>
        Broj osoba: {sliderValue === 10 ? `${sliderValue}+` : `${sliderValue}`}
      </p>
      <Box className={classes.slider}>
        <AirbnbSlider
          components={{ Thumb: AirbnbThumbComponent }}
          defaultValue={1}
          value={sliderValue}
          onChange={handleChange}
          min={1}
          max={10}
        />
      </Box>
      {/* <div className={classes["sub__category-price-and-area"]}>
        <div>
          <input
            onChange={setNumOfPeople}
            type="number"
            name="broj-ljudi"
            id="broj-ljudi"
            className={classes["ppl-input"]}
            value={searchFilters.people}
          ></input>
        </div>
      </div> */}
    </div>
  );
};

export default NumberOfPeopleInput;
