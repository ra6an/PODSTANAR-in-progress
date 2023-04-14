//
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { articleActions } from "../../store/redux-store";
import { AiFillStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";
import { BsImages } from "react-icons/bs";

import classes from "./ImagesSection.module.css";

const ImageSingle = (props) => {
  const deleteImage = (e) => {
    e.preventDefault();
    const btnId = e.target.closest("div").id;

    const filteredImages = props.imagesForUpload.filter(
      (k) => k.name !== btnId
    );
    const filteredImagesPreviewURL = props.imagesPreviewURL.filter(
      (k) => k.name !== btnId
    );
    const filteredImagesNames = props.imagesNames.filter((k) => k !== btnId);

    props.setImagesForUpload(filteredImages);
    props.setImagesPreviewURL(filteredImagesPreviewURL);
    props.setImagesNames(filteredImagesNames);
  };

  return (
    <div className={classes["preview-img-container"]}>
      <div className={classes["preview-img"]}>
        <img
          src={props.src}
          id={props.name}
          alt={props.name}
          className={classes["img"]}
        />
      </div>
      <div id={props.name} className={classes["preview-img-buttons"]}>
        <div id={props.name} className={classes["preview-img-btn"]}>
          <AiOutlineStar className={classes["preview-icon"]} />
        </div>
        {/* <div className={classes["preview-img-btn"]}><AiOutlineStar className={classes["preview-icon"]} /></div> */}
        <div
          onClick={deleteImage}
          id={props.name}
          className={classes["preview-img-btn"]}
        >
          <AiFillDelete className={classes["preview-icon"]} />
        </div>
      </div>
    </div>
  );
};

const ImagesSection = (props) => {
  // const dispatch = useDispatch();
  const [imagesForUpload, setImagesForUpload] = useState([]);
  const [imagesPreviewURL, setImagesPreviewURL] = useState([]);
  const [imagesNames, setImagesNames] = useState([]);
  const [imagesPREV, setImagesPREV] = useState([]);
  // const { createArticle } = useSelector((state) => state.article);

  // if (props.isCreated) {
  //   setImagesForUpload([]);
  //   setImagesPreviewURL([]);
  //   setImagesNames([]);
  //   setImagesPREV([]);
  //   props.setIsCreated(false);
  // }

  useEffect(() => {
    setImagesPREV([]);
    imagesPreviewURL.map((img, i) =>
      setImagesPREV((oldState) => [
        ...oldState,
        <ImageSingle
          imagesForUpload={imagesForUpload}
          setImagesForUpload={setImagesForUpload}
          imagesPreviewURL={imagesPreviewURL}
          setImagesPreviewURL={setImagesPreviewURL}
          imagesNames={imagesNames}
          setImagesNames={setImagesNames}
          key={i}
          id={i}
          name={img.name}
          src={img.img}
        />,
      ])
    );
  }, [imagesPreviewURL, imagesForUpload, imagesNames]);

  const setImages = (e) => {
    e.preventDefault();
    const keys = Object.keys(e.target.files);

    keys.forEach((key) => {
      const fileReader = new FileReader();
      let currentFile = e.target.files[key];

      ((file) => {
        if (!imagesNames.includes(file.name)) {
          setImagesForUpload((oldState) => [...oldState, file]);
          setImagesNames((oldState) => [...oldState, file.name]);
          fileReader.onload = () => {
            setImagesPreviewURL((oldState) => [
              ...oldState,
              { name: file.name, img: fileReader.result },
            ]);
          };
          fileReader.readAsDataURL(file);
        }
      })(currentFile);
    });

    // console.log(imagesPreviewURL, imagesForUpload, imagesPREV);
  };

  props.imgTransfer(imagesForUpload);

  return (
    <div className={classes["create__article-images"]}>
      <label
        className={classes["create__article-images-label"]}
        htmlFor="images"
      >
        <BsImages className={classes["create__article-images-icon"]} />
        <p>+ Dodaj slike</p>
      </label>
      <input
        className={classes["create__article-images-input"]}
        type="file"
        name="images"
        id="images"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={setImages}
      />
      <div className={classes["create__article-images-container"]}>
        {imagesPREV}
      </div>
    </div>
  );
};

export default ImagesSection;
