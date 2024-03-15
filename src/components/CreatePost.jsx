import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";
import { AuthContext } from '../context/auth.context';
import "../CSS/Forms.css";


import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Choose your preferred syntax highlighting style

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [linkToWebsite, setLinkToWebsite] = useState("");
  const [linkToCode, setLinkToCode] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [hideForm, setHideForm] = useState(true); // Initially hide the form
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLinkToWebsiteChange = (e) => setLinkToWebsite(e.target.value);
  const handleLinkToCodeChange = (e) => setLinkToCode(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  const storedToken = localStorage.getItem('authToken');

  const handleFileUpload1 = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image1", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log(response.image1);
        setImage1(response.image1);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description, // Change submitted code to description
      image1,
      linkToWebsite,
      linkToCode,
      category,
      tags,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/posts/create`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log("Post created:", response.data);
        navigate(`/posts/${response.data._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const toggleForm = () => {
    setHideForm(!hideForm);
  };

  if (!isLoggedIn) {
    return null; // Render nothing if not logged in
  }

  return (
    <div className={`CreatePostPage ${hideForm ? 'hide-background' : ''}`}>
      <button className={`toggleButton ${hideForm ? 'round' : ''}`} onClick={toggleForm}>
        {hideForm ? "+ Add Style" : "Hide Form"}
      </button>
      {!hideForm && (
        <form className="CreatePostPage"onSubmit={handleSubmit}>
          <label>Screenshot:</label>
          <input
            type="file"
            name="image1"
            onChange={handleFileUpload1}
            required
          />

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />

          <label >Your Code</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            style={{ display: hideForm ? 'none' : 'block' }}
            placeholder="Paste your code here..."
          />
          <div className="preview-container" style={{ marginTop: '25px', maxHeight: '200px', overflowY: 'auto' }}>
            <label>Preview:</label>
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {description} {/* Render the submitted code */}
            </SyntaxHighlighter>
          </div>

          <label>Link to website</label>
          <input
            type="text"
            name="linkToWebsite"
            value={linkToWebsite}
            onChange={handleLinkToWebsiteChange}
          />

          <label>Link to code</label>
          <input
            type="text"
            name="linkToCode"
            value={linkToCode}
            onChange={handleLinkToCodeChange}
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          />

          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={handleTagsChange}
          />

          <button type="submit">Create Post</button>
        </form>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreatePostPage;
