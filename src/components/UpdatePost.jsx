import React, { useState } from 'react';
import axios from 'axios';
import service from "../services/file-upload.service";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function UpdatePost() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [linkToWebsite, setLinkToWebsite] = useState("");
  const [linkToCode, setLinkToCode] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLinkToWebsiteChange = (e) => setLinkToWebsite(e.target.value);
  const handleLinkToCodeChange = (e) => setLinkToCode(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  // AUTH
  const storedToken = localStorage.getItem('authToken');
  // NAV
  const navigate = useNavigate();

  const handleFileUpload1 = (e) => {
    const uploadData = new FormData();
    uploadData.append("image1", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log(response.image1);
        setImage1(response.image1);
      })
      .catch((err) => console.error("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('id:', id);

   // const requestBody = { title, description, image1, linkToWebsite, linkToCode, category, tags };

   const requestBody = {};

   // Include title if it's not empty
   if (title.trim() !== "") {
     requestBody.title = title;
   }
 
   // Include description if it's not empty
   if (description.trim() !== "") {
     requestBody.description = description;
   }
 
   // Include image1 if it's not empty
   if (image1 !== null) {
     requestBody.image1 = image1;
   }
 
   // Include linkToWebsite if it's not empty
   if (linkToWebsite.trim() !== "") {
     requestBody.linkToWebsite = linkToWebsite;
   }
 
   // Include linkToCode if it's not empty
   if (linkToCode.trim() !== "") {
     requestBody.linkToCode = linkToCode;
   }
 
   // Include category if it's not empty
   if (category.trim() !== "") {
     requestBody.category = category;
   }
 
   // Include tags if it's not empty
   if (tags.trim() !== "") {
     requestBody.tags = tags;
   }


    axios.put(`${API_URL}/posts/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        console.log('Post updated:', response.data);
        // Handle successful update, e.g., redirect to post details page
      })
      .then((response) => {
        navigate(`/posts/${id}`);

      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="UpdatePostPage">
      <h1>Update your Post</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />

        <label>Description:</label>
        <textarea value={description} onChange={handleDescriptionChange} />

        <label>Image 1:</label>
        <input type="file" onChange={handleFileUpload1} />

        <label>Link to Website:</label>
        <input type="text" value={linkToWebsite} onChange={handleLinkToWebsiteChange} />

        <label>Link to Code:</label>
        <input type="text" value={linkToCode} onChange={handleLinkToCodeChange} />

        <label>Category:</label>
        <input type="text" value={category} onChange={handleCategoryChange} />

        <label>Tags (separated by comma):</label>
        <input type="text" value={tags} onChange={handleTagsChange} />

        <button type="submit">Update Post</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UpdatePost;

