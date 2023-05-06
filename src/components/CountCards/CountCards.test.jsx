import { render } from '@testing-library/react';
import { CountCards } from '.';

const mockPeopleData = {
  speciesWithCount: {
    Droid: 5,
    Human: 10,
  },
  results: [{}],
};

describe('CountCards Component', () => {
  it('Should render loader when isLoading is true', () => {
    const { getByTestId } = render(
      <CountCards
        people={mockPeopleData}
        isLoading={true}
      />
    );

    const loaderElement = getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('Should render cards when isLoading is false', () => {
    const { getByText } = render(
      <CountCards
        people={mockPeopleData}
        isLoading={false}
      />
    );

    const totalResultsCard = getByText('Total Results');
    expect(totalResultsCard).toBeInTheDocument();

    const species1Card = getByText('Total Droid');
    expect(species1Card).toBeInTheDocument();

    const species2Card = getByText('Total Human');
    expect(species2Card).toBeInTheDocument();
  });

  it('Should render error message when error prop is provided', () => {
    const { getByTestId } = render(
      <CountCards
        people={mockPeopleData}
        isLoading={false}
        error
      />
    );

    const errorMessage = getByTestId('error-icon');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should render with default props when no props are provided', () => {
    const { getByTestId } = render(<CountCards />);

    const notFoundIcon = getByTestId('no-data-found-icon');
    expect(notFoundIcon).toBeInTheDocument();
  });
});
