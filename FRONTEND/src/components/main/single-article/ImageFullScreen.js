//
import { ARTICLES_IMAGE_URL } from "../../../config";

import classes from "./ImageFullScreen.module.css";

const ImageFullScreen = (props) => {
  const hideImages = (e) => {
    e.preventDefault();
    if (e.target.id === "overview") {
      props.hideImages(false);
    }
  };

  const images = props.images.map((image) => (
    <div
      onClick={(e) => {
        props.setCurrentImg(image);
      }}
      key={image}
      className={classes["full__screen-other-images-img"]}
      style={{
        backgroundImage: `url('${ARTICLES_IMAGE_URL}${image}')`,
      }}
    />
  ));

  return (
    <div
      onClick={hideImages}
      id="overview"
      className={classes["full__screen-img-container"]}
    >
      <div className={classes["full__screen-main-img-container"]}>
        <div
          className={classes["full__screen-main-img"]}
          style={{
            backgroundImage: `url('${ARTICLES_IMAGE_URL}${props.currentImg}')`,
          }}
        ></div>
      </div>
      <div className={classes["full__screen-other-images"]}>
        <div className={classes["full__screen-other-images-container"]}>
          {images}
        </div>
      </div>
    </div>
  );
};

export default ImageFullScreen;
