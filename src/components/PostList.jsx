import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5005/posts')
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [])

    return (
        <div className='postlist-container'>
          
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {posts.map((post) => (
                <div key={post._id} className='post-card'>
                    <img src={post.image1} alt={post.title}
                     style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    />
                    
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <Link to={`/posts/${post._id}`}>View details</Link>
                </div>
            ))}
            
        </div>
    )
}

export default PostList;