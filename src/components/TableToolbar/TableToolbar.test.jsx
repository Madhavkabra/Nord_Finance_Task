import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TableToolbar } from '.';

const defaultProps = {
  title: 'Test Title',
  inputName: 'testInput',
  inputPlaceholder: 'Test Placeholder',
  inputValue: 'Test Value',
  onChangeInput: jest.fn(),
  showInput: true,
};

describe('TableToolbar Component', () => {
  it('Should render the component with provided props', () => {
    const { getByText, getByPlaceholderText } = render(
      <TableToolbar {...defaultProps} />
    );

    const titleElement = getByText('Test Title');
    expect(titleElement).toBeInTheDocument();

    const inputElement = getByPlaceholderText('Test Placeholder');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('Test Value');
  });

  it('Should not render the input when showInput is false', () => {
    const { queryByPlaceholderText } = render(
      <TableToolbar
        {...defaultProps}
        showInput={false}
      />
    );

    const inputElement = queryByPlaceholderText('Test Placeholder');
    expect(inputElement).toBeNull();
  });

  it('Should call onChangeInput when the input value changes', () => {
    const { getByPlaceholderText } = render(<TableToolbar {...defaultProps} />);

    const inputElement = getByPlaceholderText('Test Placeholder');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(defaultProps.onChangeInput).toHaveBeenCalledTimes(1);
  });
});
