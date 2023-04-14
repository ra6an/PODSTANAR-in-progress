//
import { useState } from "react";
import ImagesPreview from "./ImagesPreview";
import ImageFullScreen from "./ImageFullScreen";

import { ARTICLES_IMAGE_URL } from "../../../config";
import classes from "./ArticleImages.module.css";
import { useEffect } from "react";

// console.log(process.env.ARTICLES_IMAGE_URL);

const ArticleImages = (props) => {
  const [showImages, setShowImages] = useState(false);
  const [currentImage, setCurrentImage] = useState(`${props.data.images[0]}`);

  useEffect(() => {
    setCurrentImage(`${props.data.images[0]}`);
  }, [props.data]);

  return (
    <div className={classes["article__imgs-container"]}>
      {showImages && (
        <ImageFullScreen
          hideImages={setShowImages}
          currentImg={currentImage}
          setCurrentImg={setCurrentImage}
          images={props.data.images}
        />
      )}
      <div
        onClick={(e) => {
          e.preventDefault();
          setShowImages(true);
        }}
        className={classes["article__imgs-border"]}
        style={{
          backgroundImage: `url("${ARTICLES_IMAGE_URL}${currentImage}")`,
        }}
      >
        {/* <img src={}></img> */}
      </div>
      <ImagesPreview data={props.data} onClick={setCurrentImage} />
    </div>
  );
};

export default ArticleImages;
