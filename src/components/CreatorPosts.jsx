import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeletePost from "../components/DeletePost";

//STYLE
import "../CSS/CreatorProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";



function CreatorPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/u/` + id)
      .then((posts) => {
        setPosts(posts.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="creator-posts">
        <h1>Their Styles</h1>
        {loading && <p>Loading...</p>}
        {posts && (
          <div>
            {posts.map((post) => (
              <div key={post._id} className="post-card">
                
                <Link to={`/posts/${post._id}`}>
                <img src={post.image1} alt={post.title} />
                </Link>
                <div>
                  <h3>{post.title}</h3>
                  <label>{post.category}</label>
                </div>

                
                <section className="buttons-board">
                  <Link to={`/posts/${id}/edit`}>
                    <FontAwesomeIcon
                      className="edit-button"
                      icon={faRocket}
                      style={{ color: "#FFC159", fontSize: '3vh' }}
                    />
                    </Link>
                  
                  <DeletePost postId={id} />

                </section>
                
              </div>
              
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CreatorPosts;
