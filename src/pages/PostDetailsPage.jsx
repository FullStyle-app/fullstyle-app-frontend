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
    <div className="post-board">
      <Link to="/">
        <button>Back</button>
      </Link>

      <div className="post-body">
        {loading && <p>Loading...</p>}

        {post && (
          <section>
            <img src={post.image1} alt={post.title} />
            <div className='post-infos'>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <p>{post.linkToWebsite}</p>
              <label>{post.category}</label>
              <p>{post.tags}</p>
            </div>
          </section>
        )}

        <div className="post-footer">
          <p>Add to Fav :</p>
          <AddToFavorites postId={id} />
        </div>
      </div>

      <p>{post.linkToCode}</p>

      <div className="post-comments">
        <CommentsPage postId={id} />
      </div>
    </div>
  );
}
export default PostsPage;
