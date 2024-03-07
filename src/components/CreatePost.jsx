import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImage1Change = (e) => setImage1(e.target.value);
  const handleImage2Change = (e) => setImage2(e.target.value);
  const handleImage3Change = (e) => setImage3(e.target.value);
  const handleLinkToWebsiteChange = (e) => setLinkToWebsite(e.target.value);
  const handleLinkToCodeChange = (e) => setLinkToCode(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  const navigate = useNavigate();



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
      tags: tags.split(","),
      author: getUserId(),
    };

    axios
      .post(`${API_URL}/posts/create`, requestBody)
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
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        <label>Image 1:</label>
        <input
          type="text"
          name="image1"
          value={image1}
          onChange={handleImage1Change}
          required
        />

        <label>Image 2:</label>
        <input
          type="text"
          name="image2"
          value={image2}
          onChange={handleImage2Change}
        />

        <label>Image 3:</label>
        <input
          type="text"
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
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={category}
          onChange={handleCategoryChange}
          required
        />

        <label>Tags (separated by comma):</label>
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
