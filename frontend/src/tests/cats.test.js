import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CatsPage from './CatsPage';

describe('CatsPage', () => {
  it('should render the list of codes', () => {
    const { getByText } = render(<CatsPage />);
    const codeList = [100, 200, 300, 400, 500];
    codeList.forEach((code) => {
      expect(getByText(code)).toBeInTheDocument();
    });
  });

  it('should render the cat image when a code is selected', () => {
    const { getByText, getByAltText } = render(<CatsPage />);
    const code = 200;
    fireEvent.click(getByText(code));
    expect(getByAltText(`HTTP ${code}`)).toBeInTheDocument();
  });
});