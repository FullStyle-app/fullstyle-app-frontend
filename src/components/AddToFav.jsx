import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const AddToFavorites = ({postId}) => {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


const handleAddToFavorites = () => {
    if (!storedToken) {
        navigate('/login');
        return;
    } // Redirect to login page if user is not authenticated
    if (favorites.includes(postId.toString())) {
        console.log('Already in favorites');
        return;
    } else {
    axios.post('http://localhost:5005/users/favorites', { postId }, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    })
    .then(() => {
        console.log('Added to favorites successfully');
        setFavorites([...favorites, postId]); // Update state
        navigate(`/posts/${postId}`);
    })
    .catch(error => {
        console.error('Error adding to favorites:', error);
    });
};
};

return (
    <div>
        <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
);
};

export default AddToFavorites;