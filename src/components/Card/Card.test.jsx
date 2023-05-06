import { render } from '@testing-library/react';
import { Card } from '.';

describe('Card component', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
  };

  it('Should render the title and description correctly', () => {
    const { getByText } = render(<Card {...defaultProps} />);

    expect(getByText(defaultProps.title)).toBeInTheDocument();
    expect(getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('Should render the title correctly when description is not provided', () => {
    const { getByText } = render(<Card title={defaultProps.title} />);

    expect(getByText(defaultProps.title)).toBeInTheDocument();

    // description paragraph should not exist
    expect(document.querySelector('.card p:nth-child(2)').textContent).toBe('');
  });
});
