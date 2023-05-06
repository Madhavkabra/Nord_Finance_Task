import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const TableFooter = ({
  currentPage,
  disabledPrevious,
  disabledNext,
  onNext,
  onPrevious,
}) => {
  return (
    <div className={styles.tableFooter}>
      <p className={styles.pageCount}>Current Page: {currentPage}</p>

      <div className={styles.tableFooterActionButtonContainer}>
        <button
          data-testid='previous-button'
          onClick={onPrevious}
          disabled={disabledPrevious}
        >
          Previous
        </button>
        <button
          data-testid='next-button'
          onClick={onNext}
          disabled={disabledNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

TableFooter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  disabledPrevious: PropTypes.bool.isRequired,
  disabledNext: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
