import React from 'react';
import axios from 'axios';


const API_URL = "http://localhost:5005";

const DeletePost = ({ postId }) => {

  // AUTH
  const storedToken = localStorage.getItem('authToken');

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/posts/${postId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then(response => {
        console.log('Post deleted');
      })
      .catch(error => {
      
        console.error('Error with deleting', error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
};

export default DeletePost;


    