import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Postlist.css';
import AddToFavorites from './AddToFav';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/posts`)
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='postlist-container'>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {posts.map((post) => (
                <div key={post._id} className='post-card'>
                    <img
                        src={post.image1}
                        alt={post.title}
                        className='post-image'
                       
                    />
                    <div className="post-content">
                      
                        <AddToFavorites postId={post._id} />
                        <button>
                            <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              More
                            </Link>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;
