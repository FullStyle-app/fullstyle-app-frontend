import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

//STYLE
import "../CSS/CreatorProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";


function CreatorPosts({id}) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/posts/u/` + id)
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
            <div className="creator-posts">
                <h1>Their Styles</h1>
                {loading && <p>Loading...</p>}
                {posts && (
                    <div>
                        {posts.map((post) => (
                            <div key={post._id} className='post-card'>
                                <img src={post.image1} alt={post.title} />
                                <section className="post-info">
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                </section>
                                <section className="post-button">
                                </section>  
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