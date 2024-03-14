// src/pages/SignupPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//STYLE
import '../CSS/Forms.css'
import favicon from '../img/fav-icon.png'



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

      <div className="header">
      <img src={favicon} alt="favicon"/>
      <h1>Sign Up</h1>
      <img src={favicon} alt="favicon"/>
      </div>

      <form onSubmit={handleSignupSubmit}>
        <div className="pair">
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
        </div>

        <div className="pair">
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        </div>

        <div className="pair">
        <label>Username:</label>
        <input 
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        </div>

        <div className="pair">
        <label>Bio:</label>
        <input 
          type="text"
          name="bio"
          value={bio}
          onChange={handleBio}
        />
        </div>

        <div className="pair">
        <label>Job:</label>
        <input 
          type="text"
          name="job"
          value={job}
          onChange={handleJob}
        />
        </div>

        <div className="pair">
        <label>Location:</label>
        <input 
          type="text"
          name="location"
          value={location}
          onChange={handleLocation}
        />
        </div>

        <div className='pair'>
        <label>Github:</label>
        <input 
          type="text"
          name="github"
          value={github}
          onChange={handleGithub}
        />
        </div>
      
       

        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }
      
   
     
      <p>Already have an account? <Link className={"link-styles"} to={"/login"}>Login</Link></p>
    </div>
  );
}

  

export default SignupPage;
