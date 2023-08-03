import React, { useEffect } from "react";
import Header from "../components/Header";
import headerStyles from "../styles/tagContent.module.css";
import styles from "../styles/HomePage.module.css";
import imagePath from "../assets/landing-image.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();
  const myTag = () => {
    navigate("/tagcontent");
  };
  return (
    <div>
      <div className={headerStyles.headerDiv}>
        <Header />
      </div>

      <div className={styles.container} style={{ marginTop: "70px" }}>
        <div>
          <div>
            <h2 className={styles.welcomeName}>Hi {userName},</h2>
            <h1 className={styles.welcome}>
              Welcome to ONEST Provider Console.
            </h1>
          </div>
          <div>
            <h3 className={styles.register}>
              TAG and register your content on the portal using the below button
              and be a part of the ONEST network
            </h3>
          </div>
          <div>
            <button className={styles.registerButton} onClick={myTag}>
              TAG CONTENT
            </button>
          </div>
        </div>
        <div>
          {/* <img src={imagePath} style={{ width: "700px", height: "auto" }} /> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
