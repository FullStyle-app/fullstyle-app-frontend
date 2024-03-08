import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreatorProfilePage() {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    };



    useEffect(() => {
        axios.get('http://localhost:5005/users/' + id)
        .then((user) => {
            setUser(user.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log('Error:', error);
        })
    }, [])

    return (
        <>
            <div>
                <h1>Creator Profile Page</h1>
                {loading && <p>Loading...</p>}
                {user && (
                    <div>
                        <img src={user.img} />
                        <h2>{user.username}</h2>
                        <p>{formatDate(user.created)}</p>
                        <p>{user.bio}</p>
                        <p>{user.job}</p>
                        <p>{user.location}</p>
                        {user.github ? (
                            <a href={user.github} target="_blank">
                                <button>Github</button>
                            </a>
                        ) : (
                            <button disabled style={{ backgroundColor: 'gray' }}>Github</button>
                        )}
                        <div>
                            <h2>Posts</h2>
                            {user.posts.map((post) => (
                                <div key={user._id}>
                                    <img src={post.image1} alt={post.title} />
                                    <h3>{post.title}</h3>
                                    <p>{post.description}</p>
                                    <Link to={`/posts/${post._id}`}>View details</Link>
                                </div>
                            ))}
                            </div>
                    </div>
                )}
            </div>
        </>
    )
}

// infinite loop while maping through creator.posts
// each post does need a specific key

export default CreatorProfilePage;