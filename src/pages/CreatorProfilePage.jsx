import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CreatorPosts from "../components/CreatorPosts";
import FavoritesList from "../components/favoritesList";
import service from "../services/file-upload.service";

function CreatorProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState('');
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("img", e.target.files[0]);

    service
      .uploadProfilePicture(uploadData)
      .then((response) => {
        console.log(response);
        setImg(response);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    axios
      .put(
        "http://localhost:5005/users/" + id,
        { img: img },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5005/users/" + id)
      .then((user) => {
        setUser(user.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>Creator Profile Page</h1>
        {loading && <p>Loading...</p>}
        {user && (
          <div>
            {user.img ? (
              <img src={user.img} alt={user.username} />
            ) : (
              <div>
                <p>Add a profile picture now !</p>
                <input type="file" name="img" onChange={handleFileUpload} />

                <button onClick={handleSubmit}>Update</button>
              </div>
            )}

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
              <button disabled style={{ backgroundColor: "gray" }}>
                Github
              </button>
            )}
            <div>
              <h2>Posts</h2>
              <CreatorPosts id={id} />
              <FavoritesList id={id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CreatorProfilePage;
