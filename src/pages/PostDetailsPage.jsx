import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddToFavorites from "../components/AddToFav";
import CommentsPage from "../components/Comments";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose your preferred syntax highlighting style

//STYLE
import "../CSS/PostDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faLaptop } from "@fortawesome/free-solid-svg-icons";

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
        {post && (
          <>
            <div className="post-left">
              <img className='screenshot' src={post.image1} alt={post.title} />
              <div className='preview' style={{ marginTop: "20px" }}>
                <button onClick={togglePreviewVisibility}>
                  {previewVisible ? "Hide" : "Show CSS"}
                </button>
                {previewVisible && (
                  <div
                    className="preview-container"
                    style={{ backgroundColor: "#1B283D", padding: "5px" }}
                  >
                    <SyntaxHighlighter language="javascript" style={atomDark} >
                      {post.description} 
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </div>

            <div className="post-right">
              <div className="post-author">
                {post.author && (
                  <>
                    <img src={post.author.img} alt={post.author.username} />
                    <Link to={`/creators/${post.author._id}`}>
                      <h3>@{post.author.username}</h3>
                    </Link>
                  </>
                )}
                <div className="author-job">
                  <FontAwesomeIcon icon={ faLaptop } style={{color:'white'}} />
                  <br/>
                  <p>{post.author.job}</p>
                </div> {/* closing div for author-job */}
              </div> {/* closing div for post-author */}

              <div className='post-informations'>
                <h2>{post.title}</h2>
                {post.linkToWebsite ? (
                  <a href={post.linkToWebsite} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} style={{color:'#FFC159', fontSize: '25px'}} />
                  </a>
                ) : (
                  <FontAwesomeIcon disabled icon={faGlobe} style={{color:'darkgray', fontSize: '25px'}}/>
                )}
                {post.linkToCode ? (
                  <a href={post.linkToCode} target="_blank">
                    <FontAwesomeIcon icon={faGithub} style={{color:'#FFC159', fontSize: '25px'}} />
                  </a>
                ) : (
                  <FontAwesomeIcon disabled icon={faGithub} style={{color:'darkgray', fontSize: '25px'}}/>
                )}
                <label>{post.category}</label>
                <p>{post.tags}</p>
              </div>

              <div className="addtofav-div">
                <p>Add to Fav :</p>
                <AddToFavorites postId={id} />
              </div>

              <div className='comments-section'>
                <CommentsPage postId={id} />
              </div>
            </div> {/* closing div for post-right */}
          </>
        )}
      </div> {/* closing div for post-body */}
    </div> 
  );
}

export default PostsPage;
