//
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit3 } from "react-icons/fi";
import { BsImages } from "react-icons/bs";
import { updateMe } from "../../store/reducers/auth-slice";

import { USERS_IMAGE_URL } from "../../../config";

import classes from "./UserMainDetails.module.css";

const UserMainDetails = (props) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [uploadedImageURL, setUploadedImageURL] = useState(false);
  const [startEditing, setStartEditing] = useState(false);
  const [imageForUpload, setImageForUpload] = useState();

  const handleImageUpload = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);

    setImageForUpload(e.target.files[0]);

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setUploadedImageURL(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const startEditingHandler = (e) => {
    e.preventDefault();
    setStartEditing(true);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", imageForUpload);
    formData.append("username", "testic");
    formData.append("email", "testttttt@gmail.com");
    formData.append("firstName", "neko");
    formData.append("lastName", "tamo");
    formData.append("phone", "060911321");

    dispatch(updateMe(formData, token));
    setUploadedImageURL(false);
    setStartEditing(false);
  };

  return (
    <div className={classes["my__account-basic-info"]}>
      <div className={classes["my__account-image"]}>
        <img
          src={
            uploadedImageURL ? uploadedImageURL : USERS_IMAGE_URL + user.image
          }
          className={classes["image-user"]}
          alt="uploaded img preview"
        />
      </div>
      <div className={classes["my__account-username"]}>
        <p>{`Korisničko ime: ${user.username}`}</p>
        {/* <FiEdit3 className={classes["my__account-edit-icon"]} /> */}
      </div>
      <div className={classes["my__account-email"]}>
        <p>{`Email: ${user.email}`}</p>
        {/* <FiEdit3 className={classes["my__account-edit-icon"]} /> */}
      </div>
      <div className={classes["my__account-city"]}>
        <p>{`Grad: Sarajevo`}</p>
        {/* <FiEdit3 className={classes["my__account-edit-icon"]} /> */}
      </div>
      <div className={classes["my__account-phone"]}>
        <p>{`Broj: ${user.phone}`}</p>
        {/* <FiEdit3 className={classes["my__account-edit-icon"]} /> */}
      </div>
      <div className={classes["my__account-change-img"]}>
        <label htmlFor="image">
          {/* <BsImages className={classes["my__account-gallery-icon"]} /> */}
          Izaberi sliku
        </label>
        <input
          onChange={handleImageUpload}
          type="file"
          id="image"
          name="image"
        />
      </div>
      {!startEditing && (
        <button
          type="button"
          onClick={startEditingHandler}
          className={classes["my__account-btn"]}
        >
          Izmijeni podatke
        </button>
      )}
      {startEditing && (
        <button
          type="button"
          onClick={submitFormHandler}
          className={classes["my__account-btn"]}
        >
          Spasi izmjene
        </button>
      )}
    </div>
  );
};

export default UserMainDetails;
