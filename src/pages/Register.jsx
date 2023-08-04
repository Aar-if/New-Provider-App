import React from "react";
import headerStyles from "../components/header.module.css";
import styles from "../styles/register.module.css";
import imagePath from "../assets/tekdi-logo-black.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userRegisterApi from "../api/userRegisterApi";
import UserRegisterSchema from "../schema/UserRegisterSchema";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UserRegisterSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    const result = await userRegisterApi(data);

    if (result == true) {
      alert("Registered successfully.");
      navigate("/login");
    } else if (result == false) {
      alert("E-mail already exists");
    }
  };
  const login = () => {
    navigate("./login");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #dfe4ff)",
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
              Sign up to ONEST
            </div>
            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                name="contentName"
                id="contentName"
                placeholder="Name of the content"
                {...register("userName")}
              ></input>
              <label className="form-label" htmlFor="contentName">
                {" "}
                Name
              </label>
              {errors.userName && <p>{errors.userName.message}</p>}
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
            <div className="form-floating">
              <input
                className="form-control"
                type="password"
                name="contentName"
                id="contentName"
                placeholder="Name of the content"
                {...register("confirmPassword")}
              ></input>
              <label className="form-label" htmlFor="contentName">
                {" "}
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
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
                {...register("organization")}
              ></input>
              <label className="form-label" htmlFor="contentName">
                {" "}
                Organization
              </label>
              {errors.organization && <p>{errors.organization.message}</p>}
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
                {...register("secretCode")}
              ></input>
              <label className="form-label" htmlFor="contentName">
                {" "}
                Secret Code
              </label>
              {errors.secretCode && <p>{errors.secretCode.message}</p>}
            </div>
            <div style={{ marginTop: "25px" }}>
              <button className="btn btn-primary">Sign Up as a Mentor</button>
            </div>
            <div>
              <button onClick={login} className={styles.loginButton}>
                Login
              </button>{" "}
              to your account.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
