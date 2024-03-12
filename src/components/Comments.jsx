import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentsPage({ postId }) {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const storedToken = localStorage.getItem('authToken');


  const fetchComments = () => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/comments/${postId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setComments([]); // Reset comments to an empty array in case of an error
      });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log('Submitting comment:', newCommentText);

    axios
      .post(`${import.meta.env.VITE_API_URL}/comments/${postId}`, { text: newCommentText }, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then(() => {
        fetchComments();
        setNewCommentText('');
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      <h1>Comments</h1>
      
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment._id}>
            <p>{comment.text}</p>
          </div>
        ))
      ) : (
        <p>No comments available</p>
      )}
   
   
      <textarea
        value={newCommentText}
        onChange={e => setNewCommentText(e.target.value)}
        placeholder="Enter your comment"
      />
      
      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
}

export default CommentsPage;

