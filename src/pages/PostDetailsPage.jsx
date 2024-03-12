import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddToFavorites from '../components/AddToFav';
import CommentsPage from '../components/Comments';
import DeletePost from '../components/DeletePost';


function PostsPage() {
    const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Post</h1>
      {loading && <p>Loading...</p>}
        {post && (
            <div>
              <img src={post.image1} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>{post.linkToWebsite}</p>
              <p>{post.linkToCode}</p>
              <p>{post.category}</p>
              <p>{post.tags}</p>
              {post.author && (
                <Link to={`/creators/${post.author._id}`}>{post.author.username}</Link>
              )}
              

              <AddToFavorites postId={id} />
              <Link to={`/posts/${id}/edit`}>Update post</Link>
              <DeletePost postId={id} />
              <CommentsPage postId={id} />
            </div>
            
        )}
    </div>
        )}
export default PostsPage;
