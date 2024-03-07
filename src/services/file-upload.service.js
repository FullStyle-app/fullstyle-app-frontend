import axios from "axios";
 

function uploadImage(file) {
 
 const baseURL= "http://localhost:5005/posts/create";



    return axios.post(`${baseURL}/upload`, file)
      .then(res => res.data)
      .catch((e) => console.log(e));
  };
   export default uploadImage;