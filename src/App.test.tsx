import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText }  = render(<App />);
  const linkElement = getByText(/Search Box Component:/id);
  expect(linkElement).toBeInTheDocument();
});
