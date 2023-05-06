import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '.';

describe('Input Component', () => {
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render input element with provided value and placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input
        name='test'
        value='Hello'
        onChange={onChangeMock}
        placeholder='Enter value...'
      />
    );

    const inputElement = getByPlaceholderText('Enter value...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('Hello');
  });

  test('Should trigger onChange event when input value is changed', () => {
    const { getByPlaceholderText } = render(
      <Input
        name='test'
        value=''
        onChange={onChangeMock}
        placeholder='Enter value...'
      />
    );

    const inputElement = getByPlaceholderText('Enter value...');
    fireEvent.change(inputElement, { target: { value: 'New value' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('Should clear input value when clear button is clicked', () => {
    let value = 'Hello';
    const onChangeMock = jest.fn((e) => (value = e.target.value));

    const { getByTestId } = render(
      <Input
        name='test'
        value={value}
        onChange={onChangeMock}
        placeholder='Enter value...'
      />
    );

    const clearButton = getByTestId('clear-input-button');
    fireEvent.click(clearButton);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith({ target: { value: '' } });

    // Verify that the clear button is no longer visible
    expect(value).toBe('');
  });

  test('Should set focus on input element when input container is clicked', () => {
    const { getByPlaceholderText } = render(
      <Input
        name='test'
        value=''
        onChange={onChangeMock}
        placeholder='Enter value...'
      />
    );

    const inputContainer = getByPlaceholderText('Enter value...').parentNode;
    fireEvent.click(inputContainer);

    const inputElement = getByPlaceholderText('Enter value...');
    expect(document.activeElement).toBe(inputElement);
  });
});
