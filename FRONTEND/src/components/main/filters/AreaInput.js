//
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { Box, Slider } from "@mui/material";
import { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import classes from "./AreaInput.module.css";

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

const AreaInput = (props) => {
  const dispatch = useDispatch();
  const { searchFilters } = useSelector((state) => state.article);
  const [sliderValue, setSliderValue] = useState([1, 500]);
  const setMinArea = (e) => {
    e.preventDefault();
    dispatch(articleActions.setSearchFilters({ minArea: e.target.value }));
  };

  const setMaxArea = (e) => {
    e.preventDefault();
    dispatch(articleActions.setSearchFilters({ maxArea: e.target.value }));
  };

  // SLIDER

  useEffect(() => {
    const test = setTimeout(() => {
      dispatch(articleActions.setSearchFilters({ minArea: +sliderValue[0] }));
      dispatch(articleActions.setSearchFilters({ maxArea: +sliderValue[1] }));
    }, 1 * 50);
    return () => {
      clearTimeout(test);
    };
  }, [sliderValue, dispatch]);

  useEffect(() => {
    setSliderValue([+searchFilters.minArea, +searchFilters.maxArea]);
  }, [searchFilters.minArea, searchFilters.maxArea]);

  const handleChange = (event, newValue) => {
    setSliderValue([+event.target.value[0], +event.target.value[1]]);
  };

  return (
    <div className={props.className}>
      <p>
        Površina&ensp;
        <span>
          (m<sup className={classes.square}>2</sup>)
        </span>
      </p>
      <Box className={classes.slider}>
        <AirbnbSlider
          components={{ Thumb: AirbnbThumbComponent }}
          defaultValue={[1, 1000]}
          value={sliderValue}
          onChange={handleChange}
          min={1}
          max={500}
        />
      </Box>
      <div className={classes["sub__category-price-and-area"]}>
        <div>
          <input
            onChange={setMinArea}
            type="number"
            name="povrsina-min"
            id="povrsina-min"
            value={searchFilters.minArea}
          ></input>
        </div>
        <span>&mdash;</span>
        <div>
          <input
            onChange={setMaxArea}
            type="number"
            name="povrsina-max"
            id="povrsina-max"
            value={searchFilters.maxArea}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default AreaInput;
