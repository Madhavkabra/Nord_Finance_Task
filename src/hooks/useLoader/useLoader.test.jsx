import { render } from '@testing-library/react';
import { useLoader } from '.';

const MockComponent = ({ data, isLoading, isError }) => {
  const loader = useLoader({ data, isLoading, isError });

  return loader;
};

describe('useLoader hook', () => {
  test('Should render loader icon when isLoading is true', () => {
    const { getByTestId } = render(
      <MockComponent
        data={null}
        isLoading
        isError={false}
      />
    );

    const loaderIcon = getByTestId('loader');
    expect(loaderIcon).toBeInTheDocument();
  });

  test('Should render error icon when isError is true', () => {
    const { getByTestId } = render(
      <MockComponent
        data={null}
        isLoading={false}
        isError
      />
    );
    const errorIcon = getByTestId('error-icon');
    expect(errorIcon).toBeInTheDocument();
  });

  test('Should render no data found icon when isLoading is false and data is null', () => {
    const { getByTestId } = render(
      <MockComponent
        data={null}
        isLoading={false}
        isError={false}
      />
    );

    const noDataIcon = getByTestId('no-data-found-icon');
    expect(noDataIcon).toBeInTheDocument();
  });

  test('Should not render any icon when isLoading is false, data is not null, and isError is false', () => {
    const { queryByTestId } = render(
      <MockComponent
        data='Data'
        isLoading={false}
        isError={false}
      />
    );

    const loaderIcon = queryByTestId('loader');
    const errorIcon = queryByTestId('error-icon');
    const noDataIcon = queryByTestId('no-data-found-icon');

    expect(loaderIcon).not.toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
    expect(noDataIcon).not.toBeInTheDocument();
  });
});
