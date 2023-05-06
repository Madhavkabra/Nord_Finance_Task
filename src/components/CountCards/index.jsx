import React from 'react';
import styles from './styles.module.css';
import { useLoader } from '../../hooks/useLoader';
import { Card } from '../Card';

export const CountCards = ({ people, isLoading, error }) => {
  const speciesWithCount = people?.speciesWithCount || {};

  const loader = useLoader({
    data: Object.keys(speciesWithCount).length,
    isError: Boolean(error),
    isLoading: isLoading,
  });

  return (
    <div className={styles.cards}>
      {loader && loader}

      {!loader && (
        <>
          <Card
            title='Total Resuls'
            description={people?.results?.length || 0}
          />

          {Object.keys(speciesWithCount)?.map((count) => (
            <Card
              key={count}
              title={`Total ${count}`}
              description={speciesWithCount[count]}
            />
          ))}
        </>
      )}
    </div>
  );
};
