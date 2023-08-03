import styles from "../styles/tagContent.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterSchema from "../schema/RegisterSchema";
import uploadApi from "../api/uploadapi";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TagContent = () => {
  const [success, setSuccess] = useState(false); //for re rendering/refresh after adding content successfully

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "https://sunbirdsaas.com/api/framework/v1/read/ncffsfw",
  //     responseType: "stream",
  //   }).then(function (response) {
  //     console.log(response.data);

  //     const obj = JSON.parse(response.data);
  //     console.log(obj.result.framework);
  //     console.log(obj.result.framework.categories[0].terms);
  //   });
  // }, []);

  // Sunbird FLN data

  const myCourses = () => {
    navigate("/mycourses");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterSchema) });

  const onSubmit = async (data) => {
    console.log(data);
    const result = await uploadApi(data);

    if (result == true) {
      setSuccess(true);
    } else {
      alert("Registeration failed");
    }
  };

  if (success) {
    return (
      <div>
        <div className={styles.headerDiv}>
          <Header />
        </div>
        <div className={styles.outerdiv}></div>
        <div className="container" style={{ marginTop: "100px" }}>
          <h2 style={{ color: "#0F75BC" }}>Content added successfully.</h2>
          <span>Manage your content in</span>{" "}
          <button className={styles.myCourses} onClick={myCourses}>
            MyCourses.
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #FCF8F5)",
      }}
    >
      <div className={styles.headerDiv}>
        <Header />
      </div>
      <div className={styles.outerdiv}></div>
      <div className="container" style={{ marginTop: "100px" }}>
        <div>
          <h4 style={{ color: "#0F75BC" }}>
            Fill in the below details to register your content with ONEST{" "}
          </h4>
        </div>
        <div
          className="card mb-2"
          style={{ display: "flex", alignItems: "center", paddingTop: "10px" }}
        >
          <h5 style={{ color: "gray" }}>Tag Content Form</h5>
          <form
            className=" card-body form-floating mt-3 mx-1"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className="mb-3">
              <div className="container mb-3">
                <div className="form-floating">
                  <input
                    className="form-control"
                    type="text"
                    name="contentName"
                    id="contentName"
                    placeholder="Name of the content"
                    {...register("contentName")}
                  ></input>
                  <label className="form-label" htmlFor="contentName">
                    {" "}
                    Content Name
                  </label>
                  {errors.contentName && <p>{errors.contentName.message}</p>}
                </div>
              </div>

              <div className="container mb-3">
                <div></div>
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="language"
                    id="language"
                    {...register("language")}
                  >
                    <option value="">Select a Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Assamese">Assamese</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Kannada">Kannada</option>
                  </select>
                  {errors.language && <p>{errors.language.message}</p>}
                  <label className="form-label" htmlFor="language">
                    Language
                  </label>
                </div>
              </div>

              <div className="container mb-3">
                <div className="form-floating ">
                  <select
                    className="form-select"
                    name="theme"
                    id="theme"
                    {...register("theme")}
                  >
                    <option value="">Select a Theme</option>
                    <option value="Animals">Animals</option>
                    <option value="Birds">Birds</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Nature">Nature</option>
                    <option value="Relations">Relations</option>
                    <option value="Food">Food</option>
                    <option value="Others">Others</option>
                  </select>
                  {errors.theme && <p>{errors.theme.message}</p>}
                  <label className="form-label" htmlFor="theme">
                    Theme
                  </label>
                </div>
              </div>

              <div className="container mb-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="contentType"
                    id="contentType"
                    {...register("contentType")}
                  >
                    <option value="">Type of content</option>
                    <option value="Video">Video</option>
                    <option value="Read Along">Read Along</option>
                    <option value="Read">Read</option>
                    <option value="Audio">Audio</option>
                    <option value="Sign Language">Sign Language</option>
                  </select>
                  {errors.contentType && <p>{errors.contentType.message}</p>}
                  <label className="form-label" htmlFor="contentType">
                    Type
                  </label>
                </div>
              </div>

              <div className="container">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="contentLink"
                    id="contentLink"
                    placeholder="Link to the content"
                    {...register("contentLink")}
                  ></input>
                  {errors.contentLink && <p>{errors.contentLink.message}</p>}
                  <label className="form-label" htmlFor="contentLink">
                    Link to content
                  </label>
                </div>
              </div>

              <div className="container">
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    name="contentDescription"
                    id="contentDescription"
                    {...register("description")}
                    style={{ height: "150px" }}
                  ></textarea>
                  <label className="form-label" htmlFor="contentDescription">
                    Description
                  </label>
                  {errors.description && <p>{errors.description.message}</p>}
                </div>
              </div>

              <div className="container mb-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="contentDomain"
                    id="contentDomain"
                    {...register("contentDomain")}
                  >
                    <option value="">Choose a Domain</option>
                    <option value="Socio-Emotional and Ethical Development">
                      Socio-Emotional and Ethical Development
                    </option>
                    <option value="Cognitive Development">
                      Cognitive Development
                    </option>
                    <option value="Language and Literacy Development">
                      Language and Literacy Development
                    </option>
                    <option value="Aesthetic and Cultural Development">
                      Aesthetic and Cultural Development
                    </option>
                    <option value="Positive Learning Habits">
                      Positive Learning Habits
                    </option>
                  </select>
                  {errors.contentType && <p>{errors.contentType.message}</p>}
                  <label className="form-label" htmlFor="contentDomain">
                    Domain
                  </label>
                </div>
              </div>

              <div className="container mb-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    name="contentGoal"
                    id="contentGoal"
                    {...register("contentGoal")}
                  >
                    <option value="">Select a Curricular Goal</option>
                    <option value="CG-2: Children develop sharpness in sensorial perceptions">
                      CG-2: Children develop sharpness in sensorial perceptions
                    </option>
                    <option value="CG-1: Children develop habits that keep them healthy and safe">
                      CG-1: Children develop habits that keep them healthy and
                      safe
                    </option>
                    <option value="CG-4: Children develop emotional intelligence">
                      CG-4: Children develop emotional intelligence
                    </option>
                    <option value="CG-7: Children make sense of world around through observation and logical thinking">
                      CG-7: Children make sense of world around through
                      observation and logical thinking
                    </option>
                    <option value="CG-9: Children develop effective communication skills for day-to-day interactions in two languages">
                      CG-9: Children develop effective communication skills for
                      day-to-day interactions in two languages
                    </option>
                    <option value="CG-12: Children develop abilities and sensibilities in visual and performing arts, and express their emotions through art in meaningful and joyful ways">
                      CG-12: Children develop abilities and sensibilities in
                      visual and performing arts, and express their emotions
                      through art in meaningful and joyful ways
                    </option>
                  </select>
                  {errors.contentType && <p>{errors.contentType.message}</p>}
                  <label className="form-label" htmlFor="contentGoal">
                    {" "}
                    Curricular Goals
                  </label>
                </div>
              </div>

              {/* <div className={styles.formFieldDiv}>
                <div className={styles.formFieldInput}>
                  <input
                    type="text"
                    name="ageGroup"
                    id="ageGroup"
                    placeholder="Age group relevant to"
                    {...register("age")}
                  ></input>
                  {errors.age && <p>{errors.age.message}</p>}
                </div>
              </div> */}

              <div className={styles.footerheading}>
                <h3>Competencies</h3>
              </div>

              <div className={styles.footer}>
                <div className={styles.formFieldInline}>
                  <select
                    name="competencies"
                    id="competencies"
                    {...register("compentencies")}
                    style={{
                      border: "2px solid rgb(185, 185, 185)",
                      height: "40px",
                    }}
                  >
                    <option value=""></option>
                    <option value="C-2.2: Develops visual memory for symbols and representations">
                      C-2.2: Develops visual memory for symbols and
                      representations
                    </option>
                    <option value="C-2.3: Differentiates sounds by their pitch, volume and sound patterns by their pitch, volume, and tempo">
                      C-2.3: Differentiates sounds by their pitch, volume and
                      sound patterns by their pitch, volume, and tempo
                    </option>
                    <option value="C-2.1: Differentiates between shapes, colours, and their shades">
                      C-2.1: Differentiates between shapes, colours, and their
                      shades
                    </option>
                    <option value="C-1.2: Practices basic self-care and hygiene">
                      C-1.2: Practices basic self-care and hygiene
                    </option>
                    <option value="C-1.1: Shows a liking for and understanding of nutritious food and does not waste food">
                      C-1.1: Shows a liking for and understanding of nutritious
                      food and does not waste food
                    </option>
                    <option value="C-1.3: Keeps school/classroom hygienic and organised">
                      C-1.3: Keeps school/classroom hygienic and organised
                    </option>
                    <option value="C-3.3: Shows precision and control in working with their hands and fingers">
                      C-3.3: Shows precision and control in working with their
                      hands and fingers
                    </option>
                    <option value="C-3.2: Shows balance, coordination and flexibility in various physical activities">
                      C-3.2: Shows balance, coordination and flexibility in
                      various physical activities
                    </option>
                    <option value="C-3.1: Shows coordination between sensorial perceptions and body movements in various activities">
                      C-3.1: Shows coordination between sensorial perceptions
                      and body movements in various activities
                    </option>
                    <option value="C-4.2: Recognises different emotions and makes deliberate effort to regulate them appropriately">
                      C-4.2: Recognises different emotions and makes deliberate
                      effort to regulate them appropriately
                    </option>
                    <option value="C-4.1: Starts recognising 'self' as an individual belonging to a family and community">
                      C-4.1: Starts recognising 'self' as an individual
                      belonging to a family and community
                    </option>
                    <option value="C-7.2: Observes and understands cause and effect relationships in nature by forming simple hypothesis and uses observations to explain their hypothesis">
                      C-7.2: Observes and understands cause and effect
                      relationships in nature by forming simple hypothesis and
                      uses observations to explain their hypothesis
                    </option>
                    <option value="C-7.1: Observes and understands different categories of objects and relationships between them">
                      C-7.1: Observes and understands different categories of
                      objects and relationships between them
                    </option>
                    <option value="C-9.2: Creates simple songs and poems on their own">
                      C-9.2: Creates simple songs and poems on their own
                    </option>
                    <option value="C-9.1: Listens to and appreciates simple songs, rhymes, and poems">
                      C-9.1: Listens to and appreciates simple songs, rhymes,
                      and poems
                    </option>
                    <option value="C-9.1: Listens to and appreciates simple songs, rhymes, and poems">
                      C-9.1: Listens to and appreciates simple songs, rhymes,
                      and poems
                    </option>
                    <option value="C-12.1: Explores and plays with a variety of materials and tools to create two-dimensional and three-dimensional artworks in varying sizes">
                      C-12.1: Explores and plays with a variety of materials and
                      tools to create two-dimensional and three-dimensional
                      artworks in varying sizes
                    </option>
                  </select>
                  {errors.compentencies && (
                    <p>{errors.compentencies.message}</p>
                  )}
                </div>
                <div className={styles.formFieldInline}>
                  <a href="http://20.219.197.218/explore/" target="_blank">
                    Click here to know about competencies
                  </a>
                </div>
              </div>

              <div className={styles.formbutton}>
                <div className={styles.submit}>
                  <button className="btn btn-primary">Submit</button>
                </div>
                <div>
                  <button className="btn btn-success">Bulk tag</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TagContent;
