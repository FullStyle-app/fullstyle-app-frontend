import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoritesList from "../components/favoritesList";

import { Link } from "react-router-dom";
import CreatorPosts from "../components/CreatorPosts";




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
      .get("http://localhost:5005/users/" + id)
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
      <div>
        <Link to={`/edit-profile/${id}`}>
          <button>Edit Profile</button>
        </Link>
        {loading && <p>Loading...</p>}
        {user && (
          <div>
            <h1>{user.username}'s Profile Page</h1>
            <img src={user.img} />

            <p>In the community since : {formatDate(user.created)}</p>
            <p>Bio : {user.bio}</p>
            <p>Job : {user.job}</p>
            <p>Location : {user.location}</p>
            {user.github ? (
              <a href={user.github} target="_blank">
                <button>Github</button>
              </a>
            ) : (
              <button disabled style={{ backgroundColor: "gray" }}>
                Github
              </button>
            )}
            <div>
              <CreatorPosts id={id} />
              <FavoritesList id={id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreatorProfilePage;
