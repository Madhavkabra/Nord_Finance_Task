import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

export const TableFooter = ({ currentPage, onNext, onPrevious }) => {
  return (
    <div className={styles.tableFooter}>
      <p className={styles.pageCount}>Current Page: {currentPage}</p>

      <div className={styles.tableFooterActionButtonContainer}>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

TableFooter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};
