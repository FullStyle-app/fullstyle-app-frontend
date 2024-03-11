import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../services/file-upload.service";


const API_URL = "http://localhost:5005";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
 // const [image2, setImage2] = useState("");
 // const [image3, setImage3] = useState("");
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

    // AUTH
    const storedToken = localStorage.getItem('authToken');

  // Function to handle file upload image1
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

  // Function to handle file upload image2
  /* const handleFileUpload2 = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image2", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log(response.image2);
        setImage2(response.image2);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  }; */

  // Function to handle file upload image3
  /* const handleFileUpload3 = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image3", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        console.log(response.image3);
        setImage3(response.image3);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      description,
      image1,
      linkToWebsite,
      linkToCode,
      category,
      tags,
    };

    axios
      .post(`${API_URL}/posts/create`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        console.log("Post created:", response.data);
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

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

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

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default CreatePostPage;
