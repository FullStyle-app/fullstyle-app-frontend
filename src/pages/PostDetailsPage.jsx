import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToFavorites from "../components/AddToFav";
import CommentsPage from "../components/Comments";

//STYLE
import "../CSS/PostDetails.css";
import logo from "../img/logo-footer.png";

function PostsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="post-details">
      <h1>Post</h1>
      {loading && <p>Loading...</p>}
      {post && (
        <div className="post-info">
          <img src={post.image1} alt={post.title} />
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.linkToWebsite}</p>
          <p>{post.linkToCode}</p>
          <p>{post.category}</p>
          <p>{post.tags}</p>
        </div>
      )}
      <div className="post-author">
        <section>
          {post.author && (
            <Link to={`/creators/${post.author._id}`}>
              <img src={post.author.img} alt={post.author.name} />
              <h3>{post.author.username}</h3>
            </Link>
          )}
          <p>{post.author.job}</p>
        </section>
      </div>

      <AddToFavorites postId={id} />
      <CommentsPage postId={id} />
    </div>
  );
}
export default PostsPage;
