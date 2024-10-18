import React, { useState } from 'react';
import axios from 'axios';

const CreatePostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [testResult, setTestResult] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId: 1,
    })
      .then(response => {
        const newPost = response.data;
        onAddPost(newPost);
        setTitle('');
        setBody('');
        saveToLocalStorage(newPost);
        setSuccessMessage('Post created successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds

        // Mock test result
        setTestResult('Test passed: New post created successfully.');
        setTimeout(() => setTestResult(''), 3000); // Clear test result after 3 seconds
      })
      .catch(error => {
        console.error('There was an error creating the post!', error);
        setTestResult('Test failed: Error creating the post.');
      });
  };

  const saveToLocalStorage = (post) => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.unshift(post);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
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
        <button type="submit">Create Post</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
      {testResult && <p className="test-result">{testResult}</p>}
    </div>
  );
};

export default CreatePostForm;
