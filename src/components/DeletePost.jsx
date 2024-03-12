import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const DeletePost = ({ postId }) => {
  const navigate = useNavigate();

  // AUTH
  const storedToken = localStorage.getItem('authToken');

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then(() => {
        console.log('Post deleted');
        navigate('/');
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

// when post deleted, add a pop up message to confirm deletion
// then navigate to home page

    