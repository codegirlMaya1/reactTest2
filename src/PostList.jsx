import React, { useEffect } from 'react';
import axios from 'axios';

const PostList = ({ posts, setPosts }) => {
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const fetchedPosts = response.data;
        setPosts([...storedPosts, ...fetchedPosts]);
        console.log('Fetched Posts:', fetchedPosts); // Log fetched posts
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
  }, [setPosts]);

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        alert('Post deleted successfully!');
        console.log('Post Deleted:', id); // Log deleted post ID
      })
      .catch(error => {
        console.error('There was an error deleting the post!', error);
      });
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
