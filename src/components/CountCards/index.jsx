import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { useLoader } from '../../hooks/useLoader';
import { Card } from '../Card';

export const CountCards = ({ people, isLoading, error }) => {
  const speciesWithCount = people?.speciesWithCount || {};

  const loader = useLoader({
    data: speciesWithCount,
    isError: error,
    isLoading: isLoading,
  });

  return (
    <div className={styles.cards}>
      {loader && loader}

      {!loader && (
        <>
          <Card
            title='Total Results'
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

CountCards.propTypes = {
  people: PropTypes.shape({
    speciesWithCount: PropTypes.object,
    results: PropTypes.arrayOf(PropTypes.object),
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};
