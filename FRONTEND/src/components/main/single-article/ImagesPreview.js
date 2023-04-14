//
import { useRef, useState, useEffect } from "react";
import { ARTICLES_IMAGE_URL } from "../../../config";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import classes from "./ImagesPreview.module.css";

const ImagesPreview = (props) => {
  const imgContainer = useRef();

  // BLOCK SCROLLING /////////////////////////
  const blockVerticalScroll = (e) => {
    disableBodyScroll(window, { reserveScrollBarGap: true });
  };

  const enableVerticalScroll = (e) => {
    enableBodyScroll(window);
  };

  const scrollBox = (e) => {
    if (e.deltaY > 0) {
      imgContainer.current.scrollLeft += 100;
    } else {
      imgContainer.current.scrollLeft -= 100;
    }
  };

  const images = props.data.images.map((image) => (
    <div
      onClick={(e) => {
        e.preventDefault();
        props.onClick(image);
      }}
      id={image}
      key={image}
      className={classes["image-container"]}
      style={{
        backgroundImage: `url(${ARTICLES_IMAGE_URL}${image})`,
      }}
    />
  ));

  return (
    <div className={classes["images__preview-container"]}>
      <div
        ref={imgContainer}
        onMouseEnter={blockVerticalScroll}
        onMouseLeave={enableVerticalScroll}
        onWheel={scrollBox}
        id="image"
        className={classes["images__preview-list"]}
      >
        {images}
      </div>
    </div>
  );
};

export default ImagesPreview;
