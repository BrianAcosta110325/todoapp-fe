import React from 'react';
import { render, screen } from '@testing-library/react';
import Filter from './Filter';

test('renders learn react link', () => {
  render(<Filter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
