import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreatorProfilePage() {

    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    axios.get('http://localhost:5005/users/' + id)
        .then((creator) => {
            setCreator(creator.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log('Error:', error);
        })

    useEffect(() => {
        setCreator();
    }, [id])

    return (
        <>
            <div>
                <h1>Creator Profile Page</h1>
                {loading && <p>Loading...</p>}
                {creator && (
                    <div>
                        <img src={creator.img} />
                        <h2>{creator.username}</h2>
                        <p>{formatDate(creator.created)}</p>
                        <p>{creator.bio}</p>
                        <p>{creator.job}</p>
                        <p>{creator.location}</p>
                        {creator.github ? (
                            <a href={creator.github} target="_blank">
                                <button>Github</button>
                            </a>
                        ) : (
                            <button disabled style={{ backgroundColor: 'gray' }}>Github</button>
                        )}
                        <div>
                            <h2>Posts</h2>
                            {creator.posts.map((post) => (
                                <div key={post._id}>
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