import React from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";

function Homepage() {
  return (
    <div>
      <h1>Home Page</h1>
      <PostList />
      <CreatePost />
      <Footer />
    </div>
  );
} 

export default Homepage;