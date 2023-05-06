import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TableFooter } from '.';

const mockOnNext = jest.fn();
const mockOnPrevious = jest.fn();

const defaultProps = {
  currentPage: 1,
  disabledPrevious: false,
  disabledNext: false,
  onNext: mockOnNext,
  onPrevious: mockOnPrevious,
};

describe('TableFooter Component', () => {
  it('Should render the current page correctly', () => {
    const { getByText } = render(
      <TableFooter
        {...defaultProps}
        currentPage={3}
      />
    );
    expect(getByText('Current Page: 3')).toBeInTheDocument();
  });

  it('Should render the Previous button correctly', () => {
    const { getByText } = render(<TableFooter {...defaultProps} />);

    const previousButton = getByText('Previous');

    expect(previousButton).toBeInTheDocument();
    expect(previousButton).not.toBeDisabled();
  });

  it('Should render the Next button correctly', () => {
    const { getByText } = render(<TableFooter {...defaultProps} />);

    const nextButton = getByText('Next');

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
  });

  it('Should call onNext when the Next button is clicked', () => {
    const { getByText } = render(<TableFooter {...defaultProps} />);

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('Should call onPrevious when the Previous button is clicked', () => {
    const { getByText } = render(<TableFooter {...defaultProps} />);

    const previousButton = getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  it('Should disable the Previous button when disabledPrevious is true', () => {
    const { getByText } = render(
      <TableFooter
        {...defaultProps}
        disabledPrevious={true}
      />
    );

    const previousButton = getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('Should disable the Next button when disabledNext is true', () => {
    const { getByText } = render(
      <TableFooter
        {...defaultProps}
        disabledNext={true}
      />
    );

    const nextButton = getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
