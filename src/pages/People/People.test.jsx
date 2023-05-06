import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useSWR from 'swr';
import { peopleFetcher } from './peopleFetcher';
import { mappedMockPeople } from '../../__mocks__/people';
import { People } from '.';

jest.mock('swr');

describe('People component', () => {
  beforeEach(() => {
    useSWR.mockReturnValue(mappedMockPeople);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render the component without errors', () => {
    const { getByTestId } = render(<People />);

    expect(getByTestId('people-container')).toBeInTheDocument();
  });

  test('Should display the table with correct rows', () => {
    const { getByTestId } = render(<People />);

    expect(getByTestId('table-row-0')).toHaveTextContent('C-3PO');
    expect(getByTestId('table-row-1')).toHaveTextContent('Luke Skywalker');
  });

  test('Should update the API endpoint when searching for a name', () => {
    const { getByPlaceholderText } = render(<People />);

    const searchInput = getByPlaceholderText('Search Name...');
    fireEvent.change(searchInput, { target: { value: 'Luke' } });

    waitFor(() => {
      expect(useSWR).toHaveBeenCalledWith(
        '/api/people/?search=Luke',
        peopleFetcher
      );
    });
  });

  test('Should update the API endpoint when next button is clicked', async () => {
    const { getByTestId } = render(<People />);

    await act(async () => {
      fireEvent.click(getByTestId('next-button'));
    });

    waitFor(() => {
      expect(useSWR).toHaveBeenCalledWith('/api/people/?page=2', peopleFetcher);
    });
  });

  test('Should update the API endpoint when previous button is clicked', async () => {
    const { getByTestId } = render(<People />);
    await act(async () => {});
    fireEvent.click(getByTestId('next-button'));
    fireEvent.click(getByTestId('previous-button'));

    waitFor(() => {
      expect(useSWR).toHaveBeenCalledWith('/api/people/?page=1', peopleFetcher);
    });
  });
});
