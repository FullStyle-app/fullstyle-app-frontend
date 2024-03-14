import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

//STYLE
import '../CSS/Postlist.css';
import favIcon from '../img/fav-icon.png'

const AddToFavorites = ({ postId }) => {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const Popup = ({ message }) => {
    return (
      <div className="popup">
        <p>{message}</p>
      </div>
    );
  };

  const handleAddToFavorites = () => {
    if (!storedToken) {
      navigate("/login");
      return;
    } // Redirect to login page if user is not authenticated

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/users/favorites`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then(() => {
        if (favorites.includes(postId)) {
           setMessage('This post is already in your favorites !')
        } else {
          console.log("Post added to favorites")
          setMessage("Post successfully added to favorites");
          setFavorites([...favorites, postId]); // Update state
          navigate(`/posts/${postId}`);
        }
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
      });
  };

  return (
    <div>
      
      <img className="addtofav" onClick={handleAddToFavorites} src={favIcon} />
      {message && <Popup message={message} />}
    </div>
  );
};

export default AddToFavorites;
