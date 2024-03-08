import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreatorPosts({id}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5005/posts/u/' + id)
        .then((posts) => {
            setPosts(posts.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }, [])

    return (
        <>
            <div>
                <h1>Creator Posts</h1>
                {loading && <p>Loading...</p>}
                {posts && (
                    <div>
                        {posts.map((post) => (
                            <div key={post._id}>
                                <img src={post.image1} alt={post.title} />
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <Link to={`/posts/${post._id}`}>View details</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default CreatorPosts;