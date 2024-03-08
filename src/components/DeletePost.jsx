import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function deletePost (){
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = 'http://localhost:5005';
    const navigate = useNavigate();

    useEffect(() => {
        axios.delete(`${API_URL}/posts/${id}`)
    }, [])

    
}