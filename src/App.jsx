import React, { useState } from 'react';
import './index.css';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import UpdatePostForm from './UpdatePostForm';

const App = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
    console.log('Updated Posts:', posts); // Log the state after update
  };

  return (
    <div>
      <h1>JSONPlaceholder API Posts</h1>
      <div className="forms-container">
        <CreatePostForm onAddPost={addPost} />
        {posts.map(post => (
          <UpdatePostForm key={post.id} post={post} onUpdatePost={updatePost} />
        ))}
      </div>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default App;
