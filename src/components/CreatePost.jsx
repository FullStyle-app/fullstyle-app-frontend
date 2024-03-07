import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadImage from "../services/file-upload.service";

const API_URL = "http://localhost:5005";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [linkToWebsite, setLinkToWebsite] = useState("");
  const [linkToCode, setLinkToCode] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleLinkToWebsiteChange = (e) => setLinkToWebsite(e.target.value);
  const handleLinkToCodeChange = (e) => setLinkToCode(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  // Handle image upload for image1
  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
    handleFileUpload(e.target.files[0], setImage1);
  };

  // Handle image upload for image2
  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
    handleFileUpload(e.target.files[0], setImage2);
  };

  // Handle image upload for image3
  const handleImage3Change = (e) => {
    setImage3(e.target.files[0]);
    handleFileUpload(e.target.files[0], setImage3);
  };

  // Function to handle file upload
  const handleFileUpload = (file, setImage) => {
    const uploadData = new FormData();
    uploadData.append("image1", file);

   uploadImage(uploadData)
      .then((response) => {
        setImage(response);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      image1,
      image2,
      image3,
      linkToWebsite,
      linkToCode,
      category,
      tags,
    };

    axios
      .post(`${API_URL}/posts/create`, requestBody)
      .then((response) => {
        console.log('Post created:', response.data);
        navigate(`/posts/${response.data._id}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="CreatePostPage">
      <h1>Create a New Post</h1>

      <form onSubmit={handleSubmit}>
        {/* Other input fields */}
        
        <label>Image 1:</label>
        <input
          type="file"
          name="image1"
          onChange={handleImage1Change}
          required
        />

        <label>Image 2:</label>
        <input
          type="file"
          name="image2"
          onChange={handleImage2Change}
        />

        <label>Image 3:</label>
        <input
          type="file"
          name="image3"
          onChange={handleImage3Change}
        />

        {/* Other input fields */}

        <button type="submit">Create Post</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreatePostPage;
