/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreatePostForm from '../CreatePostForm';
import '@testing-library/jest-dom';

jest.mock('axios');

test('creates a new post and updates the post list', async () => {
  const mockPost = { id: 101, title: 'New Post', body: 'This is a new post', userId: 1 };
  axios.post.mockResolvedValue({ data: mockPost });

  const onAddPost = jest.fn();
  
  render(<CreatePostForm onAddPost={onAddPost} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Post' } });
  fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'This is a new post' } });
  
  fireEvent.click(screen.getByText('Create Post'));

  await waitFor(() => expect(onAddPost).toHaveBeenCalledWith(mockPost));
  expect(screen.getByText('Post created successfully!')).toBeInTheDocument();
});
