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
    })

    return (
        <div className='posts'>
            <h1>Posts</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {posts.map((post) => (
                <div key={post._id}>
                    <img src={post.image1} alt={post.title} />
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <Link to={`/posts/${post._id}`}>View details</Link>
                </div>
            ))}
            
        </div>
    )
}

export default PostList;