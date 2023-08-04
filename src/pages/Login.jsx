import React, { useEffect } from "react";
import headerStyles from "../components/header.module.css";
import styles from "../styles/register.module.css";
import imagePath from "../assets/tekdi-logo-black.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UserLoginSchema from "../schema/UserLoginSchema";
import userLoginApi from "../api/userLoginApi";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem("login", true);
    navigate("/");
  };
  useEffect(() => {
    let login = localStorage.getItem("token");
    if (login) {
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UserLoginSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    const result = await userLoginApi(data);

    if (result == true) {
      alert("Logged in successfully.");
      navigate("/home");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #dfe4ff )",
        height: "100vh",
      }}
    >
      <div className={headerStyles.headerDiv}>
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
      </div>

      <div className={styles.formDiv}>
        <form
          className=" card-body form-floating mt-3 mx-1"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="container mb-3">
            <div className="h2" style={{ color: "#0F75BC" }}>
              Log In to ONEST
            </div>
          </div>

          <div className="container mb-3">
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="contentName"
                id="contentName"
                placeholder="Name of the content"
                {...register("userEmail")}
              ></input>
              <label className="form-label" htmlFor="contentName">
                {" "}
                Email
              </label>
              {errors.userEmail && <p>{errors.userEmail.message}</p>}
            </div>
          </div>
          <div className="container mb-3">
            <div className="form-floating">
              <input
                className="form-control"
                type="password"
                name="contentName"
                id="contentName"
                placeholder="Name of the content"
                {...register("password")}
              ></input>
              <label className="form-label" htmlFor="contentName">
                {" "}
                Password
              </label>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
          </div>

          <div className="container mb-3">
            <div style={{ marginTop: "25px" }}>
              <button className="btn btn-primary" onClick={login}>
                Login
              </button>
            </div>
            {/* <div>
              <button className={styles.loginButton}>Register</button> your
              account.
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
