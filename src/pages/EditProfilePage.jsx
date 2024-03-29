import axios from "axios";
import service from "../services/file-upload.service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// STYLE
import "../CSS/Forms.css";
import favicon from "../img/fav-icon.png";

function EditProfilePage() {
  const { id } = useParams();
  // EDIT PROFILE // STATES
  const [img, setImg] = useState("");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [github, setGithub] = useState("");
  //EDIT PROFILE // SET
  const handleBioChange = (e) => setBio(e.target.value);
  const handleJobChange = (e) => setJob(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleGithubChange = (e) => setGithub(e.target.value);

  // STATES FOR LOADING AND ERROR
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // AUTH
  const storedToken = localStorage.getItem("authToken");

  // PROFILE PICTURE UPLOAD
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("img", e.target.files[0]);

    service
      .uploadProfilePicture(uploadData)
      .then((response) => {
        setImg(response.img);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  // HANDLE SUBMIT / PULL REQUEST TO DB
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {};

    // Include Bio if it's not empty
    if (bio.trim() !== "") {
      requestBody.bio = bio;
    }

    // Include Job if it's not empty
    if (job.trim() !== "") {
      requestBody.job = job;
    }

    // Include Location if it's not empty
    if (location.trim() !== "") {
      requestBody.location = location;
    }

    // Include Github if it's not empty
    if (github.trim() !== "") {
      requestBody.github = github;
    }

    // Include img if it's not empty
    if (img !== "") {
      requestBody.img = img;
    };

    axios.put(
      `${import.meta.env.VITE_API_URL}/users/${id}`,
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        console.log(response);
        navigate(`/creators/${id}`);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className='edit-profile'>
      <div className="header">
        <img src={favicon} alt="favicon" />
        <h1>Edit your profile</h1>
        <img src={favicon} alt="favicon" />
      </div>

      <form onSubmit={handleSubmit}>

        <div className="pair">
          <label>Profile Picture</label>
          <input type="file" onChange={handleFileUpload} />
        </div>

        <div className="pair">
          <label>Bio</label>
          <input type="text" value={bio} onChange={handleBioChange} />
        </div>

        <div className="pair">
          <label>Job</label>
          <input type="text" value={job} onChange={handleJobChange} />
        </div>

        <div className="pair">
          <label>Location</label>
          <input type="text" value={location} onChange={handleLocationChange} />
        </div>

        <div className="pair">
          <label>Github</label>
          <input type="text" value={github} onChange={handleGithubChange} />
        </div>

        <div className="buttons">
          <button onClick={() => navigate('/')}>Cancel</button>
          <button type="submit">Save</button>
        </div>

      </form>
    </div>
  );
}

export default EditProfilePage;
