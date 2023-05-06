import React, { useMemo } from 'react';

export const useLoader = ({ data, isLoading, isError }) => {
  const loader = useMemo(() => {
    if (isLoading) {
      return (
        <i
          data-testid='loader'
          className='fa-solid fa-spinner fa-2xl fa-spin'
        />
      );
    }

    if (isError) {
      return (
        <i
          data-testid='error-icon'
          className='fa-solid fa-circle-exclamation fa-2xl'
        ></i>
      );
    }

    if (!isLoading && !data) {
      return (
        <i
          data-testid='no-data-found-icon'
          className='fa-solid fa-triangle-exclamation fa-2xl'
        ></i>
      );
    }

    return null;
  }, [data, isLoading, isError]);

  return loader;
};
