import React from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import '../CSS/Homepage.css';
function Homepage() {
  return (
    <div className="home">

      <PostList />
      <CreatePost />

    </div>
  );
} 

export default Homepage;