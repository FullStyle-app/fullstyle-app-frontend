

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentsPage({ postId }) {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');


  const fetchComments = () => {

    axios
      .get(`/comments/'${postId}`)
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

    axios
      .post('/comments/'+postId+'/create', { text: newCommentText })
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

