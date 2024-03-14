import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToFavorites from "../components/AddToFav";
import CommentsPage from "../components/Comments";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose your preferred syntax highlighting style

//STYLE
import "../CSS/PostDetails.css";
import logo from "../img/logo-footer.png";

function PostsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false); // Initially hide the preview

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const togglePreviewVisibility = () => {
    setPreviewVisible(!previewVisible);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="post-board">
      <Link to="/">
        <button className="btn">Back</button>
      </Link>
      <div className="post-body">
        {loading && <p>Loading...</p>}
        <div className='post-infos'>
          {post && (
            <>
              <img src={post.image1} alt={post.title} />
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>{post.linkToWebsite}</p>
              <p>{post.linkToCode}</p>
              <label>{post.category}</label>
              <p>{post.tags}</p>
            </>
          )}
          <div className="post-footer">
            <p>Add to Fav :</p>
            <AddToFavorites postId={id} />
          </div>
        </div>
        <div className="post-author">
          <section>
            {post.author && (
              <>
                <img src={post.author.img} alt={post.author.username} />
                <Link to={`/creators/${post.author._id}`}>
                  <h3>{post.author.username}</h3>
                </Link>
              </>
            )}
            <p>{post.author.job}</p>
          </section>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="btn"onClick={togglePreviewVisibility}>
            {previewVisible ? 'Hide Preview' : 'Show Preview'}
          </button>
          {previewVisible && (
            <div className="preview-container" style={{ backgroundColor: '#f0f0f0', padding: '5px' }}>
              <label>Preview:</label>
              <SyntaxHighlighter language="javascript" style={dark}>
                {post.description} {/* Render the submitted code */}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
      <div className="post-comments">
        <CommentsPage postId={id} />
      </div>
      </div>
  );
}

export default PostsPage;
