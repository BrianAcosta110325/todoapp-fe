import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateTodo from './CreateTodo';

test('renders learn react link', () => {
  render(<CreateTodo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
