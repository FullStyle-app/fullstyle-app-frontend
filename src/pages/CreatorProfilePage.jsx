import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoritesList from "../components/Favourite";


import { Link } from "react-router-dom";
import CreatorPosts from "../components/CreatorPosts";

//STYLE

import "../CSS/CreatorProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


function CreatorProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem("authToken");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/` + id)
      .then((user) => {
        setUser(user.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <>
      
        <div className="creator-header">
        <Link to={`/edit-profile/${id}`}>
          <button className="edit-button">Edit Profile</button>
        </Link>
        </div>
        <div className='creator-board'>
        {loading && <p>Loading...</p>}
        {user && (
          <div className="creator-identity">
            <div className="creator-left">
              <img src={user.img} />
              <section className="section">
              <FontAwesomeIcon icon={faLocationDot} style={{color:'white'}} /> 
              <p>{user.location}</p>
              </section>
              <section className="section">
              <FontAwesomeIcon icon={ faLaptop } style={{color:'white'}} /> 
              <p>{user.job}</p>
              </section>
              <section className='section'>
              {user.github ? (
                <a href={user.github} target="_blank">
                  <FontAwesomeIcon className="github-icon" icon={faGithub} style={{color:'white'}} />
                </a>
              ) : (
                <FontAwesomeIcon className="github-icon" disabled icon={faGithub} style={{color:'darkgray'}}/>
              )}
              <p>@{user.username}'s codes</p>
              </section>
            </div>

            <div className="creator-right">
              <h1>@{user.username}</h1>
              <p>FullStyler since : {formatDate(user.created)}</p>
              
              <section className="creator-bio">
                <p>{user.bio}</p>
              </section>
            </div>
          </div>
        )}

        <CreatorPosts id={id} />
        <FavoritesList id={id} />
      </div>
    </>
  );
}

export default CreatorProfilePage;
