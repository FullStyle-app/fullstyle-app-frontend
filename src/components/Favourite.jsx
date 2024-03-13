import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

//STYLE
import '../CSS/CreatorProfile.css'

function FavoritesList({ id }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFavorites = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${id}/favorites`)
        .then((response) => {
          setFavorites(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    if (storedToken) {
      fetchFavorites();
    } else {
      navigate("/login"); // Redirect to login page if user is not authenticated
    }
  }, [navigate, storedToken, id]);


    return (
      <div className='fav-board'>
        <h1>Their Favorites</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {favorites.map((favorite) => (
          <div className='fav-card' key={favorite._id}>
            <Link to={`/posts/${favorite._id}`}>
            <img src={favorite.image1} alt={favorite.title} />
            </Link>
            <h3>{favorite.title}</h3>
            <label>{favorite.category}</label>
          </div>
        ))}
      </div>
    );
  };

export default FavoritesList;
