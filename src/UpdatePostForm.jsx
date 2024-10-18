import React, { useState } from 'react';
import axios from 'axios';

const UpdatePostForm = ({ post, onUpdatePost }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
      title,
      body,
      userId: post.userId,
    })
      .then(response => {
        onUpdatePost(response.data);
        setSuccessMessage('Post updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        console.log('Post updated:', response.data); // Add this line to log the updated post
      })
      .catch(error => {
        console.error('There was an error updating the post!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default UpdatePostForm;
