import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Header from "../components/Header";
import deleteApi from "../api/deleteApi";
import updateApi from "../api/updateApi";
import Modal from "react-modal";
import modalStyles from "../styles/modal.module.css";
import { useForm } from "react-hook-form";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const customStyles = {
  content: {
    maxHeight: "90%",
    maxWidth: "90%",
    margin: 0,
    padding: "20",
    backgroundColor: "#fff",
  },
  scrollableContent: {
    maxHeight: "90%",
    overflowY: "auto",
  },
};

const MyCourses = () => {
  const id = localStorage.getItem("userId");

  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //States for EDIT modal values

  const [formData, setFormData] = useState({});

  useEffect(() => {
    Modal.setAppElement("#root"); // Set the app element for modal
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const uniqueTitles = Array.from(
    new Set(rowData.map((item) => item.attributes.title))
  );

  const columnDefs = [
    {
      headerName: "",
      field: "actions",
      width: 80,
      cellRenderer: function (params) {
        const label = "Remove"; // Replace with your desired label
        const handleClick = async () => {
          // Handle button click event here
          const data = params.data.id;
          const result = await deleteApi(data);

          if (result == true) {
            alert("Deleted successfully.");
            setRowData((prevRowData) => {
              // Filter out the deleted entry from the state array
              //here we are checking and updating the state to check if the row exists, and after deleting the row
              //since the row won't be found in the setRowData state the component will re-render since the state has been updated.
              const updatedRowData = prevRowData.filter(
                (item) => item.id !== data
              );
              return updatedRowData;
            });
          } else if (result == false) {
            alert("Not deleted");
          }
        };

        return (
          <div
            onClick={handleClick}
            style={{ color: "red", cursor: "pointer", fontWeight: "medium" }}
          >
            {label}
          </div>
        );
      },
    },
    {
      headerName: "",
      field: "actions",
      width: 80,
      cellRenderer: function (params) {
        const label = "Edit"; // Replace with your desired label
        const combinedFunction = () => {
          openModal();
          handleEdit(params);
        };

        const handleEdit = (params) => {
          setFormData(params?.data);
        };

        const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          defaultValues: {
            code: formData?.attributes?.code,
            competency: formData?.attributes?.competency,
            contentType: formData?.attributes?.contentType,
            description: formData?.attributes?.description,
            domain: formData?.attributes?.domain,
            goal: formData?.attributes?.goal,
            language: formData?.attributes?.language,
            link: formData?.attributes?.link,
            sourceOrganisation: formData?.attributes?.sourceOrganisation,
            themes: formData?.attributes?.themes,
            title: formData?.attributes?.title,
            user_id: formData?.attributes?.user_id,
          },
        });
        const onSubmit = async (data) => {
          const result = await updateApi(data, formData?.id);
          if (result == true) {
            alert("Content updated");
            getMyCourses();
            setIsOpen(false);
          } else {
            alert("Update failed");
          }
        };
        return (
          <>
            <div
              onClick={combinedFunction}
              style={{
                color: "blue",
                cursor: "pointer",
                fontWeight: "medium",
              }}
            >
              {label}
            </div>

            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Edit Modal"
              // className={modalStyles.modalDiv}
              style={customStyles.content}
            >
              {/* <div>
                  <button
                    onClick={closeModal}
                    className={modalStyles.closeModal}
                  >
                    x
                  </button>
                </div> */}

              <form
                className=" card-body form-floating mt-3 mx-1"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3" style={customStyles.scrollableContent}>
                  <div className="container mb-3">
                    <div className="h4" style={{ color: "#0F75BC" }}>
                      To initiate edits, interact with the requisite fields and
                      execute a "Submit" action to preserve your alterations.
                    </div>
                    <div className="form-floating">
                      <input
                        className="form-control"
                        type="text"
                        name="contentName"
                        id="contentName"
                        placeholder="Name of the content"
                        // value={formData?.attributes?.title}
                        {...register("title")}
                      ></input>
                      <label className="form-label" htmlFor="contentName">
                        Content Name
                      </label>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",

                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-floating" style={{ width: "200px" }}>
                      <select
                        className="form-select"
                        name="language"
                        id="language"
                        {...register("language")}
                      >
                        <option value="">
                          {formData?.attributes?.language}
                        </option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Assamese">Assamese</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Kannada">Kannada</option>
                      </select>

                      <label className="form-label" htmlFor="language">
                        Edit Language
                      </label>
                    </div>
                    <div className="form-floating " style={{ width: "200px" }}>
                      <select
                        className="form-select"
                        name="theme"
                        id="theme"
                        {...register("themes")}
                      >
                        <option value="">{formData?.attributes?.themes}</option>
                        <option value="Animals">Animals</option>
                        <option value="Birds">Birds</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Nature">Nature</option>
                        <option value="Relations">Relations</option>
                        <option value="Food">Food</option>
                        <option value="Others">Others</option>
                      </select>

                      <label className="form-label" htmlFor="theme">
                        Edit Theme
                      </label>
                    </div>
                    <div className="form-floating" style={{ width: "200px" }}>
                      <select
                        className="form-select"
                        name="contentType"
                        id="contentType"
                        {...register("contentType")}
                      >
                        <option value="">
                          {formData?.attributes?.contentType}
                        </option>
                        <option value="Video">Video</option>
                        <option value="Read Along">Read Along</option>
                        <option value="Read">Read</option>
                        <option value="Audio">Audio</option>
                        <option value="Sign Language">Sign Language</option>
                      </select>

                      <label className="form-label" htmlFor="contentType">
                        Edit Type
                      </label>
                    </div>
                  </div>

                  <div className="container mb-3"></div>
                  <div className="container">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="contentLink"
                        id="contentLink"
                        placeholder="Link to the content"
                        {...register("link")}
                      ></input>

                      <label className="form-label" htmlFor="contentLink">
                        {formData?.attributes?.link}
                      </label>
                    </div>
                  </div>

                  <div className="container">
                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control"
                        name="contentDescription"
                        id="contentDescription"
                        // value={formData?.attributes?.description}
                        {...register("description")}
                      ></textarea>
                      <label
                        className="form-label"
                        htmlFor="contentDescription"
                      >
                        Description
                      </label>
                    </div>
                  </div>

                  <div
                    className="container mb-3"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <div className="form-floating" style={{ width: "500px" }}>
                      <select
                        className="form-select"
                        name="contentDomain"
                        id="contentDomain"
                        {...register("domain")}
                      >
                        <option value="">{formData?.attributes?.domain}</option>
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

                      <label className="form-label" htmlFor="contentDomain">
                        Edit Domain
                      </label>
                    </div>
                    <div className="form-floating" style={{ width: "500px" }}>
                      <select
                        className="form-select"
                        name="contentGoal"
                        id="contentGoal"
                        {...register("goal")}
                      >
                        <option value="">{formData?.attributes?.goal}</option>
                        <option value="CG-2: Children develop sharpness in sensorial perceptions">
                          CG-2: Children develop sharpness in sensorial
                          perceptions
                        </option>
                        <option value="CG-1: Children develop habits that keep them healthy and safe">
                          CG-1: Children develop habits that keep them healthy
                          and safe
                        </option>
                        <option value="CG-4: Children develop emotional intelligence">
                          CG-4: Children develop emotional intelligence
                        </option>
                        <option value="CG-7: Children make sense of world around through observation and logical thinking">
                          CG-7: Children make sense of world around through
                          observation and logical thinking
                        </option>
                        <option value="CG-9: Children develop effective communication skills for day-to-day interactions in two languages">
                          CG-9: Children develop effective communication skills
                          for day-to-day interactions in two languages
                        </option>
                        <option value="CG-12: Children develop abilities and sensibilities in visual and performing arts, and express their emotions through art in meaningful and joyful ways">
                          CG-12: Children develop abilities and sensibilities in
                          visual and performing arts, and express their emotions
                          through art in meaningful and joyful ways
                        </option>
                      </select>

                      <label className="form-label" htmlFor="contentGoal">
                        {" "}
                        Edit Curricular Goals
                      </label>
                    </div>
                  </div>

                  <div className="container mb-3"></div>

                  <div>
                    <h3>Edit Competencies</h3>
                  </div>

                  <div>
                    <div>
                      <select
                        name="competencies"
                        id="competencies"
                        {...register("competency")}
                        style={{
                          border: "2px solid rgb(185, 185, 185)",
                          height: "40px",
                        }}
                      >
                        <option value="">
                          {formData?.attributes?.competency}
                        </option>
                        <option value="C-2.2: Develops visual memory for symbols and representations">
                          C-2.2: Develops visual memory for symbols and
                          representations
                        </option>
                        <option value="C-2.3: Differentiates sounds by their pitch, volume and sound patterns by their pitch, volume, and tempo">
                          C-2.3: Differentiates sounds by their pitch, volume
                          and sound patterns by their pitch, volume, and tempo
                        </option>
                        <option value="C-2.1: Differentiates between shapes, colours, and their shades">
                          C-2.1: Differentiates between shapes, colours, and
                          their shades
                        </option>
                        <option value="C-1.2: Practices basic self-care and hygiene">
                          C-1.2: Practices basic self-care and hygiene
                        </option>
                        <option value="C-1.1: Shows a liking for and understanding of nutritious food and does not waste food">
                          C-1.1: Shows a liking for and understanding of
                          nutritious food and does not waste food
                        </option>
                        <option value="C-1.3: Keeps school/classroom hygienic and organised">
                          C-1.3: Keeps school/classroom hygienic and organised
                        </option>
                        <option value="C-3.3: Shows precision and control in working with their hands and fingers">
                          C-3.3: Shows precision and control in working with
                          their hands and fingers
                        </option>
                        <option value="C-3.2: Shows balance, coordination and flexibility in various physical activities">
                          C-3.2: Shows balance, coordination and flexibility in
                          various physical activities
                        </option>
                        <option value="C-3.1: Shows coordination between sensorial perceptions and body movements in various activities">
                          C-3.1: Shows coordination between sensorial
                          perceptions and body movements in various activities
                        </option>
                        <option value="C-4.2: Recognises different emotions and makes deliberate effort to regulate them appropriately">
                          C-4.2: Recognises different emotions and makes
                          deliberate effort to regulate them appropriately
                        </option>
                        <option value="C-4.1: Starts recognising 'self' as an individual belonging to a family and community">
                          C-4.1: Starts recognising 'self' as an individual
                          belonging to a family and community
                        </option>
                        <option value="C-7.2: Observes and understands cause and effect relationships in nature by forming simple hypothesis and uses observations to explain their hypothesis">
                          C-7.2: Observes and understands cause and effect
                          relationships in nature by forming simple hypothesis
                          and uses observations to explain their hypothesis
                        </option>
                        <option value="C-7.1: Observes and understands different categories of objects and relationships between them">
                          C-7.1: Observes and understands different categories
                          of objects and relationships between them
                        </option>
                        <option value="C-9.2: Creates simple songs and poems on their own">
                          C-9.2: Creates simple songs and poems on their own
                        </option>
                        <option value="C-9.1: Listens to and appreciates simple songs, rhymes, and poems">
                          C-9.1: Listens to and appreciates simple songs,
                          rhymes, and poems
                        </option>
                        <option value="C-9.1: Listens to and appreciates simple songs, rhymes, and poems">
                          C-9.1: Listens to and appreciates simple songs,
                          rhymes, and poems
                        </option>
                        <option value="C-12.1: Explores and plays with a variety of materials and tools to create two-dimensional and three-dimensional artworks in varying sizes">
                          C-12.1: Explores and plays with a variety of materials
                          and tools to create two-dimensional and
                          three-dimensional artworks in varying sizes
                        </option>
                      </select>
                    </div>
                    <div>
                      <a href="http://20.219.197.218/explore/" target="_blank">
                        Click here to know about competencies
                      </a>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </div>
                </div>
              </form>
            </Modal>
          </>
        );
      },
    },
    {
      headerName: "Title",
      field: "attributes.title",
      filter: true,
      width: 250,
    },
    {
      headerName: "Description",
      field: "attributes.description",
      filter: true,
      width: 300,
      editable: true,
    },
    {
      headerName: "Domain",
      field: "attributes.domain",
      filter: true,
      width: 300,
    },
    {
      headerName: "Language",
      field: "attributes.language",
      filter: true,
      width: 200,
    },
    { headerName: "Goal", field: "attributes.goal", filter: true, width: 500 },
    { headerName: "Link", field: "attributes.link", filter: true, width: 450 },
    {
      headerName: "Published",
      field: "attributes.publishedAt",
      filter: true,
      width: 200,
    },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const getMyCourses = () => {
    axios({
      method: "get",
      url: `${baseUrl}/fln-contents?filters[user_id][$eq]=${id}`,
      responseType: "stream",
    })
      .then(function (response) {
        const obj = JSON.parse(response.data);

        const parsedData = obj.data;
        setRowData(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  const handleSearch = () => {
    gridRef.current.api.setQuickFilter(searchText);
  };

  const handleDropdownChange = (event) => {
    setSelectedTitle(event.target.value);

    gridRef.current.api.setFilterModel({
      "attributes.title": { type: "equals", filter: event.target.value },
    });
    gridRef.current.api.onFilterChanged();
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginTop: "80px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div style={{ marginTop: "70px" }}>
          <select
            value={selectedTitle}
            onChange={handleDropdownChange}
            style={{
              border: "1px solid #BABABA",
              width: "200px",
            }}
          >
            <option value="">Filter by titles</option>
            {uniqueTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: 500, marginTop: "5px" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
};

export default MyCourses;
