import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostList from '../PostList';

jest.mock('axios');

const mockPosts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
];

test('fetches and displays posts', async () => {
  axios.get.mockResolvedValue({ data: mockPosts });

  const setPosts = jest.fn(posts => posts);

  render(<PostList posts={[]} setPosts={setPosts} />);

  await waitFor(() => expect(setPosts).toHaveBeenCalledWith(mockPosts));
  
  mockPosts.forEach(post => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
  });
});

test('deletes a post and updates the post list', async () => {
  axios.get.mockResolvedValue({ data: mockPosts });
  axios.delete.mockResolvedValue();

  const setPosts = jest.fn(posts => posts);

  render(<PostList posts={mockPosts} setPosts={setPosts} />);

  fireEvent.click(screen.getByText('Delete'));

  await waitFor(() => {
    expect(setPosts).toHaveBeenCalledTimes(2);
    expect(setPosts).toHaveBeenCalledWith([mockPosts[1]]);
  });

  expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
});
