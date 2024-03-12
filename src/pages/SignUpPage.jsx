// src/pages/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../services/file-upload.service";



function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [img, setImg] = useState("");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [github, setGithub] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handleJob = (e) => setJob(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handleGithub = (e) => setGithub(e.target.value);


  
  const handleSignupSubmit = (e) => {
  e.preventDefault();

  const requestBody = { email, password, username, img, bio, job, location, github};

  
  axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
    .then((response) => {
      navigate('/login');
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
};

  
  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Username:</label>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label>Bio:</label>
        <input 
          type="text"
          name="bio"
          value={bio}
          onChange={handleBio}
        />

        <label>Job:</label>
        <input 
          type="text"
          name="job"
          value={job}
          onChange={handleJob}
        />

        <label>Location:</label>
        <input 
          type="text"
          name="location"
          value={location}
          onChange={handleLocation}
        />

        <label>Github:</label>
        <input 
          type="text"
          name="github"
          value={github}
          onChange={handleGithub}
        />
      
       

        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;
