import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePost(post) {
    const { id } = useParams();
    const { userId } = useParams();
    const API_URL = 'http://localhost:5005';

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [linkToWebsite, setLinkToWebsite] = useState("");
    const [linkToCode, setLinkToCode] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const navigate = useNavigate();
  
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleImage1Change = (e) => setImage1(e.target.files[0]);
    const handleImage2Change = (e) => setImage2(e.target.files[0]);
    const handleImage3Change = (e) => setImage3(e.target.files[0]);
    const handleLinkToWebsiteChange = (e) => setLinkToWebsite(e.target.value);
    const handleLinkToCodeChange = (e) => setLinkToCode(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value);
  
    const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, image1, image2, image3, linkToWebsite, linkToCode, category, tags };

    axios.put(`${API_URL}/posts/${id}`, requestBody)
        .then((response) => {
            console.log('Post updated:', response.data);
            navigate(`/posts/${response.data._id}`);
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        });
    }
  
    return (
      <div className="UpdatePostPage">
        <h1>Update your Post</h1>
  
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
  
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
  
          <label>Image 1:</label>
          <input
            type="file"
            name="image1"
            value={image1}
            onChange={handleImage1Change}
          />
  
          <label>Image 2:</label>
          <input
            type="file"
            name="image2"
            value={image2}
            onChange={handleImage2Change}
          />
  
          <label>Image 3:</label>
          <input
            type="file"
            name="image3"
            value={image3}
            onChange={handleImage3Change}
          />
  
          <label>Link to Website:</label>
          <input
            type="text"
            name="linkToWebsite"
            value={linkToWebsite}
            onChange={handleLinkToWebsiteChange}
          />
  
          <label>Link to Code:</label>
          <input
            type="text"
            name="linkToCode"
            value={linkToCode}
            onChange={handleLinkToCodeChange}
          />
  
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          />
  
          <label>Tags (separated by comma):</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={handleTagsChange}
          />
  
          <button type="submit">Update Post</button>
        </form>
  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
    };

export default UpdatePost;