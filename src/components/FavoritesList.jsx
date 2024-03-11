import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FavoritesList({ id }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFavorites = () => {
      axios
        .get(`http://localhost:5005/users/favorites`) // Remove extra forward slash
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
    <div>
      <h1>Favorites</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {favorites.map((favorite) => (
        <div key={favorite._id}>
          <img src={favorite.image1} alt={favorite.title} />
          <h2>{favorite.title}</h2>
          <p>{favorite.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;
