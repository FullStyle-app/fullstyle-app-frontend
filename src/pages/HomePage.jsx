import React from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import '../CSS/Homepage.css';
function Homepage() {
  return (
  <div className="homepage">
    <h1>Home</h1>

  <div className="create-post">
<CreatePost />
  </div>
  
    <div className="post-list">

      <PostList />
      

    </div>
  </div>
  );
} 

export default Homepage;