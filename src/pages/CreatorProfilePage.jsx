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
                    </div>
                )}
            </div>
        </>
    )
}

export default CreatorProfilePage;