import React from 'react';
import { render, screen } from '@testing-library/react';
import Filter from './Filter';

test('renders learn react link', () => {
  render(<Filter onApplyFilter={function (filteredData: any[]): void {
    throw new Error('Function not implemented.');
  } } />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
