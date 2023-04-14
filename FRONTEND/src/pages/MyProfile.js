//
import AccountCategories from "../components/utils/AccountCategories";
import MyAccountContainer from "../components/main/my-account/MyAccountContainer";

import classes from "./MyProfile.module.css";

const MyProfile = (props) => {
  return (
    <div className={classes["my__profile"]}>
      <AccountCategories />
      <MyAccountContainer />
    </div>
  );
};

export default MyProfile;
