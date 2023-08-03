import React from "react";
import styles from "./header.module.css";
import imagePath from "../assets/tekdi-logo-black.png";
import profilePath from "../assets/profile-image.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const myCourses = () => {
    navigate("/mycourses");
  };

  const myAnalytics = () => {
    navigate("/myanalytics");
  };
  const myHome = () => {
    navigate("/home");
  };
  const myTag = () => {
    navigate("/tagcontent");
  };
  const loggedout = () => {
    navigate("/");
  };
  return (
    <React.Fragment>
      <div className={styles.headerDiv}>
        <div>
          <img src={imagePath} style={{ width: "50px", height: "auto" }} />
        </div>

        <div
          style={{
            textAlign: "center",
            marginLeft: "10px",
            borderLeft: "2px solid gray",
            paddingLeft: "10px",
          }}
        >
          <h3>Provide Education and Skilling Opportunities</h3>
        </div>
        <div className={styles.menuDiv}>
          <a className={styles.anchor} onClick={myHome}>
            Home
          </a>
          <a className={styles.anchor} onClick={myTag}>
            TagContent
          </a>
          <a className={styles.anchor} onClick={myCourses}>
            MyCourses
          </a>
          <a className={styles.anchor} onClick={myAnalytics}>
            Analytics
          </a>
          <div className={styles.profile}>
            <img
              src={profilePath}
              alt="Girl in a jacket"
              width="20"
              height="20"
            />
            <button className={styles.logoutButton} onClick={loggedout}>
              Log out
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
