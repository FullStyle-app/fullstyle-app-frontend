import React from 'react';
import { useParams } from 'react-router-dom';
import UpdatePost from '../components/UpdatePost';


function UpdateForm({postId}) {
    console.log('id', id);

  return (
    <div>
      <h1>Update Post</h1>
      <UpdatePost postId={postId} />
    </div>
  );
}

export default UpdateForm;