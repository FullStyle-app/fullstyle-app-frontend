import React from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";
import '../CSS/Homepage.css';
import cover from '../img/cover.png';

function Homepage() {
  return (
  <div className="homepage">
    <img 
    className='cover'
    src={cover}
    alt='cover'
    />

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