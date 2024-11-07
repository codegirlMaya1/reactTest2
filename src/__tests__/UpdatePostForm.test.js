/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UpdatePostForm from '../UpdatePostForm';
import '@testing-library/jest-dom';

jest.mock('axios');

const post = { id: 1, title: 'Post 1', body: 'This is Post 1', userId: 1 };

test('updates a post and reflects the changes', async () => {
  const updatedPost = { ...post, title: 'Updated Post 1' };
  axios.put.mockResolvedValue({ data: updatedPost });

  const onUpdatePost = jest.fn();

  render(<UpdatePostForm post={post} onUpdatePost={onUpdatePost} />);

  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Post 1' } });

  fireEvent.click(screen.getByText('Update Post'));

  await waitFor(() => expect(onUpdatePost).toHaveBeenCalledWith(updatedPost));
  expect(screen.getByText('Post updated successfully!')).toBeInTheDocument();
});
